import type { APIRoute } from 'astro';

/**
 * robots.txt: generated so the Sitemap line uses the configured `site`
 * automatically once the production domain is set in astro.config.mjs.
 */
const get: APIRoute = ({ site }) => {
	const lines = ['User-agent: *', 'Allow: /'];
	if (site) lines.push('', `Sitemap: ${new URL('sitemap-index.xml', site).href}`);
	return new Response(lines.join('\n'), {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	});
};

export const GET = get;
