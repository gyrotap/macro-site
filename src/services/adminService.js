// src/services/adminService.js

import supabase from '@/supabaseClient';

/**
 * Admin service for managing photo uploads
 */
export const adminService = {
  /**
   * Upload a photo file to Cloudinary
   * @param {File} file - The image file to upload
   * @returns {Promise<string>} The public URL of the uploaded image
   */
  async uploadImage(file) {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error('Missing Cloudinary configuration. Please check your .env file.');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', 'macro-photos');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error(`Cloudinary upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw error;
    }
  },

  /**
   * Create a new photo entry in the database
   * @param {Object} photoData - Photo metadata
   * @returns {Promise<Object>} The created photo record
   */
  async createPhoto(photoData) {
    const { data, error } = await supabase
      .from('photos')
      .insert([photoData])
      .select()
      .single();

    if (error) {
      console.error('Error creating photo entry:', error);
      throw error;
    }

    return data;
  },

  /**
   * Upload photo and create database entry in one operation
   * @param {File} file - The image file
   * @param {Object} metadata - Photo metadata (title, category, etc.)
   * @returns {Promise<Object>} The created photo record
   */
  async uploadPhoto(file, metadata) {
    // Upload image first
    const imageUrl = await this.uploadImage(file);

    // Create database entry
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
    const { data, error } = await supabase
      .from('photos')
      .select('sort_order')
      .order('sort_order', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Error getting sort order:', error);
      return 1;
    }

    return data && data.length > 0 ? data[0].sort_order + 1 : 1;
  }
};
