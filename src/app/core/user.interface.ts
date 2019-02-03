export interface User {
  id: number;
  username: string;
  email: string;
  created_at: number;
  updated_at: number;
  auth: string;
  image_id?: number;
  location_id?: number;
  is_email_public?: boolean;
  is_phone_public?: boolean;
  is_social_public?: boolean;
  phone?: string;
  social?: string;
  role?: number;
}
