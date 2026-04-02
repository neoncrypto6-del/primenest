
-- ============================================
-- COMPLETE SQL SCHEMA FOR PRIMENEST
-- Run this in your Supabase SQL Editor
-- This replaces all previous SQL completely
-- ============================================

-- Drop existing tables if they exist (be careful in production!)
DROP TABLE IF EXISTS contact_messages;
DROP TABLE IF EXISTS properties;

-- ============================================
-- PROPERTIES TABLE
-- ============================================
CREATE TABLE properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  property_type TEXT NOT NULL CHECK (property_type IN ('house', 'apartment', 'land', 'office')),
  listing_type TEXT NOT NULL CHECK (listing_type IN ('sale', 'rent')),
  beds INTEGER DEFAULT 0,
  baths INTEGER DEFAULT 0,
  sqft INTEGER DEFAULT 0,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  year_built INTEGER,
  lot_size TEXT,
  features TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'sold', 'rented', 'inactive')),
  -- Agent Information
  agent_name TEXT DEFAULT 'Lora Wale',
  agent_phone TEXT DEFAULT '+1 850-641-8765',
  agent_email TEXT DEFAULT 'lorawale9639@outlook.com',
  agent_image TEXT,
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- CONTACT MESSAGES TABLE
-- ============================================
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY - PROPERTIES
-- ============================================
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all properties (including sold, rented, inactive)
CREATE POLICY "Allow public read access" ON properties 
  FOR SELECT USING (true);

-- Allow authenticated users (admins) full access
CREATE POLICY "Allow authenticated full access" ON properties 
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- ROW LEVEL SECURITY - CONTACT MESSAGES
-- ============================================
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert contact messages
CREATE POLICY "Allow public insert" ON contact_messages 
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users (admins) to read and manage messages
CREATE POLICY "Allow authenticated read" ON contact_messages 
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON contact_messages 
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON contact_messages 
  FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- STORAGE BUCKET FOR IMAGES
-- ============================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public Access" ON storage.objects 
  FOR SELECT USING (bucket_id = 'property-images');

CREATE POLICY "Auth Insert" ON storage.objects 
  FOR INSERT WITH CHECK (bucket_id = 'property-images' AND auth.role() = 'authenticated');

CREATE POLICY "Auth Update" ON storage.objects 
  FOR UPDATE USING (bucket_id = 'property-images' AND auth.role() = 'authenticated');

CREATE POLICY "Auth Delete" ON storage.objects 
  FOR DELETE USING (bucket_id = 'property-images' AND auth.role() = 'authenticated');

-- ============================================
-- SAMPLE DATA
-- ============================================
INSERT INTO properties (title, description, price, property_type, listing_type, beds, baths, sqft, address, city, state, zip_code, images, year_built, lot_size, features, status, agent_name, agent_phone, agent_email) VALUES

-- Active Properties
('Modern Downtown Apartment', 'Beautiful modern apartment in the heart of downtown with stunning city views. Recently renovated with high-end finishes throughout. Perfect for young professionals or couples looking for urban living at its finest.', 285000, 'apartment', 'sale', 2, 2, 1200, '123 Main Street, Apt 4B', 'New York', 'NY', '10001', 
ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'], 
2019, NULL, ARRAY['Central AC', 'In-unit Laundry', 'Hardwood Floors', 'Stainless Steel Appliances', 'Balcony', 'Gym Access'], 'active', 'Lora Wale', '+1 850-641-8765', 'lorawale9639@outlook.com'),

('Spacious Family Home', 'Charming 4-bedroom family home in a quiet suburban neighborhood. Large backyard perfect for kids and pets. Updated kitchen with granite countertops and stainless steel appliances. Close to top-rated schools and parks.', 425000, 'house', 'sale', 4, 3, 2800, '456 Oak Avenue', 'Austin', 'TX', '78701', 
ARRAY['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'], 
2005, '0.35 acres', ARRAY['2-Car Garage', 'Fireplace', 'Updated Kitchen', 'Fenced Yard', 'Central Heat', 'Sprinkler System'], 'active', 'Lora Wale', '+1 850-641-8765', 'lorawale9639@outlook.com'),

