import { createSupabaseTimeout, hasSupabaseConfig, supabase } from "./client";
import type { GalleryImage } from "./types";

export const placeholderGalleryImages: GalleryImage[] = [
  {
    id: "placeholder-gallery-1",
    title: "Tree service work",
    description: "Recent Santos Tree Service work from the local gallery.",
    storage_path: "placeholder/tree-service-work.jpg",
    public_url: "/images/gallery/galeria_1.jpeg",
    alt_text: "Santos Tree Service completed outdoor tree care work",
    sort_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: null,
  },
  {
    id: "placeholder-gallery-2",
    title: "Cleanup and trimming",
    description: "Space prepared for images uploaded later through Supabase Storage.",
    storage_path: "placeholder/cleanup-and-trimming.jpg",
    public_url: "/images/gallery/galeria_2.jpeg",
    alt_text: "Tree trimming and cleanup work by Santos Tree Service",
    sort_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: null,
  },
  {
    id: "placeholder-gallery-3",
    title: "Local outdoor service",
    description: "Temporary content while Supabase data is connected.",
    storage_path: "placeholder/local-outdoor-service.jpg",
    public_url: "/images/gallery/galeria_3.jpeg",
    alt_text: "Outdoor tree service work from Santos Tree Service",
    sort_order: 3,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: null,
  },
];

export async function getActiveGalleryImages(): Promise<GalleryImage[]> {
  if (!hasSupabaseConfig || !supabase) {
    return placeholderGalleryImages;
  }

  const timeout = createSupabaseTimeout();

  try {
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .abortSignal(timeout.signal);

    if (error) {
      if (import.meta.env.DEV) {
        console.warn("No se pudo cargar gallery_images desde Supabase. Usando placeholders.", error.message);
      }

      return placeholderGalleryImages;
    }

    return data ?? placeholderGalleryImages;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn("Timeout o error cargando gallery_images desde Supabase. Usando placeholders.", error);
    }

    return placeholderGalleryImages;
  } finally {
    timeout.clear();
  }
}
