import { jsx, jsxs } from "womp/jsx-runtime";
import { defineWomp } from "womp";
import Header from "../components/Header.js";
import SideMenu from "../components/SideMenu.js";
import { ChildRoute } from "womp-router";
const mainMenu = [
  {
    title: "Overview",
    link: "overview"
  },
  {
    title: "Quick start",
    link: "quick-start"
  },
  {
    title: "Complex Example",
    link: "complex-example"
  },
  {
    title: "Hooks",
    link: "/docs/overview"
  }
];
export default function Layout({ styles: s }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", height: "100%" }, class: s.pageContent, children: [
      /* @__PURE__ */ jsx(
        SideMenu,
        {
          menu: mainMenu,
          title: /* @__PURE__ */ jsx("div", { style: { fontSize: 14, color: "#999", padding: "2rem" }, children: "womp@1.0.0" })
        }
      ),
      /* @__PURE__ */ jsx("div", { style: { width: "100%" }, children: /* @__PURE__ */ jsx(ChildRoute, {}) })
    ] })
  ] });
}
Layout.css = `
	:host {
    display: flex;
  }
  :host .pageContent {
    display: none;
  }
	@media (width > 1300px){
    :host .pageContent {
      display: block;
    }
  }
`;
defineWomp(Layout);
