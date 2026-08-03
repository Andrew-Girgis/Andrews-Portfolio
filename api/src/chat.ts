import { Context } from "hono";
import { Env, ChatRequest, DocumentMatch } from "./types";
import { getSupabase } from "./supabase";
import { getOpenAI } from "./openai";
import { buildSystemPrompt } from "./system-prompt";
import { RagMatchTrace, traceSierraChat } from "./langfuse";
import { consumeDailyAiBudget } from "./usage-limits";

const BOOKING_KEYWORDS = ["book", "appointment", "meeting", "schedule", "calendar"];
const SUPABASE_RAG_TOP_K = 5;
const SUPABASE_RAG_MATCH_THRESHOLD = 0.3;
const CLOUDFLARE_RAG_TOP_K = 5;
const MAX_INPUT_CHARS = 2000;
const RATE_LIMIT_MESSAGES = 10;
const RATE_LIMIT_WINDOW_MS = 60_000;
const SESSION_MESSAGE_LIMIT = 50;
const RECENT_MESSAGE_LIMIT = 50;
const SUMMARY_SOURCE_LIMIT = 50;
const SUMMARY_CHAR_LIMIT = 1800;
const CLIENT_FALLBACK_HISTORY_LIMIT = 20;

type ChatRole = "user" | "assistant" | "system";
type ChatHistoryMessage = { role: "user" | "assistant"; content: string };
type ChatContext = {
  messages: ChatHistoryMessage[];
  summary: string;
  totalUserMessages: number;
  degraded: boolean;
};
type LimitResult = { allowed: true } | { allowed: false; status: number; message: string };
type RagBackend = "supabase" | "cloudflare";
type RagRetrievalResult = {
  context: string;
  matches: RagMatchTrace[];
  backend: RagBackend;
  corpusVersion: string;
  embeddingModel: string;
  embeddingDimension: number;
  vectorIndex: string;
  topK: number;
  matchThreshold: number | null;
};
type CloudflareChunkRow = {
  id: string;
  document_id: string;
  source: string;
  title: string | null;
  content: string;
  metadata: string;
};
type D1ChatMessageRow = { role: string; content: string; created_at?: string };

function detectBookingIntent(text: string): boolean {
  const lower = text.toLowerCase();
  if (lower.includes("[book_meeting]")) return true;
  return BOOKING_KEYWORDS.some((kw) => lower.includes(kw));
}

function isDirectBookingRequest(text: string): boolean {
  const lower = text.toLowerCase();
  return /\b(book|schedule|appointment|calendar)\b/.test(lower) ||
    /\b(contact|connect|get in touch|meet with|speak with|talk (?:to|with))\b/.test(lower);
}