('Prime Commercial Office', 'Professional office space in a prime business district. Open floor plan with conference room and private offices. High-speed internet infrastructure already in place. Ideal for startups or established businesses.', 3500, 'office', 'rent', 0, 2, 2000, '789 Business Blvd, Suite 200', 'Chicago', 'IL', '60601', 
ARRAY['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800', 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'], 
2015, NULL, ARRAY['High-speed Internet', 'Conference Room', 'Kitchen Area', '24/7 Access', 'Parking Included', 'Security System'], 'active', 'Lora Wale', '+1 850-641-8765', 'lorawale9639@outlook.com'),

('Luxury Waterfront Apartment', 'Stunning waterfront apartment with panoramic ocean views. Premium finishes throughout including marble countertops and custom cabinetry. Resort-style amenities and direct beach access.', 1800, 'apartment', 'rent', 1, 1, 850, '321 Ocean Drive, Unit 12A', 'Miami', 'FL', '33139', 
ARRAY['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'], 
2020, NULL, ARRAY['Ocean View', 'Pool', 'Gym', 'Concierge', 'Pet Friendly', 'Valet Parking'], 'active', 'Lora Wale', '+1 850-641-8765', 'lorawale9639@outlook.com'),

('Development Land - 5 Acres', 'Prime development land in a rapidly growing area. Zoned for residential use with all utilities available at the lot line. Beautiful mountain views and easy access to major highways.', 175000, 'land', 'sale', 0, 0, 0, 'Lot 15, Country Road 42', 'Phoenix', 'AZ', '85001', 
ARRAY['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'], 
NULL, '5 acres', ARRAY['Utilities Available', 'Paved Road Access', 'Residential Zoning', 'Mountain Views', 'Near Schools'], 'active', 'Lora Wale', '+1 850-641-8765', 'lorawale9639@outlook.com'),

('Cozy Studio Apartment', 'Affordable studio apartment perfect for young professionals. Walking distance to public transit, shopping, and restaurants. Utilities included in rent. Laundry facilities on-site.', 950, 'apartment', 'rent', 0, 1, 450, '555 Elm Street, Unit 3C', 'Portland', 'OR', '97201', 
ARRAY['https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800'], 
2010, NULL, ARRAY['Utilities Included', 'Laundry On-site', 'Pet Friendly', 'Near Transit', 'Furnished Option'], 'active', 'Lora Wale', '+1 850-641-8765', 'lorawale9639@outlook.com'),

-- Sold Property
('Colonial Style Home', 'Beautiful colonial home with original hardwood floors, updated systems, and a gorgeous wrap-around porch. This historic gem has been lovingly maintained and updated for modern living.', 550000, 'house', 'sale', 5, 4, 3500, '222 Heritage Lane', 'Boston', 'MA', '02101', 
ARRAY['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'], 
1925, '0.5 acres', ARRAY['Wrap-around Porch', 'Original Hardwood', 'Updated HVAC', 'Wine Cellar', 'Garden'], 'sold', 'Lora Wale', '+1 850-641-8765', 'lorawale9639@outlook.com'),

-- Rented Property
('Executive Office Suite', 'Premium executive office suite with reception area, 3 private offices, and a large conference room. Fully furnished with high-end furniture. Spectacular city views from the 15th floor.', 5500, 'office', 'rent', 0, 2, 3000, '100 Corporate Plaza, Floor 15', 'San Francisco', 'CA', '94105', 
ARRAY['https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800', 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800'], 
2018, NULL, ARRAY['Furnished', 'Reception Area', 'IT Infrastructure', 'City Views', 'Valet Parking'], 'rented', 'Lora Wale', '+1 850-641-8765', 'lorawale9639@outlook.com'),

-- Inactive Property
('Fixer-Upper Opportunity', 'Great investment opportunity! This property needs some TLC but has excellent bones and is located in an up-and-coming neighborhood. Perfect for investors or DIY enthusiasts.', 125000, 'house', 'sale', 3, 1, 1400, '888 Renovation Road', 'Detroit', 'MI', '48201', 
ARRAY['https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=800'], 
1955, '0.2 acres', ARRAY['Large Lot', 'Detached Garage', 'Basement'], 'inactive', 'Lora Wale', '+1 850-641-8765', 'lorawale9639@outlook.com');

-- ============================================
-- NOTES FOR ADMIN SETUP
-- ============================================
-- After running this SQL:
-- 1. Go to Authentication > Users in Supabase Dashboard
-- 2. Click "Add User" and create your admin account
-- 3. Use that email/password to log into the admin panel
-- ============================================
