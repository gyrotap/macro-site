// src/sanityClient.js

import { createClient } from '@sanity/client';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const token = import.meta.env.VITE_SANITY_API_TOKEN;

if (!projectId) {
  throw new Error('Missing Sanity project ID. Please check your .env file.');
}

export const sanityClient = createClient({
  projectId,
  dataset,
  token,
  useCdn: true,
  apiVersion: '2024-01-01',
});

// Client with write access (uses token, no CDN)
export const sanityWriteClient = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: '2024-01-01',
});

export default sanityClient;
