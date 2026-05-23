import { Fragment, jsx, jsxs } from "wompo/jsx-runtime";
import { defineWompo } from "wompo";
import getPageLayout from "../../../utils/getPageLayout.js";
import Code from "../../../components/Code.js";
const content = {
  title: "useMemo hook",
  description: /* @__PURE__ */ jsxs(Fragment, { children: [
    "How to use the ",
    /* @__PURE__ */ jsx("code", { children: "useMemo" }),
    " hook to save the result of a function without re-calculating it on every render."
  ] }),
  sections: [
    {
      title: "Description",
      id: "description",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "The ",
          /* @__PURE__ */ jsx("code", { children: "useMemo" }),
          " hook will let you save the result of a function so that it will not be re-calculated on every render. Using it can considerably improve performances, especially if the function performs heavy operations."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Common use cases for this hook are:",
          /* @__PURE__ */ jsxs("ul", { children: [
            /* @__PURE__ */ jsx("li", { children: "Sorting arrays" }),
            /* @__PURE__ */ jsx("li", { children: "Filtering arrays" }),
            /* @__PURE__ */ jsx("li", { children: "Building objects" })
          ] })
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
							const result = useMemo(calculatorFn, dependencies);
						`,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "The ",
          /* @__PURE__ */ jsx("code", { children: "useMemo" }),
          " hook accepts two parameters: the ",
          /* @__PURE__ */ jsx("b", { children: "calculator" }),
          " function and a list of dependencies. The calculator function accepts no parameters and should be pure and not be asynchronous. The new result of this function will be returned by the hook on the first render or whenever one of the listed ",
          /* @__PURE__ */ jsx("b", { children: "dependencies" }),
          " changes."
        ] }),
        /* @__PURE__ */ jsx("p", { children: "You should use this hook whenever possible if you have to calculate the value of something through a function. Example:" }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
              // \u274C This will calculate the result on every render! Will make the CPU sad!
              const activeUsers = users.filter(user => user.active);
            `,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
              // \u2705 Will be executed only when the "users" array changes
              const activeUsers = useMemo(() => users.filter(user => user.active), [users]);
            `,
            language: "js"
          }
        )
      ] })
    },
    {
      title: "Example: ordering users",
      id: "ordering-users-example",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "In this example we will use the ",
          /* @__PURE__ */ jsx("code", { children: "useMemo" }),
          " hook to alphabetically order a list of users."
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
							import { useState, useMemo, html, defineWompo } from 'wompo';

              // Randomly create 50 initial users.
              const initialUsers = (() => {
                const users = [];
                for(let i=0; i < 50; i++) {
                  users.push({
                    username: (Math.random() + 1).toString(36).substring(2), // random string
                    id: i,
                  })
                }
                return users;
              })();

              export default function OrderedUsersList(){
                const [users, setUsers] = useState(initialUsers);
                const alphabeticallyOrdered = useMemo((users) => {
                  const ordered = users.sort((a, b) => a.username.localeCompare(b.username));
                  return ordered.map((user) => html\`<li>\${user.username}</li>\`)
                }, [users]);
                return html\`
                  <ul>
                    \${alphabeticallyOrdered}
                  </ul>
                \`;
              }
						`,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "In the above example we first generated 50 random users, then in the",
          " ",
          /* @__PURE__ */ jsx("code", { children: "OrderedUsersList" }),
          " component we sorted them inside the useMemo hook to save the sorted users list.",
          /* @__PURE__ */ jsx("br", {}),
          "This is a simple example, but if you increase the number of generated users (so that the sorting operation will be more computationally expensive), you can really see how the",
          " ",
          /* @__PURE__ */ jsx("b", { children: "useMemo hook can save your life" }),
          " (and the final user's life)."
        ] })
      ] })
    }
  ]
};
export default function UseMemo() {
  return getPageLayout(content);
}
defineWompo(UseMemo, {
  name: "usememo-hook-page"
});
