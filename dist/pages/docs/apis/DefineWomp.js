import { Fragment, jsx, jsxs } from "womp/jsx-runtime";
import { defineWomp } from "womp";
import getPageLayout from "../../../utils/getPageLayout.js";
import Code from "../../../components/Code.js";
import { Link } from "womp-router";
import Note from "../../../components/Note.js";
import IsolatedComponent from "../../../examples/IsolatedComponent.js";
const content = {
  title: "defineWomp API",
  description: /* @__PURE__ */ jsxs(Fragment, { children: [
    "How to use the ",
    /* @__PURE__ */ jsx("code", { children: "defineWomp" }),
    " function to register your custom component in your application."
  ] }),
  sections: [
    {
      title: "Description",
      id: "description",
      content: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("p", { children: [
        "The ",
        /* @__PURE__ */ jsx("code", { children: "defineWomp" }),
        " function is the function that will register your component in the browser's ",
        /* @__PURE__ */ jsx("code", { children: "CustomElementRegistry" }),
        ". You always have to use this function after writing your components. If you don't see your component in the screen, don't panic: is probably because you only forgot to call this function."
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
							defineWomp(Component, options?);
						`,
            lang: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "The function accepts two parameters: your functional Component and the options for it. The first parameter must be a function that returns an",
          " ",
          /* @__PURE__ */ jsx(Link, { to: "/docs/apis/html", children: "html" }),
          " result or ",
          /* @__PURE__ */ jsx("code", { children: "null" }),
          ". The second parameter is ",
          /* @__PURE__ */ jsx("b", { children: "optional" }),
          ", but if defined it must be an object with the following optional keys:",
          /* @__PURE__ */ jsxs("ul", { children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("code", { children: "name" }),
              ` (string) - The name of the Web Component that will be registered. If not defined, the component name will be the name of the function in hyphen-case. If the component doesn't have an hyphen, a "womp" string will be placed as a suffix.`,
              /* @__PURE__ */ jsx("br", {}),
              "E.g. TabPanel = tab-panel, Counter = counter-womp"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("code", { children: "shadow" }),
              " (boolean) - By default is false, but if true, the component's content will be rendered inside a Shadow Root. You want to set it to true when developing libraries and components that you want to be sure they won't affect or be affected by external CSSs or Scripts."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("code", { children: "cssModule" }),
              " (boolean) - By default is true, meaning that a CSS module logic will be applied if you write your ",
              /* @__PURE__ */ jsx("code", { children: "component's CSS" }),
              " inside the Component.css key. The classes that are found in there will be replaced with a more unique identifier and put in the ",
              /* @__PURE__ */ jsx("b", { children: "styles" }),
              " prop of the component, which will be an object having the found classes as keys and the more unique generated classes as values. This is done to avoid style collisions.",
              /* @__PURE__ */ jsx("br", {}),
              "Example:",
              /* @__PURE__ */ jsx(
                Code,
                {
                  code: `
                    function Component({ styles: s }){
                      // s.component will have "component-womp__container" as a value
                      return html\`
                        <div class=\${s.container}>...</div>
                      \`;
                    }
                    Component.css = \`
                      .container {
                        height: 30px;
                        width: 30px;
                        background-color: green;
                      }
                    \`;
                  `,
                  lang: "js"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Note, { severity: "info", children: [
          "You can customize the default values of the ",
          /* @__PURE__ */ jsx("b", { children: "options" }),
          " object by overriding the values present in the ",
          /* @__PURE__ */ jsx(Link, { to: "/docs/apis/wompDefaultOptions", children: "wompDefaultOptions" }),
          " ",
          "object."
        ] })
      ] })
    },
    {
      title: "Example: isoalted element",
      id: "isolated-element-example",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "We can use the ",
          /* @__PURE__ */ jsx("code", { children: "defineWomp" }),
          ' function to define a component that is "isolated" from the CSS and JS in your application.'
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
							import { html, defineWomp } from 'womp';

              function IsolatedComponent(){
                return html\`
                  <p>
                    Even though my styles are super generic, I will not affect external elements
                    and I will not be affected by external styles!
                  </p>
                \`;
              }
              IsolatedComponent.css = \`
                :host {
                  display: block;
                }
                p {
                  padding: 5px;
                  border-radius: 5px;
                  background-color: #3489a6;
                  color: #fff;
                }
              \`;

							defineWomp(IsolatedComponent, {
                // Using a custom name will let you have more control over the application
                name: 'super-cool-isolated-component',
                // The content will be placed inside a Shadow Root
                shadow: true,
                // Since it's already "isolated", it's not necessary to have the CSS Module
                cssModule: false
              });
						`,
            lang: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "Result:",
          /* @__PURE__ */ jsx(IsolatedComponent, {})
        ] }),
        /* @__PURE__ */ jsxs(Note, { severity: "warning", children: [
          /* @__PURE__ */ jsx("b", { children: "Note" }),
          ": Other than generating more specific class names, what the cssModule option will do is also provide a display block style for the element.",
          /* @__PURE__ */ jsx(Code, { code: `:host { display: block; }`, lang: "js" }),
          "This is because custom elements have NO default styles, and usually the first thing you will do is set the display property. If you disabled the cssModule option, this will not happen. Also, if in your CSS you write an ",
          /* @__PURE__ */ jsx("code", { children: ":host" }),
          " style, the display block property will not be automatically generated.",
          /* @__PURE__ */ jsx("br", {}),
          "That's why in the above example we had to manually set it."
        ] })
      ] })
    }
  ]
};
export default function DefineWomp() {
  return getPageLayout(content);
}
defineWomp(DefineWomp);
