import { Fragment, jsx, jsxs } from "wompo/jsx-runtime";
import { defineWompo } from "wompo";
import getPageLayout from "../../../utils/getPageLayout.js";
import { Link } from "wompo-router";
const content = {
  title: "Hooks",
  description: "What are hooks: how and when to use them.",
  sections: [
    {
      title: "What are hooks?",
      id: "what-are-hooks",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          'Hooks are helper functions that let you add specific functionalities in your Wompo components. This functions will "hook" into the component so that they have access to the whole HTML instance and operate adding functionalities to it. More specifically, they allow to:',
          /* @__PURE__ */ jsxs("ul", { children: [
            /* @__PURE__ */ jsx("li", { children: "Make your component dynamic" }),
            /* @__PURE__ */ jsx("li", { children: "Create callbacks that will be executed on specific cases" }),
            /* @__PURE__ */ jsx("li", { children: "Keep a variable's value stable across renders" }),
            /* @__PURE__ */ jsxs("li", { children: [
              "Get a specific ",
              /* @__PURE__ */ jsx("b", { children: "Context" })
            ] }),
            /* @__PURE__ */ jsx("li", { children: "Optimize performances by avoiding useless re-renderings" })
          ] }),
          "Hooks work like ",
          /* @__PURE__ */ jsx("b", { children: "import statements" }),
          " inside a component. This implies that:",
          /* @__PURE__ */ jsxs("ol", { children: [
            /* @__PURE__ */ jsxs("li", { children: [
              "Like import statements, they ",
              /* @__PURE__ */ jsx("b", { children: "must" }),
              " be declared on top of the component, in the first lines, before any operation is performed."
            ] }),
            /* @__PURE__ */ jsx("li", { children: "They cannot be conditional or executed inside loops." })
          ] }),
          "If these conditions are not respected, the component might have unexpected behaviors."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Wompo offers a good variety of hooks, but you are also completely free to create your own very easily.",
          /* @__PURE__ */ jsx("br", {})
        ] })
      ] })
    },
    {
      title: "State hooks",
      id: "state-hooks",
      content: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("p", { children: [
        "State hooks are what allow to make a component dynamic and cause a re-render of it, so that you can see visual updates in your component. To do that, Wompo offers the following hooks:",
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx(Link, { to: "useState", children: "useState" }),
            " - Probably the most common hook you will use: creates a stateful variable and a setter function that will cause a re-render of the component when called (if the new value differs from the old one)."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx(Link, { to: "useReducer", children: "useReducer" }),
            " - For ",
            /* @__PURE__ */ jsx("b", { children: "Redux" }),
            " fans. This hook allows to elegantly handle the state of a component using a ",
            /* @__PURE__ */ jsx("b", { children: "reducer" }),
            " to handle all the operations to alter the state and a ",
            /* @__PURE__ */ jsx("b", { children: "dispatch" }),
            " function to set the new state."
          ] })
        ] })
      ] }) })
    },
    {
      title: "Effect hooks",
      id: "effect-hooks",
      content: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("p", { children: [
        "Effect hooks are what allow to execute a specific ",
        /* @__PURE__ */ jsx("b", { children: "callback" }),
        " when one of your",
        " ",
        /* @__PURE__ */ jsx("b", { children: "dependencies" }),
        " changes, or simply on the first (or on every) render. This dependencies are simply an array of values. The effect hooks are:",
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx(Link, { to: "useEffect", children: "useEffect" }),
            " - After ",
            /* @__PURE__ */ jsx("b", { children: "useState" }),
            ", the probably second most common hook you will use: will execute the callback after a render if any of its dependencies changed. The callback will be executed ",
            /* @__PURE__ */ jsx("b", { children: "Asynchronously" }),
            "."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx(Link, { to: "useLayoutEffect", children: "useLayoutEffect" }),
            " - It's the same as the",
            " ",
            /* @__PURE__ */ jsx("b", { children: "useEffect" }),
            " hook. The only difference is that the callback is executed",
            " ",
            /* @__PURE__ */ jsx("b", { children: "Synchronously" }),
            " immediately after a render, before you can see visual changes. The ",
            /* @__PURE__ */ jsx("i", { children: "useEffect" }),
            " hook is preferred, because it'll not saturate the JS call stack."
          ] })
        ] })
      ] }) })
    },
    {
      title: "Performance hooks",
      id: "performance-hooks",
      content: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("p", { children: [
        "Performance hooks let you skip useless operations across renders, or keep a value stable between renders so it's not re-initialized every time, allowing to optimize the component by avoiding unnecessary re-renderings.",
        /* @__PURE__ */ jsx("br", {}),
        "Performance hooks are:",
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx(Link, { to: "useRef", children: "useRef" }),
            " - It'll keep a value stable across renders, by always returning the last saved value. It can optionally also be used to reference a node in the DOM."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx(Link, { to: "useCallback", children: "useCallback" }),
            " - The useCallback hook will take a function and save it so that it's not re-created on every render. This is useful if you're using a function as an attribute value of some other components, because the attribute will always have the same value (remember that in Javascript two functions are never equal, unless a function is compared to itself)."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx(Link, { to: "useMemo", children: "useMemo" }),
            " - This hook will let you execute a callback function and elaborate its result only when a dependency changes, rather than on every render."
          ] })
        ] })
      ] }) })
    },
    {
      title: "Context hooks",
      id: "context-hooks",
      content: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("p", { children: [
        "A Context hook will let you ",
        /* @__PURE__ */ jsx("b", { children: "obtain a value provided by another parent element" }),
        ", more specifically, a ",
        /* @__PURE__ */ jsx("code", { children: "Context.Provider" }),
        " element. There is only one context hook:",
        /* @__PURE__ */ jsx("ul", { children: /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx(Link, { to: "useContext", children: "useContext" }),
          " - Will return the value provided by the closest parent ",
          /* @__PURE__ */ jsx("code", { children: "Context.Provider" }),
          " of the specified context. If there is not one, the default value of the context will be returned instead. The component that uses this hook will automatically re-render whenever the value provided by the provider changes."
        ] }) })
      ] }) })
    },
    {
      title: "Helper hooks",
      id: "helper-hooks",
      content: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("p", { children: [
        "Helper hooks are simple hooks that solve common problems. The currently available helper hooks are:",
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx(Link, { to: "useId", children: "useId" }),
            " - Will return a unique string in the format",
            " ",
            /* @__PURE__ */ jsx("code", { children: ":w<number>:" }),
            ". The ID will not change on every re-render. This is useful when you want to use IDs for node elements inside of a component. Common use cases are for inputs, labels, and accessibility."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx(Link, { to: "useExposed", children: "useExposed" }),
            " - The useExposed hook will let you expose some values and/or functions in the comonent's instance of the DOM. This allows, for example, to select a DOM node and call a method on it. Can be useful to",
            " ",
            /* @__PURE__ */ jsx("b", { children: "Expose the state" }),
            ". Commonly used in combination with the ",
            /* @__PURE__ */ jsx("i", { children: "useRef" }),
            " hook."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx(Link, { to: "useAsync", children: "useAsync" }),
            " - This hook will take care of asynchronous operations in the component by executing a callback on first render and when one of its dependencies changes. This hooks integrates with the",
            " ",
            /* @__PURE__ */ jsx(Link, { to: "/docs/components/suspense", children: "Suspense" }),
            " component, allowing to easily handle the loading state of the component."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx(Link, { to: "useHook", children: "useHook" }),
            " - The useHook is a special hook used to create your own advanced hooks. Should only be used if the current hooks are not enough to satisfy your needs."
          ] })
        ] })
      ] }) })
    }
  ]
};
export default function Hooks() {
  return getPageLayout(content);
}
defineWompo(Hooks, {
  name: "hooks-page"
});
