import { Context } from "hono";
import { CalApiError, CalSlot, createCalBooking, getCalSlots } from "./cal";
import { BookingDraftRow, Env } from "./types";
import { getOpenAI } from "./openai";
import { consumeDailyAiBudget } from "./usage-limits";

type BookingContext = Context<{ Bindings: Env }>;
type Duration = 15 | 30;
type Period = "any" | "morning" | "afternoon" | "evening";
type AvailabilityConstraints = { start: string; end: string; period: Period };

const MAX_BODY_BYTES = 8_192;
const MAX_PURPOSE_LENGTH = 500;
const DRAFT_TTL_MS = 20 * 60_000;
const MAX_SLOTS = 12;

function errorResponse(c: BookingContext, error: string, status: 400 | 404 | 409 | 429 | 500 | 502 = 400) {
  return c.json({ error }, status);
}

async function readJson<T>(c: BookingContext): Promise<T> {
  const contentLength = Number(c.req.header("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) throw new Error("request_too_large");
  return c.req.json<T>();
}

export function isValidTimeZone(value: string): boolean {
  try {
    Intl.DateTimeFormat("en", { timeZone: value }).format();
    return true;
  } catch {
    return false;
  }
}

function dateInTimeZone(date: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const get = (type: string) => parts.find((part) => part.type === type)?.value || "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

function addDays(date: string, days: number): string {
  const value = new Date(`${date}T12:00:00Z`);
  value.setUTCDate(value.getUTCDate() + days);
  return value.toISOString().slice(0, 10);
}

function dayOfWeek(date: string): number {
  return new Date(`${date}T12:00:00Z`).getUTCDay();
}

export function presetConstraints(preset: string, timeZone: string): AvailabilityConstraints | null {
  const today = dateInTimeZone(new Date(), timeZone);

  if (preset === "this_week") {
    return { start: today, end: addDays(today, Math.max(1, 7 - dayOfWeek(today))), period: "any" };
  }
  if (preset === "next_week") {
    const daysToMonday = ((8 - dayOfWeek(today)) % 7) || 7;
    const start = addDays(today, daysToMonday);
    return { start, end: addDays(start, 7), period: "any" };
  }
  if (preset === "morning") {
    return { start: today, end: addDays(today, 14), period: "morning" };
  }
  if (preset === "afternoon") {
    return { start: today, end: addDays(today, 14), period: "afternoon" };
  }

  return null;
}

async function interpretAvailability(
  env: Env,
  preference: string,
  timeZone: string,
): Promise<AvailabilityConstraints> {
  const dailyLimit = Number(env.BOOKING_PARSE_DAILY_AI_LIMIT) || 50;
  if (!await consumeDailyAiBudget(env, "booking_parse", dailyLimit)) {
    throw new Error("ai_budget_exhausted");
  }
  const today = dateInTimeZone(new Date(), timeZone);
  const openai = getOpenAI(env);
  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    response_format: { type: "json_object" },
    max_tokens: 180,
    messages: [
      {
        role: "system",
        content: `Convert a scheduling preference into JSON with keys start, end, and period. Dates use YYYY-MM-DD. period must be any, morning, afternoon, or evening. Today is ${today} in ${timeZone}. The end date is exclusive. Use at most a 31-day range. If no date is given, search the next 14 days. Return JSON only.`,
      },
      { role: "user", content: preference.slice(0, 300) },
    ],
  });

  const raw = completion.choices[0]?.message?.content || "{}";
  const parsed = JSON.parse(raw) as Partial<AvailabilityConstraints>;
  const period = ["any", "morning", "afternoon", "evening"].includes(parsed.period || "")
    ? parsed.period as Period
    : "any";
  const start = /^\d{4}-\d{2}-\d{2}$/.test(parsed.start || "") ? parsed.start! : today;
  const end = /^\d{4}-\d{2}-\d{2}$/.test(parsed.end || "") ? parsed.end! : addDays(start, 14);
  const rangeDays = Math.round((Date.parse(`${end}T12:00:00Z`) - Date.parse(`${start}T12:00:00Z`)) / 86_400_000);

  if (rangeDays < 1 || rangeDays > 31 || end < today) {
    throw new Error("invalid_availability_range");
  }

  return { start: start < today ? today : start, end, period };
}

function localHour(iso: string, timeZone: string): number {
  const hour = new Intl.DateTimeFormat("en", {
    timeZone,
    hour: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(iso)).find((part) => part.type === "hour")?.value;
  return Number(hour || 0);
}

export function filterSlots(
  slots: CalSlot[],
  constraints: AvailabilityConstraints,
  timeZone: string,
): CalSlot[] {
  return slots.filter((slot) => {
    const localDate = dateInTimeZone(new Date(slot.start), timeZone);
    if (localDate < constraints.start || localDate >= constraints.end) return false;
    const hour = localHour(slot.start, timeZone);
    if (constraints.period === "morning") return hour >= 6 && hour < 12;
    if (constraints.period === "afternoon") return hour >= 12 && hour < 17;
    if (constraints.period === "evening") return hour >= 17 && hour < 22;
    return true;
  }).slice(0, MAX_SLOTS);
}

async function enforceRateLimit(c: BookingContext, kind: "search" | "confirm", userId: string): Promise<boolean> {
  const limiter = kind === "confirm" ? c.env.BOOKING_CONFIRM_RATE_LIMITER : c.env.BOOKING_RATE_LIMITER;
  const ip = c.req.header("cf-connecting-ip") || "local";
  const result = await limiter.limit({ key: `${kind}:${ip}` });
  return result.success;
}

async function loadDraft(c: BookingContext, id: string, sessionId: string, userId: string): Promise<BookingDraftRow | null> {
  return c.env.DB.prepare(
    "SELECT * FROM booking_drafts WHERE id = ? AND session_id = ? AND user_id = ?",
  ).bind(id, sessionId, userId).first<BookingDraftRow>();
}

function parseSlots(value: string): CalSlot[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function validateOwner<T extends { sessionId?: string; userId?: string }>(
  body: T,
): body is T & { sessionId: string; userId: string } {
  return Boolean(
    body.sessionId?.trim() &&
    body.userId?.trim() &&
    body.sessionId.length <= 100 &&
    body.userId.length <= 100,
  );
}

export async function createBookingDraft(c: BookingContext): Promise<Response> {
  try {
    const body = await readJson<{
      sessionId?: string;
      userId?: string;
      timeZone?: string;
      duration?: number;
      preference?: { preset?: string; text?: string };
    }>(c);

    if (!validateOwner(body) || !body.timeZone || !isValidTimeZone(body.timeZone)) {
      return errorResponse(c, "A valid session and timezone are required.");
    }
    if (body.duration !== 15 && body.duration !== 30) {
      return errorResponse(c, "Meeting duration must be 15 or 30 minutes.");
    }
    if (!await enforceRateLimit(c, "search", body.userId)) {
      return errorResponse(c, "Too many availability searches. Please wait a minute.", 429);
    }

    const preset = body.preference?.preset
      ? presetConstraints(body.preference.preset, body.timeZone)
      : null;
    const text = body.preference?.text?.trim();
    const constraints = preset || (text
      ? await interpretAvailability(c.env, text, body.timeZone)
      : presetConstraints("morning", body.timeZone)!);
    if (!preset && !text) constraints.period = "any";

    const allSlots = await getCalSlots(c.env, {
      start: addDays(constraints.start, -1),
      end: addDays(constraints.end, 1),
      duration: body.duration,
      timeZone: body.timeZone,
    });
    const slots = filterSlots(allSlots, constraints, body.timeZone);
    const now = new Date();
    const id = crypto.randomUUID();
    const expiresAt = new Date(now.getTime() + DRAFT_TTL_MS).toISOString();

    await c.env.DB.prepare(
      `INSERT INTO booking_drafts (
        id, session_id, user_id, status, duration_minutes, time_zone,
        availability_constraints, offered_slots, created_at, updated_at, expires_at
      ) VALUES (?, ?, ?, 'selecting_slot', ?, ?, ?, ?, ?, ?, ?)`,
    ).bind(
      id,
      body.sessionId,
      body.userId,
      body.duration,
      body.timeZone,
      JSON.stringify(constraints),
      JSON.stringify(slots),
      now.toISOString(),
      now.toISOString(),
      expiresAt,
    ).run();

    return c.json({ status: "slots_available", draftId: id, expiresAt, timeZone: body.timeZone, slots });
  } catch (error) {
    console.error(JSON.stringify({ message: "booking availability failed", error: error instanceof Error ? error.message : String(error) }));
    if (error instanceof CalApiError) return errorResponse(c, "I couldn't load Andrew's availability right now.", 502);
    if (error instanceof Error && error.message === "ai_budget_exhausted") {
      return errorResponse(c, "Free-text scheduling is unavailable for today. Please use one of the date buttons.", 429);
    }
    if (error instanceof SyntaxError || (error instanceof Error && error.message.startsWith("invalid_"))) {
      return errorResponse(c, "I couldn't understand that date range. Try a day or a week instead.");
    }
    return errorResponse(c, "Unable to search availability.", 500);
  }
}

export async function selectBookingSlot(c: BookingContext): Promise<Response> {
  try {
    const body = await readJson<{ sessionId?: string; userId?: string; start?: string }>(c);
    const draftId = c.req.param("draftId");
    if (!validateOwner(body) || !body.start || !draftId || !Number.isFinite(Date.parse(body.start))) {
      return errorResponse(c, "Missing booking details.");
    }

    const draft = await loadDraft(c, draftId, body.sessionId, body.userId);
    if (!draft) return errorResponse(c, "Booking draft not found.", 404);
    if (draft.expires_at <= new Date().toISOString()) return errorResponse(c, "These times have expired. Search again.", 409);

    const slot = parseSlots(draft.offered_slots).find((candidate) => candidate.start === body.start);
    if (!slot) return errorResponse(c, "That time was not offered for this booking.", 409);

    const selection = await c.env.DB.prepare(
      `UPDATE booking_drafts
       SET status = 'selected', selected_start = ?, selected_end = ?, updated_at = ?
       WHERE id = ? AND session_id = ? AND user_id = ?
       AND status IN ('selecting_slot', 'selected', 'failed') AND expires_at > ?`,
    ).bind(
      slot.start,
      slot.end,
      new Date().toISOString(),
      draft.id,
      body.sessionId,
      body.userId,
      new Date().toISOString(),
    ).run();
    if (!selection.meta.changes) return errorResponse(c, "This booking can no longer be changed.", 409);

    return c.json({ status: "selected", slot });
  } catch (error) {
    console.error(JSON.stringify({ message: "slot selection failed", error: error instanceof Error ? error.message : String(error) }));
    return errorResponse(c, "Unable to select that time.", 500);
  }
}

export async function confirmBooking(c: BookingContext): Promise<Response> {
  try {
    const body = await readJson<{
      sessionId?: string;
      userId?: string;
      idempotencyKey?: string;
      attendee?: { name?: string; email?: string; timeZone?: string };
      purpose?: string;
    }>(c);
    const draftId = c.req.param("draftId");
    if (!validateOwner(body) || !body.idempotencyKey || body.idempotencyKey.length > 100 || !body.attendee || !draftId) {
      return errorResponse(c, "Missing booking confirmation details.");
    }
    if (!await enforceRateLimit(c, "confirm", body.userId)) {
      return errorResponse(c, "Too many booking attempts. Please wait a minute.", 429);
    }

    const name = body.attendee.name?.trim() || "";
    const email = body.attendee.email?.trim().toLowerCase() || "";
    const timeZone = body.attendee.timeZone || "";
    const purpose = body.purpose?.trim() || "";
    if (name.length < 2 || name.length > 100) return errorResponse(c, "Please provide a valid name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return errorResponse(c, "Please provide a valid email address.");
    if (!isValidTimeZone(timeZone)) return errorResponse(c, "Please provide a valid timezone.");
    if (purpose.length > MAX_PURPOSE_LENGTH) return errorResponse(c, "Meeting purpose is too long.");

    const draft = await loadDraft(c, draftId, body.sessionId, body.userId);
    if (!draft) return errorResponse(c, "Booking draft not found.", 404);
    if (draft.status === "confirmed") {
      return c.json({ status: "confirmed", booking: { uid: draft.cal_booking_uid, start: draft.selected_start, end: draft.selected_end, duration: draft.duration_minutes } });
    }
    if (draft.status === "submitting" || draft.status === "unknown") {
      return errorResponse(c, "This booking is already being processed. Check your email before trying again.", 409);
    }
    if (draft.status !== "selected" || !draft.selected_start || !draft.selected_end) {
      return errorResponse(c, "Select an available time before confirming.", 409);
    }
    if (draft.expires_at <= new Date().toISOString()) return errorResponse(c, "These times have expired. Search again.", 409);

    const selectedDate = dateInTimeZone(new Date(draft.selected_start), draft.time_zone);
    const available = await getCalSlots(c.env, {
      start: addDays(selectedDate, -1),
      end: addDays(selectedDate, 2),
      duration: draft.duration_minutes as Duration,
      timeZone: draft.time_zone,
    });
    if (!available.some((slot) => slot.start === draft.selected_start)) {
      return errorResponse(c, "That time is no longer available. Please choose another.", 409);
    }

    const lock = await c.env.DB.prepare(
      `UPDATE booking_drafts
       SET status = 'submitting', idempotency_key = ?, updated_at = ?
       WHERE id = ? AND status = 'selected' AND selected_start = ? AND selected_end = ?`,
    ).bind(
      body.idempotencyKey,
      new Date().toISOString(),
      draft.id,
      draft.selected_start,
      draft.selected_end,
    ).run();
    if (!lock.meta.changes) return errorResponse(c, "This booking is already being processed.", 409);

    try {
      const booking = await createCalBooking(c.env, {
        draftId: draft.id,
        start: draft.selected_start,
        duration: draft.duration_minutes as Duration,
        attendee: { name, email, timeZone },
        purpose: purpose || undefined,
      });
      try {
        await c.env.DB.prepare(
          "UPDATE booking_drafts SET status = 'confirmed', cal_booking_uid = ?, updated_at = ? WHERE id = ?",
        ).bind(booking.uid, new Date().toISOString(), draft.id).run();
      } catch (persistenceError) {
        console.error(JSON.stringify({
          message: "booking confirmed but D1 update failed",
          draftId: draft.id,
          bookingUid: booking.uid,
          error: persistenceError instanceof Error ? persistenceError.message : String(persistenceError),
        }));
      }

      console.log(JSON.stringify({ message: "booking confirmed", draftId: draft.id, duration: draft.duration_minutes }));
      return c.json({ status: "confirmed", booking }, 201);
    } catch (error) {
      const calError = error instanceof CalApiError ? error : new CalApiError("Booking failed.", 502, "booking_failed");
      await c.env.DB.prepare(
        "UPDATE booking_drafts SET status = ?, last_error_code = ?, updated_at = ? WHERE id = ?",
      ).bind(calError.uncertain ? "unknown" : "selected", calError.code, new Date().toISOString(), draft.id).run();
      return errorResponse(c, calError.message, calError.status === 409 ? 409 : 502);
    }
  } catch (error) {
    console.error(JSON.stringify({ message: "booking confirmation failed", error: error instanceof Error ? error.message : String(error) }));
    return errorResponse(c, "Unable to confirm the booking.", 500);
  }
}

export async function cancelBookingDraft(c: BookingContext): Promise<Response> {
  try {
    const body = await readJson<{ sessionId?: string; userId?: string }>(c);
    if (!validateOwner(body)) return errorResponse(c, "Missing booking details.");
    const cancellation = await c.env.DB.prepare(
      "UPDATE booking_drafts SET status = 'cancelled', updated_at = ? WHERE id = ? AND session_id = ? AND user_id = ? AND status IN ('selecting_slot', 'selected', 'failed')",
    ).bind(new Date().toISOString(), c.req.param("draftId"), body.sessionId, body.userId).run();
    if (!cancellation.meta.changes) return errorResponse(c, "This booking can no longer be cancelled here.", 409);
    return c.json({ status: "cancelled" });
  } catch {
    return errorResponse(c, "Unable to cancel the booking draft.", 500);
  }
}
