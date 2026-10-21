import { afterEach, describe, expect, it, vi } from "vitest";
import { consumeDailyAiBudget } from "./usage-limits";
import app from "./index";
import { Env } from "./types";

vi.mock("./usage-limits", () => ({
  consumeDailyAiBudget: vi.fn().mockResolvedValue(true),
}));

function fakeDb(firstFor: (sql: string) => unknown, runs: string[] = []) {
  return {
    prepare: (sql: string) => {
      const statement = {
        bind: () => statement,
        first: async () => firstFor(sql),
        all: async () => ({ results: [] }),
        run: async () => {
          runs.push(sql);
          return { meta: { changes: 1 } };
        },
      };
      return statement;
    },
  };
}

function makeEnv(overrides: Record<string, unknown> = {}): Env {
  return {
    ALLOWED_ORIGINS: "https://girg.is,https://www.girg.is",
    RAG_BACKEND: "cloudflare",
    CHAT_DAILY_AI_LIMIT: "200",
    TURNSTILE_SECRET_KEY: "test-secret",
    CHAT_RATE_LIMITER: { limit: async () => ({ success: true }) },
    DB: fakeDb(() => null),
    RAG_DB: fakeDb(() => null),
    ...overrides,
  } as unknown as Env;
}

const PROD_API = "https://sierra-api.andrew-girgis.workers.dev/api";
const owner = { sessionId: "session_1", user_id: "user_1" };

// Session with a recorded Turnstile verification, whose per-user rate limit is already used up.
function verifiedRateLimitedDb(runs: string[] = []) {
  return fakeDb((sql) => {
    if (sql.includes("FROM verified_sessions")) return { ok: 1 };
    if (sql.includes("FROM chat_sessions")) return { id: "session_1", user_id: "user_1" };
    if (sql.includes("COUNT(*)")) return { count: 10 };
    return null;
  }, runs);
}

function stubSiteverify(result: Record<string, unknown>) {
  const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify(result), { status: 200 }));
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

