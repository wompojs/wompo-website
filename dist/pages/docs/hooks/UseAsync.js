import { Fragment, jsx, jsxs } from "womp/jsx-runtime";
import { defineWomp } from "womp";
import getPageLayout from "../../../utils/getPageLayout.js";
import Code from "../../../components/Code.js";
import { Link } from "womp-router";
const content = {
  title: "useAsync hook",
  description: /* @__PURE__ */ jsxs(Fragment, { children: [
    "How to use the ",
    /* @__PURE__ */ jsx("code", { children: "useAsync" }),
    " hook to make asynchronous requests and easily show a loading UI."
  ] }),
  sections: [
    {
      title: "Description",
      id: "description",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("p", { children: "This hook allows to execute a function that returns a promise." }),
        /* @__PURE__ */ jsxs("p", { children: [
          "It is very common to create a component that will fetch some data from a server and build the UI accordingly. You can do that in a ",
          /* @__PURE__ */ jsx("code", { children: "useEffect" }),
          " hook and manually handle the loading state of the component, or, you can use the ",
          /* @__PURE__ */ jsx("code", { children: "useAsync" }),
          " ",
          "hook and handle everything automatically."
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
							const data = useAsync(promiseFn, dependencies);
						`,
            lang: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "The hook accepts a callback and a list of dependencies as parameters. The callback must return a promise and should have no parameters. It will be executed on first render and whenever one of the dependencies changes. ",
          /* @__PURE__ */ jsx("br", {}),
          "The hook will return ",
          /* @__PURE__ */ jsx("code", { children: "null" }),
          " if the promise is being resolved, otherwise the result of the promise. The component will be automatically re-rendered once the promise is resolved."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "This hook can be used in conjunction with the ",
          /* @__PURE__ */ jsx("code", { children: "Suspense" }),
          " component to show a loading indicator while the promise is being resolved."
        ] })
      ] })
    },
    {
      title: "Example: fetching initial data",
      id: "example",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "A common use case for the ",
          /* @__PURE__ */ jsx("code", { children: "useAsync" }),
          " callback is to make a fetch request to a server to get the initial data of the component. Let's do it:"
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
							import { useAsync, defineWomp, html } from 'womp';

							export default function User({ userId }) {
								const userData = useAsync(async () => {
                  try {
                    const res = await fetch(\`/get/user/\${userId}\`);
                    const userData = await res.json();
                    return html\`<div>
                      Name: \${user.name} \${user.lastname}
                    </div>\`;
                  } catch(err){
                    return html\`User not found!\`;
                  }
                }, [userId])

								return html\`<div>
                  \${userData == null ? html\`<i>Loading...</i>\` : userData}
                </div>\`;
							}

							defineWomp(Component);
						`,
            lang: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "In this example, when the component is initialized the async function will be executed and it will fetch the data to the server. Once it's done, it'll re-render the component with the result of the call.",
          /* @__PURE__ */ jsx("br", {}),
          "In this example the loading state is handled manually, but you can also do that using the ",
          /* @__PURE__ */ jsx("code", { children: "Suspense" }),
          " component."
        ] })
      ] })
    },
    {
      title: "Example: using Suspense",
      id: "suspense-example",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "The ",
          /* @__PURE__ */ jsx("code", { children: "Suspense" }),
          " component can be used in conjunction with the",
          " ",
          /* @__PURE__ */ jsx("code", { children: "useAsync" }),
          " hook to handle automatically the loading state. The",
          " ",
          /* @__PURE__ */ jsx(Link, { to: "/docs/components/suspense", children: "Suspense" }),
          " component will render it's children if everyone of them has completely rendered and fetched data, otherwise it will return a",
          " ",
          /* @__PURE__ */ jsx("b", { children: "fallback" }),
          " (usually a loading indicator)."
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
							import { useAsync, defineWomp, html, Suspense } from 'womp';

              function App(){
                return html\`<div>
                  <\${Suspense} fallback=\${html\`<i>Loading...</i>\`}>
                    <\${User} userId="0" />
                    <\${User} userId="1" />
                    <\${User} userId="2" />
                  </\${Suspense}>
                </div>\`;
              }

							function User({ userId }) {
								const userData = useAsync(async () => {
                  try {
                    const res = await fetch(\`/get/user/\${userId}\`);
                    const userData = await res.json();
                    return html\`<div>
                      Name: \${user.name} \${user.lastname}
                    </div>\`;
                  } catch(err){
                    return html\`User not found!\`;
                  }
                }, [userId])

								return html\`<div>
                  \${userData}
                </div>\`;
							}
						`,
            lang: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "In the above example, the ",
          /* @__PURE__ */ jsx("code", { children: "App" }),
          " component will render the",
          " ",
          /* @__PURE__ */ jsx("b", { children: "Suspense's fallback" }),
          " while the data of the ",
          /* @__PURE__ */ jsx("code", { children: "User" }),
          " components are being loaded, and ",
          /* @__PURE__ */ jsx("b", { children: "only when every one of them will have finished loading," }),
          " it will render the children. This allows to show a global loading indicator while a part of the UI is loading, without seeing in the UI every component being loaded separately."
        ] })
      ] })
    }
  ]
};
export default function UseAsync() {
  return getPageLayout(content);
}
defineWomp(UseAsync);
