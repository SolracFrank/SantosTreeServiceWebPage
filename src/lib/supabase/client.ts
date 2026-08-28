import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey =
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY ||
  import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

if (!hasSupabaseConfig && import.meta.env.DEV) {
  console.warn(
    "Supabase no esta configurado. Define PUBLIC_SUPABASE_URL y PUBLIC_SUPABASE_ANON_KEY para usar datos reales."
  );
}

export const supabase = hasSupabaseConfig ? createClient(supabaseUrl, supabaseAnonKey) : null;

export function createSupabaseTimeout(timeoutMs = 5000) {
  const abortController = new AbortController();
  const timeoutId = setTimeout(() => abortController.abort(), timeoutMs);

  return {
    signal: abortController.signal,
    clear: () => clearTimeout(timeoutId),
  };
}
