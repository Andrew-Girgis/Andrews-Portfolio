import { Context, MiddlewareHandler } from "hono";
import { Env } from "./types";

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TURNSTILE_ACTION = "sierra";
const TURNSTILE_HEADER = "X-Turnstile-Token";
const VERIFIED_SESSION_TTL_MS = 2 * 60 * 60_000;
const MAX_TOKEN_LENGTH = 2048;
const MAX_ID_LENGTH = 100;

type SiteverifyResponse = {
  success: boolean;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

export function isLocalRequest(url: string): boolean {
  const { hostname } = new URL(url);
  return hostname === "localhost" || hostname === "127.0.0.1";
}

function allowedHostnames(env: Env): string[] {
  return env.ALLOWED_ORIGINS
    .split(",")
    .map((origin) => {
      try {
        return new URL(origin.trim()).hostname;
      } catch {
        return "";
      }
    })
    .filter(Boolean);
}

export async function verifyTurnstileToken(
  c: Context<{ Bindings: Env }>,
  token: string,
): Promise<boolean> {
  if (!c.env.TURNSTILE_SECRET_KEY) {
    console.error("TURNSTILE_SECRET_KEY is not configured; rejecting request.");
    return false;
  }
  if (token.length > MAX_TOKEN_LENGTH) return false;

  const body = new FormData();
  body.append("secret", c.env.TURNSTILE_SECRET_KEY);
  body.append("response", token);
  const ip = c.req.header("cf-connecting-ip");
  if (ip) body.append("remoteip", ip);

  try {
    const response = await fetch(SITEVERIFY_URL, { method: "POST", body });
    const result = await response.json() as SiteverifyResponse;
    if (!result.success) {
      console.warn("Turnstile verification failed", JSON.stringify(result["error-codes"] || []));
      return false;
    }
    // Cloudflare's local test keys don't report a real hostname or action, so only check them in production.
    if (isLocalRequest(c.req.url)) return true;
    if (result.action !== TURNSTILE_ACTION) {
      console.warn("Turnstile action mismatch", result.action);
      return false;
    }
    if (!result.hostname || !allowedHostnames(c.env).includes(result.hostname)) {
      console.warn("Turnstile hostname mismatch", result.hostname);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Turnstile siteverify request failed:", error);
    return false;
  }
}

async function markSessionVerified(env: Env, sessionId: string, userId: string): Promise<void> {
  const now = new Date();
  await env.DB.prepare(
    `INSERT INTO verified_sessions (session_id, user_id, verified_until, updated_at)
     VALUES (?, ?, ?, ?)
     ON CONFLICT (session_id, user_id) DO UPDATE SET
       verified_until = excluded.verified_until,
       updated_at = excluded.updated_at`,
  ).bind(
    sessionId,
    userId,
    new Date(now.getTime() + VERIFIED_SESSION_TTL_MS).toISOString(),
    now.toISOString(),
  ).run();
}

async function isSessionVerified(env: Env, sessionId: string, userId: string): Promise<boolean> {
  const row = await env.DB.prepare(
    "SELECT 1 AS ok FROM verified_sessions WHERE session_id = ? AND user_id = ? AND verified_until > ?",
  ).bind(sessionId, userId, new Date().toISOString()).first<{ ok: number }>();
  return row?.ok === 1;
}

/**
 * Requires that a request comes from a browser that passed Turnstile.
 * A valid X-Turnstile-Token header verifies the chat session for two hours; later requests
 * on that session pass without a token. With `fresh: true` a new token is required every time.
 */
export function requireHuman(options: { fresh?: boolean } = {}): MiddlewareHandler<{ Bindings: Env }> {
  return async (c, next) => {
    const body = await c.req.json<{ sessionId?: unknown; userId?: unknown; user_id?: unknown }>().catch(() => null);
    const sessionId = body?.sessionId;
    const userId = body?.userId ?? body?.user_id;
    if (
      typeof sessionId !== "string" || typeof userId !== "string" ||
      !sessionId.trim() || !userId.trim() ||
      sessionId.length > MAX_ID_LENGTH || userId.length > MAX_ID_LENGTH
    ) {
      return c.json({ error: "A valid session is required." }, 400);
    }

    const token = c.req.header(TURNSTILE_HEADER);
    if (token) {
      if (!await verifyTurnstileToken(c, token)) {
        return c.json({ error: "Verification failed. Please try again.", code: "turnstile_failed" }, 403);
      }
      try {
        await markSessionVerified(c.env, sessionId, userId);
      } catch (error) {
        console.error("Unable to record verified session:", error);
      }
      return next();
    }

    if (!options.fresh) {
      try {
        if (await isSessionVerified(c.env, sessionId, userId)) return next();
      } catch (error) {
        console.error("Unable to check verified session:", error);
      }
    }

    return c.json({ error: "Please complete the verification check to continue.", code: "turnstile_required" }, 403);
  };
}