function postChat(env: Env, headers: Record<string, string> = {}) {
  return app.request(`${PROD_API}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify({ chatInput: "Hi", ...owner }),
  }, env);
}

afterEach(() => {
  vi.mocked(consumeDailyAiBudget).mockClear();
  vi.unstubAllGlobals();
});

describe("CORS", () => {
  it("rejects localhost origins in production", async () => {
    const response = await app.request("https://sierra-api.andrew-girgis.workers.dev/api/health", {
      method: "OPTIONS",
      headers: { Origin: "http://localhost:4567", "Access-Control-Request-Method": "GET" },
    }, makeEnv());

    expect(response.headers.get("access-control-allow-origin")).toBe("https://girg.is");
  });

  it("accepts any localhost origin while running under wrangler dev", async () => {
    const response = await app.request("http://localhost:8788/api/health", {
      method: "OPTIONS",
      headers: { Origin: "http://localhost:4567", "Access-Control-Request-Method": "GET" },
    }, makeEnv());

    expect(response.headers.get("access-control-allow-origin")).toBe("http://localhost:4567");
  });

  it("accepts configured production origins", async () => {
    const response = await app.request("https://sierra-api.andrew-girgis.workers.dev/api/health", {
      method: "OPTIONS",
      headers: { Origin: "https://www.girg.is", "Access-Control-Request-Method": "GET" },
    }, makeEnv());

    expect(response.headers.get("access-control-allow-origin")).toBe("https://www.girg.is");
  });
});

describe("health", () => {
  it("only reports status publicly", async () => {
    const response = await app.request("https://sierra-api.andrew-girgis.workers.dev/api/health", {}, makeEnv());

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ status: "degraded" });
  });
});

describe("chat daily budget", () => {
  it("is not charged when the per-user rate limit rejects the request", async () => {
    const response = await postChat(makeEnv({ DB: verifiedRateLimitedDb() }));

    expect(response.status).toBe(429);
    expect(consumeDailyAiBudget).not.toHaveBeenCalled();
  });
});

describe("chat session creation", () => {
  function newSessionDb(recentCount: number, runs: string[]) {
    return fakeDb((sql) => {
      if (sql.includes("FROM verified_sessions")) return { ok: 1 };
      if (sql.includes("COUNT(*)")) return { count: recentCount };
      return null;
    }, runs);
  }

  function postNewSessionChat(env: Env) {
    return app.request("https://sierra-api.andrew-girgis.workers.dev/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatInput: "Hi", sessionId: "session_new", user_id: "user_1" }),
    }, env);
  }

  it("does not store a new session when the per-user rate limit rejects the request", async () => {
    const runs: string[] = [];
    const response = await postNewSessionChat(makeEnv({ DB: newSessionDb(10, runs) }));

    expect(response.status).toBe(429);
    expect(runs.some((sql) => sql.includes("INSERT INTO chat_sessions"))).toBe(false);
  });

  it("does not store a new session when the daily budget is exhausted", async () => {
    vi.mocked(consumeDailyAiBudget).mockResolvedValueOnce(false);
    const runs: string[] = [];
    const response = await postNewSessionChat(makeEnv({ DB: newSessionDb(0, runs) }));

    expect(response.status).toBe(429);
    expect(runs.some((sql) => sql.includes("INSERT INTO chat_sessions"))).toBe(false);
  });
});

describe("Turnstile", () => {
  it("rejects chat from a session that has not been verified", async () => {
    const response = await postChat(makeEnv());

    expect(response.status).toBe(403);
    expect(await response.json()).toMatchObject({ code: "turnstile_required" });
    expect(consumeDailyAiBudget).not.toHaveBeenCalled();
  });

  it("verifies a token with siteverify and records the session", async () => {
    const fetchMock = stubSiteverify({ success: true, action: "sierra", hostname: "girg.is" });
    const runs: string[] = [];
    const db = verifiedRateLimitedDb(runs);

    const response = await postChat(makeEnv({ DB: db }), { "X-Turnstile-Token": "token-1" });

    // Gets past the Turnstile check and stops at the per-user rate limit.
    expect(response.status).toBe(429);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      expect.objectContaining({ method: "POST" }),
    );
    expect(runs.some((sql) => sql.includes("INSERT INTO verified_sessions"))).toBe(true);
  });

  it("rejects tokens issued for another hostname", async () => {
    stubSiteverify({ success: true, action: "sierra", hostname: "evil.example" });

    const response = await postChat(makeEnv(), { "X-Turnstile-Token": "token-1" });

    expect(response.status).toBe(403);
    expect(await response.json()).toMatchObject({ code: "turnstile_failed" });
  });

  it("rejects tokens issued for another action", async () => {
    stubSiteverify({ success: true, action: "login", hostname: "girg.is" });

    const response = await postChat(makeEnv(), { "X-Turnstile-Token": "token-1" });

    expect(response.status).toBe(403);
  });

  it("fails closed when the secret is not configured", async () => {
    const fetchMock = stubSiteverify({ success: true, action: "sierra", hostname: "girg.is" });

    const response = await postChat(makeEnv({ TURNSTILE_SECRET_KEY: undefined }), { "X-Turnstile-Token": "token-1" });

    expect(response.status).toBe(403);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("requires a fresh token to confirm a booking, even on a verified session", async () => {
    const response = await app.request(`${PROD_API}/booking/drafts/draft_1/confirm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: "session_1", userId: "user_1", idempotencyKey: "key" }),
    }, makeEnv({ DB: verifiedRateLimitedDb() }));

    expect(response.status).toBe(403);
    expect(await response.json()).toMatchObject({ code: "turnstile_required" });
  });

  it("lets booking searches through on a verified session", async () => {
    const response = await app.request(`${PROD_API}/booking/drafts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: "session_1", userId: "user_1" }),
    }, makeEnv({ DB: verifiedRateLimitedDb() }));

    // Reaches the booking handler, which rejects the missing timezone.
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "A valid session and timezone are required." });
  });
});
