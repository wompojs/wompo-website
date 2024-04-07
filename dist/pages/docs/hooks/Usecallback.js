import { Fragment, jsx, jsxs } from "wompo/jsx-runtime";
import { defineWompo } from "wompo";
import getPageLayout from "../../../utils/getPageLayout.js";
import Code from "../../../components/Code.js";
import Note from "../../../components/Note.js";
const content = {
  title: "useCallback hook",
  description: /* @__PURE__ */ jsxs(Fragment, { children: [
    "How to use the ",
    /* @__PURE__ */ jsx("code", { children: "useCallback" }),
    " hook to cache functions and improve performance."
  ] }),
  sections: [
    {
      title: "Description",
      id: "description",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "The ",
          /* @__PURE__ */ jsx("code", { children: "useCallback" }),
          " hook is a hook that lets you save a function definition across re-renders, so that it'll always keep the same reference to it.",
          /* @__PURE__ */ jsx("br", {}),
          "Why is it useful? Because in javascript two function declarations are not considered equal:",
          /* @__PURE__ */ jsx(
            Code,
            {
              language: "js",
              code: `
                function(){} === function(){} // false
                
                const a = () => {}
                a === a // true
              `
            }
          ),
          "So, for example, a useful case in which to use it, is when a callback function is passed through the props of another component: if you don't use the `useCallback` hook, the child component will re-render every time the parent component changes, because the two functions will be considered different."
        ] }),
        /* @__PURE__ */ jsxs(Note, { severity: "info", children: [
          /* @__PURE__ */ jsx("b", { children: "Note:" }),
          " This consideration doesn't apply to events, because events are stored in a simple variable and will not cause an add/removal of event listeners, so it's not computationally expensive: it's more expensive to store the callback and get it back every time."
        ] })
      ] })
    },
    {
      title: "Usage",
      id: "usage",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
							const callback = useCallback(callbackDefinition, dependencies);
						`,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "The hook will cache the ",
          /* @__PURE__ */ jsx("code", { children: "callbackDefinition" }),
          " function and alway return the same value on every render, without re-initializing the function on every render.",
          /* @__PURE__ */ jsx("br", {}),
          "The hook accepts a two parameters: a callback that can be any function declaration, and a list of dependencies. The dependecies are optional, but if they are set, the hook will check if any of them changed, and if it happened, it will re-build the function and return the new value."
        ] })
      ] })
    },
    {
      title: "Example",
      id: "counter-example",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "A basic example is using the ",
          /* @__PURE__ */ jsx("code", { children: "useCallback" }),
          " hook to pass it to another component as a parement, so that useless re-renderings are avoided."
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
							import { useCallback, defineWompo, html } from 'wompo';
              import UserForm from './UserForm';

							export default function User({ userId }) {
								const submitData = useCallback(() => {
                  fetch(\`/udpate/user/\${userId}\`, { method: 'POST', body: data })
                }, [userId])

								return html\`<\${UserForm} onSubmit=\${submitData} />\`;
							}

							defineWompo(Component);
						`,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "In this example, the ",
          /* @__PURE__ */ jsx("code", { children: "UserForm" }),
          " component will not re-render every time that the ",
          /* @__PURE__ */ jsx("code", { children: "User" }),
          " component renders."
        ] })
      ] })
    }
  ]
};
export default function UseCallback() {
  return getPageLayout(content);
}
defineWompo(UseCallback, {
  name: "usecallback-hook-page"
});
