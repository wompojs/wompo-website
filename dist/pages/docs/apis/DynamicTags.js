import { Fragment, jsx, jsxs } from "wompo/jsx-runtime";
import { defineWompo } from "wompo";
import getPageLayout from "../../../utils/getPageLayout.js";
import Code from "../../../components/Code.js";
import Note from "../../../components/Note.js";
const content = {
  title: "Dynamic Tags",
  description: /* @__PURE__ */ jsxs(Fragment, { children: [
    "Use a runtime value as the tag name of an element inside an ",
    /* @__PURE__ */ jsx("code", { children: "html" }),
    " template."
  ] }),
  sections: [
    {
      title: "Description",
      id: "description",
      content: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("p", { children: [
        "Inside any ",
        /* @__PURE__ */ jsx("code", { children: "html" }),
        " template you can interpolate the tag name itself, opening the door to elements whose type is decided at render time. The value can be:",
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            "a string (a built-in HTML tag like ",
            /* @__PURE__ */ jsx("code", { children: "'section'" }),
            ", or a registered Web-Component name like ",
            /* @__PURE__ */ jsx("code", { children: "'my-card'" }),
            ");"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            "a Wompo component (the function returned by ",
            /* @__PURE__ */ jsx("code", { children: "defineWompo" }),
            ") \u2014 Wompo picks up the component's registered tag name automatically;"
          ] }),
          /* @__PURE__ */ jsx("li", { children: "the result of any JS expression that evaluates to one of the above." })
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
              import { defineWompo, html } from 'wompo';

              export default function Heading({ level = 1, children }) {
                const tag = 'h' + Math.min(Math.max(level, 1), 6);
                return html\`<\${tag} class="heading">\${children}</\${tag}>\`;
              }

              defineWompo(Heading);
            `,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "The same syntax works for choosing a wrapper between, for example, a",
          " ",
          /* @__PURE__ */ jsx("code", { children: "section" }),
          " and an ",
          /* @__PURE__ */ jsx("code", { children: "article" }),
          ":"
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
              html\`<\${type === 'article' ? 'article' : 'section'} class=\${s.box}>
                \${children}
              </\${type === 'article' ? 'article' : 'section'}>\`;
            `,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsx("p", { children: "You can also dynamically pick between two Wompo components in the same way:" }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
              import { defineWompo, html } from 'wompo';
              import Card from './Card.js';
              import Pill from './Pill.js';

              export default function Item({ variant, ...props }) {
                const Component = variant === 'pill' ? Pill : Card;
                return html\`<\${Component} ...=\${props} />\`;
              }

              defineWompo(Item);
            `,
            language: "js"
          }
        )
      ] })
    },
    {
      title: "Rules and gotchas",
      id: "rules",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs(Note, { severity: "warning", children: [
          /* @__PURE__ */ jsx("b", { children: "Open and close must match." }),
          " When a tag is dynamic, both the opening",
          " ",
          /* @__PURE__ */ jsxs("code", { children: [
            "<$",
            "$",
            "{tag}",
            ">"
          ] }),
          " and the closing",
          " ",
          /* @__PURE__ */ jsxs("code", { children: [
            "</$",
            "$",
            "{tag}",
            ">"
          ] }),
          " need to interpolate the same value. The renderer uses this to keep template caching consistent."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "A few more rules to keep in mind:",
          /* @__PURE__ */ jsxs("ul", { children: [
            /* @__PURE__ */ jsxs("li", { children: [
              "Self-closing dynamic tags are supported (",
              /* @__PURE__ */ jsxs("code", { children: [
                "<$",
                "$",
                "{Component}",
                " />"
              ] }),
              ") and are expanded to a full open/close pair internally."
            ] }),
            /* @__PURE__ */ jsx("li", { children: "Changing the tag value across renders creates a new element instance: any state tied to the previous DOM node is reset." }),
            /* @__PURE__ */ jsxs("li", { children: [
              "You can combine dynamic tags with the ",
              /* @__PURE__ */ jsx("a", { href: "attrs", children: "attrs" }),
              " spread to build fully generic wrappers."
            ] })
          ] })
        ] })
      ] })
    }
  ]
};
export default function DynamicTagsApi() {
  return getPageLayout(content);
}
defineWompo(DynamicTagsApi, {
  name: "dynamic-tags-api-page"
});