function directBookingResponse(): Response {
  const content = "I can help you schedule time with Andrew.";
  const body = [
    `data: ${JSON.stringify({ type: "token", content })}`,
    `data: ${JSON.stringify({ type: "done", bookingIntent: true })}`,
    "",
  ].join("\n\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

function normalizeMessage(text: string): string {
  return text.trim().replace(/\s+/g, " ").toLowerCase();
}

function approximateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

function formatSupabaseError(context: string, error: unknown): void {
  if (error) {
    console.error(`${context}:`, JSON.stringify(error));
  }
}

function emptyRagResult(backend: RagBackend): RagRetrievalResult {
  return backend === "cloudflare"
    ? {
      context: "",
      matches: [],
      backend,
      corpusVersion: "cloudflare-cohere-1024-v1",
      embeddingModel: "cohere/embed-v4.0",
      embeddingDimension: 1024,
      vectorIndex: "sierra-knowledge",
      topK: CLOUDFLARE_RAG_TOP_K,
      matchThreshold: null,
    }
    : {
      context: "",
      matches: [],
      backend,
      corpusVersion: "supabase-openai-1536",
      embeddingModel: "openai/text-embedding-3-small",
      embeddingDimension: 1536,
      vectorIndex: "supabase/document_chunks",
      topK: SUPABASE_RAG_TOP_K,
      matchThreshold: SUPABASE_RAG_MATCH_THRESHOLD,
    };
}

function safeJsonObject(text: string | null): Record<string, unknown> {
  if (!text) return {};
  try {
    const parsed = JSON.parse(text);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function shouldUseCloudflareStorage(env: Env): boolean {
  return env.RAG_BACKEND === "cloudflare";
}

async function ensureSession(env: Env, sessionId: string, userId: string): Promise<void> {
  if (shouldUseCloudflareStorage(env)) {
    const existing = await env.DB
      .prepare("SELECT id, user_id FROM chat_sessions WHERE id = ?")
      .bind(sessionId)
      .first<{ id: string; user_id: string }>();

    if (existing && existing.user_id !== userId) {
      throw new Error("Chat session does not belong to this user");
    }

    if (!existing) {
      await env.DB
        .prepare("INSERT INTO chat_sessions (id, user_id, start_time) VALUES (?, ?, ?)")
        .bind(sessionId, userId, new Date().toISOString())
        .run();
    }
    return;
  }

  const supabase = getSupabase(env);
  const { data, error } = await supabase
    .from("chat_sessions")
    .select("id,user_id")
    .eq("id", sessionId)
    .single();

  if (error && error.code !== "PGRST116") {
    formatSupabaseError("Supabase ensureSession select error", error);
    throw new Error("Unable to load chat session");
  }

  if (!data) {
    const { error: insertError } = await supabase.from("chat_sessions").insert({
      id: sessionId,
      user_id: userId,
      start_time: new Date().toISOString(),
    });

    if (insertError) {
      formatSupabaseError("Supabase ensureSession insert error", insertError);
      throw new Error("Unable to create chat session");
    }
  } else if (data.user_id !== userId) {
    throw new Error("Chat session does not belong to this user");
  }
}

async function storeMessage(
  env: Env,
  sessionId: string,
  userId: string,
  role: "user" | "assistant" | "system",
  content: string,
  metadata: Record<string, unknown>
): Promise<void> {
  if (shouldUseCloudflareStorage(env)) {
    await env.DB
      .prepare("INSERT INTO chat_messages (session_id, user_id, role, content, metadata, created_at) VALUES (?, ?, ?, ?, ?, ?)")
      .bind(sessionId, userId, role, content, JSON.stringify(metadata), new Date().toISOString())
      .run();
    return;
  }

  const supabase = getSupabase(env);
  const { error } = await supabase.from("chat_messages").insert({
    session_id: sessionId,
    user_id: userId,
    role,
    content,
    metadata,
  });

  if (error) {
    formatSupabaseError("Supabase storeMessage error", error);
    throw new Error("Unable to store chat message");
  }
}

async function storeUsageEstimate(
  env: Env,
  sessionId: string,
  userId: string,
  metadata: Record<string, unknown>
): Promise<void> {
  try {
    await storeMessage(env, sessionId, userId, "system", "usage_estimate", metadata);
  } catch (error) {
    console.error("Supabase storeUsageEstimate error:", error);
  }
}

async function countMessages(
  env: Env,
  filters: { sessionId?: string; userId?: string; since?: string; role?: ChatRole }
): Promise<number> {
  if (shouldUseCloudflareStorage(env)) {
    const clauses: string[] = [];
    const bindings: string[] = [];
    if (filters.sessionId) {
      clauses.push("session_id = ?");
      bindings.push(filters.sessionId);
    }
    if (filters.userId) {
      clauses.push("user_id = ?");
      bindings.push(filters.userId);
    }
    if (filters.role) {
      clauses.push("role = ?");
      bindings.push(filters.role);
    }
    if (filters.since) {
      clauses.push("created_at >= ?");
      bindings.push(filters.since);
    }

    const where = clauses.length ? ` WHERE ${clauses.join(" AND ")}` : "";
    const row = await env.DB
      .prepare(`SELECT COUNT(*) AS count FROM chat_messages${where}`)
      .bind(...bindings)
      .first<{ count: number }>();
    return row?.count || 0;
  }

  const supabase = getSupabase(env);
  let query = supabase
    .from("chat_messages")
    .select("id", { count: "exact", head: true });

  if (filters.sessionId) query = query.eq("session_id", filters.sessionId);
  if (filters.userId) query = query.eq("user_id", filters.userId);
  if (filters.role) query = query.eq("role", filters.role);
  if (filters.since) query = query.gte("created_at", filters.since);

  const { count, error } = await query;

  if (error) {
    formatSupabaseError("Supabase countMessages error", error);
    throw new Error("Unable to count chat messages");
  }

  return count || 0;
}

async function loadRecentUserMessages(
  env: Env,
  sessionId: string,
  limit: number
): Promise<string[]> {
  if (shouldUseCloudflareStorage(env)) {
    const { results } = await env.DB
      .prepare("SELECT content FROM chat_messages WHERE session_id = ? AND role = 'user' ORDER BY created_at DESC LIMIT ?")
      .bind(sessionId, limit)
      .all<{ content: string }>();
    return (results || []).map((row) => row.content);
  }

  const supabase = getSupabase(env);
  const { data, error } = await supabase
    .from("chat_messages")
    .select("content")
    .eq("session_id", sessionId)
    .eq("role", "user")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    formatSupabaseError("Supabase loadRecentUserMessages error", error);
    throw new Error("Unable to load recent user messages");
  }

  return (data || []).map((row: { content: string }) => row.content);
}

async function enforceChatLimits(env: Env, sessionId: string, userId: string, chatInput: string): Promise<LimitResult> {
  if (chatInput.length > MAX_INPUT_CHARS) {
    return {
      allowed: false,
      status: 400,
      message: `Please keep messages under ${MAX_INPUT_CHARS.toLocaleString()} characters.`,
    };
  }

  const oneMinuteAgo = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
  const recentUserCount = await countMessages(env, {
    userId,
    role: "user",
    since: oneMinuteAgo,
  });

  if (recentUserCount >= RATE_LIMIT_MESSAGES) {
    return {
      allowed: false,
      status: 429,
      message: "Sierra is getting a lot of requests right now. Please wait a moment and try again.",
    };
  }

  const sessionUserCount = await countMessages(env, {
    sessionId,
    role: "user",
  });

  if (sessionUserCount >= SESSION_MESSAGE_LIMIT) {
    return {
      allowed: false,
      status: 429,
      message: "This chat has reached its message limit. Please refresh the page to start a new Sierra session.",
    };
  }

  const recentMessages = await loadRecentUserMessages(env, sessionId, 3);
  const normalizedInput = normalizeMessage(chatInput);
  if (recentMessages.length >= 2 && recentMessages.slice(0, 2).every((message) => normalizeMessage(message) === normalizedInput)) {
    return {
      allowed: false,
      status: 429,
      message: "Please avoid sending the same message repeatedly.",
    };
  }

  return { allowed: true };
}

function buildSummaryFromMessages(messages: ChatHistoryMessage[]): string {
  if (messages.length === 0) return "";

  const summary = messages
    .map((message) => `${message.role === "user" ? "User" : "Sierra"}: ${message.content}`)
    .join("\n");

  return summary.length > SUMMARY_CHAR_LIMIT
    ? `${summary.slice(0, SUMMARY_CHAR_LIMIT).trim()}...`
    : summary;
}

async function loadChatContext(
  env: Env,
  sessionId: string,
  fallbackHistory: ChatHistoryMessage[] = []
): Promise<ChatContext> {
  if (shouldUseCloudflareStorage(env)) {
    const { results: recentData } = await env.DB
      .prepare("SELECT role, content, created_at FROM chat_messages WHERE session_id = ? AND role IN ('user', 'assistant') ORDER BY created_at DESC LIMIT ?")
      .bind(sessionId, RECENT_MESSAGE_LIMIT)
      .all<D1ChatMessageRow>();

    const recentMessages = (recentData || [])
      .reverse()
      .map((row) => ({
        role: row.role as "user" | "assistant",
        content: row.content,
      }));

    const { results: summaryData } = await env.DB
      .prepare("SELECT role, content, created_at FROM chat_messages WHERE session_id = ? AND role IN ('user', 'assistant') ORDER BY created_at DESC LIMIT ? OFFSET ?")
      .bind(sessionId, SUMMARY_SOURCE_LIMIT, RECENT_MESSAGE_LIMIT)
      .all<D1ChatMessageRow>();

    const olderMessages = (summaryData || [])
      .reverse()
      .map((row) => ({
        role: row.role as "user" | "assistant",
        content: row.content,
      }));

    return {
      messages: recentMessages,
      summary: buildSummaryFromMessages(olderMessages),
      totalUserMessages: recentMessages.filter((message) => message.role === "user").length,
      degraded: false,
    };
  }

  const supabase = getSupabase(env);
  const { data: recentData, error: recentError } = await supabase
    .from("chat_messages")
    .select("role, content, created_at")
    .eq("session_id", sessionId)
    .in("role", ["user", "assistant"])
    .order("created_at", { ascending: false })
    .limit(RECENT_MESSAGE_LIMIT);

  if (recentError) {
    formatSupabaseError("Supabase loadChatContext recent error", recentError);

    const fallback = fallbackHistory
      .filter((message) => message.content.trim())
      .slice(-CLIENT_FALLBACK_HISTORY_LIMIT);

    return {
      messages: fallback,
      summary: fallback.length > CLIENT_FALLBACK_HISTORY_LIMIT / 2 ? "Conversation history recovered from the current browser session because server-side memory was unavailable." : "",
      totalUserMessages: fallback.filter((message) => message.role === "user").length,
      degraded: true,
    };
  }

  const recentMessages = (recentData || [])
    .reverse()
    .map((row: { role: string; content: string }) => ({
      role: row.role as "user" | "assistant",
      content: row.content,
    }));

  const totalUserMessages = recentMessages.filter((message) => message.role === "user").length;

  const { data: summaryData, error: summaryError } = await supabase
    .from("chat_messages")
    .select("role, content, created_at")
    .eq("session_id", sessionId)
    .in("role", ["user", "assistant"])
    .order("created_at", { ascending: false })
    .range(RECENT_MESSAGE_LIMIT, RECENT_MESSAGE_LIMIT + SUMMARY_SOURCE_LIMIT - 1);

  if (summaryError) {
    formatSupabaseError("Supabase loadChatContext summary error", summaryError);
  }

  const olderMessages = (summaryData || [])
    .reverse()
    .map((row: { role: string; content: string }) => ({
      role: row.role as "user" | "assistant",
      content: row.content,
    }));

  return {
    messages: recentMessages,
    summary: buildSummaryFromMessages(olderMessages),
    totalUserMessages,
    degraded: false,
  };
}

function sanitizeClientHistory(history: ChatRequest["history"]): ChatHistoryMessage[] {
  if (!history) return [];

  return history
    .filter((message) =>
      (message.role === "user" || message.role === "assistant") &&
      typeof message.content === "string" &&
      message.content.trim().length > 0
    )
    .slice(-CLIENT_FALLBACK_HISTORY_LIMIT)
    .map((message) => ({
      role: message.role,
      content: message.content.slice(0, MAX_INPUT_CHARS),
    }));
}

async function embedCohereQuery(env: Env, query: string): Promise<number[] | null> {
  try {
    const response = await fetch("https://api.cohere.com/v2/embed", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        texts: [query],
        model: "embed-v4.0",
        input_type: "search_query",
        output_dimension: 1024,
        embedding_types: ["float"],
      }),
    });

    if (!response.ok) {
      console.error("Cohere query embedding error:", response.status, await response.text());
      return null;
    }

    const data = await response.json() as { embeddings?: { float?: number[][] } };
    return data.embeddings?.float?.[0] || null;
  } catch (error) {
    console.error("Cohere query embedding failed:", error);
    return null;
  }
}

