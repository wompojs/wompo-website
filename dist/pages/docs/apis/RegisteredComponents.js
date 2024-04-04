import { Fragment, jsx, jsxs } from "wompo/jsx-runtime";
import { defineWompo } from "wompo";
import getPageLayout from "../../../utils/getPageLayout.js";
import Note from "../../../components/Note.js";
const content = {
  title: "registeredComponents",
  description: /* @__PURE__ */ jsx(Fragment, { children: "Hot to get the collection of the components registered in the browser." }),
  sections: [
    {
      title: "Description",
      id: "description",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "The ",
          /* @__PURE__ */ jsx("code", { children: "registeredComponent" }),
          " exported object is an object exported by the Wompo library that has the names of the registered Web Components as keys, and their corresponding functional Component as a value (not the generated HTML class)."
        ] }),
        /* @__PURE__ */ jsx(Note, { severity: "warning", children: "This object is supposed to be read-only." })
      ] })
    }
  ]
};
export default function RegisteredComponents() {
  return getPageLayout(content);
}
defineWompo(RegisteredComponents, {
  name: "registered-components-apis-page"
});
