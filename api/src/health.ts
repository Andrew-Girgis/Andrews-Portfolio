import { Context } from "hono";
import { Env } from "./types";

export async function handleHealth(c: Context<{ Bindings: Env }>): Promise<Response> {
  const checks = {
    worker: true,
    d1: false,
    vectorizeBinding: Boolean(c.env.VECTORIZE),
    cohereConfigured: Boolean(c.env.COHERE_API_KEY),
    openaiConfigured: Boolean(c.env.OPENAI_API_KEY),
    langfuseConfigured: Boolean(c.env.LANGFUSE_PUBLIC_KEY && c.env.LANGFUSE_SECRET_KEY && c.env.LANGFUSE_BASE_URL),
  };

  try {
    const result = await c.env.DB.prepare("SELECT 1 AS ok").first<{ ok: number }>();
    checks.d1 = result?.ok === 1;
  } catch (error) {
    console.error("Health check D1 error:", error);
  }

  const healthy = checks.worker && checks.d1 && checks.vectorizeBinding && checks.cohereConfigured && checks.openaiConfigured && checks.langfuseConfigured;

  return c.json(
    {
      status: healthy ? "ok" : "degraded",
      checks,
    },
    healthy ? 200 : 503
  );
}
