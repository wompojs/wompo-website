import{Fragment as n,jsx as e,jsxs as o}from"wompo/jsx-runtime";import{defineWompo as i}from"wompo";import a from"../../../utils/getPageLayout.js";import t from"../../../components/Code.js";const c={title:"Style your components",description:"Learn how you can style your components in different ways",sections:[{title:"Introduction",id:"introduction",content:e(n,{children:o("p",{children:["By definition components are reusable pieces of code. Most of times, when you create a component you also have a CSS code to specifically style that component. With Wompo, you have three different ways to style your components:",o("ol",{children:[e("li",{children:"Classic CSS file"}),e("li",{children:"Through the Component's css poperty (for shadow elements)"}),e("li",{children:'Built-in CSS "modules"'})]})]})})},{title:"CSS file",id:"css-file",content:o(n,{children:[o("p",{children:["Using a CSS file to style your components is the classic way that you can use to add some creativity in your page. By default, Wompo components are ",e("b",{children:"not"})," inside a Shadow DOM, so you don't have to worry about how to make your CSS go through the unbreakable wall of Shadow DOM. With this approac, you simply create a CSS file and add the respective classes in your component."]}),e(t,{code:`
              .container {
								background-color: #333;
								color: #fff;
								padding: 10px;
							}
            `,language:"css"}),e(t,{code:`
              function Component(){
								return html\`<div class="container"></div>\`;
							}
            `,language:"js"})]})},{title:"Shadow elements",id:"component-css",content:o(n,{children:[o("p",{children:["Another option is to use the ",e("code",{children:".css"})," property in your functional component to generate it's specific CSSs. The property is a string in a CSS format and a"," ",e("code",{children:"style"})," element will be generated (only once) and attached for every component instance. This is the ideal option if you enable the ",e("b",{children:"shadow"})," property on the component. To allow this you have to first disable the ",e("b",{children:"cssModule"})," option (which we will cover later on)."]}),e(t,{code:`
              function App() {
                return html\`<\${GreetingsComponent} />\`;
              }
							App.css = \`
								.container {
									background-color: #333;
									color: #fff;
									padding: 10px;
								}
							\`;
							defineWompo(App, { cssModule: false, shadow: true });
            `,language:"js"})]})},{title:"CSS Modules",id:"css-modules",content:o(n,{children:[o("p",{children:["The third option, which is actually the best choice, is to use the built-in"," ",e("b",{children:"CSS Modules"}),". By default every Component has the ",e("code",{children:"cssModule"})," option enabled, so what you will have to do is simply add your CSS inside the ",e("code",{children:".css"})," ","property of the functional Component.",e("br",{}),"Wompo will automatically replace all the found class names with a more specific one (based on the name of the component, which is unique) and will put the generated class names in the ",e("b",{children:"styles"})," prop of the component. This prop is an object having as keys the original class names found in the CSS, and as values the corresponding unique generated class names.",e("br",{}),'This option can be ideal for both "normal" and "shadow" components.']}),e(t,{code:`
							function Component({ styles: s }){
								// s.container will have "component-womp__container" as a value.
								return html\`<div class=\${s.container}> ... </div>\`;
							}
							Component.css = \`
								/* This class will be replaced with "component-womp__container" */
								.container {
									background-color: #333;
									color: #fff;
									padding: 10px;
								}
							\`;
            `,language:"js"})]})}]};export default function s(){return a(c)}i(s,{name:"styling-page"});
