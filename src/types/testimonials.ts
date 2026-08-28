export interface Testimonial {
  id: string;
  display_name: string | null;
  title: string | null;
  content: string;
  rating: number;
  admin_response: string | null;
  published_at: string | null;
}
