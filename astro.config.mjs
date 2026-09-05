// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// CityboundNomad — Tier 1 static site per STRANDWAY-WEB-STANDARD.md.
// Static output only (no SSR adapter) so `dist/` can be uploaded straight to
// Hostinger's public_html. `build.format: 'file'` emits /travel.html rather
// than /travel/index.html; public/.htaccess rewrites the extensionless URLs.
export default defineConfig({
  site: 'https://cityboundnomad.com',
  trailingSlash: 'never',
  build: { format: 'file' },
  // /links is the link-in-bio page: noindex, and kept out of the sitemap so it
  // doesn't compete with the homepage for the brand's own name.
  integrations: [sitemap({ filter: (page) => !page.endsWith('/links') })],
  markdown: {
    gfm: true,
    smartypants: true,
  },
});
