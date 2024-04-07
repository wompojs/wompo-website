import { Fragment, jsx, jsxs } from "wompo/jsx-runtime";
import { defineWompo } from "wompo";
import getPageLayout from "../../../utils/getPageLayout.js";
import Code from "../../../components/Code.js";
import { Link } from "wompo-router";
const content = {
  title: "wompoDefaultOptions",
  description: /* @__PURE__ */ jsx(Fragment, { children: "How to customize the default options of Wompo components to satisfy your exigencies." }),
  sections: [
    {
      title: "Description",
      id: "description",
      content: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("p", { children: [
        "Wompo exposes a ",
        /* @__PURE__ */ jsx("code", { children: "wompDefaultOptions" }),
        " object that is used to get the default values to use as the second parameter of the",
        " ",
        /* @__PURE__ */ jsx(Link, { to: "/docs/apis/defineWompo", children: "defineWompo" }),
        " function.",
        /* @__PURE__ */ jsx("br", {}),
        "The options you can modify are:",
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("b", { children: /* @__PURE__ */ jsx("code", { children: "shadow" }) }),
            " ",
            '- Default "false".'
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("b", { children: /* @__PURE__ */ jsx("code", { children: "cssModule" }) }),
            " ",
            '- Default "true".'
          ] })
        ] }),
        "To know more about these options see the documentation about the",
        " ",
        /* @__PURE__ */ jsx(Link, { to: "/docs/apis/defineWompo#usage", children: "defineWompo" }),
        " function."
      ] }) })
    },
    {
      title: "Example",
      id: "example: default shadow",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "One common use case is to make your components use the Shadow DOM by default. To get this result, you should modify the default option",
          " ",
          /* @__PURE__ */ jsx("b", { children: "before you define any other component" }),
          ". Components rendered ",
          /* @__PURE__ */ jsx("i", { children: "before" }),
          " you actually modify the default options will still have the old options applied."
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
							import { wompDefaultOptions } from 'wompo';

							wompDefaultOptions.shadow = true;
						`,
            language: "js"
          }
        )
      ] })
    }
  ]
};
export default function WompoDefaultOptions() {
  return getPageLayout(content);
}
defineWompo(WompoDefaultOptions, {
  name: "wompo-default-options-apis-page"
});
