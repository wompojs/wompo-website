import { Fragment, jsx, jsxs } from "womp/jsx-runtime";
import { defineWomp } from "womp";
import getPageLayout from "../../utils/getPageLayout.js";
import Code from "../../components/Code.js";
import { Link } from "womp-router";
import Note from "../../components/Note.js";
import UseTime from "../../examples/UseTime.js";
const content = {
  title: "Create your own hooks",
  description: "In this guide we will cover how to create your own hooks by combining the existing ones.",
  sections: [
    {
      title: "Introduction",
      id: "intro",
      content: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("p", { children: [
        "We know that the existing hooks will not satisfy ",
        /* @__PURE__ */ jsx("b", { children: "every" }),
        " single exigency that a developer can have while developing Womp Components, but they are the ",
        /* @__PURE__ */ jsx("b", { children: "base" }),
        " that allows developers to satisfy those exigencies. You can create your own custom hooks that can then be used across all components."
      ] }) })
    },
    {
      title: "Combining hooks",
      id: "combining-hooks",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "We can't stress it enough:",
          " ",
          /* @__PURE__ */ jsxs("i", { children: [
            "hooks are supposed to be used ",
            /* @__PURE__ */ jsx("b", { children: "only" }),
            " inside a component."
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { children: "...or..." }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("i", { children: "inside other hooks!" }) }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Exactly, you can create a custom function (hook) that executes other hooks on it. Of course, this function is supposed to only be called inside a component (or eventually another hook).",
          /* @__PURE__ */ jsx("br", {}),
          "As said before, native hooks are the ",
          /* @__PURE__ */ jsx("b", { children: "base" }),
          ": the have the main functionalities and concepts that can be combined together to create more advanced and complex hooks."
        ] })
      ] })
    },
    {
      title: "Example: useLocalStorage",
      id: "use-local-storage-example",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("p", { children: "Let's dive into the first example: a hook that allows to use the local storage easily." }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
              import { useState, useCallback } from 'womp';

              function useLocalStorage(key, defaultValue) {
                // Initialize state
                const [value, setValue] = useState(null);
                // Create a custom setter function to set the localStorage value
                const setter = useCallback((newValue) => {
                  localStorage.setItem(key, defaultValue);
                  setValue(defaultValue);
                });
                // We get the localStorage value only the first time
                if(value === null){
                  const storedItem = localStorage.getItem(key);
                  if(storedItem === null) {
                    // If no value is seved we initialize it with the default value.
                    setter(defaultValue); 
                  } else {
                    // Otherwise, we just set the current value with the one in the localStorage
                    setter(storedItem); 
                  }
                }
                return [value, setter];
              }
            `,
            lang: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "Easy, isn't it? We combined the ",
          /* @__PURE__ */ jsx(Link, { to: "/docs/hooks/useState", children: "useState" }),
          " hook and the ",
          /* @__PURE__ */ jsx(Link, { to: "/docs/hooks/useCallback", children: "useCallback" }),
          " hook to create the custom",
          " ",
          /* @__PURE__ */ jsx("code", { children: "useLocalStorage" }),
          " hook. This hook will accept a key and a default value, and will return the current value and a setter function to set a new value to the local storage. Thank to the ",
          /* @__PURE__ */ jsx("b", { children: "useState" }),
          " hook, the component will also be automatically re-rendered when you update the storage."
        ] }),
        /* @__PURE__ */ jsxs(Note, { severity: "info", children: [
          "If you return a function in your custom hook, you should ",
          /* @__PURE__ */ jsx("b", { children: "always" }),
          " wrap it around the ",
          /* @__PURE__ */ jsx("code", { children: "useCallback" }),
          " hook so that, if used as a parameter for other components, it'll not cause a useless re-render."
        ] })
      ] })
    },
    {
      title: "Example: useTime",
      id: "use-time-example",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("p", { children: "Another example can be a hook that will start counting the number of seconds since the component was first rendered (we personally don't have a clear idea of why it should be useful, but we think it's cool). This hook will not update the component: it will only count." }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
              import { useRef, useEffect } from 'womp';

              export default function useTime() {
                // Initialize the timer
                const timeRef = useRef(0);
                // Start the timer when the component is rendered for the first time
                useEffect(() => {
                  const intervalId = setInterval(() => {
                    // Update the timer by one every second.
                    timeRef.current += 1;
                  }, 1000);
                  // When the component is unmounted, stop the interval.
                  return () => {
                    clearInterval(intervalId);
                  };
                }, []);
                return timeRef;
              }
            `,
            lang: "js"
          }
        ),
        /* @__PURE__ */ jsx("p", { children: "And then, in a component:" }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
              import { defineWomp, html } from 'womp';
              import useTime from './useTime';

              function Component() {
                const timeSinceFirstRender = useTime();
                const showTime = () => {
                  alert(\`I was rendered \${timeSinceFirstRender.current} seconds ago\`)
                }
                return html\`
                  <button @click=\${showTime}>
                    If you click me I'll show you how many seconds ago I was rendered!
                  </button>
                \`;
              }
              defineWomp(Component);
            `,
            lang: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "Result:",
          /* @__PURE__ */ jsx(UseTime, {})
        ] })
      ] })
    },
    {
      title: "Advanced hooks",
      id: "advanced-hooks",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        "You can create your own hooks from scratch without combining all the already existing hooks (you still need to use at least one). This is an advanced case, and should always be avoided when possible. If you want to know more, check the",
        " ",
        /* @__PURE__ */ jsx(Link, { to: "/docs/hooks/useHook", children: "useHook" }),
        " hook reference."
      ] })
    }
  ]
};
export default function CustomHooks() {
  return getPageLayout(content);
}
defineWomp(CustomHooks);
