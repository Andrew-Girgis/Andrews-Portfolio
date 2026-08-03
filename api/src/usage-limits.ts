import { Env } from "./types";

export async function consumeDailyAiBudget(
  env: Env,
  operation: "chat" | "booking_parse",
  limit: number,
): Promise<boolean> {
  const now = new Date();
  const usageDate = now.toISOString().slice(0, 10);
  const result = await env.DB.prepare(
    `INSERT INTO ai_usage_daily (usage_date, operation, request_count, updated_at)
     VALUES (?, ?, 1, ?)
     ON CONFLICT (usage_date, operation) DO UPDATE SET
       request_count = request_count + 1,
       updated_at = excluded.updated_at
     WHERE request_count < ?
     RETURNING request_count`,
  ).bind(usageDate, operation, now.toISOString(), limit).first<{ request_count: number }>();

  return Boolean(result && result.request_count <= limit);
}
