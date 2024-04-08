import { Fragment, jsx, jsxs } from "wompo/jsx-runtime";
import { defineWompo } from "wompo";
import getPageLayout from "../../../utils/getPageLayout.js";
import Code from "../../../components/Code.js";
import { Link } from "wompo-router";
import Note from "../../../components/Note.js";
import LazyExample from "../../../examples/LazyExample.js";
import LazySuspenseExample from "../../../examples/LazySuspenseExample.js";
const content = {
  title: "lazy API",
  description: /* @__PURE__ */ jsxs(Fragment, { children: [
    "How to use the ",
    /* @__PURE__ */ jsx("code", { children: "lazy" }),
    " function to asynchronously load a component only when it is used."
  ] }),
  sections: [
    {
      title: "Description",
      id: "description",
      content: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("p", { children: [
        "The ",
        /* @__PURE__ */ jsx("code", { children: "lazy" }),
        " function will dynamically import a component only if it is actually used and rendered. Using the lazy function can",
        " ",
        /* @__PURE__ */ jsx("b", { children: "improve your site's performance" }),
        " and decrease the number of network requests, other then reducing the initial payload.",
        /* @__PURE__ */ jsx("br", {}),
        "You can also combine the ",
        /* @__PURE__ */ jsx("code", { children: "lazy" }),
        " function with the use of the",
        " ",
        /* @__PURE__ */ jsx(Link, { to: "/docs/components/suspense", children: "Suspense" }),
        " component to display a rendering screen while the component is being loaded. Once the lazy component rendered for the first time, the result is cached so that multiple requests will not be performed if the lazy component is used multiple times.",
        /* @__PURE__ */ jsx("br", {}),
        "The imported file ",
        /* @__PURE__ */ jsx("b", { children: "must have a default export" }),
        ", and it is what will be taken to know which component to render."
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
							const LazyComponent = lazy(() => import(componentPath));
						`,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "The ",
          /* @__PURE__ */ jsx("code", { children: "lazy" }),
          " function accepts one single argument, which is the callback that will ask to import the component. Be careful:"
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
              // \u274C This will immediately import the component (and will not work)!
              lazy(import(componentPath);

              // \u274C Will not work
              lazy(componentPath);

              // \u2705 The correct way
							lazy(() => import(componentPath));
						`,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsxs(Note, { severity: "info", children: [
          "While the component is being imported, you will actually see nothing. That's why it is very common to combine a lazy component with a",
          " ",
          /* @__PURE__ */ jsx(Link, { to: "/docs/components/suspense", children: "Suspense" }),
          " component."
        ] })
      ] })
    },
    {
      title: "Example: big component",
      id: "big-component-example",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("p", { children: "When developing in a local environment, files are usually loaded instantly, so you cannot really test the functioning of the lazy component. But you can simulate the loading of a big file using a function that will delay the import of the component, like in the following example:" }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
              import { lazy, html, defineWompo } from 'wompo';

              function simulateBigComponent(promise) {
                return new Promise((resolve) => {
                  setTimeout(resolve, 5000);
                }).then(() => promise);
              }

              const LazyComponent = lazy(() => simulateBigComponent(import('./custom-component.js')));

              function App(){
                return html\`
                  <p>This content is static. Below me the lazy component will be rendered!</p>
                  <\${LazyComponent}>I should be blue...</\${LazyComponent}>
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
          "Result:",
          /* @__PURE__ */ jsx(LazyExample, {})
        ] }),
        /* @__PURE__ */ jsxs(Note, { severity: "warning", children: [
          "As you can see,",
          " ",
          /* @__PURE__ */ jsx("b", { children: "the children of the component will still be visible while the component is being imported" }),
          ". That's why usually you always combine the lazy component with a ",
          /* @__PURE__ */ jsx("code", { children: "Suspense" }),
          " ",
          "component."
        ] })
      ] })
    },
    {
      title: "Example: suspense",
      id: "suspense-example",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "It's time to use the ",
          /* @__PURE__ */ jsx(Link, { to: "/docs/components/suspense", children: "Suspense" }),
          " component to display a loading indicator while the lazy component is being imported. We will simply modify the previous example by wrapping the ",
          /* @__PURE__ */ jsx("code", { children: "LazyComponent" }),
          " between a",
          " ",
          /* @__PURE__ */ jsx("code", { children: "Suspense" }),
          " component."
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
        /* @__PURE__ */ jsxs("p", { children: [
          "Result:",
          /* @__PURE__ */ jsx(LazySuspenseExample, {})
        ] })
      ] })
    }
  ]
};
export default function LazyApi() {
  return getPageLayout(content);
}
defineWompo(LazyApi, {
  name: "lazy-api-apis-page"
});
