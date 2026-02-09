# Cloudinary Setup Guide

This guide will help you configure Cloudinary for image storage.

## Step 1: Create Cloudinary Account

1. Go to https://cloudinary.com/users/register_free
2. Sign up for a free account (25GB storage, 25GB bandwidth/month)
3. Verify your email

## Step 2: Get Your Credentials

1. Go to your Cloudinary Dashboard: https://console.cloudinary.com/
2. You'll see your **Cloud Name** at the top
3. Copy it - you'll need this for your `.env` file

## Step 3: Create an Unsigned Upload Preset

For security, we use "unsigned uploads" so your API secret isn't exposed in the browser.

1. In your Cloudinary Dashboard, go to **Settings** (gear icon) → **Upload**
2. Scroll down to **Upload presets**
3. Click **Add upload preset**
4. Configure the preset:
   - **Signing Mode**: Change to **Unsigned**
   - **Preset name**: Give it a name like `macro-photos-unsigned`
   - **Folder**: Set to `macro-photos` (optional but recommended)
   - **Use filename or externally defined Public ID**: Enable this if you want control over filenames
   - **Unique filename**: Enable this to prevent overwrites
5. Click **Save**
6. Copy the **preset name** - you'll need this for your `.env` file

## Step 4: Update Your .env File

Open `/Users/evandavis/macro-site/.env` and update these values:

```bash
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
VITE_CLOUDINARY_UPLOAD_PRESET=macro-photos-unsigned
```

Replace:
- `your_cloud_name_here` with your Cloud Name from Step 2
- `macro-photos-unsigned` with your preset name from Step 3

## Step 5: Restart Your Dev Server

```bash
npm run dev
```

Your admin page should now upload images to Cloudinary instead of Supabase Storage!

## Testing

1. Go to `/admin` in your app
2. Upload a test image
3. Check your Cloudinary Media Library: https://console.cloudinary.com/console/media_library
4. You should see the uploaded image in the `macro-photos` folder

## What Changed?

- **Image Storage**: Moved from Supabase Storage → Cloudinary (25GB free)
- **Database**: Still using Supabase (for photo metadata)
- **Image Optimization**: Automatic WebP conversion at 85% quality, max 2500px

## Free Tier Limits

- **Storage**: 25GB
- **Bandwidth**: 25GB/month
- **Transformations**: 25 credits/month
- **Images**: Unlimited

This should be plenty for a personal macro photography portfolio!
