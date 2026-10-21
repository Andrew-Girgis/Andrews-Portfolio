import { afterEach, describe, expect, it, vi } from "vitest";
import { consumeDailyAiBudget } from "./usage-limits";
import app from "./index";
import { Env } from "./types";

vi.mock("./usage-limits", () => ({
  consumeDailyAiBudget: vi.fn().mockResolvedValue(true),
}));

function fakeDb(firstFor: (sql: string) => unknown) {
  return {
    prepare: (sql: string) => {
      const statement = {
        bind: () => statement,
        first: async () => firstFor(sql),
        all: async () => ({ results: [] }),
        run: async () => ({ meta: { changes: 1 } }),
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
    CHAT_RATE_LIMITER: { limit: async () => ({ success: true }) },
    DB: fakeDb(() => null),
    RAG_DB: fakeDb(() => null),
    ...overrides,
  } as unknown as Env;
}

afterEach(() => {
  vi.mocked(consumeDailyAiBudget).mockClear();
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
    const env = makeEnv({
      DB: fakeDb((sql) => {
        if (sql.includes("FROM chat_sessions")) return { id: "session_1", user_id: "user_1" };
        if (sql.includes("COUNT(*)")) return { count: 10 };
        return null;
      }),
    });

    const response = await app.request("https://sierra-api.andrew-girgis.workers.dev/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatInput: "Hi", sessionId: "session_1", user_id: "user_1" }),
    }, env);

    expect(response.status).toBe(429);
    expect(consumeDailyAiBudget).not.toHaveBeenCalled();
  });
});
