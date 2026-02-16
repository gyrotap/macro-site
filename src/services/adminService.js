// src/services/adminService.js

import { sanityWriteClient } from '@/sanityClient';

/**
 * Admin service for managing photo uploads
 * Images → Sanity CDN | Metadata → Neon (via Vercel API)
 */
export const adminService = {
  /**
   * Upload a photo file to Sanity's image CDN
   * @param {File} file - The image file to upload
   * @returns {Promise<string>} The public URL of the uploaded image
   */
  async uploadImage(file) {
    try {
      const asset = await sanityWriteClient.assets.upload('image', file, {
        filename: file.name,
      });

      // Build the CDN URL from the asset
      const imageUrl = `https://cdn.sanity.io/images/${import.meta.env.VITE_SANITY_PROJECT_ID}/${import.meta.env.VITE_SANITY_DATASET}/${asset._id.replace('image-', '').replace(/-([^-]+)$/, '.$1')}`;
      return imageUrl;
    } catch (error) {
      console.error('Error uploading to Sanity:', error);
      throw error;
    }
  },

  /**
   * Create a new photo entry in the database via API
   * @param {Object} photoData - Photo metadata
   * @returns {Promise<Object>} The created photo record
   */
  async createPhoto(photoData) {
    const response = await fetch('/api/photos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(photoData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create photo entry');
    }

    return await response.json();
  },

  /**
   * Upload photo and create database entry in one operation
   * @param {File} file - The image file
   * @param {Object} metadata - Photo metadata (title, category, etc.)
   * @returns {Promise<Object>} The created photo record
   */
  async uploadPhoto(file, metadata) {
    // Upload image to Sanity CDN
    const imageUrl = await this.uploadImage(file);

    // Save metadata to Neon via API
    const photoData = {
      image_url: imageUrl,
      title: metadata.title,
      category: metadata.category || null,
      subject: metadata.subject || null,
      magnification: metadata.magnification || null,
      featured: metadata.featured || false,
      sort_order: metadata.sort_order || 999,
      date_taken_month: metadata.date_taken_month || null,
      date_taken_year: metadata.date_taken_year || null,
      file_size_mb: metadata.file_size_mb || null,
      megapixels: metadata.megapixels || null
    };

    return await this.createPhoto(photoData);
  },

  /**
   * Get the next available sort order
   * @returns {Promise<number>} The next sort order number
   */
  async getNextSortOrder() {
    try {
      const response = await fetch('/api/next-sort-order');
      if (!response.ok) return 1;
      const data = await response.json();
      return data.next_order || 1;
    } catch (error) {
      console.error('Error getting sort order:', error);
      return 1;
    }
  }
};
