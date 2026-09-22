import { readdirSync, readFileSync } from 'node:fs';

// The one list of pages: their sidebar groups and order. The page tables in
// README.md and docs/index.md are generated from it by `npm run pages`.
export const sidebar = [
	{
		label: 'Using the radio',
		items: ['display', 'keys', 'calls', 'channels', 'scanning', 'power', 'fm-radio-and-clock'],
	},
	{
		label: 'Watching DMR traffic',
		items: ['mat3', 'packet-log'],
	},
	{
		label: 'Reference',
		items: ['extras-menu', 'shortcuts', 'renamed-menus', 'bug-fixes'],
	},
	{
		label: 'For tool authors',
		items: ['settings-storage', 'packet-log-format'],
	},
];

// Title and description of each page, keyed by filename, from frontmatter.
export function readPages(dir = 'docs') {
	const pages = {};
	for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
		const source = readFileSync(`${dir}/${file}`, 'utf8');
		const field = (name) => new RegExp(`^${name}:\\s*"?(.+?)"?\\s*$`, 'm').exec(source)?.[1];
		pages[file] = { title: field('title'), description: field('description') };
	}
	return pages;
}
