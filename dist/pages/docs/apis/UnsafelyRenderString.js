import { Fragment, jsx, jsxs } from "wompo/jsx-runtime";
import { defineWompo } from "wompo";
import getPageLayout from "../../../utils/getPageLayout.js";
import Code from "../../../components/Code.js";
import Note from "../../../components/Note.js";
const content = {
  title: "unsafelyRenderString API",
  description: /* @__PURE__ */ jsxs(Fragment, { children: [
    "How to use the ",
    /* @__PURE__ */ jsx("code", { children: "unsafelyRenderString" }),
    " function to render a string variable that includes html code."
  ] }),
  sections: [
    {
      title: "Description",
      id: "description",
      content: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("p", { children: [
        "The ",
        /* @__PURE__ */ jsx("code", { children: "unsafelyRenderString" }),
        " function is used to render a string variable that includes html code. This is needed because by default, for security reasons, Wompo escapes HTML code that is included in string variables included in a template. To avoid this automatic escaping, you should use the ",
        /* @__PURE__ */ jsx("code", { children: "unsafelyRenderString" }),
        " function.",
        /* @__PURE__ */ jsx("br", {})
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
							const escaped = unsafelyRenderString(variable);
						`,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "The ",
          /* @__PURE__ */ jsx("code", { children: "unsafelyRenderString" }),
          " function accepts one single argument, which is the string variable that will be escaped."
        ] }),
        /* @__PURE__ */ jsx(Note, { severity: "warning", children: "Only use this function when you are absolutely sure that the variable doesnt include dangerous code. Avoid this approach when your variable arrives from the final user's input." })
      ] })
    }
  ]
};
export default function UnsafelyRenderStringApi() {
  return getPageLayout(content);
}
defineWompo(UnsafelyRenderStringApi, {
  name: "unsafely-render-string-api-apis-page"
});
