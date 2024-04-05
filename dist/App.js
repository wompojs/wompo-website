import { Fragment, jsx, jsxs } from "wompo/jsx-runtime";
import { defineWompo } from "wompo";
import { Route, Routes } from "wompo-router";
import Layout from "./layout/Layout.js";
const docsRoutes = [
  {
    path: "overview",
    pagePath: "./pages/docs/Introduction.js",
    meta: {
      title: "Wompo - Overview",
      description: "Wompo ah the following features: react-like API, performant, built-in CSS modules, automatic component naming, re-usable, has JSX Support, is bundle free."
    }
  },
  {
    path: "quick-start",
    pagePath: "./pages/docs/QuickStart.js",
    meta: {
      title: "Quick Start",
      description: "See how to create a counter component with Wompo and explore the main APIs of the library."
    }
  },
  {
    path: "complex-example",
    pagePath: "./pages/docs/ComplexExample.js",
    meta: {
      title: "Complex Example",
      description: "See how to create a Todo List with Wompo and explore more complex APIs."
    }
  },
  {
    path: "styling",
    pagePath: "./pages/docs/Styling.js",
    meta: {
      title: "Styling your components",
      description: "Explore different approaches to style your components: basic CSS, with Shadow DOM, or with Wompo's built-in CSS Modules."
    }
  },
  {
    path: "hooks",
    pagePath: "./pages/docs/hooks/Hooks.js",
    meta: {
      title: "Wompo Hooks",
      description: "Wompo has different built-in hooks that you can use to add specific functionalities in your components."
    },
    subRoutes: [
      {
        path: "useAsync",
        pagePath: "./pages/docs/hooks/UseAsync.js",
        meta: {
          title: "useAsync - Wompo hooks",
          description: "The useAsync hook will take care of asynchronous operations in the component by executing a callback on first render and when one of its dependencies changes."
        }
      },
      {
        path: "useCallback",
        pagePath: "./pages/docs/hooks/UseCallback.js",
        meta: {
          title: "useCallback - Wompo hooks",
          description: "The useCallback hook will take a function and save it so that it's not re-created on every render."
        }
      },
      {
        path: "useContext",
        pagePath: "./pages/docs/hooks/UseContext.js",
        meta: {
          title: "useContext - Wompo hooks",
          description: "The useContext hook returns the value provided by the closest parent context provider of the specified context and re-renders the component if the context changes."
        }
      },
      {
        path: "useEffect",
        pagePath: "./pages/docs/hooks/UseEffect.js",
        meta: {
          title: "useEffect - Wompo hooks",
          description: "The useEffect hook will execute a callback on the first render and whenever one of its dependencies changes."
        }
      },
      {
        path: "useExposed",
        pagePath: "./pages/docs/hooks/UseExposed.js",
        meta: {
          title: "useExposed - Wompo hooks",
          description: "The useExposed hook will let you expose some values and/or functions in the comonent's instance in the DOM."
        }
      },
      {
        path: "useHook",
        pagePath: "./pages/docs/hooks/UseHook.js",
        meta: {
          title: "useHook - Wompo hooks",
          description: "The useHook hook is a special hook that allows to create your custom advanced hooks."
        }
      },
      {
        path: "useId",
        pagePath: "./pages/docs/hooks/UseId.js",
        meta: {
          title: "useId - Wompo hooks",
          description: "The useId hook allows to create a pseudo-random unique ID to use inside your components."
        }
      },
      {
        path: "useLayoutEffect",
        pagePath: "./pages/docs/hooks/UseLayoutEffect.js",
        meta: {
          title: "useLayoutEffect - Wompo hooks",
          description: "The useLayoutEffect hook allows to synchronously execute a callback on the first render or whenever one of its dependencies changes."
        }
      },
      {
        path: "useMemo",
        pagePath: "./pages/docs/hooks/UseMemo.js",
        meta: {
          title: "useMemo - Wompo hooks",
          description: "The useMemo hook will let you execute a callback function and return its result only when a dependency changes, instead of on every render."
        }
      },
      {
        path: "useReducer",
        pagePath: "./pages/docs/hooks/UseReducer.js",
        meta: {
          title: "useReducer - Wompo hooks",
          description: "The useReducer hook will let manage the state of your component in a Redux-like approach."
        }
      },
      {
        path: "useRef",
        pagePath: "./pages/docs/hooks/UseRef.js",
        meta: {
          title: "useRef - Wompo hooks",
          description: "The useRef hook will save a value across renders and will always return the same."
        }
      },
      {
        path: "useState",
        pagePath: "./pages/docs/hooks/UseState.js",
        meta: {
          title: "useState - Wompo hooks",
          description: "The useState hook will save a value across renders without re-initializing a variable."
        }
      }
    ]
  },
  {
    path: "custom-hooks",
    pagePath: "./pages/docs/CustomHooks.js",
    meta: {
      title: "Custom hooks",
      description: "Learn how to create your own custom hook with Wompo."
    }
  },
  {
    path: "components",
    pagePath: "./pages/docs/components/Components.js",
    meta: {
      title: "Wompo built-in components",
      description: "Check which components are available when installing Wompo."
    },
    subRoutes: [
      {
        path: "suspense",
        pagePath: "./pages/docs/components/SuspenseComponent.js",
        meta: {
          title: "Suspense - Wompo components",
          description: "The Suspense component will show a fallback UI while at least one of its children is still rendering or making an asynchronous operation."
        }
      }
    ]
  },
  {
    path: "apis",
    pagePath: "./pages/docs/apis/Apis.js",
    subRoutes: [
      {
        path: "createContext",
        pagePath: "./pages/docs/apis/CreateContext.js",
        meta: {
          title: "createContext - Wompo API",
          description: "The Suspense component will show a fallback UI while at least one of its children is still rendering or making an asynchronous operation."
        }
      },
      {
        path: "defineWompo",
        pagePath: "./pages/docs/apis/DefineWompo.js"
      },
      {
        path: "element",
        pagePath: "./pages/docs/apis/ElementApi.js"
      },
      {
        path: "html",
        pagePath: "./pages/docs/apis/HtmlApi.js"
      },
      {
        path: "lazy",
        pagePath: "./pages/docs/apis/LazyApi.js"
      },
      {
        path: "registeredComponents",
        pagePath: "./pages/docs/apis/registeredComponents.js"
      },
      {
        path: "wompDefaultOptions",
        pagePath: "./pages/docs/apis/WompoDefaultOptions.js"
      }
    ]
  },
  {
    path: "jsx",
    pagePath: "./pages/docs/Jsx.js"
  },
  {
    path: "typescript",
    pagePath: "./pages/docs/Typescript.js"
  }
];
export default function App() {
  return /* @__PURE__ */ jsx(Routes, { children: /* @__PURE__ */ jsxs(Route, { path: "/docs", element: /* @__PURE__ */ jsx(Layout, {}), children: [
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
  ] }) });
}
defineWompo(App, {
  name: "wompo-root"
});
//! Rules: Always return same template.
//! style=${object}
//! cssModule
