// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	// Netlify deploy: once the site is created, set `site` to its final URL
	// (e.g. 'https://cloudlocal.netlify.app') and redeploy. It powers the
	// canonical URL, og:url, the sitemap and robots.txt.
	// site: 'https://YOUR-SITE.netlify.app',
	integrations: [sitemap()],
	vite: {
		plugins: [tailwindcss()],
	},
});
