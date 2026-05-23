import { Fragment, jsx, jsxs } from "wompo/jsx-runtime";
import { defineWompo } from "wompo";
import getPageLayout from "../../../utils/getPageLayout.js";
import Code from "../../../components/Code.js";
import { Link } from "wompo-router";
import Note from "../../../components/Note.js";
const content = {
  title: "useEffect hook",
  description: /* @__PURE__ */ jsxs(Fragment, { children: [
    "How to use the ",
    /* @__PURE__ */ jsx("code", { children: "useEffect" }),
    " hook to make a component execute some operations on specific situations."
  ] }),
  sections: [
    {
      title: "Description",
      id: "description",
      content: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("p", { children: [
        "The ",
        /* @__PURE__ */ jsx("code", { children: "useEffect" }),
        " hook is one of the main hooks you will use in your application. This hook lets you execute a callback (effect) function after the",
        " ",
        /* @__PURE__ */ jsx("b", { children: "first render" }),
        " and whenever one of the dependecies changes. This can be quite ideal for:",
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "Initializing the component" }),
          /* @__PURE__ */ jsxs("li", { children: [
            "Subscribing to events (e.g. ",
            /* @__PURE__ */ jsx("code", { children: "window.addEventListener" }),
            ")"
          ] }),
          /* @__PURE__ */ jsx("li", { children: "Using timeouts and intervals" }),
          /* @__PURE__ */ jsx("li", { children: "Performing animations" }),
          /* @__PURE__ */ jsxs("li", { children: [
            "Controlling a non-wompo widget or node in conjuctions with the ",
            /* @__PURE__ */ jsx("code", { children: "useRef" }),
            " ",
            "hook"
          ] })
        ] })
      ] }) })
    },
    {
      title: "Usage",
      id: "usage",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
							useEffect(effectFn, dependencies);
						`,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "The hook accepts two parameters: the ",
          /* @__PURE__ */ jsx("b", { children: "effect function" }),
          " and the",
          " ",
          /* @__PURE__ */ jsx("b", { children: "list of dependencies" }),
          ". The effect function will be executed on first render and any time one of the dependecies changes. This function can be a void function or can return a second function (called cleaning function) that will be executed",
          " ",
          /* @__PURE__ */ jsx("b", { children: "before the execution of the next same effect" }),
          " or if the component ",
          /* @__PURE__ */ jsx("b", { children: "unmount" }),
          " ",
          "(is removed from the DOM)."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "If an empty array is given as a list of dependecies, the effect will be executed",
          " ",
          /* @__PURE__ */ jsx("b", { children: "only" }),
          " after the first render."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "If no dependencies are specified, the effect will be executed on ",
          /* @__PURE__ */ jsx("b", { children: "every" }),
          " render."
        ] }),
        /* @__PURE__ */ jsxs(Note, { severity: "info", children: [
          /* @__PURE__ */ jsx("b", { children: "Note:" }),
          " The effect will be executed ",
          /* @__PURE__ */ jsx("b", { children: "asynchronously" }),
          " after the component has been rendered, not inline."
        ] })
      ] })
    },
    {
      title: "Example: timeout",
      id: "timeout-example",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "Using the ",
          /* @__PURE__ */ jsx("code", { children: "window.setTimeout" }),
          " function is a common use case for the",
          " ",
          /* @__PURE__ */ jsx("code", { children: "useEffect" }),
          " hook. Here's an example:"
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
							import { useEffect, defineWompo, html } from 'wompo';

              function TimeoutComponent(){
                useEffect(() => {
                  const timeoutId = setTimeout(() => {
                    alert('I was first rendered 5 seconds ago!');
                  }, 5000);
                  return () => {
                    clearTimeout(timeoutId);
                  }
                }, [])
                return html\`Nothing to see here, boss.\`;
              }

              defineWompo(TimeoutComponent);
						`,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsxs(Note, { severity: "warning", children: [
          "When using timeouts and intervals, remember to ",
          /* @__PURE__ */ jsx("b", { children: "always" }),
          " cancel them using the",
          " ",
          /* @__PURE__ */ jsx("b", { children: "cleaning function" }),
          " (like in the example). Not doing so can lead to unexpected behaviours, like the execution of code even if the element is no longer in the DOM."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("i", { children: "Why the useEffect hook is needed for this case?" }),
          /* @__PURE__ */ jsx("br", {}),
          "Because if you call the ",
          /* @__PURE__ */ jsx("code", { children: "setTimoeut" }),
          " function directly inside the component, it will be executed ",
          /* @__PURE__ */ jsx("b", { children: "every time" }),
          " the component renders. This usually causes unwanted loops when inside the timeout/interval callback a setState is called."
        ] })
      ] })
    },
    {
      title: "Example: fetching data",
      id: "fetching-data-example",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "The ",
          /* @__PURE__ */ jsx("code", { children: "useEffect" }),
          " hook can also be used to fetch data when the component renders."
        ] }),
        /* @__PURE__ */ jsxs(Note, { severity: "info", children: [
          /* @__PURE__ */ jsx("b", { children: "Note:" }),
          " This example is only made to understand better how the hook works and how to do async operations inside of it. If you actually have to perform data fetching, use the ",
          /* @__PURE__ */ jsx(Link, { to: "/docs/hooks/useAsync", children: "useAsync" }),
          " hook instead."
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
							import { useEffect, useState, defineWompo, html } from 'wompo';

              function User({ userId }){
                const [user, setUser] = useState(null);

                useEffect(() => {
                  fetch(\`/get/user/\${userId}\`)
                    .then((res) => res.json())
                    .then((data) => setUser(data));
                }, [userId])

                return html\`...\`;
              }

              defineWompo(User);
						`,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsxs(Note, { severity: "warning", children: [
          "The effect callback ",
          /* @__PURE__ */ jsx("b", { children: "cannot return a promise" }),
          ", so you cannot declare it as an async function and you cannot use the ",
          /* @__PURE__ */ jsx("b", { children: "await" }),
          " keyword. Use ",
          /* @__PURE__ */ jsx("code", { children: ".then" }),
          " functions or create an helper async function to call ",
          /* @__PURE__ */ jsx("b", { children: "inside" }),
          " the effect."
        ] })
      ] })
    },
    {
      title: "Example: local storage",
      id: "localstorage-example",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "This example will show how you can use the ",
          /* @__PURE__ */ jsx("b", { children: "useEffect" }),
          " hook to make operations into the ",
          /* @__PURE__ */ jsx("code", { children: "window.localStorage" }),
          " to save and get data."
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
							import { useEffect, useState, defineWompo, html } from 'wompo';

              function Theme({ userId }){
                const [theme, setTheme] = useState('light');

                // Get the user theme preference
                useEffect(() => {
                  // Gets executed only on first render
                  const savedThemePreference = localStorage.getItem('theme');
                  if(savedThemePreference)
                    setTheme(savedThemePreference);
                }, [])

                // Set the new user's theme preference
                useEffect(() => {
                  // Gets executed on first render and every time that "theme" changes
                  localStorage.setItem('theme', theme);
                }, [theme]);

                return html\`...\`;
              }

              defineWompo(Theme);
						`,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsx("p", { children: "In this example we used two effects: one to get the user's theme preference, executed only once, and one to save the user's theme preference whenever the theme preference changes." }),
        /* @__PURE__ */ jsxs(Note, { severity: "info", children: [
          /* @__PURE__ */ jsx("b", { children: "Effects will be executed in the order they are declared" }),
          ", so the order matters. In this example, if you execute the second effect before the other it will not work, because the theme in the localStorage will be always updated with the initial value of the state."
        ] })
      ] })
    },
    {
      title: "Example: Code highlighting",
      id: "code-highlighting-example",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "In this example we will combine the ",
          /* @__PURE__ */ jsx(Link, { to: "/docs/hooks/useRef", children: "useRef" }),
          " hook with the third party library ",
          /* @__PURE__ */ jsx("b", { children: "highlight.js" }),
          " and the ",
          /* @__PURE__ */ jsx("code", { children: "useEffect" }),
          " hook to create an highlighted code component."
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
							import { useEffect, useRef, defineWompo, html } from 'wompo';

              function Code({ code, lang }){
                const codeRef = useRef();

                useEffect(() => {
                  const highlighted = hljs.highlight(code, { language: lang });
                  codeRef.current.innerHTML = highlighted.value;
                }, [code, lang]);

                return html\`
                  <pre>
                    <code ref=\${codeRef}></code>
                  </pre>
                \`;
              }

              defineWompo(Code);
						`,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "In the above example the ",
          /* @__PURE__ */ jsx("code", { children: "Code" }),
          " component accepts a ",
          /* @__PURE__ */ jsx("b", { children: "code" }),
          " prop and a",
          " ",
          /* @__PURE__ */ jsx("b", { children: "lang" }),
          " prop that will be used to create the highligted HTML that will be injected in the <code> HTML element thanks to the ",
          /* @__PURE__ */ jsx("code", { children: "useRef" }),
          " hook."
        ] })
      ] })
    }
  ]
};
export default function UseEffect() {
  return getPageLayout(content);
}
defineWompo(UseEffect, {
  name: "useeffect-hook-page"
});
