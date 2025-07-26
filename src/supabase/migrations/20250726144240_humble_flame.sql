/*
  # Create URLs table

  1. New Tables
    - `urls`
      - `id` (uuid, primary key)
      - `original_url` (text, required)
      - `short_code` (text, unique, required)
      - `custom_code` (text, unique, optional)
      - `title` (text, optional)
      - `description` (text, optional)
      - `user_id` (uuid, optional, references auth.users)
      - `clicks` (integer, default 0)
      - `is_active` (boolean, default true)
      - `expires_at` (timestamp, optional)
      - `qr_code` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `urls` table
    - Add policies for public read access and authenticated user management
*/

CREATE TABLE IF NOT EXISTS urls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  original_url text NOT NULL,
  short_code text UNIQUE NOT NULL,
  custom_code text UNIQUE,
  title text,
  description text,
  user_id uuid REFERENCES auth.users(id),
  clicks integer DEFAULT 0,
  is_active boolean DEFAULT true,
  expires_at timestamptz,
  qr_code text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE urls ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can read active URLs"
  ON urls
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Anyone can create URLs"
  ON urls
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their own URLs"
  ON urls
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own URLs"
  ON urls
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_urls_short_code ON urls(short_code);
CREATE INDEX IF NOT EXISTS idx_urls_user_id ON urls(user_id);
CREATE INDEX IF NOT EXISTS idx_urls_created_at ON urls(created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_urls_updated_at
  BEFORE UPDATE ON urls
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();