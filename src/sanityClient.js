// src/sanityClient.js
// Read-only client for public data (no secret token)

import { createClient } from '@sanity/client';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

if (!projectId) {
  throw new Error('Missing Sanity project ID. Please check your .env file.');
}

// Public read-only client (no token needed for public datasets)
export const sanityClient = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion: '2024-01-01',
});

export default sanityClient;
