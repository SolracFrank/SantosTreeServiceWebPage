export interface ReviewSubmission {
  email: string;
  display_name: string;
  title: string;
  content: string;
  rating: number;
  turnstile_token: string;
}
