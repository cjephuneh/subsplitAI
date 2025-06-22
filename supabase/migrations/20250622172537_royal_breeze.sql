/*
  # Create waitlist table

  1. New Tables
    - `waitlist`
      - `id` (uuid, primary key)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text, unique)
      - `company` (text, optional)
      - `role` (text, optional)
      - `interested_tools` (text array)
      - `use_case` (text, optional)
      - `budget` (text, optional)
      - `notifications` (boolean)
      - `updates` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `waitlist` table
    - Add policy for public insert access (for waitlist signup)
    - Add policy for authenticated users to read their own data
*/

CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  company text,
  role text,
  interested_tools text[] DEFAULT '{}',
  use_case text,
  budget text,
  notifications boolean DEFAULT true,
  updates boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert into waitlist (for public signup)
CREATE POLICY "Anyone can join waitlist"
  ON waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow users to read their own waitlist entry
CREATE POLICY "Users can read own waitlist entry"
  ON waitlist
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt() ->> 'email');

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS waitlist_email_idx ON waitlist(email);

-- Create index for created_at for analytics
CREATE INDEX IF NOT EXISTS waitlist_created_at_idx ON waitlist(created_at);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_waitlist_updated_at
  BEFORE UPDATE ON waitlist
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();