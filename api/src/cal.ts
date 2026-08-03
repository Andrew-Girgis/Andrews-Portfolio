import { Env } from "./types";

const CAL_API_BASE = "https://api.cal.com/v2";
const SLOT_API_VERSION = "2024-09-04";
const BOOKING_API_VERSION = "2026-02-25";

export type CalSlot = {
  start: string;
  end: string;
};

export type CalBooking = {
  uid: string;
  status: string;
  start: string;
  end: string;
  duration: number;
  location?: string;
};

export class CalApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code: string,
    readonly uncertain = false,
  ) {
    super(message);
  }
}

function calHeaders(version: string, env: Env): HeadersInit {
  const headers: Record<string, string> = {
    "cal-api-version": version,
    "Content-Type": "application/json",
  };

  const apiKey = env.CAL_API_KEY || env.CAL_COM_API_KEY;
  if (apiKey) {
    headers.Authorization = `Bearer ${apiKey}`;
  }

  return headers;
}

async function parseCalError(response: Response): Promise<CalApiError> {
  let message = "Cal.com could not complete the request.";
  let code = `cal_${response.status}`;

  try {
    const body = await response.json<{ message?: string; error?: { message?: string; code?: string } }>();
    message = body.error?.message || body.message || message;
    code = body.error?.code || code;
  } catch {
    // Keep the sanitized fallback when Cal.com does not return JSON.
  }

  return new CalApiError(message, response.status, code);
}

export async function getCalSlots(
  env: Env,
  input: { start: string; end: string; duration: 15 | 30; timeZone: string },
): Promise<CalSlot[]> {
  const query = new URLSearchParams({
    username: env.CAL_USERNAME,
    eventTypeSlug: env.CAL_EVENT_TYPE_SLUG,
    start: input.start,
    end: input.end,
    duration: String(input.duration),
    timeZone: input.timeZone,
    format: "range",
  });

  const response = await fetch(`${CAL_API_BASE}/slots?${query}`, {
    headers: calHeaders(SLOT_API_VERSION, env),
    signal: AbortSignal.timeout(8_000),
  });

  if (!response.ok) throw await parseCalError(response);

  const body = await response.json<{
    status: string;
    data: Record<string, Array<{ start?: string; end?: string } | string>>;
  }>();

  const slots: CalSlot[] = [];
  for (const entries of Object.values(body.data || {})) {
    for (const entry of entries) {
      const start = typeof entry === "string" ? entry : entry.start;
      if (!start) continue;
      const end = typeof entry === "string"
        ? new Date(new Date(start).getTime() + input.duration * 60_000).toISOString()
        : entry.end || new Date(new Date(start).getTime() + input.duration * 60_000).toISOString();
      slots.push({ start: new Date(start).toISOString(), end: new Date(end).toISOString() });
    }
  }

  return slots.sort((a, b) => a.start.localeCompare(b.start));
}

export async function createCalBooking(
  env: Env,
  input: {
    draftId: string;
    start: string;
    duration: 15 | 30;
    attendee: { name: string; email: string; timeZone: string };
    purpose?: string;
  },
): Promise<CalBooking> {
  const purpose = input.purpose?.trim();
  const payload = {
    eventTypeSlug: env.CAL_EVENT_TYPE_SLUG,
    username: env.CAL_USERNAME,
    start: input.start,
    lengthInMinutes: input.duration,
    attendee: {
      ...input.attendee,
      language: "en",
    },
    ...(purpose
      ? {
        bookingFieldsResponses: { notes: purpose },
        metadata: { source: "sierra", draftId: input.draftId, meetingPurpose: purpose },
      }
      : { metadata: { source: "sierra", draftId: input.draftId } }),
  };

  let response: Response;
  try {
    response = await fetch(`${CAL_API_BASE}/bookings`, {
      method: "POST",
      headers: calHeaders(BOOKING_API_VERSION, env),
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(12_000),
    });
  } catch {
    throw new CalApiError(
      "The booking request was interrupted and may have completed. Check your email before trying again.",
      502,
      "booking_outcome_unknown",
      true,
    );
  }

  if (!response.ok) throw await parseCalError(response);

  let body: { status: string; data: CalBooking };
  try {
    body = await response.json<{ status: string; data: CalBooking }>();
  } catch {
    throw new CalApiError(
      "Cal.com returned an unreadable response. Check your email before trying again.",
      502,
      "booking_outcome_unknown",
      true,
    );
  }
  if (!body.data?.uid) {
    throw new CalApiError("Cal.com returned an invalid booking response.", 502, "invalid_cal_response", true);
  }

  return body.data;
}
