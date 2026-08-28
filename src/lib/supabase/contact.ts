import { hasSupabaseConfig, supabase } from "./client";
import type { ContactMessage, NewContactMessage } from "./types";

export type ContactFormData = NewContactMessage;
export type ContactEmailResult = {
  ok: boolean;
  emailSent: boolean;
  message?: string;
};

export async function createContactMessage(message: NewContactMessage): Promise<ContactMessage | null> {
  if (!hasSupabaseConfig || !supabase) {
    if (import.meta.env.DEV) {
      console.warn("Supabase no esta configurado. El mensaje de contacto no se guardo.");
    }

    return null;
  }

  const { error } = await supabase
    .from("contact_messages")
    .insert(message);

  if (error) {
    throw new Error(`No se pudo crear el mensaje de contacto: ${error.message}`);
  }

  // Contact messages are private. The public client can submit them but must
  // not receive rows back from the database.
  return null;
}

export async function sendContactEmail(message: ContactFormData): Promise<ContactEmailResult> {
  if (!hasSupabaseConfig || !supabase) {
    return {
      ok: true,
      emailSent: false,
      message: "The contact email service is unavailable.",
    };
  }

  const { data, error } = await supabase.functions.invoke<{
    ok?: boolean;
    emailSent?: boolean;
    message?: string;
  }>("send-contact-email", {
    body: message,
  });

  if (error) {
    console.warn("send-contact-email invocation failed after saving contact message:", error);

    return {
      ok: true,
      emailSent: false,
      message: "The contact email service is unavailable.",
    };
  }

  if (!data?.ok) {
    console.warn("send-contact-email returned a non-blocking failure:", data?.message);

    return {
      ok: true,
      emailSent: false,
      message: data?.message ?? "The contact email could not be sent.",
    };
  }

  return {
    ok: true,
    emailSent: Boolean(data.emailSent),
    message: data.message,
  };
}
