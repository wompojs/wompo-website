import{Fragment as n,jsx as e,jsxs as o}from"wompo/jsx-runtime";import{defineWompo as i}from"wompo";import a from"../../../utils/getPageLayout.js";import t from"../../../components/Code.js";import l from"../../../components/Note.js";const c={title:"Style your components",description:"Learn how you can style your components in different ways",sections:[{title:"Introduction",id:"introduction",content:e(n,{children:o("p",{children:["By definition components are reusable pieces of code. Most of times, when you create a component you also have a CSS code to specifically style that component. With Wompo, you have the following different ways to style your components:",o("ol",{children:[e("li",{children:"Classic CSS file"}),e("li",{children:'Built-in CSS "modules"'}),e("li",{children:"Mix of the two above (usually for Shadowed Elements)"}),e("li",{children:"Inline styles"})]})]})})},{title:"CSS file",id:"css-file",content:o(n,{children:[o("p",{children:["Using a CSS file to style your components is the classic and easier way to add some creativity in your page. By default, Wompo components are ",e("b",{children:"not"})," inside a Shadow DOM, so you don't have to worry about how to make your CSS go through the unbreakable wall of Shadow DOM. With this approach, you simply create a CSS file and add the respective classes in your component."]}),e(t,{code:`
              .container {
								background-color: #333;
								color: #fff;
								padding: 10px;
							}
            `,language:"css"}),e(t,{code:`
              function Component(){
								return html\`<div class="container"></div>\`;
							}
            `,language:"js"})]})},{title:"CSS Modules",id:"css-modules",content:o(n,{children:[o("p",{children:["The second option, which is actually the best choice, is to use the built-in"," ",e("b",{children:"CSS Modules"}),". By default every Component has the ",e("code",{children:"cssModule"})," option enabled, so what you will have to do is simply add your CSS inside the ",e("code",{children:".css"})," ","property of the functional Component. This property is a simple string containing your CSS structure, and will generate a ",e("code",{children:"style"})," element will be generated (only once) and attached for every component instance.",e("br",{}),"Wompo will automatically replace all the found class names with a more specific one (based on the name of the component, which is unique) and will put the generated class names in the ",e("b",{children:"styles"})," prop of the component. This prop is an object having as keys the original class names found in the CSS, and as values the corresponding unique generated class names.",e("br",{}),'This option can be ideal for both "normal" and "shadow" components.']}),e(t,{code:`
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
            `,language:"js"}),o("p",{children:["As said, the generated class names are ",e("b",{children:"not random"}),`. This allows you to still easily override a component's styles with a global CSS. If you use the class "button" inside a component whose name is "simple-counter", the generated class name will simply be:`]}),e(t,{code:`
							// [component_name]__[class_name]
							"simple-counter__button"
            `,language:"js"}),o(l,{severity:"info",children:["To customize the component itself you can use the ",e("b",{children:":host"})," selector even if the element has not the shadow option enabled: it will automatically replaced with the component's name."]})]})},{title:"Shadow elements",id:"component-css",content:o(n,{children:[o("p",{children:["Another option is to use the ",e("code",{children:".css"})," property in your functional component to generate it's specific CSS, but without generating unique class names. This is the ideal option if you enable the ",e("b",{children:"shadow"})," property on the component. To allow this you have to first disable the ",e("b",{children:"cssModule"})," option."]}),e(t,{code:`
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
            `,language:"js"})]})},{title:"Inline styles",id:"inline-styles",content:o(n,{children:[o("p",{children:["Last but not least, you can style your elements with inline styles. You can do that in two ways:",o("ol",{children:[e("li",{children:"Using a string with the styles (default)"}),e("li",{children:"Using an object to describe the CSS Properties"})]}),"If you choose the second option, the object will be a ",e("code",{children:"CSSStyleDeclaration"})," ","object, so you should replace the name of the property you want to style in camelCase (e.g. z-index = zIndex; background-color = backgroundColor). ",e("br",{}),"Example:"]}),e(t,{code:`
							function Component({ styles: s }){
								return html\`<div style="position:relative">
									<span style=\${{
										position: 'absolute',
										top: -10,
										left: -10,
										width: 100,
										height: 100,
										backgroundColor: '#573EF6'
									}}></span>
								</div>\`;
							}
            `,language:"js"})]})}]};export default function s(){return a(c)}i(s,{name:"styling-page"});
