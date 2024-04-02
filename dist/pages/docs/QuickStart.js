import{Fragment as n,jsx as e,jsxs as t}from"wompo/jsx-runtime";import{defineWompo as r}from"wompo";import s from"../../utils/getPageLayout.js";import o from"../../components/Code.js";import{Link as a}from"wompo-router";import c from"../../components/Note.js";const u={title:"Quick Start",description:"Learn the basics of Wompo in only 5 minutes.",sections:[{title:"Creating a component",id:"creating-a-component",content:t(n,{children:[t("p",{children:[`Let's start immediately by creating your first component. All you will need to do is just create a function and "declare" the component with the helper function`," ",e("code",{children:"defineWompo"}),". This function will have to return the result of the"," ",e("code",{children:"html"})," function, which is a template function that will contain your HTML structure."]}),e(o,{code:`
              import { defineWompo, html } from 'wompo';

              export default function GreetingsComponent() {
                return html\`<div>Hello, World!</div>\`;
              }

              defineWompo(GreetingsComponent);
            `,language:"js"}),t("p",{children:["Nice, you created your first component! Now you just have to render it in the DOM.",e("br",{}),e("br",{}),"But, if you know how ",e("b",{children:"Web Components"})," work you are probably wondering where you can define the ",e("u",{children:"name"})," of the component. In this case, Wompo will simply create a dash-cased string based on the name of the function. So, the component"," ",e("code",{children:"GreetingsComponent"})," will have as a name ",e("b",{children:"greetings-component"}),'. If the component cannot be transformed into a dash-cased string, a "-wompo" suffix will be put in the end (e.g. ',e("b",{children:"Counter -> counter-wompo"}),'). This is because all web components must have at least one dash ("-") in their name.',e("br",{}),"Of course, you can even define your own name by using the ",e("u",{children:"name"})," option in the second parameter of the ",e("code",{children:"defineWompo"})," function. See documentation about"," ",e(a,{to:"/docs/apis/defineWompo",children:"defineWompo"})," for more.",e("br",{}),"So, to go back in the example, you will have the following html structure:"]}),e(o,{code:`
              <greetings-component></greetings-component>
              <!-- Will render: <div>Hello, World!</div> -->
            `,language:"html"})]})},{title:"Automatic naming",id:"automatic-naming",content:t(n,{children:[e("p",{children:"Why did we decide to implement an automatic naming system?"}),t("p",{children:["We know that when building an application based on Web-Components, it's common to have in the HTML file very few components, and the rest of them is rendered inside other components. You can even have only one ",e("b",{children:"App"})," component which will render the whole page using other sub-components. With wompo, rendering inner components is very easy. See the following example:"]}),e(o,{code:`
              function App() {
                return html\`<\${GreetingsComponent} />\`;
              }
            `,language:"js"}),e("p",{children:"Wompo will automatically convert the dynamic tag into:"}),e(o,{code:`
              function App() {
                return html\`<greetings-component></greetings-component>\`;
              }
            `,language:"js"}),t("p",{children:['So going back to the initial question: "',e("i",{children:"Why did we decide to implement an automatic naming?"}),'".',e("br",{}),` When using this kind of approach, it's not even important what the component name is. You just know that you want to render a specific component in a specific place. Also, what if, for some reason, you change the name of some components? If you simply typed the names "statically", you'd have to change them in the whole application. Hell. That's what happens with the majority of Web-Component libraries out there. With Wompo, the app will continue to normally work \u2705 (except for components written directly in the HTML file, of course).`,e("br",{}),"When using this approach, you also ",e("b",{children:"import"})," a component when needed, so you don't have to worry about manually putting script tags into your files so that they work. Developer friendly. Just like React."]})]})},{title:"Props",id:"props",content:t(n,{children:[t("p",{children:["What's the purpose of a component if you cannot add parameters so that the component renders dynamic content? You can add custom attributes in your component and modify your UI accordingly.",e("br",{}),"The component function receives one parameter:"," ",e("b",{children:e("u",{children:"props"})}),". This parameter is an object that will contain the values of the custom attributes you added. Let's modify together the previous ",e("code",{children:"GreetingsComponent"}),' component. Suppose you want the component to accept a simple attribute called "',e("i",{children:"name"}),'", and replace the old "Hello World" with "Hello <name>". Super easy:']}),e(o,{code:`
              export default function GreetingsComponent({name}) {
                return html\`<div>Hello, \${name}!</div>\`;
              }
            `,language:"js"}),e(o,{code:`
							<greetings-component name="World"></greetings-component>
							<!-- Will render: <div>Hello, World!</div> -->

							<greetings-component name="Giovanni"></greetings-component>
							<!-- Will render: <div>Hello, Giovanni!</div> -->

							<greetings-component name="My beautiful love"></greetings-component>
							<!-- Will render: <div>Hello, My beautiful love!</div> -->
            `,language:"html"}),t("p",{children:["If you use your custom components in the HTML, you must know that HTML allows to only put strings in the attributes values, but if you are using it from a Javascript, you will ",e("b",{children:"not"})," have this restriction: you can put everything."]}),e(o,{code:`
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
            `,language:"js"}),e(c,{severity:"info",children:'If you use a variable as an attribute value, you must not add quotes around the value: the attribute name must only be followed by an equal ("=") and the value.'})]})},{title:"Events",id:"events",content:t(n,{children:[t("p",{children:[`Almost done. The next nice thing about Wompo is that you can define events as if they are attributes. The only difference is that you'll have to put a "@" as a prefix (e.g. the click event will be `,e("code",{children:"@click"}),", change will be ",e("code",{children:"@change"}),", ans so on).",e("br",{}),"You can attach an event on every element, even on your own custom elements, because they are part of the DOM!"]}),e(o,{code:`
							function Counter() {
								const counter = 0;
								const onClick = () => alert('Increment value!');
                return html\`<button @click=\${onClick}>Current value: \${counter}</button>\`;
              }
            `,language:"js"})]})},{title:"State",id:"state",content:t(n,{children:[t("p",{children:["The last thing to learn is how to make a component ",e("b",{children:"stateful"}),". A stateful component is a component that listens for changes and re-renders whenever there is a change. The easier way to make a stateful component is by using the"," ",e(a,{to:"/docs/hooks/useState",children:"useState"})," hook. This hook is a function that will return an array with 2 elements: the current value, and a function to set the new value. The only parameter it accepts is the initial value.",e("br",{}),"So, to make the ",e("code",{children:"Counter"})," component work, we just have to use this hook and increment the counter variable every time the user clicks on the button."]}),e(o,{code:`
							function Counter() {
								const [counter, setCounter] = useState(0);
								const onClick = () => setCounter(counter + 1);
                return html\`<button @click=\${onClick}>Current value: \${counter}</button>\`;
              }
            `,language:"js"}),t("p",{children:["That's it. You now know already the 80% of the Wompo library. Easy. Isn't it? ",e("br",{}),"If you already know ",e("b",{children:"React"}),", you can easily see how similar it is."]})]})}]};export default function i(){return s(u)}r(i,{name:"quick-start-page"});
