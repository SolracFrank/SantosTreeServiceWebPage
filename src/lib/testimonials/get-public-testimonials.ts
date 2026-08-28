import type { Testimonial } from "@/types/testimonials";
import { hasSupabaseConfig, supabase } from "../supabase/client";

const DEFAULT_TESTIMONIAL_LIMIT = 6;
const REQUEST_TIMEOUT_MS = 8_000;

export async function getPublicTestimonials(
  limit = DEFAULT_TESTIMONIAL_LIMIT,
): Promise<Testimonial[]> {
  const safeLimit = Math.max(1, Math.min(limit, 20));

  if (!hasSupabaseConfig || !supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("reviews")
    .select(
      `
      id,
      display_name,
      title,
      content,
      rating,
      admin_response,
      published_at
    `,
    )
    .order("published_at", {
      ascending: false,
      nullsFirst: false,
    })
    .limit(safeLimit)
    .abortSignal(AbortSignal.timeout(REQUEST_TIMEOUT_MS));

  if (error) {
    console.error("Supabase testimonial query failed:", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });

    throw new Error("The testimonials could not be loaded.");
  }

  return (data ?? []) as Testimonial[];
}
