import { supabase } from "./client";

export function getSupabaseStorageClient() {
  return supabase?.storage ?? null;
}
