import { Fragment, jsx, jsxs } from "wompo/jsx-runtime";
import { defineWompo } from "wompo";
import getPageLayout from "../../utils/getPageLayout.js";
import Code from "../../components/Code.js";
const content = {
  title: "Installation",
  description: "Learn how to install Wompo in your application.",
  sections: [
    {
      title: "Methods of installation",
      id: "methods",
      content: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("p", { children: [
        "You can install and use Wompo in any Web Environment. Right now you have the following options:",
        /* @__PURE__ */ jsxs("ol", { children: [
          /* @__PURE__ */ jsx("li", { children: "Install it through npm" }),
          /* @__PURE__ */ jsx("li", { children: "Import it through a script hosted by jsDeliver" }),
          /* @__PURE__ */ jsx("li", { children: "Download it and use it locally" })
        ] })
      ] }) })
    },
    {
      title: "npm",
      id: "npm",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("p", { children: "You can install wompo using npm by simply typing the following line in the terminal:" }),
        /* @__PURE__ */ jsx(Code, { code: `npm i wompo`, language: "js" }),
        /* @__PURE__ */ jsx("p", { children: "And then import it whenever you use it:" }),
        /* @__PURE__ */ jsx(Code, { code: `import { html, defineWompo } from 'wompo';`, language: "js" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "If you don't have or don't want a bundler, you can use an ",
          /* @__PURE__ */ jsx("b", { children: "importmap" }),
          ' script in your html file and reference the "wompo" library in the node_modules folder, like so (replace "[root]" with the path to reach your node_modules folder through the html file):'
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
              <script type="importmap">
                {
                  "imports": {
                    "wompo": "[root]/node_modules/wompo/dist/wompo.js"
                  }
                }
              <\/script>
            `,
            language: "html"
          }
        ),
        /* @__PURE__ */ jsx("p", { children: "Wompo also exposes the SSR engine and the client-side hydration runtime as separate entry points. When you target them through an importmap, add the matching subpaths:" }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
              {
                "imports": {
                  "wompo": "[root]/node_modules/wompo/dist/wompo.js",
                  "wompo/ssr": "[root]/node_modules/wompo/dist/ssr/index.js",
                  "wompo/hydrate": "[root]/node_modules/wompo/dist/wompo/hydrate.js"
                }
              }
						`,
            language: "json"
          }
        )
      ] })
    },
    {
      title: "jsDeliver",
      id: "js-deliver",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("p", { children: "You can install wompo in your application by simply importing the file from jsDeliver:" }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
              <script type="module">
                import * as wompo from 'https://cdn.jsdelivr.net/npm/wompo@2.0.0';

                window.wompo = wompo; // Optional
              <\/script>
            `,
            language: "html"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "If saving Wompo in the window object is not ideal, maybe you want to define an",
          " ",
          /* @__PURE__ */ jsx("b", { children: "importmap" }),
          ' script (replace "[root]" with the path to reach your node_modules folder through the html file):'
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
              <script type="importmap">
                {
                  "imports": {
                    "wompo": "https://cdn.jsdelivr.net/npm/wompo@2.0.0"
                  }
                }
              <\/script>
            `,
            language: "html"
          }
        ),
        /* @__PURE__ */ jsx("p", { children: "And then, use it like if it was installed in your node_modules:" }),
        /* @__PURE__ */ jsx(Code, { code: `import { html, defineWompo } from 'wompo';`, language: "js" })
      ] })
    },
    {
      title: "Download",
      id: "download",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "You can download Wompo and run it locally by clicking this button:",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/wompo.zip",
              style: {
                border: "none",
                backgroundColor: "#573EF6",
                padding: "10px 20px",
                borderRadius: 10,
                color: "#fff",
                margin: "2rem 0",
                display: "inline-block"
              },
              children: "Download"
            }
          ),
          /* @__PURE__ */ jsx("br", {}),
          "The unzipped folder ships the full ",
          /* @__PURE__ */ jsx("i", { children: "/dist" }),
          " tree: the main module is",
          " ",
          /* @__PURE__ */ jsx("i", { children: "/dist/wompo.js" }),
          ", the SSR engine lives at ",
          /* @__PURE__ */ jsx("i", { children: "/dist/ssr/index.js" }),
          ", and the client-side hydration runtime at ",
          /* @__PURE__ */ jsx("i", { children: "/dist/wompo/hydrate.js" }),
          ". After you put it in your project, import it:"
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
              <script type="module">
                import * as wompo from '/path/to/dist/wompo.js';

                window.wompo = wompo; // Optional
              <\/script>
            `,
            language: "html"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "If saving Wompo in the window object is not ideal, maybe you want to define an",
          " ",
          /* @__PURE__ */ jsx("b", { children: "importmap" }),
          " script (replace the path with your own path to reach the unzipped",
          /* @__PURE__ */ jsx("i", { children: "/dist" }),
          " folder):"
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
              <script type="importmap">
                {
                  "imports": {
                    "wompo": "/path/to/dist/wompo.js",
                    "wompo/ssr": "/path/to/dist/ssr/index.js",
                    "wompo/hydrate": "/path/to/dist/wompo/hydrate.js"
                  }
                }
              <\/script>
            `,
            language: "html"
          }
        ),
        /* @__PURE__ */ jsx("p", { children: "And then, use it like if it was installed in your node_modules:" }),
        /* @__PURE__ */ jsx(Code, { code: `import { html, defineWompo } from 'wompo';`, language: "js" })
      ] })
    }
  ]
};
export default function Installation() {
  return getPageLayout(content);
}
defineWompo(Installation, {
  name: "installation-page"
});
