import { Fragment, jsx, jsxs } from "womp/jsx-runtime";
import { defineWomp } from "womp";
import { Link, Route, Routes } from "womp-router";
import Layout from "./layout/Layout.js";
const docsRoutes = [
  {
    path: "overview",
    pagePath: "./pages/docs/Introduction.js"
  },
  {
    path: "quick-start",
    pagePath: "./pages/docs/QuickStart.js"
  },
  {
    path: "complex-example",
    pagePath: "./pages/docs/ComplexExample.js"
  },
  {
    path: "hooks",
    pagePath: "./pages/docs/hooks/Hooks.js",
    subRoutes: [
      {
        path: "useState",
        pagePath: "./pages/docs/hooks/UseState.js"
      }
    ]
  }
];
export default function App() {
  return /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(
      Route,
      {
        path: "/",
        element: /* @__PURE__ */ jsx("i", { children: /* @__PURE__ */ jsx(Link, { to: "/docs", children: "docs" }) })
      }
    ),
    /* @__PURE__ */ jsxs(Route, { path: "/docs", element: /* @__PURE__ */ jsx(Layout, {}), children: [
      docsRoutes.map((docPage) => /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Route, { path: docPage.path, fallback: /* @__PURE__ */ jsx("i", {}), lazy: () => import(docPage.pagePath) }),
        docPage.subRoutes && docPage.subRoutes.map((subRoute) => /* @__PURE__ */ jsx(
          Route,
          {
            path: `${docPage.path}/${subRoute.path}`,
            fallback: /* @__PURE__ */ jsx("i", {}),
            lazy: () => import(subRoute.pagePath)
          }
        ))
      ] })),
      /* @__PURE__ */ jsx(Route, { index: true, redirect: "overview" })
    ] })
  ] });
}
defineWomp(App, {
  name: "womp-app"
});
//! Rules: Always return same template.
//! style=${object}
//! cssModule
