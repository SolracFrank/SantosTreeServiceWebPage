import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

if (!hasSupabaseConfig && import.meta.env.DEV) {
  console.warn(
    "Supabase no esta configurado. Define PUBLIC_SUPABASE_URL y PUBLIC_SUPABASE_ANON_KEY para usar datos reales."
  );
}

export const supabase = hasSupabaseConfig ? createClient(supabaseUrl, supabaseAnonKey) : null;
