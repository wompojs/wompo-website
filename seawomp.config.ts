import { defineConfig } from 'seawomp/config';
import { i18nConfig } from './src/i18n-config.js';

export { i18nConfig };

export default defineConfig({
	title: 'Wompo',
	siteUrl: 'https://wompo.dev',
	i18n: i18nConfig,
	navigation: {
		viewTransitions: false,
	},
	discoverability: {
		sitemapTxt: true,
		robotsTxt: true,
		llmsTxt: {
			title: 'Wompo',
			description:
				'Wompo is a lightweight JavaScript library for building reactive, reusable, server-renderable Web Components with a React-like API. It is designed for framework-agnostic UI primitives that can be shared across vanilla apps, SSR pages, and component libraries.',
			sections: [
				{
					title: 'Canonical URLs',
					links: [
						{ title: 'Website', href: '/' },
						{ title: 'Documentation', href: '/docs/introduction' },
						{ title: 'Italian documentation', href: '/it/docs/introduction' },
						{ title: 'Quick start', href: '/docs/guides/quick-start' },
						{ title: 'Installation', href: '/docs/installation' },
						{ title: 'Server-side rendering', href: '/docs/ssr' },
						{ title: 'TypeScript', href: '/docs/typescript' },
						{ title: 'GitHub', href: 'https://github.com/wompojs/wompo' },
					],
				},
				{ title: 'Install', body: '```sh\nnpm i wompo\n```' },
				{
					title: 'Core Example',
					body: "```ts\nimport { defineWompo, html, useState } from 'wompo';\n\nfunction CounterButton() {\n  const [count, setCount] = useState(0);\n\n  return html`\n    <button @click=${() => setCount(count + 1)}>\n      Count: ${count}\n    </button>\n  `;\n}\n\ndefineWompo(CounterButton, { name: 'counter-button' });\n```",
				},
				{
					title: 'Important Concepts',
					body: '- `defineWompo` registers a function component as a native custom element.\n- `html` returns safe template output for component rendering.\n- Hooks include `useState`, `useEffect`, `useMemo`, `useCallback`, `useRef`, `useReducer`, `useContext`, `useAsync`, `useId`, `useLayoutEffect`, `useSelf`, `useExposed`, and `useHook`.\n- Components can be rendered on the server and hydrated on the client.\n- Wompo works with standard HTML attributes, events, slots, custom elements, and CSS.',
				},
				{
					title: 'Documentation Map',
					links: [
						{ title: 'Guides', href: '/docs/guides' },
						{ title: 'Hooks', href: '/docs/hooks' },
						{ title: 'Components', href: '/docs/components' },
						{ title: 'APIs', href: '/docs/apis' },
						{ title: 'Styling', href: '/docs/guides/styling' },
						{ title: 'Custom hooks', href: '/docs/guides/custom-hooks' },
					],
				},
			],
		},
	},
	redirects: [
		{ source: '/docs', destination: '/docs/introduction', status: 308 },
		{ source: '/it/docs', destination: '/it/docs/introduction', status: 308 },
	],
	port: 5173,
});
