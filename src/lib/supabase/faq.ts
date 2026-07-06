import { hasSupabaseConfig, supabase } from "./client";
import type { Faq } from "./types";

export const placeholderFaqs: Faq[] = [
  {
    id: "placeholder-faq-1",
    question: "Como puedo solicitar informacion?",
    answer: "Puedes usar la pagina de contacto para enviar tus datos y el mensaje que quieras consultar.",
    sort_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: null,
  },
  {
    id: "placeholder-faq-2",
    question: "La galeria sera editable?",
    answer: "Si. La estructura ya esta preparada para conectar imagenes administradas con Supabase Storage.",
    sort_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: null,
  },
  {
    id: "placeholder-faq-3",
    question: "Habra un panel de administracion?",
    answer: "La ruta base del admin queda reservada para un flujo autenticado con Supabase Auth.",
    sort_order: 3,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: null,
  },
];

export async function getActiveFaqs(): Promise<Faq[]> {
  if (!hasSupabaseConfig || !supabase) {
    return placeholderFaqs;
  }

  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    if (import.meta.env.DEV) {
      console.warn("No se pudo cargar faqs desde Supabase. Usando placeholders.", error.message);
    }

    return placeholderFaqs;
  }

  return data ?? placeholderFaqs;
}
