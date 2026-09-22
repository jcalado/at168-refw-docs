import { defineMdastPlugin } from 'satteri';

// Pages write callouts as GitHub alerts (`> [!WARNING]`) so they render on
// GitHub. Turn them into `:::caution`-style directives, which Starlight's
// asides plugin (running after this one) renders as asides on the site.
const asides = { note: 'note', tip: 'tip', important: 'note', warning: 'caution', caution: 'danger' };

export default function githubAlerts() {
	return defineMdastPlugin({
		name: 'github-alerts',
		blockquote(node, ctx) {
			const [paragraph] = node.children;
			const [text] = paragraph?.type === 'paragraph' ? paragraph.children : [];
			if (text?.type !== 'text') return;

			const match = /^\[!(\w+)\]\s*/.exec(text.value);
			const aside = match && asides[match[1].toLowerCase()];
			if (!aside) return;

			ctx.setProperty(text, 'value', text.value.slice(match[0].length));
			ctx.replaceNode(node, { type: 'containerDirective', name: aside, children: [...node.children] });
		},
	});
}
