import { defineWompo } from 'wompo';
import getPageLayout, { Contents } from '../../utils/getPageLayout.js';
import Code from '../../components/Code.js';
import Note from '../../components/Note.js';
import { Link } from 'wompo-router';

const content: Contents = {
	title: 'Server-Side Rendering',
	description:
		"Render the same Wompo components on the server, stream them out with Suspense, hydrate them on the client as islands, and call typed Server Actions.",
	sections: [
		{
			title: 'Overview',
			id: 'overview',
			content: (
				<>
					<p>
						Wompo ships a string-based SSR engine, a streaming renderer, an islands-first
						hydration runtime, and a typed Server Actions API. The exact same components written
						with <code>defineWompo</code> render on the server, hydrate selectively on the
						client, and stream their suspended content out of order.
					</p>
					<p>
						Three subpaths are exposed:
						<ul>
							<li>
								<code>wompo/ssr</code> — <code>renderToString</code>,{' '}
								<code>renderToStream</code>, <code>defineAction</code>, and the boundary
								runtime script.
							</li>
							<li>
								<code>wompo/hydrate</code> — the client-side <code>hydrate</code> function that
								upgrades islands.
							</li>
							<li>
								<code>wompo/devalue</code> — the structured-clone-friendly serializer used for
								island props (cycles, <code>Date</code>, <code>Map</code>, <code>Set</code>,
								<code>BigInt</code>, <code>undefined</code>, <code>NaN</code>,{' '}
								<code>Infinity</code>).
							</li>
						</ul>
					</p>
				</>
			),
		},
		{
			title: 'renderToString',
			id: 'render-to-string',
			content: (
				<>
					<p>
						<code>renderToString</code> renders a component (and all the components it nests) to
						an HTML string. It awaits every <Link to='/docs/hooks/useAsync'>useAsync</Link> and{' '}
						<Link to='/docs/apis/lazy'>lazy</Link> call inside the tree before resolving.
					</p>
					<Code
						code={`
              import { renderToString } from 'wompo/ssr';
              import Page from './Page.js';

              const { html, headTags, css, islands } = await renderToString(Page, { user });

              // html      — '<page-component ...>…</page-component>'
              // headTags  — inline <style> block with every component's CSS (dedup'd)
              // css       — Map<componentName, css> for extraction into separate files
              // islands   — per-component hydration metadata (name, mode, doc-order index)
            `}
						language='js'
					/>
					<p>
						The second argument is the root props object. The third is an options object:
						<ul>
							<li>
								<code>hydration</code> — <code>'islands'</code> (default) emits the markers
								the client runtime needs; <code>'none'</code> produces a plain static HTML
								string.
							</li>
							<li>
								<code>css</code> — <code>'inline'</code> (default) returns a ready-to-inject
								<code>headTags</code>; <code>'extract'</code> leaves the CSS map for you to
								write to a stylesheet; <code>'none'</code> skips CSS collection.
							</li>
							<li>
								<code>nonce</code> — CSP nonce applied to inline <code>&lt;script&gt;</code>{' '}
								tags.
							</li>
							<li>
								<code>base</code> — URL prefix for emitted chunks (default <code>'/_/'</code>).
							</li>
							<li>
								<code>signal</code> — optional <code>AbortSignal</code>.
							</li>
						</ul>
					</p>
				</>
			),
		},
		{
			title: 'renderToStream + Suspense',
			id: 'render-to-stream',
			content: (
				<>
					<p>
						<code>renderToStream</code> returns a{' '}
						<code>ReadableStream&lt;Uint8Array&gt;</code> you can pipe to any standard HTTP
						response. The shell (page chrome + any Suspense fallback) flushes first; resolved
						boundaries are appended out-of-order as their <code>useAsync</code> work completes,
						so a slow island never blocks a fast one.
					</p>
					<Code
						code={`
              import { renderToStream, BOUNDARY_RUNTIME_SCRIPT } from 'wompo/ssr';
              import Page from './Page.js';

              const stream = renderToStream(Page, props);
              // 1. <script>self.__wompoR=...</script> + inline <style> + shell with
              //    <wompo-boundary id="Bn">FALLBACK</wompo-boundary>
              // 2. for every resolved boundary, in completion order:
              //    <template data-wompo-resolve="Bn">…real content…</template>
              //    <script>self.__wompoR("Bn")</script>
            `}
						language='js'
					/>
					<p>
						The inline runtime (<code>BOUNDARY_RUNTIME_SCRIPT</code>, ~140 bytes) is prepended
						automatically when you call <code>renderToStream</code>. It swaps each{' '}
						<code>&lt;template data-wompo-resolve&gt;</code> into its{' '}
						<code>&lt;wompo-boundary&gt;</code> placeholder as chunks arrive. Wrap any slow tree
						in a <Link to='/docs/components/suspense'>Suspense</Link> boundary to opt in.
					</p>
					<Code
						code={`
              import { defineWompo, html, Suspense, useAsync } from 'wompo';

              function SlowList() {
                const items = useAsync(() => fetch('/api/items').then((r) => r.json()), []);
                return html\`<ul>\${items.map((i) => html\`<li>\${i.name}</li>\`)}</ul>\`;
              }
              defineWompo(SlowList);

              export default function Page() {
                return html\`
                  <main>
                    <h1>Catalog</h1>
                    <\${Suspense} fallback=\${html\`<p>Loading…</p>\`}>
                      <\${SlowList} />
                    </\${Suspense}>
                  </main>
                \`;
              }
              defineWompo(Page);
            `}
						language='js'
					/>
				</>
			),
		},
		{
			title: 'Islands & hydration',
			id: 'islands',
			content: (
				<>
					<p>
						A component becomes an <b>island</b> in two ways:
						<ol>
							<li>
								Declare a default mode at definition time, by passing{' '}
								<code>island: 'load' | 'idle' | 'visible'</code> as a{' '}
								<Link to='/docs/apis/defineWompo'>defineWompo</Link> option.
							</li>
							<li>
								Override per call-site with <code>client:load</code>, <code>client:idle</code>,{' '}
								<code>client:visible</code>, or disable it with <code>client:none</code>. The
								attribute always wins over the component default.
							</li>
						</ol>
					</p>
					<Code
						code={`
              // Counter.js
              import { defineWompo, html, useState } from 'wompo';

              export default function Counter({ start = 0 }) {
                const [count, setCount] = useState(start);
                return html\`<button @click=\${() => setCount(count + 1)}>\${count}</button>\`;
              }
              defineWompo(Counter, { name: 'my-counter', island: 'visible' });

              // Page.js (server)
              import { defineWompo, html } from 'wompo';
              import Counter from './Counter.js';

              export default function Page() {
                return html\`
                  <main>
                    <\${Counter} start=\${5} />        <!-- island: visible (default) -->
                    <\${Counter} start=\${0} client:load /> <!-- override: hydrate immediately -->
                  </main>
                \`;
              }
              defineWompo(Page);
            `}
						language='js'
					/>
					<p>
						On the server, every island emits <code>data-wompo-island</code> and a sibling{' '}
						<code>&lt;template data-wompo-props&gt;</code> carrying its initial props
						serialized via the devalue-style codec (cycles, <code>Date</code>, <code>Map</code>,{' '}
						<code>Set</code>, <code>BigInt</code>, <code>undefined</code>, <code>NaN</code>,{' '}
						<code>Infinity</code> are all preserved).
					</p>
					<p>
						On the client, call <code>hydrate</code> once after the document is parsed:
					</p>
					<Code
						code={`
              // Page.client.js (loaded from the document shell)
              import { hydrate } from 'wompo/hydrate';
              import './Counter.js'; // makes sure customElements.define has run

              hydrate(document);
              // Each [data-wompo-island] is hydrated per its mode:
              //   load    → immediately
              //   idle    → requestIdleCallback (fallback setTimeout)
              //   visible → IntersectionObserver with rootMargin: 200px
            `}
						language='js'
					/>
					<Note severity='info'>
						<b>Lazy island chunks:</b> if your framework exposes a global{' '}
						<code>window.__WOMPRO_ISLANDS</code> mapping{' '}
						<code>tagName → moduleUrl</code>, the hydration runtime dynamically imports the
						matching chunk on demand instead of warning.
					</Note>
					<Note severity='warning'>
						If the SSR DOM doesn't structurally match what the component would clone (mismatched
						elements, missing markers), Wompo falls back to a destructive re-render and logs a{' '}
						<code>console.warn</code>. Fix the mismatch in your template rather than ignoring
						the warning.
					</Note>
				</>
			),
		},
		{
			title: 'Server Actions',
			id: 'server-actions',
			content: (
				<>
					<p>
						<code>defineAction</code> wraps an async function so that the same reference is
						usable on both sides of the wire: on the server it's a plain function; when it ends
						up in an island's serialized props, the client receives a transparent fetch proxy
						instead of the function body.
					</p>
					<Code
						code={`
              // actions.js
              import { defineAction } from 'wompo/ssr';

              export const addItem = defineAction(async (name) => {
                // …hit a DB, queue, etc.
                return { id: crypto.randomUUID(), name };
              });
            `}
						language='js'
					/>
					<p>
						Pass the action through to an island in the usual way, then call it as if it were
						local:
					</p>
					<Code
						code={`
              // ItemForm.js (island)
              import { defineWompo, html, useState } from 'wompo';

              export default function ItemForm({ onAdd }) {
                const [name, setName] = useState('');
                const submit = async (e) => {
                  e.preventDefault();
                  const item = await onAdd(name); // → POST /_action/<id>
                  setName('');
                };
                return html\`
                  <form @submit=\${submit}>
                    <input value=\${name} @input=\${(e) => setName(e.target.value)} />
                    <button>Add</button>
                  </form>
                \`;
              }
              defineWompo(ItemForm, { name: 'item-form', island: 'load' });

              // Page.js (server)
              import { defineWompo, html } from 'wompo';
              import ItemForm from './ItemForm.js';
              import { addItem } from './actions.js';

              export default function Page() {
                return html\`<\${ItemForm} onAdd=\${addItem} />\`;
              }
              defineWompo(Page);
            `}
						language='js'
					/>
					<Note severity='info'>
						The <code>/_action/:id</code> endpoint that the proxy hits is wired up by your
						server framework. The companion{' '}
						<a href='https://github.com/lorenzolancero/wompro' target='_blank' rel='noreferrer'>
							wompro
						</a>{' '}
						framework registers it for you; in a custom stack, use{' '}
						<code>getRegisteredAction(id)</code> exposed by <code>wompo/ssr</code> to look up
						the function and invoke it with the deserialized arguments.
					</Note>
				</>
			),
		},
		{
			title: 'Context on the server',
			id: 'context',
			content: (
				<>
					<p>
						<Link to='/docs/apis/createContext'>Contexts</Link> work on the server the same way
						they do on the client: wrap a subtree in a Provider and consume the value with{' '}
						<Link to='/docs/hooks/useContext'>useContext</Link>. The server runtime maintains a
						per-context stack, so nested providers shadow outer values correctly.
					</p>
				</>
			),
		},
	],
};

export default function Ssr() {
	return getPageLayout(content);
}

defineWompo(Ssr, {
	name: 'ssr-page',
});
