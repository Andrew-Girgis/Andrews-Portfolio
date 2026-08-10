export interface Env {
  OPENAI_API_KEY: string;
  COHERE_API_KEY: string;
  LANGFUSE_PUBLIC_KEY: string;
  LANGFUSE_SECRET_KEY: string;
  LANGFUSE_BASE_URL: string;
  RAG_BACKEND?: "supabase" | "cloudflare";
  CAL_API_KEY?: string;
  CAL_COM_API_KEY?: string;
  CAL_USERNAME: string;
  CAL_EVENT_TYPE_SLUG: string;
  ALLOWED_ORIGINS: string;
  CHAT_DAILY_AI_LIMIT: string;
  BOOKING_PARSE_DAILY_AI_LIMIT: string;
  SUPABASE_URL?: string;
  SUPABASE_SECRET_KEY?: string;
  NEXT_PUBLIC_SUPABASE_URL?: string;
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?: string;
  GREETING_CACHE: KVNamespace;
  DB: D1Database;
  RAG_DB: D1Database;
  VECTORIZE: VectorizeIndex;
  CHAT_RATE_LIMITER: RateLimit;
  BOOKING_RATE_LIMITER: RateLimit;
  BOOKING_CONFIRM_RATE_LIMITER: RateLimit;
}

export interface ChatRequest {
  action: string;
  user_id: string;
  sessionId: string;
  chatInput: string;
  currentPage?: string;
  pageTitle?: string;
  pageData?: Record<string, unknown>;
  history?: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
}

export interface PromptContext {
  isFirstMessage: boolean;
  totalUserMessages: number;
}

export interface SSEEvent {
  type: "token" | "ui_action" | "done" | "error";
  content?: string;
  action?: "offer_booking";
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

export interface BookingDraftRow {
  id: string;
  session_id: string;
  user_id: string;
  status: "selecting_slot" | "selected" | "submitting" | "confirmed" | "failed" | "unknown" | "expired" | "cancelled";
  duration_minutes: 15 | 30;
  time_zone: string;
  availability_constraints: string;
  offered_slots: string;
  selected_start: string | null;
  selected_end: string | null;
  idempotency_key: string | null;
  cal_booking_uid: string | null;
  last_error_code: string | null;
  created_at: string;
  updated_at: string;
  expires_at: string;
}
