// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';
import { satteri } from '@astrojs/markdown-satteri';
import githubAlerts from './src/github-alerts.mjs';
import mdLinks from './src/md-links.mjs';
import validatorSlugs from './src/validator-slugs.mjs';
import { sidebar } from './src/pages.mjs';

const base = '/at168-refw-docs';

export default defineConfig({
	site: 'https://jcalado.com',
	base,
	markdown: {
		processor: satteri({ mdastPlugins: [mdLinks({ base }), githubAlerts(), validatorSlugs()] }),
	},
	integrations: [
		starlight({
			title: 'reFW for the AT-D168UV',
			description:
				'Community documentation for reFW, a custom firmware for the AnyTone AT-D168UV.',
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/jcalado/at168-refw-docs',
				},
			],
			editLink: {
				baseUrl: 'https://github.com/jcalado/at168-refw-docs/edit/main/',
			},
			lastUpdated: true,
			// Pages live in docs/, not src/content/docs/, so opt them into
			// Starlight's Markdown features (heading anchor links, asides).
			markdown: { processedDirs: ['./docs'] },
			plugins: [starlightLinksValidator()],
			sidebar,
		}),
	],
});
