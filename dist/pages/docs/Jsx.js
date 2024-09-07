import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "wompo/jsx-runtime";
import { defineWompo } from 'wompo';
import getPageLayout from '../../utils/getPageLayout.js';
import Code from '../../components/Code.js';
import Note from '../../components/Note.js';
const content = {
    title: 'How to use JSX',
    description: 'Use JSX to make the editor help you while building your components.',
    sections: [
        {
            title: 'What is JSX',
            id: 'what-is-jsx',
            content: (_jsxs(_Fragment, { children: [_jsxs("p", { children: [_jsx("b", { children: "JSX" }), " is an extension of JavaScript that allows to write Markup code into your JS files. This makes creating your layouts easier, because the editor can help you by suggesting code and reporting errors in the markup. It will also check your component's props to find mistakes and type incompatibilites if you also use Typescript. An example of a JSX component is the following:"] }), _jsx(Code, { code: `
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
            `, language: 'js' }), _jsxs("p", { children: ["As you can see, the ", _jsx("code", { children: "html" }), " function is not used to build the layout. Instead, you directly write your HTML into your component."] }), _jsxs(Note, { severity: 'warning', children: [_jsx("b", { children: "Note:" }), " JSX files need a compiler. JSX is not natively supported by browsers."] }), _jsx("p", { children: "The code in the example will be transformed by the compiler into the following:" }), _jsx(Code, { code: `
              import { jsx } from "wompo/jsx-runtime";
              import { defineWompo } from "wompo";
              export default function Section({ title, children }) {
                return jsx("section", { children: [
                  jsx("h2", { children: title }),
                  jsx("div", { children: children }),
                ]});
              }
            `, language: 'js' }), _jsxs("p", { children: ["The ", _jsx("code", { children: "jsx" }), " function will transform the content into the same type of result that the ", _jsx("code", { children: "html" }), " function returns. This means one thing:", ' ', _jsxs("b", { children: ["using JSX is actually less performant than using the ", _jsx("code", { children: "html" }), " function."] }), ' ', _jsx("br", {}), _jsx("i", { children: "Why?" }), " For these reasons:", _jsxs("ol", { children: [_jsxs("li", { children: ["In the end, the ", _jsx("code", { children: "jsx" }), " function is only a wrapper that will return the result of the ", _jsx("code", { children: "html" }), " function, so you do an extra step to get the same result."] }), _jsx("li", { children: "By using this approach you cannot really know which parts are the dynamic ones: basically everything is dynamic, and Wompo will re-render parts of your component that normally are not necessary to be updated." })] })] })] })),
        },
        {
            title: 'Configuration',
            id: 'configuration',
            content: (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["To make JSX work, you have to write the following lines in the", ' ', _jsx("code", { children: "jsconfig.json" }), "or ", _jsx("code", { children: "tsconfig.json" }), " files:"] }), _jsx(Code, { code: `
              { 
                "compilerOptions": {
                  // ...
                  "jsx": "react-jsx",
                  "jsxImportSource": "wompo",
                  // ...
                } 
              }
            `, language: 'js' })] })),
        },
        {
            title: 'Example: Counter',
            id: 'counter-example',
            content: (_jsxs(_Fragment, { children: [_jsx("p", { children: "In this example you'll be able to create a simple counter using JSX with Wompo:" }), _jsx(Code, { code: `
              export default function Counter() {
                const [counter, setCounter] = useState(0);
                const increment = () => setCounter(counter + 1);
                return (
                  <button onClick={increment}>Current value: {counter}</button>
                );
              }
            `, language: 'js' }), _jsxs(Note, { severity: 'info', children: ["The main differences between the JSX approach and the ", _jsx("code", { children: "html" }), " approach are:", _jsxs("ul", { children: [_jsx("li", { children: "Events are not prefixed by a \"@\" but by \"on\"" }), _jsx("li", { children: "Dynamic values don't need a dollor sign (\"$\") before brackets" }), _jsxs("li", { children: ["You don't need to wrap a custom component into braces: you can simply type it in the markup (e.g. ", _jsx("code", { children: "<CustomComponent />" }), ")"] })] })] })] })),
        },
    ],
};
export default function JsxPage() {
    return getPageLayout(content);
}
defineWompo(JsxPage, {
    name: 'jsx-page',
});
