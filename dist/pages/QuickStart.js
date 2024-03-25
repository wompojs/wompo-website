import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "womp/jsx-runtime";
import { defineWomp } from 'womp';
import getPageLayout from '../utils/getPage.js';
import Code from '../components/Code.js';
import { Link } from 'womp-router';
import Note from '../components/Note.js';
const content = {
    title: 'Quick Start',
    description: 'Learn the basics of Womp in only 5 minutes.',
    sections: [
        {
            title: 'Creating a component',
            id: 'creating-a-component',
            content: (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["Let's start immediately by creating your first component. All you will need to do is just create a function and \"declare\" the component with the helper function", ' ', _jsx("code", { children: "defineWomp" }), ". This function will have to return the result of the", ' ', _jsx("code", { children: "html" }), " function, which is a template function that will contain your HTML structure."] }), _jsx(Code, { code: `
              import { defineWomp, html } from 'womp';

              export default function GreetingsComponent() {
                return html\`<div>Hello, World!</div>\`;
              }

              defineWomp(GreetingsComponent);
            `, lang: 'js' }), _jsxs("p", { children: ["Nice, you created your first component! Now you just have to render it in the DOM.", _jsx("br", {}), _jsx("br", {}), "But, if you know how ", _jsx("b", { children: "Web Components" }), " work you are probably wondering where you can define the ", _jsx("u", { children: "name" }), " of the component. In this case, Womp will simply create a dash-cased string based on the name of the function. So, the component", ' ', _jsx("code", { children: "GreetingsComponent" }), " will have as a name ", _jsx("b", { children: "greetings-component" }), ". If the component cannot be transformed into a dash-cased string, a \"-womp\" suffix will be put in the end (e.g. ", _jsx("b", { children: "Counter -> counter-womp" }), "). This is because all web components must have at least one dash (\"-\") in their name.", _jsx("br", {}), "Of course, you can even define your own name by using the ", _jsx("u", { children: "name" }), " option in the second parameter of the ", _jsx("code", { children: "defineWomp" }), " function. See documentation about", ' ', _jsx(Link, { to: '/docs/functions/define-womp', children: _jsx("code", { children: "defineWomp" }) }), ' ', "for more.", _jsx("br", {}), "So, to go back in the example, you will have the following html structure:"] }), _jsx(Code, { code: `
              <greetings-component></greetings-component>
              <!-- Will render: <div>Hello, World!</div> -->
            `, lang: 'html' })] })),
        },
        {
            title: 'Automatic naming',
            id: 'automatic-naming',
            content: (_jsxs(_Fragment, { children: [_jsx("p", { children: "Why did we decide to implement an automatic naming system?" }), _jsxs("p", { children: ["We know that when building an application based on Web-Components, it's common to have in the HTML file very few components, and the rest of them is rendered inside other components. You can even have only one ", _jsx("b", { children: "App" }), " component which will render the whole page using other sub-components. With womp, rendering inner components is very easy. See the following example:"] }), _jsx(Code, { code: `
              function App() {
                return html\`<\${GreetingsComponent} />\`;
              }
            `, lang: 'js' }), _jsx("p", { children: "Womp will automatically convert the dynamic tag into:" }), _jsx(Code, { code: `
              function App() {
                return html\`<greetings-component></greetings-component>\`;
              }
            `, lang: 'js' }), _jsxs("p", { children: ["So going back to the initial question: \"", _jsx("i", { children: "Why did we decide to implement an automatic naming?" }), "\".", _jsx("br", {}), " When using this kind of approach, it's not even important what the component name is. You just know that you want to render a specific component in a specific place. Also, what if, for some reason, you change the name of some components? If you simply typed the names \"statically\", you'd have to change them in the whole application. Hell. That's what happens with the majority of Web-Component libraries out there. With Womp, the app will continue to normally work \u2705 (except for components written directly in the HTML file, of course).", _jsx("br", {}), "When using this approach, you also ", _jsx("b", { children: "import" }), " a component when needed, so you don't have to worry about manually putting script tags into your files so that they work. Developer friendly. Just like React."] })] })),
        },
        {
            title: 'Props',
            id: 'props',
            content: (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["What's the purpose of a component if you cannot add parameters so that the component renders dynamic content? You can add custom attributes in your component and modify your UI accordingly.", _jsx("br", {}), "The component function receives one parameter:", ' ', _jsx("b", { children: _jsx("u", { children: "props" }) }), ". This parameter is an object that will contain the values of the custom attributes you added. Let's modify together the previous ", _jsx("code", { children: "GreetingsComponent" }), " component. Suppose you want the component to accept a simple attribute called \"", _jsx("i", { children: "name" }), "\", and replace the old \"Hello World\" with \"Hello <name>\". Super easy:"] }), _jsx(Code, { code: `
              export default function GreetingsComponent({name}) {
                return html\`<div>Hello, \${name}!</div>\`;
              }
            `, lang: 'js' }), _jsx(Code, { code: `
							<greetings-component name="World"></greetings-component>
							<!-- Will render: <div>Hello, World!</div> -->

							<greetings-component name="Giovanni"></greetings-component>
							<!-- Will render: <div>Hello, Giovanni!</div> -->

							<greetings-component name="My beautiful love"></greetings-component>
							<!-- Will render: <div>Hello, My beautiful love!</div> -->
            `, lang: 'html' }), _jsxs("p", { children: ["If you use your custom components in the HTML, you must know that HTML allows to only put strings in the attributes values, but if you are using it from a Javascript, you will ", _jsx("b", { children: "not" }), " have this restriction: you can put everything."] }), _jsx(Code, { code: `
							function App() {
								const user = {
									name: 'Tongi',
									lastName: 'Patongi',
								};
                return html\`<\${GreetingsComponent} user=\${user} />\`;
              }

							function GreetingsComponent({user}) {
                return html\`<div>Hello, \${user.name} \${user.lastname}!</div>\`;
              }
            `, lang: 'js' }), _jsx(Note, { severity: 'info', children: "If you use a variable as an attribute value, you must not add quotes around the value: the attribute name must only be followed by an equal (\"=\") and the value." })] })),
        },
        {
            title: 'Events',
            id: 'events',
            content: (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["Almost done. The next nice thing about Womp is that you can define events as if they are attributes. The only difference is that you'll have to put a \"@\" as a prefix (e.g. the click event will be ", _jsx("code", { children: "@click" }), ", change will be ", _jsx("code", { children: "@change" }), ", ans so on).", _jsx("br", {}), "You can attach an event on every element, even on your own custom elements, because they are part of the DOM!"] }), _jsx(Code, { code: `
							function Counter() {
								const counter = 0;
								const onClick = () => alert('Increment value!');
                return html\`<button @click=\${onClick}>Current value: \${counter}</button>\`;
              }
            `, lang: 'js' })] })),
        },
        {
            title: 'State',
            id: 'state',
            content: (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["The last thing to learn is how to make a component ", _jsx("b", { children: "stateful" }), ". A stateful component is a component that listens for changes and re-renders whenever there is a change. The easier way to make a stateful component is by using the", ' ', _jsx(Link, { to: '/docs/hooks/useState', children: "useState" }), " hook. This hook is a function that will return an array with 2 elements: the current value, and a function to set the new value. The only parameter it accepts is the initial value.", _jsx("br", {}), "So, to make the ", _jsx("code", { children: "Counter" }), " component work, we just have to use this hook and increment the counter variable every time the user clicks on the button."] }), _jsx(Code, { code: `
							function Counter() {
								const [counter, setCounter] = useState(0);
								const onClick = () => setCounter(counter + 1);
                return html\`<button @click=\${onClick}>Current value: \${counter}</button>\`;
              }
            `, lang: 'js' }), _jsxs("p", { children: ["That's it. You now know already the 80% of the Womp library. Easy. Isn't it? ", _jsx("br", {}), "If you already know ", _jsx("b", { children: "React" }), ", you can easily see how similar it is."] })] })),
        },
    ],
};
export default function QuickStart() {
    return getPageLayout(content);
}
defineWomp(QuickStart);
