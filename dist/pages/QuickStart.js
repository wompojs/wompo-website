import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "womp/jsx-runtime";
import { defineWomp } from 'womp';
import getPageLayout from '../utils/getPage.js';
import Code from '../components/Code.js';
import { Link } from 'womp-router';
const content = {
    title: 'Quick Start',
    description: 'Learn the basics of Womp in only 5 minutes.',
    sections: [
        {
            title: 'Creating a component',
            id: 'creating-a-component',
            content: (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["Let's start immediately by creating your first component. All you will need to do is just create a function and \"declare\" the component with the function", ' ', _jsx("code", { children: "defineWomp" }), ". This function will have to return the result of the", ' ', _jsx("code", { children: "html" }), " function, which is a template function that will contain your HTML structure."] }), _jsx(Code, { code: `
              import { defineWomp, html } from 'womp';

              export default function GreetingsComponent() {
                return html\`<div>Hello, World!</div>\`;
              }

              defineWomp(GreetingsComponent);
            `, lang: "jsx" }), _jsxs("p", { children: ["Nice, you created your first component! Now you just have to render it in the DOM.", _jsx("br", {}), _jsx("br", {}), "But, if you know how ", _jsx("b", { children: "Web Components" }), " work you are probably wondering where you can define the ", _jsx("u", { children: "name" }), " of the component. In this case, Womp will simply create a dash-cased string based on the name of the function. So, the component", ' ', _jsx("code", { children: "GreetingsComponent" }), " will have as a name ", _jsx("b", { children: "greetings-component" }), ". If the component cannot be transformed into a dash-cased string, a \"-womp\" suffix will be put in the end (e.g. ", _jsx("b", { children: "Counter -> counter-womp" }), "). This is because all web components must have at least one dash (\"-\") in their name.", _jsx("br", {}), "Of course, you can even define your own name by using the ", _jsx("u", { children: "name" }), " option in the second parameter of the ", _jsx("code", { children: "defineWomp" }), " function. See documentation about", ' ', _jsx(Link, { to: "/docs/functions/define-womp", children: _jsx("code", { children: "defineWomp" }) }), ' ', "for more.", _jsx("br", {}), "So, to go back in the example, you will have the following html structure:"] }), _jsx(Code, { code: `
              <greetings-component></greetings-component>
              <!-- Will render: <div>Hello, World!</div> -->
            `, lang: "html" })] })),
        },
        {
            title: 'Automatic naming',
            id: 'automatic-naming',
            content: (_jsxs(_Fragment, { children: [_jsx("p", { children: "Why did we decide to implement an automatic naming system?" }), _jsxs("p", { children: ["We know that when building an application based on Web-Components, it's common to have in the HTML file very few components, and the rest of them is rendered inside other components. You can even have only one ", _jsx("b", { children: "App" }), " component which will render the whole page using other sub-components. With womp, rendering inner components is very easy. See the following example:"] }), _jsx(Code, { code: `
              function App() {
                return html\`<\${GreetingsComponent} />\`;
              }
            `, lang: "jsx" }), _jsx("p", { children: "Womp will automatically convert the dynamic tag into:" }), _jsx(Code, { code: `
              function App() {
                return html\`<greetings-component></greetings-component>\`;
              }
            `, lang: "jsx" }), _jsxs("p", { children: ["So to answer the initial question: \"", _jsx("i", { children: "Why did we decide to implement an automatic naming?" }), "\".", _jsx("br", {}), " When using this kind of approach, it's not even important what the component name is. You just know that you want to render a specific component in a specific place. Also, what if, for some reason, you change the name of some components? If you simply typed the names \"statically\", you'd have to change them in the whole application. Hell. That's what happens with the majority of Web-Component libraries out there. With Womp, the app will continue to normally work \u2705 (except for components written directly in the HTML file, of course).", _jsx("br", {}), "When using this approach, you also ", _jsx("b", { children: "import" }), " a component when needed, so you don't have to worry about manually putting script tags into your files so that they work. Developer friendly. Just like React."] })] })),
        },
    ],
};
export default function QuickStart() {
    return getPageLayout(content);
}
defineWomp(QuickStart);
