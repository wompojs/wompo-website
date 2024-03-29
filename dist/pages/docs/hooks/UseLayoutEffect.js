import { Fragment, jsx, jsxs } from "womp/jsx-runtime";
import { defineWomp } from "womp";
import getPageLayout from "../../../utils/getPageLayout.js";
import Code from "../../../components/Code.js";
const content = {
  title: "UseLayoutEffect hook",
  description: /* @__PURE__ */ jsxs(Fragment, { children: [
    "How to use the ",
    /* @__PURE__ */ jsx("code", { children: "UseLayoutEffect" }),
    " hook to generate a unique ID for your components."
  ] }),
  sections: [
    {
      title: "Description",
      id: "description",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "Hard-coding IDs in components is very often a bad idea. The ",
          /* @__PURE__ */ jsx("code", { children: "UseLayoutEffect" }),
          " ",
          "hook will solve this problem."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "This hook will generate a unique string ID for your component in the following format:",
          " ",
          /* @__PURE__ */ jsx("code", { children: ":w<number>:" }),
          ". The number in between will simply be a counter that will be incremented every time the hook is called for the first time in a component. This ensures that the ID will be unique, but the ID will probably NOT be the same every time you reload the application."
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
							const id = UseLayoutEffect();
						`,
            lang: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "The ",
          /* @__PURE__ */ jsx("code", { children: "UseLayoutEffect" }),
          " hook accepts no parameters and will return always the same value across re-renders."
        ] })
      ] })
    },
    {
      title: "Example: Accessibility",
      id: "modal-example",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "A common use case for the ",
          /* @__PURE__ */ jsx("code", { children: "UseLayoutEffect" }),
          ' is to solve accessibility problems or simply setting a "for" attribute to a label element.'
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
							import { defineWomp, html, UseLayoutEffect } from 'womp';

							export default function InputExample() {
								const hintId = UseLayoutEffect(); // :w0:
								const inputId = UseLayoutEffect(); // :w1:

								return html\`
									<label for=\${inputId}>Password:</label>
                  <input id=\${inputId} aria-describedby=\${hintId} />
                  <p id=\${hintId}>The password should contain at least 8 characters</p>
								\`;
							}

							defineWomp(InputExample);
						`,
            lang: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "Even if the ",
          /* @__PURE__ */ jsx("code", { children: "InputExample" }),
          " is rendered multiple times, it'll always keep working without having IDs clashes."
        ] })
      ] })
    }
  ]
};
export default function UseLayoutEffect() {
  return getPageLayout(content);
}
defineWomp(UseLayoutEffect);