async function retrieveRelevantDocsFromCloudflare(
  env: Env,
  query: string
): Promise<RagRetrievalResult> {
  const empty = emptyRagResult("cloudflare");
  const embedding = await embedCohereQuery(env, query);
  if (!embedding) return empty;

  try {
    const vectorResults = await env.VECTORIZE.query(embedding, {
      topK: CLOUDFLARE_RAG_TOP_K,
      returnMetadata: true,
    });
    const vectorMatches = vectorResults.matches || [];
    const ids = vectorMatches.map((match) => match.id).filter(Boolean);
    if (ids.length === 0) return empty;

    const placeholders = ids.map(() => "?").join(", ");
    const { results } = await env.DB
      .prepare(`SELECT id, document_id, source, title, content, metadata FROM document_chunks WHERE id IN (${placeholders})`)
      .bind(...ids)
      .all<CloudflareChunkRow>();

    const chunksById = new Map((results || []).map((row) => [row.id, row]));
    const orderedChunks = vectorMatches
      .map((match) => ({ match, chunk: chunksById.get(match.id) }))
      .filter((item): item is { match: typeof vectorMatches[number]; chunk: CloudflareChunkRow } => Boolean(item.chunk));

    if (orderedChunks.length === 0) return empty;

    console.log(`RAG cloudflare: ${orderedChunks.length} results, top score: ${orderedChunks[0]?.match.score?.toFixed(3)}`);

    const matches = orderedChunks.map(({ match, chunk }) => {
      const metadata = safeJsonObject(chunk.metadata);
      return {
        id: chunk.id,
        documentId: chunk.document_id,
        title: chunk.title || (typeof metadata.title === "string" ? metadata.title : undefined),
        source: chunk.source || (typeof metadata.source === "string" ? metadata.source : undefined),
        similarity: match.score,
        metadata,
      };
    });

    const context = orderedChunks
      .map(({ match, chunk }, i) => `[Result ${i + 1}] (similarity: ${(match.score || 0).toFixed(3)})\n${chunk.content}`)
      .join("\n\n");

    return { ...empty, context, matches };
  } catch (error) {
    console.error("Cloudflare RAG retrieval error:", error);
    return empty;
  }
}

