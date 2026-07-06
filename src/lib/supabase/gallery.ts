import { hasSupabaseConfig, supabase } from "./client";
import type { GalleryImage } from "./types";

export const placeholderGalleryImages: GalleryImage[] = [
  {
    id: "placeholder-gallery-1",
    title: "Producto destacado",
    description: "Imagen de referencia para la futura galeria administrable.",
    storage_path: "placeholder/producto-destacado.jpg",
    public_url: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?auto=format&fit=crop&w=900&q=80",
    alt_text: "Bolsa de compras con productos seleccionados",
    sort_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: null,
  },
  {
    id: "placeholder-gallery-2",
    title: "Detalle de servicio",
    description: "Espacio preparado para imagenes subidas a Supabase Storage.",
    storage_path: "placeholder/servicio.jpg",
    public_url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80",
    alt_text: "Interior de tienda con productos acomodados",
    sort_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: null,
  },
  {
    id: "placeholder-gallery-3",
    title: "Atencion personalizada",
    description: "Contenido temporal mientras se conecta la base de datos.",
    storage_path: "placeholder/atencion.jpg",
    public_url: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=900&q=80",
    alt_text: "Persona atendiendo una compra en mostrador",
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

  const { data, error } = await supabase
    .from("gallery_images")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    if (import.meta.env.DEV) {
      console.warn("No se pudo cargar gallery_images desde Supabase. Usando placeholders.", error.message);
    }

    return placeholderGalleryImages;
  }

  return data ?? placeholderGalleryImages;
}
