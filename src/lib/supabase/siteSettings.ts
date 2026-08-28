import { createSupabaseTimeout, hasSupabaseConfig, supabase } from "./client";
import type { SiteSettings } from "./types";

export const placeholderSiteSettings: SiteSettings[] = [
  {
    id: "placeholder-site-settings-1",
    key: "business",
    value: {
      name: "Santos Tree Service",
      tagline: "Professional tree care, trimming, removal, cleanup, and firewood service in Evansville, IN.",
      email: "Eestrada@santostreeservicesevv.com",
      phone: "(812) 602-6388",
    },
    created_at: new Date().toISOString(),
    updated_at: null,
  },
];

export async function getSiteSettings(): Promise<SiteSettings[]> {
  if (!hasSupabaseConfig || !supabase) {
    return placeholderSiteSettings;
  }

  const timeout = createSupabaseTimeout();

  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .order("key", { ascending: true })
      .abortSignal(timeout.signal);

    if (error) {
      if (import.meta.env.DEV) {
        console.warn("No se pudo cargar site_settings desde Supabase. Usando placeholders.", error.message);
      }

      return placeholderSiteSettings;
    }

    return data ?? placeholderSiteSettings;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn("Timeout o error cargando site_settings desde Supabase. Usando placeholders.", error);
    }

    return placeholderSiteSettings;
  } finally {
    timeout.clear();
  }
}
