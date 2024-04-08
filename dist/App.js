import { Fragment, jsx, jsxs } from "wompo/jsx-runtime";
import { defineWompo } from "wompo";
import { Route, Routes } from "wompo-router";
import Layout from "./layout/Layout.js";
import { docsRoutes } from "./utils/routes.js";
import LoadingPlaceholder from "./components/LoadingPlaceholder.js";
export default function App() {
  return /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsxs(Route, { path: "/docs", element: /* @__PURE__ */ jsx(Layout, {}), children: [
      docsRoutes.map((docPage) => /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          Route,
          {
            path: docPage.path,
            meta: docPage.meta,
            fallback: /* @__PURE__ */ jsx(LoadingPlaceholder, {}),
            lazy: () => import(docPage.pagePath)
          }
        ),
        docPage.subRoutes && docPage.subRoutes.map((subRoute) => /* @__PURE__ */ jsx(
          Route,
          {
            meta: subRoute.meta,
            path: `${docPage.path}/${subRoute.path}`,
            fallback: /* @__PURE__ */ jsx(LoadingPlaceholder, {}),
            lazy: () => import(subRoute.pagePath)
          }
        ))
      ] })),
      /* @__PURE__ */ jsx(Route, { index: true, redirect: "overview" })
    ] }),
    /* @__PURE__ */ jsx(Route, { path: "*", lazy: () => import("./pages/NotFound.js") })
  ] });
}
defineWompo(App, {
  name: "wompo-root"
});
//! Rules: Always return same template.
