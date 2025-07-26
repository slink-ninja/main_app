/*
  # Create Analytics table

  1. New Tables
    - `analytics`
      - `id` (uuid, primary key)
      - `url_id` (uuid, references urls, required)
      - `ip_address` (text, required)
      - `user_agent` (text, required)
      - `country` (text, optional)
      - `city` (text, optional)
      - `referrer` (text, optional)
      - `device` (text, required)
      - `browser` (text, required)
      - `os` (text, required)
      - `clicked_at` (timestamp, default now)

  2. Security
    - Enable RLS on `analytics` table
    - Add policies for authenticated users to read their URL analytics
*/

CREATE TABLE IF NOT EXISTS analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url_id uuid REFERENCES urls(id) ON DELETE CASCADE NOT NULL,
  ip_address text NOT NULL,
  user_agent text NOT NULL,
  country text DEFAULT 'Unknown',
  city text DEFAULT 'Unknown',
  referrer text DEFAULT 'Direct',
  device text NOT NULL,
  browser text NOT NULL,
  os text NOT NULL,
  clicked_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can insert analytics"
  ON analytics
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can read analytics for their URLs"
  ON analytics
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM urls 
      WHERE urls.id = analytics.url_id 
      AND urls.user_id = auth.uid()
    )
  );

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_analytics_url_id ON analytics(url_id);
CREATE INDEX IF NOT EXISTS idx_analytics_clicked_at ON analytics(clicked_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_url_clicked ON analytics(url_id, clicked_at DESC);