import{Fragment as n,jsx as e,jsxs as o}from"wompo/jsx-runtime";import{defineWompo as l}from"wompo";import c from"../../../utils/getPageLayout.js";import t from"../../../components/Code.js";import{Link as i}from"wompo-router";import a from"../../../components/Note.js";import r from"../../../examples/IsolatedComponent.js";const p={title:"defineWompo API",description:o(n,{children:["How to use the ",e("code",{children:"defineWompo"})," function to register your custom component in your application."]}),sections:[{title:"Description",id:"description",content:e(n,{children:o("p",{children:["The ",e("code",{children:"defineWompo"})," function is the function that will register your component in the browser's ",e("code",{children:"CustomElementRegistry"}),". You always have to use this function after writing your components. If you don't see your component in the screen, don't panic: is probably because you only forgot to call this function."]})})},{title:"Usage",id:"usage",content:o(n,{children:[e(t,{code:`
							defineWompo(Component, options?);
						`,language:"js"}),o("p",{children:["The function accepts two parameters: your functional Component and the options for it. The first parameter must be a function that returns an"," ",e(i,{to:"/docs/apis/html",children:"html"})," result or ",e("code",{children:"null"}),". The second parameter is ",e("b",{children:"optional"}),", but if defined, it must be an object with the following optional keys:",o("ul",{children:[o("li",{children:[e("code",{children:"name"}),` (string) - The name of the Web Component that will be registered. If not defined, the component name will be the name of the function in hyphen-case. If the component doesn't have an hyphen, a "wompo" string will be placed as a suffix.`,e("br",{}),"E.g. TabPanel = tab-panel, Counter = counter-wompo"]}),o("li",{children:[e("code",{children:"shadow"})," (boolean) - By default is false, but if true, the component's content will be rendered inside a Shadow Root. You want to set it to true when developing libraries and components that you want to be sure won't affect or be affected by external Styles or scripts."]}),o("li",{children:[e("code",{children:"cssModule"})," (boolean) - By default is true, meaning that a CSS module logic will be applied if you write your component's CSS inside the",e("code",{children:"Component.css"})," key. The classes that are found in there will be replaced with a more unique identifier and put in the ",e("b",{children:"styles"})," prop of the component, which will be an object having the found classes as keys and the more unique generated classes as values. This is done to avoid style collisions.",e("br",{}),"Example:",e(t,{code:`
                    function Component({ styles: s }){
                      // s.component will have "component-womp__container" as a value
                      return html\`
                        <div class=\${s.container}>...</div>
                      \`;
                    }
                    Component.css = \`
                      .container {
                        height: 30px;
                        width: 30px;
                        background-color: green;
                      }
                    \`;
                  `,language:"js"})]})]})]}),o(a,{severity:"info",children:["You can customize the default values of the ",e("b",{children:"options"})," object by overriding the values present in the"," ",e(i,{to:"/docs/apis/wompoDefaultOptions",children:"wompDefaultOptions"})," object."]})]})},{title:"Example: isolated element",id:"isolated-element-example",content:o(n,{children:[o("p",{children:["We can use the ",e("code",{children:"defineWompo"}),' function to define a component that is "isolated" from the CSS and JS in your application.']}),e(t,{code:`
							import { html, defineWompo } from 'wompo';

              function IsolatedComponent(){
                return html\`
                  <p>
                    Even though my styles are super generic, I will not affect external elements
                    and I will not be affected by external styles!
                  </p>
                \`;
              }
              IsolatedComponent.css = \`
                :host {
                  display: block;
                }
                p {
                  padding: 5px;
                  border-radius: 5px;
                  background-color: #3489a6;
                  color: #fff;
                }
              \`;

							defineWompo(IsolatedComponent, {
                // Using a custom name will let you have more control over the application
                name: 'super-cool-isolated-component',
                // The content will be placed inside a Shadow Root
                shadow: true,
                // Since it's already "isolated", it's not necessary to have the CSS Module
                cssModule: false
              });
						`,language:"js"}),o("p",{children:["Result:",e(r,{})]}),o(a,{severity:"warning",children:[e("b",{children:"Note"}),": Other than generating more specific class names, what the cssModule option will do is also provide a display block style for the element.",e(t,{code:":host { display: block; }",language:"js"}),"This is because custom elements have NO default styles, and usually the first thing you will do is set the display property. If you disabled the cssModule option, this will not happen. Also, if in your CSS you write an ",e("code",{children:":host"})," style, the display block property will not be automatically generated.",e("br",{}),"That's why in the above example we had to manually set it."]})]})}]};export default function s(){return c(p)}l(s,{name:"definewomp-apis-page"});
