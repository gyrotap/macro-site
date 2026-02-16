// src/services/adminService.js

/**
 * Admin service for managing photo uploads
 * Images → Sanity CDN (via server API) | Metadata → Neon (via server API)
 * All write operations require auth token from /api/login
 */

function getAuthToken() {
  const token = sessionStorage.getItem('admin_token');
  if (!token) throw new Error('Not authenticated');
  return token;
}

export const adminService = {
  /**
   * Upload a photo file to Sanity via server-side API
   * @param {File} file - The image file to upload
   * @returns {Promise<string>} The public URL of the uploaded image
   */
  async uploadImage(file) {
    const token = getAuthToken();

    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer();
    const base64 = btoa(
      new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );

    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        imageData: base64,
        filename: file.name,
        contentType: file.type,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Upload failed');
    }

    const { imageUrl } = await response.json();
    return imageUrl;
  },

  /**
   * Create a new photo entry in the database via API
   * @param {Object} photoData - Photo metadata
   * @returns {Promise<Object>} The created photo record
   */
  async createPhoto(photoData) {
    const token = getAuthToken();

    const response = await fetch('/api/photos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
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
    // Upload image to Sanity CDN via server
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
