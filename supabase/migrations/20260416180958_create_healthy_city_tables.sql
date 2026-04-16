/*
  # Healthy City Platform - Core Database Schema

  ## Overview
  This migration creates all tables for the Healthy City bilingual public platform.

  ## New Tables

  ### Content Tables
  - `initiative_categories` - Categories for classifying initiatives (health, environment, etc.)
  - `initiatives` - Main health city initiatives with bilingual content
  - `news` - News articles and updates with bilingual content
  - `events` - Events and activities with registration support
  - `partners` - Institutional partners (government, private, NGO, academic)
  - `media_files` - Images and videos in the media gallery
  - `documents` - Downloadable reports, guides, and publications
  - `faqs` - Frequently asked questions with bilingual Q&A

  ### Submission Tables (public write access)
  - `contact_messages` - Messages submitted via the contact form
  - `participation_requests` - Volunteer/participation applications

  ## Security
  - RLS enabled on all tables
  - Public content tables: anyone can SELECT published items
  - Submission tables: anyone can INSERT (public forms)
  - All write operations (INSERT/UPDATE/DELETE on content) require service role (admin panel)

  ## Notes
  1. All content tables use `status` field: 'draft' | 'published'
  2. Bilingual content uses `_ar` and `_en` suffixes
  3. `slug` fields are unique for URL routing
  4. Submission tables have `status` for workflow management
*/

-- ============================================
-- INITIATIVE CATEGORIES
-- ============================================
CREATE TABLE IF NOT EXISTS initiative_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ar text NOT NULL,
  name_en text NOT NULL,
  icon text DEFAULT 'activity',
  color text DEFAULT 'green',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE initiative_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view initiative categories"
  ON initiative_categories
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- ============================================
-- INITIATIVES
-- ============================================
CREATE TABLE IF NOT EXISTS initiatives (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title_ar text NOT NULL,
  title_en text NOT NULL,
  description_ar text DEFAULT '',
  description_en text DEFAULT '',
  content_ar text DEFAULT '',
  content_en text DEFAULT '',
  goals_ar text DEFAULT '',
  goals_en text DEFAULT '',
  outcomes_ar text DEFAULT '',
  outcomes_en text DEFAULT '',
  location_ar text DEFAULT '',
  location_en text DEFAULT '',
  image_url text DEFAULT '',
  category_id uuid REFERENCES initiative_categories(id) ON DELETE SET NULL,
  start_date date,
  end_date date,
  featured boolean DEFAULT false,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE initiatives ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published initiatives"
  ON initiatives
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- ============================================
-- NEWS
-- ============================================
CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title_ar text NOT NULL,
  title_en text NOT NULL,
  description_ar text DEFAULT '',
  description_en text DEFAULT '',
  content_ar text DEFAULT '',
  content_en text DEFAULT '',
  image_url text DEFAULT '',
  tags_ar text DEFAULT '',
  tags_en text DEFAULT '',
  featured boolean DEFAULT false,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published news"
  ON news
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- ============================================
-- EVENTS
-- ============================================
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title_ar text NOT NULL,
  title_en text NOT NULL,
  description_ar text DEFAULT '',
  description_en text DEFAULT '',
  agenda_ar text DEFAULT '',
  agenda_en text DEFAULT '',
  image_url text DEFAULT '',
  location_ar text DEFAULT '',
  location_en text DEFAULT '',
  event_date date,
  event_time text DEFAULT '',
  capacity text DEFAULT '',
  registration_open boolean DEFAULT false,
  registration_link text DEFAULT '',
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published events"
  ON events
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- ============================================
-- PARTNERS
-- ============================================
CREATE TABLE IF NOT EXISTS partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ar text NOT NULL,
  name_en text NOT NULL,
  description_ar text DEFAULT '',
  description_en text DEFAULT '',
  logo_url text DEFAULT '',
  website text DEFAULT '',
  type text DEFAULT 'government' CHECK (type IN ('government', 'private', 'ngo', 'academic', 'international')),
  partnership_since date,
  featured boolean DEFAULT false,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published partners"
  ON partners
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- ============================================
-- MEDIA FILES
-- ============================================
CREATE TABLE IF NOT EXISTS media_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_ar text NOT NULL,
  title_en text DEFAULT '',
  alt_ar text DEFAULT '',
  alt_en text DEFAULT '',
  url text NOT NULL,
  thumbnail_url text DEFAULT '',
  type text DEFAULT 'image' CHECK (type IN ('image', 'video')),
  status text DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE media_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published media files"
  ON media_files
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- ============================================
-- DOCUMENTS
-- ============================================
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_ar text NOT NULL,
  title_en text DEFAULT '',
  description_ar text DEFAULT '',
  description_en text DEFAULT '',
  file_url text NOT NULL,
  file_size text DEFAULT '',
  type text DEFAULT 'report' CHECK (type IN ('report', 'guide', 'form', 'publication', 'other')),
  language text DEFAULT 'ar' CHECK (language IN ('ar', 'en', 'both')),
  year text DEFAULT '',
  download_count integer DEFAULT 0,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published documents"
  ON documents
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- ============================================
-- FAQS
-- ============================================
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_ar text NOT NULL,
  question_en text NOT NULL,
  answer_ar text NOT NULL,
  answer_en text NOT NULL,
  category text DEFAULT '',
  "order" integer DEFAULT 1,
  status text DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published faqs"
  ON faqs
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- ============================================
-- CONTACT MESSAGES
-- ============================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  subject text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a contact message"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- ============================================
-- PARTICIPATION REQUESTS
-- ============================================
CREATE TABLE IF NOT EXISTS participation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  city text DEFAULT '',
  age_group text DEFAULT '',
  motivation text NOT NULL,
  skills text DEFAULT '',
  availability text DEFAULT '',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE participation_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a participation request"
  ON participation_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- ============================================
-- INDEXES for performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_initiatives_status ON initiatives(status);
CREATE INDEX IF NOT EXISTS idx_initiatives_featured ON initiatives(featured);
CREATE INDEX IF NOT EXISTS idx_initiatives_slug ON initiatives(slug);
CREATE INDEX IF NOT EXISTS idx_initiatives_category ON initiatives(category_id);
CREATE INDEX IF NOT EXISTS idx_news_status ON news(status);
CREATE INDEX IF NOT EXISTS idx_news_featured ON news(featured);
CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_slug ON events(slug);
CREATE INDEX IF NOT EXISTS idx_partners_status ON partners(status);
CREATE INDEX IF NOT EXISTS idx_partners_type ON partners(type);
CREATE INDEX IF NOT EXISTS idx_media_files_type ON media_files(type);
CREATE INDEX IF NOT EXISTS idx_documents_type ON documents(type);
CREATE INDEX IF NOT EXISTS idx_faqs_order ON faqs("order");
CREATE INDEX IF NOT EXISTS idx_contact_messages_read ON contact_messages(read);
CREATE INDEX IF NOT EXISTS idx_participation_requests_status ON participation_requests(status);
