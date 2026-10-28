// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	// Production URL used for canonical links, sharing metadata and sitemap.
	site: 'https://cloudlocal.netlify.app',
	integrations: [sitemap()],
	vite: {
		plugins: [tailwindcss()],
	},
});
