import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// Pages live in the top-level docs/ folder so they stay readable on
// GitHub, rather than in Starlight's default src/content/docs/.
export const collections = {
	docs: defineCollection({
		loader: glob({ base: './docs', pattern: '**/[^_]*.{md,mdx}' }),
		schema: docsSchema(),
	}),
};
