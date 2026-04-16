export type Language = 'ar' | 'en';
export type ContentStatus = 'draft' | 'published';

export interface BaseContent {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  created_at: string;
  updated_at?: string;
  status: ContentStatus;
}

export interface Initiative extends BaseContent {
  slug: string;
  category_id: string;
  category?: InitiativeCategory;
  image_url?: string;
  start_date?: string;
  end_date?: string;
  location_ar?: string;
  location_en?: string;
  goals_ar?: string;
  goals_en?: string;
  outcomes_ar?: string;
  outcomes_en?: string;
  featured: boolean;
}

export interface InitiativeCategory {
  id: string;
  name_ar: string;
  name_en: string;
  slug: string;
  color?: string;
}

export interface NewsArticle extends BaseContent {
  slug: string;
  image_url?: string;
  author_ar?: string;
  author_en?: string;
  published_at?: string;
  featured: boolean;
  category_ar?: string;
  category_en?: string;
  content_ar?: string;
  content_en?: string;
}

export interface Event extends BaseContent {
  slug: string;
  image_url?: string;
  start_date: string;
  end_date?: string;
  location_ar?: string;
  location_en?: string;
  registration_url?: string;
  registration_open: boolean;
  is_past: boolean;
  capacity?: number;
  organizer_ar?: string;
  organizer_en?: string;
}

export interface Partner {
  id: string;
  name_ar: string;
  name_en: string;
  logo_url?: string;
  website_url?: string;
  description_ar?: string;
  description_en?: string;
  partner_type: 'government' | 'private' | 'ngo' | 'international';
  created_at: string;
  status: ContentStatus;
  display_order?: number;
}

export interface MediaFile {
  id: string;
  title_ar: string;
  title_en: string;
  file_url: string;
  file_type: 'image' | 'video' | 'document';
  thumbnail_url?: string;
  file_size?: number;
  created_at: string;
  status: ContentStatus;
  alt_ar?: string;
  alt_en?: string;
  category?: string;
}

export interface Document {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar?: string;
  description_en?: string;
  file_url: string;
  file_type: string;
  file_size?: number;
  created_at: string;
  status: ContentStatus;
  category_ar?: string;
  category_en?: string;
}

export interface FAQ {
  id: string;
  question_ar: string;
  question_en: string;
  answer_ar: string;
  answer_en: string;
  category?: string;
  display_order?: number;
  created_at: string;
  status: ContentStatus;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  created_at: string;
  is_read: boolean;
  replied_at?: string;
}

export interface ParticipationRequest {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  city?: string;
  age_group?: string;
  motivation: string;
  skills?: string;
  availability?: string;
  created_at: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Stat {
  id: string;
  label_ar: string;
  label_en: string;
  value: string;
  unit_ar?: string;
  unit_en?: string;
  icon?: string;
  color?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'editor';
  full_name: string;
  created_at: string;
}
