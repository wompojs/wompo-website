import { Fragment, jsx, jsxs } from "wompo/jsx-runtime";
import { defineWompo } from "wompo";
import getPageLayout from "../../utils/getPageLayout.js";
import Code from "../../components/Code.js";
const content = {
  title: "Style your components",
  description: "Learn how you can style your components in different ways",
  sections: [
    {
      title: "Introduction",
      id: "introduction",
      content: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("p", { children: [
        "By definition components are reusable pieces of code. Most of times, when you create a component you also have a CSS code to specifically style that component. With Wompo, you have three different ways to style your components:",
        /* @__PURE__ */ jsxs("ol", { children: [
          /* @__PURE__ */ jsx("li", { children: "Classic CSS file" }),
          /* @__PURE__ */ jsx("li", { children: "Through the Component's css poperty (for shadow elements)" }),
          /* @__PURE__ */ jsx("li", { children: 'Built-in CSS "modules"' })
        ] })
      ] }) })
    },
    {
      title: "CSS file",
      id: "css-file",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "Using a CSS file to style your components is the classic way that you can use to add some creativity in your page. By default, Wompo components are ",
          /* @__PURE__ */ jsx("b", { children: "not" }),
          " inside a Shadow DOM, so you don't have to worry about how to make your CSS go through the unbreakable wall of Shadow DOM. With this approac, you simply create a CSS file and add the respective classes in your component."
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
              .container {
								background-color: #333;
								color: #fff;
								padding: 10px;
							}
            `,
            language: "css"
          }
        ),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
              function Component(){
								return html\`<div class="container"></div>\`;
							}
            `,
            language: "js"
          }
        )
      ] })
    },
    {
      title: "Shadow elements",
      id: "component-css",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "Another option is to use the ",
          /* @__PURE__ */ jsx("code", { children: ".css" }),
          " property in your functional component to generate it's specific CSSs. The property is a string in a CSS format and a",
          " ",
          /* @__PURE__ */ jsx("code", { children: "style" }),
          " element will be generated (only once) and attached for every component instance. This is the ideal option if you enable the ",
          /* @__PURE__ */ jsx("b", { children: "shadow" }),
          " property on the component. To allow this you have to first disable the ",
          /* @__PURE__ */ jsx("b", { children: "cssModule" }),
          " option (which we will cover later on)."
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
              function App() {
                return html\`<\${GreetingsComponent} />\`;
              }
							App.css = \`
								.container {
									background-color: #333;
									color: #fff;
									padding: 10px;
								}
							\`;
							defineWompo(App, { cssModule: false, shadow: true });
            `,
            language: "js"
          }
        )
      ] })
    },
    {
      title: "CSS Modules",
      id: "css-modules",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "The third option, which is actually the best choice, is to use the built-in",
          " ",
          /* @__PURE__ */ jsx("b", { children: "CSS Modules" }),
          ". By default every Component has the ",
          /* @__PURE__ */ jsx("code", { children: "cssModule" }),
          " option enabled, so what you will have to do is simply add your CSS inside the ",
          /* @__PURE__ */ jsx("code", { children: ".css" }),
          " ",
          "property of the functional Component.",
          /* @__PURE__ */ jsx("br", {}),
          "Wompo will automatically replace all the found class names with a more specific one (based on the name of the component, which is unique) and will put the generated class names in the ",
          /* @__PURE__ */ jsx("b", { children: "styles" }),
          " prop of the component. This prop is an object having as keys the original class names found in the CSS, and as values the corresponding unique generated class names.",
          /* @__PURE__ */ jsx("br", {}),
          'This option can be ideal for both "normal" and "shadow" components.'
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
							function Component({ styles: s }){
								// s.container will have "component-womp__container" as a value.
								return html\`<div class=\${s.container}> ... </div>\`;
							}
							Component.css = \`
								/* This class will be replaced with "component-womp__container" */
								.container {
									background-color: #333;
									color: #fff;
									padding: 10px;
								}
							\`;
            `,
            language: "js"
          }
        )
      ] })
    }
  ]
};
export default function Styles() {
  return getPageLayout(content);
}
defineWompo(Styles, {
  name: "styling-page"
});