async function retrieveRelevantDocsFromSupabase(
  env: Env,
  query: string
): Promise<RagRetrievalResult> {
  const empty = emptyRagResult("supabase");
  const openai = getOpenAI(env);
  const supabase = getSupabase(env);

  let embeddingResponse;
  try {
    embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: query,
    });
  } catch (err) {
    console.error("Embedding creation error:", err);
    return empty;
  }

  const queryEmbedding = embeddingResponse.data[0].embedding;

  const { data, error } = await supabase.rpc("match_documents", {
    query_embedding: JSON.stringify(queryEmbedding),
    match_count: SUPABASE_RAG_TOP_K,
    match_threshold: SUPABASE_RAG_MATCH_THRESHOLD,
  });

  if (error) {
    console.error("RAG retrieval error:", JSON.stringify(error));
  }
  if (!data || data.length === 0) {
    return empty;
  }

  console.log(`RAG supabase: ${data.length} results, top similarity: ${(data as DocumentMatch[])[0]?.similarity?.toFixed(3)}`);

  const matches = (data as DocumentMatch[]).map((doc) => ({
    id: doc.id,
    documentId: doc.document_id,
    title: typeof doc.metadata?.title === "string" ? doc.metadata.title : undefined,
    source: typeof doc.metadata?.source === "string" ? doc.metadata.source : undefined,
    similarity: doc.similarity,
    metadata: doc.metadata,
  }));

  const context = (data as DocumentMatch[])
    .map((doc, i) => `[Result ${i + 1}] (similarity: ${doc.similarity.toFixed(3)})\n${doc.content}`)
    .join("\n\n");

  return { ...empty, context, matches };
}

