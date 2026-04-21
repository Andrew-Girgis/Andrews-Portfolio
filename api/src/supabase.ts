import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Env } from "./types";

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(env: Env): SupabaseClient {
  if (supabaseInstance) return supabaseInstance;

  supabaseInstance = createClient(env.SUPABASE_URL, env.SUPABASE_SECRET_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return supabaseInstance;
}