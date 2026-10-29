import { defineMdastPlugin } from 'satteri';

// Pages draw flows as ```mermaid code blocks, which GitHub renders as
// diagrams. On the site, hand them to Mermaid in the browser instead of
// syntax highlighting them: src/components/Head.astro renders every
// `pre.mermaid` and redraws it when the theme changes.
const escape = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export default function mermaid() {
	return defineMdastPlugin({
		name: 'mermaid',
		code(node) {
			if (node.lang !== 'mermaid') return;
			return { raw: `<pre class="mermaid not-content">${escape(node.value)}</pre>`, mdxExpressions: false };
		},
	});
}
