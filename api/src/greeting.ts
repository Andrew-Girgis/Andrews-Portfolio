import { Context } from "hono";
import { Env, GreetingResponse } from "./types";
import { getOpenAI } from "./openai";
import { GREETING_SYSTEM_PROMPT } from "./system-prompt";

const CACHE_DURATION = 15 * 60;

function getCacheKey(): string {
  const now = new Date();
  const torontoOffset = getTorontoOffset(now);
  const torontoTime = new Date(now.getTime() + torontoOffset * 60000);
  const yyyy = torontoTime.getUTCFullYear();
  const mm = String(torontoTime.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(torontoTime.getUTCDate()).padStart(2, "0");
  const hh = String(torontoTime.getUTCHours()).padStart(2, "0");
  return `greeting:${yyyy}-${mm}-${dd}:${hh}`;
}

function getTorontoOffset(now: Date): number {
  const jan = new Date(now.getUTCFullYear(), 0, 1);
  const jul = new Date(now.getUTCFullYear(), 6, 1);
  const janOffset = -5 * 60 - (isDST(jan) ? 0 : 60);
  const julOffset = -4 * 60;
  const standardOffset = -5 * 60;
  const daylightOffset = -4 * 60;
  const isDaylight = isDST(now);
  return isDaylight ? daylightOffset : standardOffset;
}

function isDST(date: Date): boolean {
  const year = date.getUTCFullYear();
  const marchSecondSunday = getNthDayOfMonth(year, 2, 0, 2);
  const novemberFirstSunday = getNthDayOfMonth(year, 10, 0, 1);
  const timestamp = date.getTime();
  return timestamp >= marchSecondSunday && timestamp < novemberFirstSunday;
}

function getNthDayOfMonth(year: number, month: number, day: number, n: number): number {
  const first = new Date(year, month, 1);
  const firstDay = first.getDay();
  const offset = (day - firstDay + 7) % 7;
  return new Date(year, month, 1 + offset + (n - 1) * 7).getTime();
}

function formatTorontoTime(): string {
  const now = new Date();
  const torontoOffset = getTorontoOffset(now);
  const torontoTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + torontoOffset * 60000);
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const yyyy = torontoTime.getFullYear();
  const mm = String(torontoTime.getMonth() + 1).padStart(2, "0");
  const dd = String(torontoTime.getDate()).padStart(2, "0");
  const hh = String(torontoTime.getHours()).padStart(2, "0");
  const min = String(torontoTime.getMinutes()).padStart(2, "0");
  const weekday = days[torontoTime.getDay()];
  return `${yyyy}-${mm}-${dd}, ${hh}:${min}, ${weekday}`;
}

async function getHoliday(): Promise<string> {
  try {
    const year = new Date().getFullYear();
    const response = await fetch(`https://date.nager.at/api/v3/publicholidays/${year}/CA`);
    if (!response.ok) return "";
    const holidays = await response.json() as Array<{ date: string; name: string }>;
    const now = new Date();
    const torontoOffset = getTorontoOffset(now);
    const torontoTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + torontoOffset * 60000);
    const today = `${torontoTime.getFullYear()}-${String(torontoTime.getMonth() + 1).padStart(2, "0")}-${String(torontoTime.getDate()).padStart(2, "0")}`;
    const todayHoliday = holidays.find((h) => h.date === today);
    return todayHoliday ? `today is ${todayHoliday.name}` : "";
  } catch {
    return "";
  }
}

export async function handleGreeting(c: Context<{ Bindings: Env }>): Promise<Response> {
  const cacheKey = getCacheKey();

  try {
    const cached = await c.env.GREETING_CACHE.get(cacheKey);
    if (cached) {
      return c.json({ text: cached } as GreetingResponse);
    }
  } catch {
    // KV miss, continue
  }

  if (!c.env.OPENAI_API_KEY) {
    return c.json({ text: "Welcome!" } as GreetingResponse);
  }

  try {
    const timeInfo = formatTorontoTime();
    const holiday = await getHoliday();
    const userContent = holiday ? `${timeInfo}, ${holiday}` : timeInfo;

    const openai = getOpenAI(c.env);
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: GREETING_SYSTEM_PROMPT },
        { role: "user", content: userContent },
      ],
      max_tokens: 15,
    });

    const greeting = completion.choices[0]?.message?.content?.trim() || "Welcome!";

    try {
      await c.env.GREETING_CACHE.put(cacheKey, greeting, { expirationTtl: CACHE_DURATION });
    } catch {
      // Cache write failure is non-critical
    }

    return c.json({ text: greeting } as GreetingResponse);
  } catch (error) {
    console.error("Greeting error:", error);
    return c.json({ text: "Welcome!" } as GreetingResponse);
  }
}