import { Fragment, jsx, jsxs } from "wompo/jsx-runtime";
import { defineWompo } from "wompo";
import getPageLayout from "../../../utils/getPageLayout.js";
import { Link } from "wompo-router";
import Note from "../../../components/Note.js";
const content = {
  title: "Element API",
  description: /* @__PURE__ */ jsxs(Fragment, { children: [
    "How to use the ",
    /* @__PURE__ */ jsx("code", { children: "Element API" }),
    " to manually control a component and call methods on it."
  ] }),
  sections: [
    {
      title: "Description",
      id: "description",
      content: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("p", { children: "Every Wompo Component will be rendered in the DOM as a Web Component, so it'll be accessible by your scripts. In this guide we will explore what methods you can call and which properties you can access." }) })
    },
    {
      title: "Methods",
      id: "methods",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "Every element exposes the followig methods:",
          /* @__PURE__ */ jsxs("ul", { children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("code", { children: /* @__PURE__ */ jsx("b", { children: "requestRender()" }) }),
              " ",
              "- If called, it will start the rendering process of the component."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("code", { children: /* @__PURE__ */ jsx("b", { children: "onDisconnected()" }) }),
              " ",
              "- Should not be called directly: it's a callback function that you can override, and will be executed whenever the component is disconnected from the DOM."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("code", { children: /* @__PURE__ */ jsx("b", { children: "updateProp(propName, newValue)" }) }),
              " ",
              "- It will update a ",
              /* @__PURE__ */ jsx("b", { children: "prop" }),
              " of the component and automatically ask to re-render it if the new value differs from the previous one. The first parameter is the name of the prop you want to update, and the second is the new value you want to set on it."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Note, { severity: "info", children: [
          "If you used the ",
          /* @__PURE__ */ jsx(Link, { to: "/docs/hooks/useExposed", children: "useExposed" }),
          " hook inside of your component, the component will also have the methods you exposed."
        ] })
      ] })
    },
    {
      title: "Properties",
      id: "properties",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "Every element exposes the followig properties:",
          /* @__PURE__ */ jsxs("ul", { children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("code", { children: /* @__PURE__ */ jsx("b", { children: "props" }) }),
              " ",
              "- The object containing all the props of the component."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("code", { children: /* @__PURE__ */ jsx("b", { children: "hooks" }) }),
              " ",
              "- The list of hooks that the component has. You can access this property but we strongly recommend to ",
              /* @__PURE__ */ jsx("b", { children: "not modify" }),
              " any of them. It is exposed only so that you can ",
              /* @__PURE__ */ jsx("b", { children: "add" }),
              " your own hooks. See the ",
              /* @__PURE__ */ jsx(Link, { to: "/docs/hooks/useHook", children: "useHook" }),
              " ",
              "hook to know more."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Note, { severity: "info", children: [
          "If you used the ",
          /* @__PURE__ */ jsx(Link, { to: "/docs/hooks/useExposed", children: "useExposed" }),
          " hook inside of your component, the component will also have the properties you exposed."
        ] })
      ] })
    }
  ]
};
export default function ElementApi() {
  return getPageLayout(content);
}
defineWompo(ElementApi, {
  name: "element-api-apis-page"
});
