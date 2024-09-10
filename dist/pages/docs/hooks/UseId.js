import{Fragment as o,jsx as t,jsxs as e}from"wompo/jsx-runtime";import{defineWompo as s}from"wompo";import a from"../../../utils/getPageLayout.js";import i from"../../../components/Code.js";const r={title:"useId hook",description:e(o,{children:["How to use the ",t("code",{children:"useId"})," hook to generate a unique ID for your components."]}),sections:[{title:"Description",id:"description",content:e(o,{children:[e("p",{children:["Hard-coding IDs in components is very often a bad idea. The ",t("code",{children:"useId"})," hook will solve this problem."]}),e("p",{children:["This hook will generate a unique string ID for your component in the following format:"," ",t("code",{children:":w<number>:"}),". The number in between will simply be a counter that will be incremented every time the hook is called for the first time in a component. This ensures that the ID will be unique, but the ID will probably NOT be the same every time you reload the application."]})]})},{title:"Usage",id:"usage",content:e(o,{children:[t(i,{code:`
							const id = useId();
						`,language:"js"}),e("p",{children:["The ",t("code",{children:"useId"})," hook accepts no parameters and will return always the same value across re-renders."]})]})},{title:"Example: Accessibility",id:"modal-example",content:e(o,{children:[e("p",{children:["A common use case for the ",t("code",{children:"useId"}),' is to solve accessibility problems or simply setting a "for" attribute to a label element.']}),t(i,{code:`
							import { defineWompo, html, useId } from 'wompo';

							export default function InputExample() {
								const hintId = useId(); // :w0:
								const inputId = useId(); // :w1:

								return html\`
									<label for=\${inputId}>Password:</label>
                  <input id=\${inputId} aria-describedby=\${hintId} />
                  <p id=\${hintId}>The password should contain at least 8 characters</p>
								\`;
							}

							defineWompo(InputExample);
						`,language:"js"}),e("p",{children:["Even if the ",t("code",{children:"InputExample"})," is rendered multiple times, it'll always keep working without having IDs clashes."]})]})}]};export default function n(){return a(r)}s(n,{name:"useid-hook-page"});
