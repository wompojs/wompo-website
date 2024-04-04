import { jsx, jsxs } from "wompo/jsx-runtime";
import { defineWompo } from "wompo";
import Header from "../components/Header.js";
import SideMenu from "../components/SideMenu.js";
import { ChildRoute } from "wompo-router";
import Footer from "../components/Footer.js";
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
    title: "Styling",
    link: "/docs/styling"
  },
  {
    title: "Hooks",
    link: "/docs/hooks",
    menu: [
      {
        title: "useAsync",
        link: "/docs/hooks/useAsync"
      },
      {
        title: "useCallback",
        link: "/docs/hooks/useCallback"
      },
      {
        title: "useContext",
        link: "/docs/hooks/useContext"
      },
      {
        title: "useEffect",
        link: "/docs/hooks/useEffect"
      },
      {
        title: "useExposed",
        link: "/docs/hooks/useExposed"
      },
      {
        title: "useHook",
        link: "/docs/hooks/useHook"
      },
      {
        title: "useId",
        link: "/docs/hooks/useId"
      },
      {
        title: "useLayoutEffect",
        link: "/docs/hooks/useLayoutEffect"
      },
      {
        title: "useMemo",
        link: "/docs/hooks/useMemo"
      },
      {
        title: "useReducer",
        link: "/docs/hooks/useReducer"
      },
      {
        title: "useRef",
        link: "/docs/hooks/useRef"
      },
      {
        title: "useState",
        link: "/docs/hooks/useState"
      }
    ]
  },
  {
    title: "Custom hooks",
    link: "/docs/custom-hooks"
  },
  {
    title: "Components",
    link: "/docs/components",
    menu: [
      {
        title: "Suspense",
        link: "/docs/components/suspense"
      }
    ]
  },
  {
    title: "APIs",
    link: "/docs/apis",
    menu: [
      {
        title: "createContext",
        link: "/docs/apis/createContext"
      },
      {
        title: "defineWompo",
        link: "/docs/apis/defineWompo"
      },
      {
        title: "Element API",
        link: "/docs/apis/element"
      },
      {
        title: "html",
        link: "/docs/apis/html"
      },
      {
        title: "lazy",
        link: "/docs/apis/lazy"
      },
      {
        title: "registeredComponents",
        link: "/docs/apis/registeredComponents"
      },
      {
        title: "wompDefaultOptions",
        link: "/docs/apis/wompDefaultOptions"
      }
    ]
  },
  {
    title: "JSX",
    link: "/docs/jsx"
  },
  {
    title: "Typescript",
    link: "/docs/typescript"
  }
];
export default function Layout({ styles: s }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("div", { class: s.pageContent, children: [
      /* @__PURE__ */ jsx(
        SideMenu,
        {
          menu: mainMenu,
          title: /* @__PURE__ */ jsx("div", { style: { fontSize: 14, color: "#585858", padding: "2rem" }, children: "wompo@1.0.1" })
        }
      ),
      /* @__PURE__ */ jsx("div", { style: { width: "100%" }, children: /* @__PURE__ */ jsx(ChildRoute, {}) })
    ] }),
    /* @__PURE__ */ jsx(Footer, { class: s.footer })
  ] });
}
Layout.css = `
	:host {
    display: flex;
  }
	.pageContent {
		display: flex;
		height: 100%;
		background-color: #fff;
		z-index: 2;
		position: relative;
	}
	.footer {
		width: 100%;
	}
`;
defineWompo(Layout, {
  name: "docs-layout"
});
