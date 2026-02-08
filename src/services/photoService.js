// src/services/photoService.js

import supabase from '@/supabaseClient';

/**
 * Centralized service for photo-related data operations
 * All photo fetching logic goes through this service layer
 */
export const photoService = {
  /**
   * Fetch all photos with optional limit
   * @param {number} limit - Maximum number of photos to fetch
   * @returns {Promise<Array>} Array of photo objects
   */
  async getAllPhotos(limit = 100) {
    const { data, error } = await supabase
      .from('photos')
      .select('*')
      .order('sort_order', { ascending: true })
      .limit(limit);

    if (error) {
      console.error('Error fetching photos:', error);
      throw error;
    }

    return data || [];
  },

  /**
   * Fetch photos filtered by category
   * @param {string} category - Category to filter by
   * @param {number} limit - Maximum number of photos to fetch
   * @returns {Promise<Array>} Array of photo objects
   */
  async getPhotosByCategory(category, limit = 100) {
    const { data, error } = await supabase
      .from('photos')
      .select('*')
      .eq('category', category)
      .order('sort_order', { ascending: true })
      .limit(limit);

    if (error) {
      console.error('Error fetching photos by category:', error);
      throw error;
    }

    return data || [];
  },

  /**
   * Fetch featured photos for the home page
   * @param {number} limit - Maximum number of featured photos to fetch
   * @returns {Promise<Array>} Array of featured photo objects
   */
  async getFeaturedPhotos(limit = 20) {
    const { data, error } = await supabase
      .from('photos')
      .select('*')
      .eq('featured', true)
      .order('sort_order', { ascending: true })
      .limit(limit);

    if (error) {
      console.error('Error fetching featured photos:', error);
      throw error;
    }

    return data || [];
  }
};
