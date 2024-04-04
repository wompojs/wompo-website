import { Fragment, jsx, jsxs } from "wompo/jsx-runtime";
import { defineWompo } from "wompo";
import getPageLayout from "../../utils/getPageLayout.js";
import Code from "../../components/Code.js";
import Note from "../../components/Note.js";
const content = {
  title: "How to use JSX",
  description: "Use JSX to make the editor help you while building your components.",
  sections: [
    {
      title: "What is JSX",
      id: "what-is-jsx",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("b", { children: "JSX" }),
          " is an extension of JavaScript that allows to write Markup code into your JS files. This make creating your components layout easier, because the editor can easily help you. It will also check your component's props to find mistakes and type issues if you also use Typescript. An example of a JSX component is the following:"
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
              import { defineWompo } from 'wompo';

              export default function Section({ title, children }) {
                return (
                  <section>
                    <h2>{title}</h2>
                    <div>
                      {children}
                    </div>
                  </section>
                )
              }

              defineWompo(Section);
            `,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "As you can see, the ",
          /* @__PURE__ */ jsx("code", { children: "html" }),
          " function is not used to build the layout. Insted, you directly write your HTML into your component."
        ] }),
        /* @__PURE__ */ jsxs(Note, { severity: "info", children: [
          /* @__PURE__ */ jsx("b", { children: "Note:" }),
          " JSX files need a compiler. JSX is not natively supported by browsers."
        ] }),
        /* @__PURE__ */ jsx("p", { children: "The code in the example will be transformed by the compiler into the following:" }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
              import { jsx } from "wompo/jsx-runtime";
              import { defineWompo } from "wompo";
              export default function Section({ title, children }) {
                return jsx("section", { children: [
                  jsx("h2", { children: title }),
                  jsx("div", { children: children }),
                ]});
              }
            `,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "The ",
          /* @__PURE__ */ jsx("code", { children: "jsx" }),
          " function will transform the content into the same type of result that the ",
          /* @__PURE__ */ jsx("code", { children: "html" }),
          " function returns. This means one thing:",
          " ",
          /* @__PURE__ */ jsxs("b", { children: [
            "using JSX is actually less performant than using the ",
            /* @__PURE__ */ jsx("code", { children: "html" }),
            " function."
          ] }),
          " ",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("i", { children: "Why?" }),
          " For these reasons:",
          /* @__PURE__ */ jsxs("ol", { children: [
            /* @__PURE__ */ jsxs("li", { children: [
              "In the end, the ",
              /* @__PURE__ */ jsx("code", { children: "jsx" }),
              " function is only a wrapper that will return the result of the ",
              /* @__PURE__ */ jsx("code", { children: "html" }),
              " function, so you do an extra step to get the same result."
            ] }),
            /* @__PURE__ */ jsx("li", { children: "By using this approach you cannot really know which parts are the dynamic ones: basically everything is dynamic, and Wompo will re-render parts of your component that normally is not necessary to update." })
          ] })
        ] })
      ] })
    },
    {
      title: "Configuration",
      id: "configuration",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "To make JSX work, you have to write the following lines in the",
          " ",
          /* @__PURE__ */ jsx("code", { children: "jsconfig.json" }),
          "or ",
          /* @__PURE__ */ jsx("code", { children: "tsconfig.json" }),
          " files:"
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
              { 
                "compilerOptions": {
                  // ...
                  "jsx": "react-jsx",
                  "jsxImportSource": "wompo",
                  // ...
                } 
              }
            `,
            language: "js"
          }
        )
      ] })
    },
    {
      title: "Example: Counter",
      id: "counter-example",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("p", { children: "In this example you'll be able to create a simple counter using JSX with Wompo:" }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
              export default function Counter() {
                const [counter, setCounter] = useState(0);
                const increment = () => setCounter(counter + 1);
                return (
                  <button onClick={increment}>Current value: {counter}</button>
                );
              }
            `,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsxs(Note, { severity: "info", children: [
          "The main differences between JSX and the ",
          /* @__PURE__ */ jsx("code", { children: "html" }),
          " approach are:",
          /* @__PURE__ */ jsxs("ul", { children: [
            /* @__PURE__ */ jsx("li", { children: 'Events are not prefixed by a "@" but by "on"' }),
            /* @__PURE__ */ jsx("li", { children: `Dynamic values don't need a dollor sign ("$") before brackets` }),
            /* @__PURE__ */ jsxs("li", { children: [
              "You don't need to wrap a custom component into braces: you can simply type it in the markup (e.g. ",
              /* @__PURE__ */ jsx("code", { children: "<CustomComponent />" }),
              ")"
            ] })
          ] })
        ] })
      ] })
    }
  ]
};
export default function JsxPage() {
  return getPageLayout(content);
}
defineWompo(JsxPage, {
  name: "jsx-page"
});
