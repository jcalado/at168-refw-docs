import { basename } from 'node:path';
import { fileURLToPath } from 'node:url';

// starlight-links-validator works out each page's URL from its path under
// src/content/docs/, so it can't place pages kept in docs/. It prefers a
// `slug` from frontmatter, so give it one for the page being rendered.
// Only the validator sees this: routes come from the content loader.
export default function validatorSlugs() {
	return ({ fileURL, data }) => {
		const frontmatter = data.astro?.frontmatter;
		if (!fileURL || !frontmatter || frontmatter.slug) return;
		const page = basename(fileURLToPath(fileURL)).replace(/\.mdx?$/, '');
		frontmatter.slug = page === 'index' ? '/' : page;
		return null; // nothing to run on the tree itself
	};
}
