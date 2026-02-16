/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SANITY_PROJECT_ID: string
  readonly VITE_SANITY_DATASET: string
  readonly VITE_SANITY_API_TOKEN: string
  readonly VITE_ADMIN_USERNAME: string
  readonly VITE_ADMIN_PASSWORD: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
