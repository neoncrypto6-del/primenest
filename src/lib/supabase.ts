import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ngesuqojrzqlvxbiusvz.supabase.co';
const supabaseAnonKey =
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nZXN1cW9qcnpxbHZ4Yml1c3Z6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MTI0MjIsImV4cCI6MjA4ODE4ODQyMn0.fFSqxmQsj478cl5nbnElGj812G6-57CY2RHT72oqESc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  property_type: 'house' | 'apartment' | 'land' | 'office';
  listing_type: 'sale' | 'rent';
  beds: number;
  baths: number;
  sqft: number;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  images: string[];
  year_built: number | null;
  lot_size: string | null;
  features: string[];
  status: 'active' | 'sold' | 'rented' | 'inactive';
  agent_name: string | null;
  agent_phone: string | null;
  agent_email: string | null;
  agent_image: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}