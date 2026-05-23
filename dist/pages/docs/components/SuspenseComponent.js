import { Fragment, jsx, jsxs } from "wompo/jsx-runtime";
import { defineWompo } from "wompo";
import getPageLayout from "../../../utils/getPageLayout.js";
import Code from "../../../components/Code.js";
import { Link } from "wompo-router";
import LazySuspenseExample from "../../../examples/LazySuspenseExample.js";
const content = {
  title: "Suspense",
  description: /* @__PURE__ */ jsxs(Fragment, { children: [
    "How to use the ",
    /* @__PURE__ */ jsx("code", { children: "Suspense" }),
    " component to show a fallback UI while at least one of its children is still rendering its content."
  ] }),
  sections: [
    {
      title: "Description",
      id: "description",
      content: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("p", { children: [
        "The ",
        /* @__PURE__ */ jsx("code", { children: "Suspense" }),
        " component is a special Wompo component that allows to show a",
        " ",
        /* @__PURE__ */ jsx("b", { children: "fallback" }),
        " UI while one or more of the children are loading. This can be used for:",
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            "Components that use the ",
            /* @__PURE__ */ jsx(Link, { to: "/docs/hooks/useAsync", children: "useAsync" }),
            " hook"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            "Components that are imported through the ",
            /* @__PURE__ */ jsx(Link, { to: "/docs/apis/lazy", children: "lazy" }),
            " ",
            "function"
          ] })
        ] })
      ] }) })
    },
    {
      title: "Usage",
      id: "usage",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
              import { Suspense, html } from 'wompo';

              html\`
                <\${Suspense} fallback=\${html\`<i>Loading...</i>\`}>
                  \${children}
                </\${Suspense}>
              \`;
            `,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "The ",
          /* @__PURE__ */ jsx("code", { children: "Suspense" }),
          " component accepts a single prop: ",
          /* @__PURE__ */ jsx("b", { children: "fallback" }),
          ". The fallback prop must be the result of the ",
          /* @__PURE__ */ jsx(Link, { to: "/docs/apis/html", children: "html" }),
          " template function. This prop is ",
          /* @__PURE__ */ jsx("b", { children: "required" }),
          "."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Suspense also participates in ",
          /* @__PURE__ */ jsx(Link, { to: "/docs/ssr#render-to-stream", children: "streaming SSR" }),
          ": when rendered through ",
          /* @__PURE__ */ jsx("code", { children: "renderToStream" }),
          ", any boundary containing pending",
          " ",
          /* @__PURE__ */ jsx("code", { children: "useAsync" }),
          " work flushes its fallback first, then emits the resolved content out-of-order as the promises settle."
        ] })
      ] })
    },
    {
      title: "Example: lazy component",
      id: "lazy-component-example",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "This example is the same used in the ",
          /* @__PURE__ */ jsx(Link, { to: "/docs/apis/lazy", children: "lazy" }),
          " ",
          "documentation: thanks to the lazy function we will render a component dynamically imported and delayed to simulate a super big file that is requested from the server (or simply a slow network)."
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
              import { lazy, html, defineWompo, Suspense } from 'wompo';

              function simulateBigComponent(promise) {
                return new Promise((resolve) => {
                  setTimeout(resolve, 5000);
                }).then(() => promise);
              }

              const LazyComponent = lazy(() => simulateBigComponent(import('./custom-component.js')));

              function App(){
                return html\`
                  <p>This content is static. Below me the lazy component will be rendered!</p>
                  <\${Suspense} fallback=\${html\`<i>Loading...</i>\`}>
                    <\${LazyComponent}>I should be blue...</\${LazyComponent}>
                  </\${Suspense}>
                \`;
              }

              defineWompo(App);
						`,
            language: "js"
          }
        ),
        "The code of the component imported from the ",
        /* @__PURE__ */ jsx("code", { children: "./custom-component.js" }),
        " path will be the following:",
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
              import { html, defineWompo } from 'wompo';

              export default function LazyComponent({ children }){
                return html\`
                  <div style="font-size: 20px; color: blue;">
                    \${children}<br />
                    I was lazy loaded!
                  </div>
                \`;
              }

              defineWompo(LazyComponent);
						`,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "Result (you probably will have to reload the page and scroll here to see it):",
          /* @__PURE__ */ jsx(LazySuspenseExample, {})
        ] })
      ] })
    }
  ]
};
export default function SuspenseComponent() {
  return getPageLayout(content);
}
defineWompo(SuspenseComponent, {
  name: "suspense-component-page"
});
