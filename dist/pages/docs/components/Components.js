import { Fragment, jsx, jsxs } from "wompo/jsx-runtime";
import { defineWompo } from "wompo";
import getPageLayout from "../../../utils/getPageLayout.js";
import { Link } from "wompo-router";
const content = {
  title: "Built-in components",
  description: /* @__PURE__ */ jsx(Fragment, { children: "Wompo exposes some specific built-in components that you can use to improve your application. You are then free to create your owns." }),
  sections: [
    {
      title: "Components",
      id: "components",
      content: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("p", { children: [
        "The list of built-in Wompo components are the following:",
        /* @__PURE__ */ jsx("ul", { children: /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx(Link, { to: "suspense", children: "Suspense" }),
          " - Will let you display a fallback UI while the children are stil loading or performinc async operations."
        ] }) })
      ] }) })
    }
  ]
};
export default function ComponentsPage() {
  return getPageLayout(content);
}
defineWompo(ComponentsPage, {
  name: "components-page"
});
