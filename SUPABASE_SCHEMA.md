# Supabase Database Schema

## Photos Table

Run this SQL in your Supabase SQL Editor to create/update the `photos` table:

```sql
-- Create photos table with all metadata fields
CREATE TABLE IF NOT EXISTS photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Image data
  image_url TEXT NOT NULL,

  -- Basic metadata
  title TEXT NOT NULL,
  category TEXT,
  subject TEXT,
  magnification TEXT,

  -- Date taken
  date_taken_month VARCHAR(2),  -- Format: "01" to "12"
  date_taken_year VARCHAR(4),   -- Format: "2024"

  -- Auto-captured technical info
  file_size_mb DECIMAL(10, 2),  -- File size in megabytes
  megapixels DECIMAL(10, 1),    -- Megapixels (e.g., 24.2)

  -- Display options
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 999
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_photos_sort_order ON photos(sort_order);
CREATE INDEX IF NOT EXISTS idx_photos_featured ON photos(featured);
CREATE INDEX IF NOT EXISTS idx_photos_category ON photos(category);
CREATE INDEX IF NOT EXISTS idx_photos_date_taken ON photos(date_taken_year, date_taken_month);
CREATE INDEX IF NOT EXISTS idx_photos_created_at ON photos(created_at DESC);

-- Add Row Level Security (RLS) policies
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all photos
CREATE POLICY "Public read access" ON photos
  FOR SELECT
  USING (true);

-- Allow authenticated users to insert/update/delete (for admin)
CREATE POLICY "Admin write access" ON photos
  FOR ALL
  USING (auth.role() = 'authenticated');
```

## Field Descriptions

### Required Fields
- **id**: Auto-generated UUID primary key
- **created_at**: Timestamp when record was created
- **image_url**: Cloudinary URL for the image
- **title**: Photo title/description

### Optional Metadata
- **category**: Photo category (insects, flowers, water_drops, textures, fungi, crystals)
- **subject**: Specific subject of the photo (e.g., "Butterfly wing")
- **magnification**: Magnification level (e.g., "5x", "10x")

### Date Information
- **date_taken_month**: Month photo was taken (01-12)
- **date_taken_year**: Year photo was taken (e.g., "2024")

### Auto-Captured Information
- **file_size_mb**: File size in megabytes (automatically captured)
- **megapixels**: Megapixels of original image (automatically calculated)

### Display Settings
- **featured**: Whether to show on homepage (boolean)
- **sort_order**: Custom sort order (lower numbers appear first)

## Migration from Old Schema

If you already have a `photos` table without the new fields, run this to add them:

```sql
-- Add new columns to existing table
ALTER TABLE photos ADD COLUMN IF NOT EXISTS date_taken_month VARCHAR(2);
ALTER TABLE photos ADD COLUMN IF NOT EXISTS date_taken_year VARCHAR(4);
ALTER TABLE photos ADD COLUMN IF NOT EXISTS file_size_mb DECIMAL(10, 2);
ALTER TABLE photos ADD COLUMN IF NOT EXISTS megapixels DECIMAL(10, 1);

-- Add new indexes
CREATE INDEX IF NOT EXISTS idx_photos_date_taken ON photos(date_taken_year, date_taken_month);
```

## Sample Data

Here's what a complete record looks like:

```sql
INSERT INTO photos (
  image_url,
  title,
  category,
  subject,
  magnification,
  date_taken_month,
  date_taken_year,
  file_size_mb,
  megapixels,
  featured,
  sort_order
) VALUES (
  'https://res.cloudinary.com/diadwcl6c/image/upload/v1234567890/macro-photos/butterfly-wing.webp',
  'Butterfly Wing Scales',
  'insects',
  'Monarch butterfly wing',
  '10x',
  '06',
  '2024',
  2.35,
  24.2,
  true,
  1
);
```

## Data Flow

1. **User uploads image** via Admin page → Image is optimized (WebP, 2500px max, 85% quality)
2. **Image uploaded** to Cloudinary → Returns `image_url`
3. **Metadata saved** to Supabase `photos` table
4. **Gallery page** queries Supabase to display photos

The Admin page automatically:
- ✅ Optimizes images before upload
- ✅ Captures file size
- ✅ Calculates megapixels from original dimensions
- ✅ Uploads to Cloudinary
- ✅ Saves all metadata to Supabase

You just need to fill in:
- Title (required)
- Category, Subject, Magnification (optional)
- Month and Year taken (optional)
- Featured status
- Sort order (auto-assigned if not specified)
