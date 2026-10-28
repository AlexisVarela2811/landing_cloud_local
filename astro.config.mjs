// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	// TODO(deploy): set this to the production URL, e.g. 'https://cloudlocal.netlify.app'.
	// It powers canonical/og:url, the sitemap and robots.txt. Left unset on purpose
	// until the domain is decided; meta tags degrade gracefully without it.
	// site: 'https://YOUR_DOMAIN',
	integrations: [sitemap()],
	vite: {
		plugins: [tailwindcss()],
	},
});
