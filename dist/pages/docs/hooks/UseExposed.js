import{Fragment as n,jsx as e,jsxs as o}from"wompo/jsx-runtime";import{defineWompo as s}from"wompo";import d from"../../../utils/getPageLayout.js";import t from"../../../components/Code.js";import{Link as c}from"wompo-router";import l from"../../../examples/InteractiveExposedExample.js";import p from"../../../components/Note.js";const i={title:"useExposed hook",description:o(n,{children:["How to use the ",e("code",{children:"useExposed"})," hook to expose some data in the DOM."]}),sections:[{title:"Description",id:"description",content:o(n,{children:[o("p",{children:["The ",e("code",{children:"useExposed"})," hook will let you expose some data into the DOM so that it can be accessed from other scripts or by selecting the HTML node through"," ",e("code",{children:"document.querySelector"})," or through the"," ",e(c,{to:"/docs/hooks/useRef",children:"useRef"})," hook."]}),o("p",{children:["Unlike ",e("b",{children:"React"}),", Wompo components state is meant to be ",e("u",{children:"isolated"}),", meaning that it should't dependend on props, even though it is possible. This is becasue Wompo Components are actually DOM elements, meaning that they can be accessed by other scripts and call methods or access data. This allows to ",e("b",{children:"isolate"})," the state and make it depend on the component itself (and that's it). A great example can be a ",e("b",{children:"Modal"})," ","component:",e("br",{}),`In React, you would create the component and make it accept an "open" prop to handle its state. In Wompo you can also do it, but it's `,e("b",{children:"not recommended"}),". Instead, you want to handle the state internally by creating the ",e("code",{children:"open()"})," and"," ",e("code",{children:"close()"})," methods, and call them from outside. This allows"," ",e("b",{children:"great code reduction"})," (you don't have to re-create the same logic for opening and closing the modal wherever it is used) and ",e("b",{children:"isolation"}),"."]}),o(p,{severity:"info",children:["Unlike all the other hooks, the ",e("code",{children:"useExposed"})," hook can be used inside conditional statements."]})]})},{title:"Usage",id:"usage",content:o(n,{children:[e(t,{code:`
							useExposed(object);
						`,language:"js"}),e("p",{children:"The hook accepts one single parameter, which is an object representing the keys you want to expose and their corresponding values. For example:"}),e(t,{code:`
							function ExampleComponent(){
								useExposed({
									jumpscare: () => alert('Bu!'),
								})
								return html\`\`;
							}
						`,language:"js"}),"This element exposes the ",e("b",{children:"jumpscare"})," function, that you can call by selecting the element:",e(t,{code:`
							<example-component></example-component>
							<script>
								document.querySelector('example-component').jumpscare();
							<\/script>
						`,language:"html"})]})},{title:"Example: modal",id:"modal-example",content:o(n,{children:[o("p",{children:["To understand better how the ",e("code",{children:"useExposed"})," hook works, we will create a Modal component, and call its methods from an outer script."]}),e(t,{code:`
							import { defineWompo, html, useExposed, useState } from 'wompo';

							export default function ModalExample({ children, styles: s }) {
								const [open, setOpen] = useState(false);

								const openModal = () => {
									// Block scroll
									document.body.style.overflow = 'hidden';
									setOpen(true);
								};

								const closeModal = () => {
									// Enable scroll
									document.body.style.overflow = 'auto';
									setOpen(false);
								};

								useExposed({
									open: openModal,
									close: closeModal,
								});

								return html\`
									<div class=\${\`\${s.backdrop} \${open && s.open}\`}>
										<div class=\${s.modal}>
											\${children}
											<button @click=\${closeModal}>X</button>
										</div>
									</div>
								\`;
							}

							defineWompo(ModalExample);
						`,language:"js"}),"We can now add the styles of the Modal:",e(t,{code:`
							ModalExample.css = \`
								.backdrop.open {
									display: block;
								}
								.backdrop {
									display: none;
									position: fixed;
									top: 0;
									left: 0;
									width: 100vw;
									height: 100vh;
									background-color: #00000040;
									z-index: 1000;
								}
								.modal {
									position: fixed;
									left: 50%;
									top: 50%;
									width: 600px;
									height: auto;
									max-width: 90vw;
									transform: translate(-50%, -50%);
									border-radius: 10px;
									background-color: #fff;
									padding: 30px;
								}
							\`;
						`,language:"js"}),"Job done!",e("br",{}),"Now to see it in action you have two options:",e(l,{})]})},{title:"Why not using props",id:"why-no-props",content:e(n,{children:o("p",{children:[`As said before, implementing the modal in a "React approach" (using props) would work perfectly fine. The only problem with that approach would be (other than being conceptually wrong, because you move the state up) that you'd cause the re-render of two components instead of only one. Why?`,e("br",{}),`To do that, you'd have to create the "open" state on the parent component that handles the`,e("code",{children:"Modal"}),`, and set the new state accordingly to the user's interactions. So, when the user clicks a button, if you use the "props approach" you will cause the re-rendering of the modal and of the parent component itself. If you implement the "`,e("b",{children:"exposed"}),'" approach, you will only cause the re-render of the modal, so your application will be more efficient.']})})}]};export default function a(){return d(i)}s(a,{name:"useexposed-hook-page"});
