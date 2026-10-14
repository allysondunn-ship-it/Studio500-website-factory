/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_FORM_ENDPOINT?: string;
  readonly CMS_PROVIDER?: 'local' | 'storyblok';
  readonly STORYBLOK_TOKEN?: string;
  readonly STORYBLOK_VERSION?: 'draft' | 'published';
  readonly STORYBLOK_REGION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
