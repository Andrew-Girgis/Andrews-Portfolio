import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Env } from "./types";

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(env: Env): SupabaseClient {
  if (supabaseInstance) return supabaseInstance;

  const url = env.SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env.SUPABASE_SECRET_KEY || env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Supabase RAG is not configured");

  supabaseInstance = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return supabaseInstance;
}
