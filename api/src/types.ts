export interface Env {
  OPENAI_API_KEY: string;
  SUPABASE_URL: string;
  SUPABASE_SECRET_KEY: string;
  GREETING_CACHE: KVNamespace;
}

export interface ChatRequest {
  action: string;
  user_id: string;
  sessionId: string;
  chatInput: string;
  currentPage?: string;
  pageTitle?: string;
  pageData?: Record<string, unknown>;
}

export interface SSEEvent {
  type: "token" | "done" | "error";
  content?: string;
  bookingIntent?: boolean;
  message?: string;
  error?: string;
}

export interface GreetingResponse {
  text: string;
}

export interface ChatMessageRow {
  id: string;
  session_id: string;
  user_id: string;
  role: "user" | "assistant" | "system";
  content: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface ChatSessionRow {
  id: string;
  user_id: string;
  start_time: string;
  end_time: string | null;
  has_feedback: boolean;
}

export interface DocumentMatch {
  id: string;
  document_id: string;
  content: string;
  metadata: Record<string, unknown>;
  similarity: number;
}