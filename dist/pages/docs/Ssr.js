import { Fragment, jsx, jsxs } from "wompo/jsx-runtime";
import { defineWompo } from "wompo";
import getPageLayout from "../../utils/getPageLayout.js";
import Code from "../../components/Code.js";
import Note from "../../components/Note.js";
import { Link } from "wompo-router";
const content = {
  title: "Server-Side Rendering",
  description: "Render the same Wompo components on the server, stream them out with Suspense, hydrate them on the client as islands, and call typed Server Actions.",
  sections: [
    {
      title: "Overview",
      id: "overview",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "Wompo ships a string-based SSR engine, a streaming renderer, an islands-first hydration runtime, and a typed Server Actions API. The exact same components written with ",
          /* @__PURE__ */ jsx("code", { children: "defineWompo" }),
          " render on the server, hydrate selectively on the client, and stream their suspended content out of order."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Three subpaths are exposed:",
          /* @__PURE__ */ jsxs("ul", { children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("code", { children: "wompo/ssr" }),
              " \u2014 ",
              /* @__PURE__ */ jsx("code", { children: "renderToString" }),
              ",",
              " ",
              /* @__PURE__ */ jsx("code", { children: "renderToStream" }),
              ", ",
              /* @__PURE__ */ jsx("code", { children: "defineAction" }),
              ", and the boundary runtime script."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("code", { children: "wompo/hydrate" }),
              " \u2014 the client-side ",
              /* @__PURE__ */ jsx("code", { children: "hydrate" }),
              " function that upgrades islands."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("code", { children: "wompo/devalue" }),
              " \u2014 the structured-clone-friendly serializer used for island props (cycles, ",
              /* @__PURE__ */ jsx("code", { children: "Date" }),
              ", ",
              /* @__PURE__ */ jsx("code", { children: "Map" }),
              ", ",
              /* @__PURE__ */ jsx("code", { children: "Set" }),
              ",",
              /* @__PURE__ */ jsx("code", { children: "BigInt" }),
              ", ",
              /* @__PURE__ */ jsx("code", { children: "undefined" }),
              ", ",
              /* @__PURE__ */ jsx("code", { children: "NaN" }),
              ",",
              " ",
              /* @__PURE__ */ jsx("code", { children: "Infinity" }),
              ")."
            ] })
          ] })
        ] })
      ] })
    },
    {
      title: "renderToString",
      id: "render-to-string",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("code", { children: "renderToString" }),
          " renders a component (and all the components it nests) to an HTML string. It awaits every ",
          /* @__PURE__ */ jsx(Link, { to: "/docs/hooks/useAsync", children: "useAsync" }),
          " and",
          " ",
          /* @__PURE__ */ jsx(Link, { to: "/docs/apis/lazy", children: "lazy" }),
          " call inside the tree before resolving."
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
              import { renderToString } from 'wompo/ssr';
              import Page from './Page.js';

              const { html, headTags, css, islands } = await renderToString(Page, { user });

              // html      \u2014 '<page-component ...>\u2026</page-component>'
              // headTags  \u2014 inline <style> block with every component's CSS (dedup'd)
              // css       \u2014 Map<componentName, css> for extraction into separate files
              // islands   \u2014 per-component hydration metadata (name, mode, doc-order index)
            `,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "The second argument is the root props object. The third is an options object:",
          /* @__PURE__ */ jsxs("ul", { children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("code", { children: "hydration" }),
              " \u2014 ",
              /* @__PURE__ */ jsx("code", { children: "'islands'" }),
              " (default) emits the markers the client runtime needs; ",
              /* @__PURE__ */ jsx("code", { children: "'none'" }),
              " produces a plain static HTML string."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("code", { children: "css" }),
              " \u2014 ",
              /* @__PURE__ */ jsx("code", { children: "'inline'" }),
              " (default) returns a ready-to-inject",
              /* @__PURE__ */ jsx("code", { children: "headTags" }),
              "; ",
              /* @__PURE__ */ jsx("code", { children: "'extract'" }),
              " leaves the CSS map for you to write to a stylesheet; ",
              /* @__PURE__ */ jsx("code", { children: "'none'" }),
              " skips CSS collection."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("code", { children: "nonce" }),
              " \u2014 CSP nonce applied to inline ",
              /* @__PURE__ */ jsx("code", { children: "<script>" }),
              " ",
              "tags."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("code", { children: "base" }),
              " \u2014 URL prefix for emitted chunks (default ",
              /* @__PURE__ */ jsx("code", { children: "'/_/'" }),
              ")."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("code", { children: "signal" }),
              " \u2014 optional ",
              /* @__PURE__ */ jsx("code", { children: "AbortSignal" }),
              "."
            ] })
          ] })
        ] })
      ] })
    },
    {
      title: "renderToStream + Suspense",
      id: "render-to-stream",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("code", { children: "renderToStream" }),
          " returns a",
          " ",
          /* @__PURE__ */ jsx("code", { children: "ReadableStream<Uint8Array>" }),
          " you can pipe to any standard HTTP response. The shell (page chrome + any Suspense fallback) flushes first; resolved boundaries are appended out-of-order as their ",
          /* @__PURE__ */ jsx("code", { children: "useAsync" }),
          " work completes, so a slow island never blocks a fast one."
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
              import { renderToStream, BOUNDARY_RUNTIME_SCRIPT } from 'wompo/ssr';
              import Page from './Page.js';

              const stream = renderToStream(Page, props);
              // 1. <script>self.__wompoR=...<\/script> + inline <style> + shell with
              //    <wompo-boundary id="Bn">FALLBACK</wompo-boundary>
              // 2. for every resolved boundary, in completion order:
              //    <template data-wompo-resolve="Bn">\u2026real content\u2026</template>
              //    <script>self.__wompoR("Bn")<\/script>
            `,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "The inline runtime (",
          /* @__PURE__ */ jsx("code", { children: "BOUNDARY_RUNTIME_SCRIPT" }),
          ", ~140 bytes) is prepended automatically when you call ",
          /* @__PURE__ */ jsx("code", { children: "renderToStream" }),
          ". It swaps each",
          " ",
          /* @__PURE__ */ jsx("code", { children: "<template data-wompo-resolve>" }),
          " into its",
          " ",
          /* @__PURE__ */ jsx("code", { children: "<wompo-boundary>" }),
          " placeholder as chunks arrive. Wrap any slow tree in a ",
          /* @__PURE__ */ jsx(Link, { to: "/docs/components/suspense", children: "Suspense" }),
          " boundary to opt in."
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
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
                    <\${Suspense} fallback=\${html\`<p>Loading\u2026</p>\`}>
                      <\${SlowList} />
                    </\${Suspense}>
                  </main>
                \`;
              }
              defineWompo(Page);
            `,
            language: "js"
          }
        )
      ] })
    },
    {
      title: "Islands & hydration",
      id: "islands",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "A component becomes an ",
          /* @__PURE__ */ jsx("b", { children: "island" }),
          " in two ways:",
          /* @__PURE__ */ jsxs("ol", { children: [
            /* @__PURE__ */ jsxs("li", { children: [
              "Declare a default mode at definition time, by passing",
              " ",
              /* @__PURE__ */ jsx("code", { children: "island: 'load' | 'idle' | 'visible'" }),
              " as a",
              " ",
              /* @__PURE__ */ jsx(Link, { to: "/docs/apis/defineWompo", children: "defineWompo" }),
              " option."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "Override per call-site with ",
              /* @__PURE__ */ jsx("code", { children: "client:load" }),
              ", ",
              /* @__PURE__ */ jsx("code", { children: "client:idle" }),
              ",",
              " ",
              /* @__PURE__ */ jsx("code", { children: "client:visible" }),
              ", or disable it with ",
              /* @__PURE__ */ jsx("code", { children: "client:none" }),
              ". The attribute always wins over the component default."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
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
            `,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "On the server, every island emits ",
          /* @__PURE__ */ jsx("code", { children: "data-wompo-island" }),
          " and a sibling",
          " ",
          /* @__PURE__ */ jsx("code", { children: "<template data-wompo-props>" }),
          " carrying its initial props serialized via the devalue-style codec (cycles, ",
          /* @__PURE__ */ jsx("code", { children: "Date" }),
          ", ",
          /* @__PURE__ */ jsx("code", { children: "Map" }),
          ",",
          " ",
          /* @__PURE__ */ jsx("code", { children: "Set" }),
          ", ",
          /* @__PURE__ */ jsx("code", { children: "BigInt" }),
          ", ",
          /* @__PURE__ */ jsx("code", { children: "undefined" }),
          ", ",
          /* @__PURE__ */ jsx("code", { children: "NaN" }),
          ",",
          " ",
          /* @__PURE__ */ jsx("code", { children: "Infinity" }),
          " are all preserved)."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "On the client, call ",
          /* @__PURE__ */ jsx("code", { children: "hydrate" }),
          " once after the document is parsed:"
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
              // Page.client.js (loaded from the document shell)
              import { hydrate } from 'wompo/hydrate';
              import './Counter.js'; // makes sure customElements.define has run

              hydrate(document);
              // Each [data-wompo-island] is hydrated per its mode:
              //   load    \u2192 immediately
              //   idle    \u2192 requestIdleCallback (fallback setTimeout)
              //   visible \u2192 IntersectionObserver with rootMargin: 200px
            `,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsxs(Note, { severity: "info", children: [
          /* @__PURE__ */ jsx("b", { children: "Lazy island chunks:" }),
          " if your framework exposes a global",
          " ",
          /* @__PURE__ */ jsx("code", { children: "window.__WOMPRO_ISLANDS" }),
          " mapping",
          " ",
          /* @__PURE__ */ jsx("code", { children: "tagName \u2192 moduleUrl" }),
          ", the hydration runtime dynamically imports the matching chunk on demand instead of warning."
        ] }),
        /* @__PURE__ */ jsxs(Note, { severity: "warning", children: [
          "If the SSR DOM doesn't structurally match what the component would clone (mismatched elements, missing markers), Wompo falls back to a destructive re-render and logs a",
          " ",
          /* @__PURE__ */ jsx("code", { children: "console.warn" }),
          ". Fix the mismatch in your template rather than ignoring the warning."
        ] })
      ] })
    },
    {
      title: "Server Actions",
      id: "server-actions",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("code", { children: "defineAction" }),
          " wraps an async function so that the same reference is usable on both sides of the wire: on the server it's a plain function; when it ends up in an island's serialized props, the client receives a transparent fetch proxy instead of the function body."
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
              // actions.js
              import { defineAction } from 'wompo/ssr';

              export const addItem = defineAction(async (name) => {
                // \u2026hit a DB, queue, etc.
                return { id: crypto.randomUUID(), name };
              });
            `,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsx("p", { children: "Pass the action through to an island in the usual way, then call it as if it were local:" }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
              // ItemForm.js (island)
              import { defineWompo, html, useState } from 'wompo';

              export default function ItemForm({ onAdd }) {
                const [name, setName] = useState('');
                const submit = async (e) => {
                  e.preventDefault();
                  const item = await onAdd(name); // \u2192 POST /_action/<id>
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
            `,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsxs(Note, { severity: "info", children: [
          "The ",
          /* @__PURE__ */ jsx("code", { children: "/_action/:id" }),
          " endpoint that the proxy hits is wired up by your server framework. The companion",
          " ",
          /* @__PURE__ */ jsx("a", { href: "https://github.com/lorenzolancero/wompro", target: "_blank", rel: "noreferrer", children: "wompro" }),
          " ",
          "framework registers it for you; in a custom stack, use",
          " ",
          /* @__PURE__ */ jsx("code", { children: "getRegisteredAction(id)" }),
          " exposed by ",
          /* @__PURE__ */ jsx("code", { children: "wompo/ssr" }),
          " to look up the function and invoke it with the deserialized arguments."
        ] })
      ] })
    },
    {
      title: "Context on the server",
      id: "context",
      content: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx(Link, { to: "/docs/apis/createContext", children: "Contexts" }),
        " work on the server the same way they do on the client: wrap a subtree in a Provider and consume the value with",
        " ",
        /* @__PURE__ */ jsx(Link, { to: "/docs/hooks/useContext", children: "useContext" }),
        ". The server runtime maintains a per-context stack, so nested providers shadow outer values correctly."
      ] }) })
    }
  ]
};
export default function Ssr() {
  return getPageLayout(content);
}
defineWompo(Ssr, {
  name: "ssr-page"
});
