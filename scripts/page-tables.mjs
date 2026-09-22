// Regenerates the page tables in README.md and docs/index.md from the
// sidebar in src/pages.mjs and each page's frontmatter. Each table sits
// between `<!-- pages: Group label, ... -->` and `<!-- /pages -->`.
//
//   node scripts/page-tables.mjs          rewrite the tables
//   node scripts/page-tables.mjs --check  fail if any table is out of date
import { readFileSync, writeFileSync } from 'node:fs';
import { readPages, sidebar } from '../src/pages.mjs';

const targets = [
	{ file: 'README.md', link: (file) => `[docs/${file}](docs/${file})` },
	{ file: 'docs/index.md', link: (file, page) => `[${page.title}](${file})` },
];

const check = process.argv.includes('--check');
const pages = readPages();
const problems = [];

const listed = sidebar.flatMap((group) => group.items.map((slug) => `${slug}.md`));
for (const file of listed) {
	if (!pages[file]) problems.push(`src/pages.mjs lists ${file}, which is not in docs/`);
	else if (!pages[file].description) problems.push(`docs/${file} has no description`);
}
for (const file of Object.keys(pages)) {
	if (file !== 'index.md' && !listed.includes(file)) {
		problems.push(`docs/${file} is missing from the sidebar in src/pages.mjs`);
	}
}
if (problems.length) fail(problems);

for (const { file, link } of targets) {
	const source = readFileSync(file, 'utf8');
	const covered = new Set();
	const updated = source.replace(
		/(<!-- pages: (.+?) -->\n)[\s\S]*?(<!-- \/pages -->)/g,
		(_, open, labels, close) => {
			const rows = labels.split(',').flatMap((label) => {
				const group = sidebar.find((g) => g.label === label.trim());
				if (!group) fail([`${file}: no sidebar group called "${label.trim()}"`]);
				covered.add(group.label);
				return group.items.map((slug) => {
					const page = pages[`${slug}.md`];
					return `| ${link(`${slug}.md`, page)} | ${page.description} |`;
				});
			});
			return `${open}| Page | Description |\n| --- | --- |\n${rows.join('\n')}\n${close}`;
		},
	);

	const missing = sidebar.filter((g) => !covered.has(g.label)).map((g) => g.label);
	if (missing.length) fail([`${file} has no table for: ${missing.join(', ')}`]);

	if (updated === source) continue;
	if (check) fail([`${file}: page tables are out of date, run \`npm run pages\``]);
	writeFileSync(file, updated);
	console.log(`Updated ${file}`);
}

function fail(messages) {
	for (const message of messages) console.error(message);
	process.exit(1);
}
