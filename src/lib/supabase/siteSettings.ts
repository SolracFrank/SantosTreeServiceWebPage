import { hasSupabaseConfig, supabase } from "./client";
import type { SiteSettings } from "./types";

export const placeholderSiteSettings: SiteSettings[] = [
  {
    id: "placeholder-site-settings-1",
    key: "business",
    value: {
      name: "Jime Tienda",
      tagline: "Informacion clara para clientes y visitantes.",
      email: "contacto@example.com",
      phone: "+52 000 000 0000",
    },
    created_at: new Date().toISOString(),
    updated_at: null,
  },
];

export async function getSiteSettings(): Promise<SiteSettings[]> {
  if (!hasSupabaseConfig || !supabase) {
    return placeholderSiteSettings;
  }

  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .order("key", { ascending: true });

  if (error) {
    if (import.meta.env.DEV) {
      console.warn("No se pudo cargar site_settings desde Supabase. Usando placeholders.", error.message);
    }

    return placeholderSiteSettings;
  }

  return data ?? placeholderSiteSettings;
}