async function retrieveRelevantDocs(
  env: Env,
  query: string
): Promise<RagRetrievalResult> {
  const preferredBackend = env.RAG_BACKEND === "cloudflare" ? "cloudflare" : "supabase";
  const primary = preferredBackend === "cloudflare"
    ? await retrieveRelevantDocsFromCloudflare(env, query)
    : await retrieveRelevantDocsFromSupabase(env, query);

  if (primary.context || preferredBackend === "supabase") return primary;

  if (!env.SUPABASE_SECRET_KEY) {
    console.warn("Cloudflare RAG returned no context and Supabase fallback is not configured.");
    return primary;
  }

  console.warn("Cloudflare RAG returned no context; falling back to Supabase RAG.");
  return retrieveRelevantDocsFromSupabase(env, query);
}

export async function handleChat(c: Context<{ Bindings: Env }>): Promise<Response> {
  const body = await c.req.json<ChatRequest>();

  if (!body.chatInput || !body.sessionId || !body.user_id) {
    return c.json(
      { error: "Missing required fields: chatInput, sessionId, user_id" },
      400
    );
  }

  const { chatInput, sessionId, user_id, currentPage, pageTitle, pageData } = body;
  const trimmedInput = chatInput.trim();

  if (!trimmedInput) {
    return c.json({ error: "Message cannot be empty" }, 400);
  }

  if (trimmedInput.length > MAX_INPUT_CHARS) {
    return c.json(
      { error: `Please keep messages under ${MAX_INPUT_CHARS.toLocaleString()} characters.` },
      400
    );
  }

  const ip = c.req.header("cf-connecting-ip") || "local";
  const chatLimit = await c.env.CHAT_RATE_LIMITER.limit({ key: `chat:${ip}` });
  if (!chatLimit.success) {
    return c.json({ error: "You're sending messages too quickly. Please wait a minute." }, 429);
  }

  if (isDirectBookingRequest(trimmedInput)) {
    return directBookingResponse();
  }

  const dailyLimit = Number(c.env.CHAT_DAILY_AI_LIMIT) || 200;
  if (!await consumeDailyAiBudget(c.env, "chat", dailyLimit)) {
    return c.json({ error: "Sierra has reached today's conversation limit. Please try again tomorrow." }, 429);
  }

  try {
    const requestStartTime = new Date().toISOString();
    const traceId = crypto.randomUUID().replace(/-/g, "");
    const fallbackHistory = [
      ...sanitizeClientHistory(body.history),
      { role: "user" as const, content: trimmedInput },
    ];
    let chatContext: ChatContext;
    let persistenceAvailable = true;

    try {
      await ensureSession(c.env, sessionId, user_id);

      const limitResult = await enforceChatLimits(c.env, sessionId, user_id, trimmedInput);
      if (!limitResult.allowed) {
        return c.json({ error: limitResult.message }, limitResult.status as 400 | 429);
      }

      const messageMetadata: Record<string, unknown> = {};
      if (currentPage) messageMetadata.page = currentPage;
      if (pageTitle) messageMetadata.pageTitle = pageTitle;
      messageMetadata.approxInputTokens = approximateTokens(trimmedInput);

      await storeMessage(c.env, sessionId, user_id, "user", trimmedInput, messageMetadata);
      chatContext = await loadChatContext(c.env, sessionId, fallbackHistory);
    } catch (error) {
      if (error instanceof Error && error.message === "Chat session does not belong to this user") {
        return c.json({ error: "Invalid chat session." }, 403);
      }
      persistenceAvailable = false;
      console.error("Chat persistence unavailable; using client fallback history", error);
      chatContext = {
        messages: fallbackHistory.slice(-CLIENT_FALLBACK_HISTORY_LIMIT),
        summary: "Conversation history recovered from the current browser session because server-side memory was unavailable.",
        totalUserMessages: fallbackHistory.filter((message) => message.role === "user").length,
        degraded: true,
      };
    }

    const isFirstMessage = chatContext.totalUserMessages <= 1;
    const ragQuery = isFirstMessage
      ? `Information about Andrew Girgis: ${trimmedInput}`
      : trimmedInput;

    const ragStartTime = new Date().toISOString();
    const ragRetrieval = await retrieveRelevantDocs(c.env, ragQuery);
    const ragEndTime = new Date().toISOString();

    const systemPrompt = buildSystemPrompt(
      { action: "sendMessage", user_id, sessionId, chatInput: trimmedInput, currentPage, pageTitle, pageData },
      ragRetrieval.context,
      {
        isFirstMessage,
        totalUserMessages: chatContext.totalUserMessages,
      }
    );

    const openai = getOpenAI(c.env);

    const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
      { role: "system", content: systemPrompt },
      ...(chatContext.summary
        ? [{ role: "system" as const, content: `SESSION SUMMARY\n${chatContext.summary}` }]
        : []),
      ...chatContext.messages,
    ];

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        let fullResponse = "";

        const sendSSE = (event: { type: string; content?: string; bookingIntent?: boolean; error?: string }) => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
        };

        try {
          const completion = await openai.chat.completions.create({
            model: "gpt-4.1-mini",
            messages,
            stream: true,
            max_tokens: 500,
          });

          for await (const chunk of completion) {
            const token = chunk.choices[0]?.delta?.content;
            if (token) {
              fullResponse += token;
              sendSSE({ type: "token", content: token });
            }
          }

          const bookingIntent = detectBookingIntent(`${trimmedInput}\n${fullResponse}`);

          const cleanResponse = fullResponse.replace(/\[BOOK_MEETING\]/g, "").trim();
          const approxUsage = {
            promptTokens: approximateTokens(messages.map((message) => message.content).join("\n")),
            completionTokens: approximateTokens(cleanResponse),
          };
          const totalUsage = {
            ...approxUsage,
            totalTokens: approxUsage.promptTokens + approxUsage.completionTokens,
          };

          console.log("Chat usage estimate", JSON.stringify({
            sessionId,
            user_id,
            degradedMemory: chatContext.degraded || !persistenceAvailable,
            ...approxUsage,
            totalTokens: totalUsage.totalTokens,
          }));

          if (persistenceAvailable) {
            await storeMessage(
              c.env,
              sessionId,
              user_id,
              "assistant",
              cleanResponse,
              {
                bookingIntent,
                degradedMemory: chatContext.degraded,
                approxUsage,
              }
            );

            await storeUsageEstimate(c.env, sessionId, user_id, {
              event: "usage_estimate",
              degradedMemory: chatContext.degraded,
              approxUsage,
              totalTokens: totalUsage.totalTokens,
            });
          }

          const tracePromise = traceSierraChat(c.env, {
            traceId,
            sessionId,
            userId: user_id,
            question: trimmedInput,
            answer: cleanResponse,
            currentPage,
            pageTitle,
            startTime: requestStartTime,
            endTime: new Date().toISOString(),
            ragStartTime,
            ragEndTime,
            generationStartTime: requestStartTime,
            generationEndTime: new Date().toISOString(),
            model: "gpt-4.1-mini",
            promptMessages: messages,
            retrievedMatches: ragRetrieval.matches,
            approxUsage: totalUsage,
            metadata: {
              ragBackend: ragRetrieval.backend,
              corpusVersion: ragRetrieval.corpusVersion,
              embeddingModel: ragRetrieval.embeddingModel,
              embeddingDimension: ragRetrieval.embeddingDimension,
              vectorIndex: ragRetrieval.vectorIndex,
              chatModel: "gpt-4.1-mini",
              topK: ragRetrieval.topK,
              matchThreshold: ragRetrieval.matchThreshold,
              page: currentPage,
              pageTitle,
              degradedMemory: chatContext.degraded || !persistenceAvailable,
              persistenceAvailable,
              bookingIntent,
              environment: "production",
            },
          });

          const executionCtx = (c as unknown as { executionCtx?: ExecutionContext }).executionCtx;
          if (executionCtx) executionCtx.waitUntil(tracePromise);
          else await tracePromise;

          sendSSE({ type: "done", bookingIntent });
        } catch (error) {
          console.error("Streaming error:", error);
          sendSSE({ type: "error", error: "Failed to generate response" });
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
}
