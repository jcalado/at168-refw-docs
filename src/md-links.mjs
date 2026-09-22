import { defineMdastPlugin } from 'satteri';
import { readPages } from './pages.mjs';

// The pages link to each other as `extras-menu.md#batt-view` so the links
// work when browsing the repo on GitHub. Rewrite those to site URLs, and
// where the link text is just the filename, show the page title instead.
export default function mdLinks({ base = '', dir = 'docs' } = {}) {
	const pages = readPages(dir);

	return defineMdastPlugin({
		name: 'md-links',
		link(node, ctx) {
			const match = /^(?:\.\/)?([\w-]+\.md)(#.*)?$/.exec(node.url);
			if (!match) return;
			const [, file, hash = ''] = match;
			const page = file.slice(0, -3);
			const slug = page === 'index' ? '' : `${page}/`;
			ctx.setProperty(node, 'url', `${base}/${slug}${hash}`);

			const [child] = node.children;
			if (node.children.length === 1 && child.type === 'text' && child.value === file && pages[file]?.title) {
				ctx.setProperty(node, 'children', [{ type: 'text', value: pages[file].title }]);
			}
		},
	});
}
