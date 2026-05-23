import { Fragment, jsx, jsxs } from "wompo/jsx-runtime";
import { defineWompo } from "wompo";
import getPageLayout from "../../../utils/getPageLayout.js";
import Code from "../../../components/Code.js";
import HtmlExample from "../../../examples/HtmlExample.js";
import { Link } from "wompo-router";
const content = {
  title: "html API",
  description: /* @__PURE__ */ jsxs(Fragment, { children: [
    "How to use the ",
    /* @__PURE__ */ jsx("code", { children: "html" }),
    " function to define what a component should render and create custom templates."
  ] }),
  sections: [
    {
      title: "Description",
      id: "description",
      content: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("p", { children: [
        "The ",
        /* @__PURE__ */ jsx("code", { children: "html" }),
        " template function will allow to render complex HTML structures inside of your component. You can even create custom templates outside of the component and re-use them whenever needed."
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
							const template = html\`structure\`;
						`,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "The ",
          /* @__PURE__ */ jsx("code", { children: "html" }),
          " function is a template function, meaning that should not be called using parentesis, but using backquotes. The content of it will be the HTML structure for the template."
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
							const staticTemplate = html\`<i>I am static</i>\`;

              const dynamicTemplate = html\`<div>
                I will render here the content of the [staticTemplate]: \${staticTemplate}.<br/>
                I can also render this values: <br/>
                Numbers: \${0}<br/>
                Strings: \${'ciao!'}<br/>
                Arrays: \${[0,1,2,'three', html\`four\`]}<br/>
                Other templates: \${html\`Look!\`}<br/>
                <br/>
                I can even conditionally render content:
                \${false && 'I will not be shown, *sad face'}<br/>
                \${true && 'I am visible!'}<br/>
                <br/>
                Falsy values will be ignored (except for numbers and strings):
                \${null} \${undefined} \${false}.
              </div>\`;
						`,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "Inside of your component you can use this templates:",
          /* @__PURE__ */ jsx(
            Code,
            {
              code: `
                function Component(){
                  return dynamicTemplate;
                }
              `,
              language: "js"
            }
          ),
          "Result:",
          /* @__PURE__ */ jsx(HtmlExample, {})
        ] })
      ] })
    },
    {
      title: "Interpolation cheatsheet",
      id: "interpolation",
      content: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("p", { children: [
        "The ",
        /* @__PURE__ */ jsx("code", { children: "html" }),
        " tagged template understands a few special interpolation positions beyond plain text and child nodes:",
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsxs("code", { children: [
              "name=$",
              "${value}"
            ] }),
            " \u2014 attribute. When the value is",
            " ",
            /* @__PURE__ */ jsx("code", { children: "false" }),
            ", ",
            /* @__PURE__ */ jsx("code", { children: "null" }),
            " or ",
            /* @__PURE__ */ jsx("code", { children: "undefined" }),
            " the attribute is removed. On custom elements, ",
            /* @__PURE__ */ jsx("code", { children: "camelCase" }),
            " attribute names are auto-converted to ",
            /* @__PURE__ */ jsx("code", { children: "kebab-case" }),
            "."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsxs("code", { children: [
              "@event=$",
              "${handler}"
            ] }),
            " \u2014 event listener. The handler can be a plain function or ",
            /* @__PURE__ */ jsx("code", { children: "{ fn, options }" }),
            " if you need",
            " ",
            /* @__PURE__ */ jsx("code", { children: "addEventListener" }),
            " options."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsxs("code", { children: [
              ".prop=$",
              "${value}"
            ] }),
            " \u2014 assigns the value as a JS property on the element instead of an attribute."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsxs("code", { children: [
              "ref=$",
              "${aRef}"
            ] }),
            " \u2014 fills ",
            /* @__PURE__ */ jsx("code", { children: "aRef.current" }),
            " with the DOM element (see the ",
            /* @__PURE__ */ jsx(Link, { to: "/docs/hooks/useRef", children: "useRef hook" }),
            ")."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsxs("code", { children: [
              "style=$",
              "${styleObject}"
            ] }),
            " \u2014 accepts an object of",
            " ",
            /* @__PURE__ */ jsx("code", { children: "camelCase" }),
            " properties; numeric values get ",
            /* @__PURE__ */ jsx("code", { children: "px" }),
            " appended."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("code", { children: "<${tag}>...</${tag}>" }),
            " \u2014 a",
            " ",
            /* @__PURE__ */ jsx(Link, { to: "dynamic-tags", children: "dynamic tag" }),
            " whose name is computed at render time."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("code", { children: "<el ${attrs({ ... })}>" }),
            " \u2014 a spread of attributes, events, and properties via the ",
            /* @__PURE__ */ jsx(Link, { to: "attrs", children: "attrs" }),
            " function."
          ] })
        ] })
      ] }) })
    }
  ]
};
export default function HtmlApi() {
  return getPageLayout(content);
}
defineWompo(HtmlApi, {
  name: "html-api-apis-page"
});
