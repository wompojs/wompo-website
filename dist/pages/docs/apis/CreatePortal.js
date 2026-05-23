import { Fragment, jsx, jsxs } from "wompo/jsx-runtime";
import { defineWompo } from "wompo";
import getPageLayout from "../../../utils/getPageLayout.js";
import Code from "../../../components/Code.js";
const content = {
  title: "createPortal API",
  description: /* @__PURE__ */ jsxs(Fragment, { children: [
    "How to use the ",
    /* @__PURE__ */ jsx("code", { children: "createPortal" }),
    " function to attach some HTML to another DOM element that is not inside of the component."
  ] }),
  sections: [
    {
      title: "Description",
      id: "description",
      content: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("p", { children: [
        "The ",
        /* @__PURE__ */ jsx("code", { children: "createPortal" }),
        " function allows to attach a portion of your HTML that should be rendered inside of the component in another part of the DOM (for example, in the body). This part of the HTML will still listen to changes in your component and will be removed when the parent component is also removed."
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
							const toRender = createPortal(yourHtml, yourDomNode);
						`,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "The function accepts two parameters: the first is your html to be rendered, while the second is the HTML DOM node on where you want your custom html to be attached.",
          /* @__PURE__ */ jsx("br", {}),
          "Simple example:"
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
              import { createPortal } from 'wompo';

              function App(){
                return html\`
                  <input class="custom-select" />
                  \${createPortal(html\`
                    <ul class="menu">
                      <li>Option 1</li>
                      <li>Option 2</li>
                      <li>Option 3</li>
                    </ul>
                  \`, document.body)}
                \`;
              }
						`,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsx("p", { children: "In the above example, we want to create a custom select element, but we want to attach the custom menu with the select's options in the body, so that wherever the custom select is used, the menu will always be displayed in the correct position (which will be fixed in the screen). For this reason, we used the `createPortal` function." })
      ] })
    }
  ]
};
export default function CreatePortal() {
  return getPageLayout(content);
}
defineWompo(CreatePortal, {
  name: "create-portal-apis-page"
});
