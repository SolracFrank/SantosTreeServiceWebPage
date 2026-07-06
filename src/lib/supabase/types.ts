export type GalleryImage = {
  id: string;
  title: string | null;
  description: string | null;
  storage_path: string;
  public_url: string;
  alt_text: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
};

export type SiteSettings = {
  id: string;
  key: string;
  value: Record<string, unknown>;
  created_at: string;
  updated_at: string | null;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: "new" | "read" | "archived";
  created_at: string;
};

export type NewContactMessage = Pick<ContactMessage, "name" | "email" | "phone" | "subject" | "message">;

export type Profile = {
  id: string;
  role: "admin" | "user";
  created_at: string;
  updated_at: string | null;
};
