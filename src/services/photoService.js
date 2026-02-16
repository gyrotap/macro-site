// src/services/photoService.js

/**
 * Centralized service for photo-related data operations
 * Fetches from Neon database via Vercel API routes
 */
export const photoService = {
  /**
   * Fetch all photos with optional limit
   * @param {number} limit - Maximum number of photos to fetch
   * @returns {Promise<Array>} Array of photo objects
   */
  async getAllPhotos(limit = 100) {
    const response = await fetch(`/api/photos?limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch photos');
    }
    return await response.json();
  },

  /**
   * Fetch photos filtered by category
   * @param {string} category - Category to filter by
   * @param {number} limit - Maximum number of photos to fetch
   * @returns {Promise<Array>} Array of photo objects
   */
  async getPhotosByCategory(category, limit = 100) {
    const response = await fetch(`/api/photos?category=${encodeURIComponent(category)}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch photos by category');
    }
    return await response.json();
  },

  /**
   * Fetch featured photos for the home page
   * @param {number} limit - Maximum number of featured photos to fetch
   * @returns {Promise<Array>} Array of featured photo objects
   */
  async getFeaturedPhotos(limit = 20) {
    const response = await fetch(`/api/photos?featured=true&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch featured photos');
    }
    return await response.json();
  }
};
