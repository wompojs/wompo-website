import{Fragment as n,jsx as e,jsxs as o}from"wompo/jsx-runtime";import{defineWompo as s}from"wompo";import l from"../../utils/getPageLayout.js";import t from"../../components/Code.js";import i from"../../components/Note.js";const c={title:"How to use JSX",description:"Use JSX to make the editor help you while building your components.",sections:[{title:"What is JSX",id:"what-is-jsx",content:o(n,{children:[o("p",{children:[e("b",{children:"JSX"})," is an extension of JavaScript that allows to write Markup code into your JS files. This make creating your components layout easier, because the editor can easily help you. It will also check your component's props to find mistakes and type issues if you also use Typescript. An example of a JSX component is the following:"]}),e(t,{code:`
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
            `,language:"js"}),o("p",{children:["As you can see, the ",e("code",{children:"html"})," function is not used to build the layout. Insted, you directly write your HTML into your component."]}),o(i,{severity:"info",children:[e("b",{children:"Note:"})," JSX files need a compiler. JSX is not natively supported by browsers."]}),e("p",{children:"The code in the example will be transformed by the compiler into the following:"}),e(t,{code:`
              import { jsx } from "wompo/jsx-runtime";
              import { defineWompo } from "wompo";
              export default function Section({ title, children }) {
                return jsx("section", { children: [
                  jsx("h2", { children: title }),
                  jsx("div", { children: children }),
                ]});
              }
            `,language:"js"}),o("p",{children:["The ",e("code",{children:"jsx"})," function will transform the content into the same type of result that the ",e("code",{children:"html"})," function returns. This means one thing:"," ",o("b",{children:["using JSX is actually less performant than using the ",e("code",{children:"html"})," function."]})," ",e("br",{}),e("i",{children:"Why?"})," For these reasons:",o("ol",{children:[o("li",{children:["In the end, the ",e("code",{children:"jsx"})," function is only a wrapper that will return the result of the ",e("code",{children:"html"})," function, so you do an extra step to get the same result."]}),e("li",{children:"By using this approach you cannot really know which parts are the dynamic ones: basically everything is dynamic, and Wompo will re-render parts of your component that normally is not necessary to update."})]})]})]})},{title:"Configuration",id:"configuration",content:o(n,{children:[o("p",{children:["To make JSX work, you have to write the following lines in the"," ",e("code",{children:"jsconfig.json"}),"or ",e("code",{children:"tsconfig.json"})," files:"]}),e(t,{code:`
              { 
                "compilerOptions": {
                  // ...
                  "jsx": "react-jsx",
                  "jsxImportSource": "wompo",
                  // ...
                } 
              }
            `,language:"js"})]})},{title:"Example: Counter",id:"counter-example",content:o(n,{children:[e("p",{children:"In this example you'll be able to create a simple counter using JSX with Wompo:"}),e(t,{code:`
              export default function Counter() {
                const [counter, setCounter] = useState(0);
                const increment = () => setCounter(counter + 1);
                return (
                  <button onClick={increment}>Current value: {counter}</button>
                );
              }
            `,language:"js"}),o(i,{severity:"info",children:["The main differences between JSX and the ",e("code",{children:"html"})," approach are:",o("ul",{children:[e("li",{children:'Events are not prefixed by a "@" but by "on"'}),e("li",{children:`Dynamic values don't need a dollor sign ("$") before brackets`}),o("li",{children:["You don't need to wrap a custom component into braces: you can simply type it in the markup (e.g. ",e("code",{children:"<CustomComponent />"}),")"]})]})]})]})}]};export default function r(){return l(c)}s(r,{name:"jsx-page"});
