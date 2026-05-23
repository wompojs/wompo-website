import { Fragment, jsx, jsxs } from "wompo/jsx-runtime";
import { defineWompo } from "wompo";
import getPageLayout from "../../../utils/getPageLayout.js";
import Code from "../../../components/Code.js";
const content = {
  title: "useSelf hook",
  description: /* @__PURE__ */ jsxs(Fragment, { children: [
    "How to use the ",
    /* @__PURE__ */ jsx("code", { children: "useSelf" }),
    " hook to get the instance of the element itself."
  ] }),
  sections: [
    {
      title: "Description",
      id: "description",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "Sometimes you want to modify a custom element itself inside of it's own render function. To get the instance element, you can actually use the ",
          /* @__PURE__ */ jsx("code", { children: "this" }),
          " keyword, but a better option is to use the ",
          /* @__PURE__ */ jsx("code", { children: "useSelf" }),
          " hook."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "This hook will simply return the instance element, but it's typescript friendly and it's safer to use, becasue the ",
          /* @__PURE__ */ jsx("code", { children: "this" }),
          " keyword can be altered."
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
							const self = useSelf();
						`,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "The ",
          /* @__PURE__ */ jsx("code", { children: "useSelf" }),
          " hook accepts no parameters."
        ] })
      ] })
    },
    {
      title: "Example: custom class",
      id: "modal-example",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "An example is to add a custom class to the element based on some conditions. To do that, you can use the ",
          /* @__PURE__ */ jsx("code", { children: "useSelf" }),
          " hook to access the element's instance."
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
							import { defineWompo, html, useSelf } from 'wompo';

							export default function InputExample({ disabled, styles: s }) {
								const self = useSelf();

                useEffect(() => {
                  if(disabled) self.classList.add(s.disabled);
                }, [disabled])

								return html\`
                  <input disabled=\${disabled} />
								\`;
							}

              InputExample.css = \`
                .disabled {
                  opacity: .7;
                  cursor: not-allowed;
                }
              \`;

							defineWompo(InputExample);
						`,
            language: "js"
          }
        )
      ] })
    }
  ]
};
export default function UseSelf() {
  return getPageLayout(content);
}
defineWompo(UseSelf, {
  name: "use-self-hook-page"
});
