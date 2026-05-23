import { Fragment, jsx, jsxs } from "wompo/jsx-runtime";
import { defineWompo } from "wompo";
import getPageLayout from "../../../utils/getPageLayout.js";
import Code from "../../../components/Code.js";
import Note from "../../../components/Note.js";
const content = {
  title: "attrs API",
  description: /* @__PURE__ */ jsxs(Fragment, { children: [
    "How to use the ",
    /* @__PURE__ */ jsx("code", { children: "attrs" }),
    " function to spread a bag of attributes, events, and properties on a single element."
  ] }),
  sections: [
    {
      title: "Description",
      id: "description",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "The ",
          /* @__PURE__ */ jsx("code", { children: "attrs" }),
          " function returns an opaque bag that, when interpolated directly inside an opening tag, applies every key of the provided object to the element. Each entry is routed to the correct sink based on its name prefix:",
          /* @__PURE__ */ jsxs("ul", { children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("code", { children: "name" }),
              " \u2192 set as a regular attribute (or removed when the value is",
              " ",
              /* @__PURE__ */ jsx("code", { children: "false" }),
              ", ",
              /* @__PURE__ */ jsx("code", { children: "null" }),
              " or ",
              /* @__PURE__ */ jsx("code", { children: "undefined" }),
              ");"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("code", { children: "@name" }),
              " \u2192 bound as an event listener (",
              /* @__PURE__ */ jsx("code", { children: "@click" }),
              ",",
              " ",
              /* @__PURE__ */ jsx("code", { children: "@input" }),
              ", ...);"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("code", { children: ".name" }),
              " \u2192 assigned as a JS property on the element (skipping HTML attribute reflection)."
            ] })
          ] }),
          "When the target is a custom element, ",
          /* @__PURE__ */ jsx("code", { children: "camelCase" }),
          " attribute names are automatically converted to ",
          /* @__PURE__ */ jsx("code", { children: "kebab-case" }),
          ", matching the behavior of plain interpolated attributes."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "On re-renders, keys that disappeared from the new bag are removed from the element, so you can use ",
          /* @__PURE__ */ jsx("code", { children: "attrs" }),
          " for conditional or computed attribute sets."
        ] })
      ] })
    },
    {
      title: "Usage",
      id: "usage",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
              import { attrs, defineWompo, html, useState } from 'wompo';

              export default function Field({ name, type = 'text' }) {
                const [value, setValue] = useState('');
                const inputAttrs = attrs({
                  type,
                  name,
                  value,
                  disabled: type === 'hidden',
                  '@input': (e) => setValue(e.target.value),
                  '.checked': type === 'checkbox' && value === 'on',
                });
                return html\`<input \${inputAttrs} />\`;
              }

              defineWompo(Field);
            `,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsxs(Note, { severity: "info", children: [
          /* @__PURE__ */ jsx("b", { children: "Interpolation rules:" }),
          " the ",
          /* @__PURE__ */ jsx("code", { children: "attrs" }),
          " result must be placed directly inside an opening tag, not next to a single attribute. Use it once per element; spreading two bags on the same element is supported, but the order in which the keys are applied follows the order of the bags."
        ] })
      ] })
    },
    {
      title: "When to use it",
      id: "when",
      content: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("p", { children: [
        "Reach for ",
        /* @__PURE__ */ jsx("code", { children: "attrs" }),
        " when:",
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "you want to forward an unknown set of props from the parent down to an internal element (a typical wrapper component);" }),
          /* @__PURE__ */ jsx("li", { children: "the set of attributes is conditional or computed and you would otherwise have to branch the template;" }),
          /* @__PURE__ */ jsxs("li", { children: [
            "you need to set a DOM property (",
            /* @__PURE__ */ jsx("code", { children: ".value" }),
            ", ",
            /* @__PURE__ */ jsx("code", { children: ".checked" }),
            ", ...) together with attributes and events on the same element."
          ] })
        ] })
      ] }) })
    }
  ]
};
export default function AttrsApi() {
  return getPageLayout(content);
}
defineWompo(AttrsApi, {
  name: "attrs-api-page"
});
