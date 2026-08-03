import { Env } from "./types";

type LangfuseEventType = "trace-create" | "span-create" | "generation-create";

type LangfuseEvent = {
  id: string;
  type: LangfuseEventType;
  timestamp: string;
  body: Record<string, unknown>;
};

export type RagMatchTrace = {
  id: string;
  documentId: string;
  title?: string;
  source?: string;
  similarity?: number;
  metadata?: Record<string, unknown>;
};

export type ChatTraceInput = {
  traceId: string;
  sessionId: string;
  userId: string;
  question: string;
  answer: string;
  currentPage?: string;
  pageTitle?: string;
  startTime: string;
  endTime: string;
  ragStartTime?: string;
  ragEndTime?: string;
  generationStartTime?: string;
  generationEndTime?: string;
  model: string;
  promptMessages: Array<{ role: string; content: string }>;
  retrievedMatches: RagMatchTrace[];
  approxUsage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  metadata: Record<string, unknown>;
};

function isLangfuseConfigured(env: Env): boolean {
  return Boolean(env.LANGFUSE_PUBLIC_KEY && env.LANGFUSE_SECRET_KEY && env.LANGFUSE_BASE_URL);
}

function authHeader(env: Env): string {
  return `Basic ${btoa(`${env.LANGFUSE_PUBLIC_KEY}:${env.LANGFUSE_SECRET_KEY}`)}`;
}

function event(type: LangfuseEventType, body: Record<string, unknown>, timestamp = new Date().toISOString()): LangfuseEvent {
  return {
    id: crypto.randomUUID(),
    type,
    timestamp,
    body,
  };
}

export async function traceSierraChat(env: Env, input: ChatTraceInput): Promise<void> {
  if (!isLangfuseConfigured(env)) return;

  const baseUrl = env.LANGFUSE_BASE_URL.replace(/\/$/, "");
  const rootObservationId = crypto.randomUUID();
  const ragObservationId = crypto.randomUUID();
  const generationObservationId = crypto.randomUUID();

  const batch: LangfuseEvent[] = [
    event("trace-create", {
      id: input.traceId,
      timestamp: input.startTime,
      name: "sierra-chat",
      userId: input.userId,
      sessionId: input.sessionId,
      input: { question: input.question, page: input.currentPage, pageTitle: input.pageTitle },
      output: { answer: input.answer },
      release: input.metadata.release,
      version: input.metadata.corpusVersion,
      tags: ["sierra", "portfolio", String(input.metadata.ragBackend || "supabase")],
      metadata: input.metadata,
      environment: input.metadata.environment || "production",
    }, input.startTime),
    event("span-create", {
      id: rootObservationId,
      traceId: input.traceId,
      name: "chat-request",
      startTime: input.startTime,
      endTime: input.endTime,
      input: { question: input.question },
      output: { answer: input.answer },
      metadata: input.metadata,
      environment: input.metadata.environment || "production",
    }, input.startTime),
  ];

  if (input.ragStartTime && input.ragEndTime) {
    batch.push(event("span-create", {
      id: ragObservationId,
      traceId: input.traceId,
      parentObservationId: rootObservationId,
      name: "rag-retrieval",
      startTime: input.ragStartTime,
      endTime: input.ragEndTime,
      input: { query: input.question },
      output: input.retrievedMatches,
      metadata: {
        resultCount: input.retrievedMatches.length,
        retrievedChunkIds: input.retrievedMatches.map((match) => match.id),
      },
      environment: input.metadata.environment || "production",
    }, input.ragStartTime));
  }

  batch.push(event("generation-create", {
    id: generationObservationId,
    traceId: input.traceId,
    parentObservationId: rootObservationId,
    name: "sierra-response",
    startTime: input.generationStartTime || input.startTime,
    endTime: input.generationEndTime || input.endTime,
    model: input.model,
    input: input.promptMessages,
    output: input.answer,
    usage: {
      promptTokens: input.approxUsage.promptTokens,
      completionTokens: input.approxUsage.completionTokens,
      totalTokens: input.approxUsage.totalTokens,
    },
    metadata: {
      retrievedChunkIds: input.retrievedMatches.map((match) => match.id),
      retrievedTitles: input.retrievedMatches.map((match) => match.title).filter(Boolean),
    },
    environment: input.metadata.environment || "production",
  }, input.generationStartTime || input.startTime));

  try {
    const response = await fetch(`${baseUrl}/api/public/ingestion`, {
      method: "POST",
      headers: {
        Authorization: authHeader(env),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ batch }),
    });

    if (!response.ok && response.status !== 207) {
      console.error("Langfuse ingestion error:", response.status, await response.text());
      return;
    }

    if (response.status === 207) {
      const body = await response.text();
      if (body.includes("errors") && !body.includes('"errors":[]')) {
        console.error("Langfuse ingestion partial error:", body);
      }
    }
  } catch (error) {
    console.error("Langfuse tracing failed:", error);
  }
}
