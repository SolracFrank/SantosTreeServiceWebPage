import { supabase } from "./client";

export function getSupabaseAuthClient() {
  return supabase?.auth ?? null;
}
