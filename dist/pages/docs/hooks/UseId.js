import { Fragment, jsx, jsxs } from "wompo/jsx-runtime";
import { defineWompo } from "wompo";
import getPageLayout from "../../../utils/getPageLayout.js";
import Code from "../../../components/Code.js";
const content = {
  title: "useId hook",
  description: /* @__PURE__ */ jsxs(Fragment, { children: [
    "How to use the ",
    /* @__PURE__ */ jsx("code", { children: "useId" }),
    " hook to generate a unique ID for your components."
  ] }),
  sections: [
    {
      title: "Description",
      id: "description",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "Hard-coding IDs in components is very often a bad idea. The ",
          /* @__PURE__ */ jsx("code", { children: "useId" }),
          " hook will solve this problem."
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
							const id = useId();
						`,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "The ",
          /* @__PURE__ */ jsx("code", { children: "useId" }),
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
          /* @__PURE__ */ jsx("code", { children: "useId" }),
          ' is to solve accessibility problems or simply setting a "for" attribute to a label element.'
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
							import { defineWompo, html, useId } from 'wompo';

							export default function InputExample() {
								const hintId = useId(); // :w0:
								const inputId = useId(); // :w1:

								return html\`
									<label for=\${inputId}>Password:</label>
                  <input id=\${inputId} aria-describedby=\${hintId} />
                  <p id=\${hintId}>The password should contain at least 8 characters</p>
								\`;
							}

							defineWompo(InputExample);
						`,
            language: "js"
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
export default function UseId() {
  return getPageLayout(content);
}
defineWompo(UseId, {
  name: "useid-hook-page"
});
