// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// The public URL of the site. Used for canonical links, Open Graph tags and the sitemap.
// Set SITE_URL in your hosting provider's environment settings once you own a domain.
const SITE_URL = process.env.SITE_URL || 'https://studio500.example';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      // Sample concepts are fictional businesses — keep them out of search engines.
      filter: (page) => !page.includes('/samples/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
