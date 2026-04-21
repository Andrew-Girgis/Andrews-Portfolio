import { Context } from "hono";
import { Env, ChatRequest, ChatMessageRow, DocumentMatch } from "./types";
import { getSupabase } from "./supabase";
import { getOpenAI } from "./openai";
import { buildSystemPrompt } from "./system-prompt";

const BOOKING_KEYWORDS = ["book", "appointment", "meeting", "schedule", "calendar"];

function detectBookingIntent(text: string): boolean {
  const lower = text.toLowerCase();
  if (lower.includes("[book_meeting]")) return true;
  return BOOKING_KEYWORDS.some((kw) => lower.includes(kw));
}

async function ensureSession(env: Env, sessionId: string, userId: string): Promise<void> {
  const supabase = getSupabase(env);
  const { data } = await supabase
    .from("chat_sessions")
    .select("id")
    .eq("id", sessionId)
    .single();

  if (!data) {
    await supabase.from("chat_sessions").insert({
      id: sessionId,
      user_id: userId,
      start_time: new Date().toISOString(),
    });
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
  const supabase = getSupabase(env);
  await supabase.from("chat_messages").insert({
    session_id: sessionId,
    user_id: userId,
    role,
    content,
    metadata,
  });
}

async function loadChatHistory(
  env: Env,
  sessionId: string
): Promise<Array<{ role: string; content: string }>> {
  const supabase = getSupabase(env);
  const { data } = await supabase
    .from("chat_messages")
    .select("role, content")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true })
    .limit(100);

  return (data || []).map((row: { role: string; content: string }) => ({
    role: row.role,
    content: row.content,
  }));
}

async function retrieveRelevantDocs(
  env: Env,
  query: string
): Promise<string> {
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
    return "";
  }

  const queryEmbedding = embeddingResponse.data[0].embedding;

  const { data, error } = await supabase.rpc("match_documents", {
    query_embedding: JSON.stringify(queryEmbedding),
    match_count: 5,
    match_threshold: 0.3,
  });

  if (error) {
    console.error("RAG retrieval error:", JSON.stringify(error));
  }
  if (!data || data.length === 0) {
    return "";
  }

  console.log(`RAG: ${data.length} results, top similarity: ${(data as DocumentMatch[])[0]?.similarity?.toFixed(3)}`);

  return (data as DocumentMatch[])
    .map((doc, i) => `[Result ${i + 1}] (similarity: ${doc.similarity.toFixed(3)})\n${doc.content}`)
    .join("\n\n");
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

  try {
    await ensureSession(c.env, sessionId, user_id);

    const messageMetadata: Record<string, unknown> = {};
    if (currentPage) messageMetadata.page = currentPage;
    if (pageTitle) messageMetadata.pageTitle = pageTitle;

    await storeMessage(c.env, sessionId, user_id, "user", chatInput, messageMetadata);

    const chatHistory = await loadChatHistory(c.env, sessionId);

    const isFirstMessage = chatHistory.filter((m) => m.role === "user").length <= 1;
    const ragQuery = isFirstMessage
      ? `Information about Andrew Girgis: ${chatInput}`
      : chatInput;

    const ragResults = await retrieveRelevantDocs(c.env, ragQuery);

    const systemPrompt = buildSystemPrompt(
      { action: "sendMessage", user_id, sessionId, chatInput, currentPage, pageTitle, pageData },
      ragResults
    );

    const openai = getOpenAI(c.env);

    const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
      { role: "system", content: systemPrompt },
      ...chatHistory.map((msg) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
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

          const bookingIntent = detectBookingIntent(fullResponse);

          const cleanResponse = fullResponse.replace(/\[BOOK_MEETING\]/g, "").trim();

          await storeMessage(
            c.env,
            sessionId,
            user_id,
            "assistant",
            cleanResponse,
            { bookingIntent }
          );

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
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
}