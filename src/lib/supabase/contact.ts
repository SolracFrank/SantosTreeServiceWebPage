import { hasSupabaseConfig, supabase } from "./client";
import type { ContactMessage, NewContactMessage } from "./types";

export async function createContactMessage(message: NewContactMessage): Promise<ContactMessage | null> {
  if (!hasSupabaseConfig || !supabase) {
    if (import.meta.env.DEV) {
      console.warn("Supabase no esta configurado. El mensaje de contacto no se guardo.");
    }

    return null;
  }

  const { data, error } = await supabase
    .from("contact_messages")
    .insert(message)
    .select("*")
    .single();

  if (error) {
    throw new Error(`No se pudo crear el mensaje de contacto: ${error.message}`);
  }

  return data;
}
