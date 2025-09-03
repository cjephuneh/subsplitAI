import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://oqdhzhpnejjzliihxjjh.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xZGh6aHBuZWpqemxpaWh4ampoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3MzcyNjMsImV4cCI6MjA3MDMxMzI2M30.wtiLWeyrOBfyxpzNyHmaOcsHLhV9qrSMS7akG-xRv2Q"

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface WaitlistEntry {
  id: string
  first_name: string
  last_name: string
  email: string
  company?: string
  role?: string
  interested_tools: string[]
  use_case?: string
  budget?: string
  notifications: boolean
  updates: boolean
  created_at: string
  updated_at: string
}

export interface ContactSubmission {
  id: string
  first_name: string
  last_name: string
  email: string
  subject: string
  message: string
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  first_name?: string
  last_name?: string
  created_at: string
  updated_at: string
}