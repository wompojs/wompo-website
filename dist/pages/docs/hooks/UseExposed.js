import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "wompo/jsx-runtime";
import { defineWompo } from 'wompo';
import getPageLayout from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
import { Link } from 'wompo-router';
import InteractiveExposedExample from '../../../examples/InteractiveExposedExample.js';
import Note from '../../../components/Note.js';
const content = {
    title: 'useExposed hook',
    description: (_jsxs(_Fragment, { children: ["How to use the ", _jsx("code", { children: "useExposed" }), " hook to expose some data in the DOM."] })),
    sections: [
        {
            title: 'Description',
            id: 'description',
            content: (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["The ", _jsx("code", { children: "useExposed" }), " hook will let you expose some data into the DOM so that it can be accessed from other scripts or by selecting the HTML node through", ' ', _jsx("code", { children: "document.querySelector" }), " or through the", ' ', _jsx(Link, { to: '/docs/hooks/useRef', children: "useRef" }), " hook."] }), _jsxs("p", { children: ["Unlike ", _jsx("b", { children: "React" }), ", Wompo components state is meant to be ", _jsx("u", { children: "isolated" }), ", meaning that it should't dependend on props, even though it is possible. This is becasue Wompo Components are actually DOM elements, meaning that they can be accessed by other scripts and call methods or access data. This allows to ", _jsx("b", { children: "isolate" }), " the state and make it depend on the component itself (and that's it). A great example can be a ", _jsx("b", { children: "Modal" }), ' ', "component:", _jsx("br", {}), "In React, you would create the component and make it accept an \"open\" prop to handle its state. In Wompo you can also do it, but it's ", _jsx("b", { children: "not recommended" }), ". Instead, you want to handle the state internally by creating the ", _jsx("code", { children: "open()" }), " and", ' ', _jsx("code", { children: "close()" }), " methods, and call them from outside. This allows", ' ', _jsx("b", { children: "great code reduction" }), " (you don't have to re-create the same logic for opening and closing the modal wherever it is used) and ", _jsx("b", { children: "isolation" }), "."] }), _jsxs(Note, { severity: 'info', children: ["Unlike all the other hooks, the ", _jsx("code", { children: "useExposed" }), " hook can be used inside conditional statements."] })] })),
        },
        {
            title: 'Usage',
            id: 'usage',
            content: (_jsxs(_Fragment, { children: [_jsx(Code, { code: `
							useExposed(object);
						`, language: 'js' }), _jsx("p", { children: "The hook accepts one single parameter, which is an object representing the keys you want to expose and their corresponding values. For example:" }), _jsx(Code, { code: `
							function ExampleComponent(){
								useExposed({
									jumpscare: () => alert('Bu!'),
								})
								return html\`\`;
							}
						`, language: 'js' }), "This element exposes the ", _jsx("b", { children: "jumpscare" }), " function, that you can call by selecting the element:", _jsx(Code, { code: `
							<example-component></example-component>
							<script>
								document.querySelector('example-component').jumpscare();
							</script>
						`, language: 'html' })] })),
        },
        {
            title: 'Example: modal',
            id: 'modal-example',
            content: (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["To understand better how the ", _jsx("code", { children: "useExposed" }), " hook works, we will create a Modal component, and call its methods from an outer script."] }), _jsx(Code, { code: `
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
						`, language: 'js' }), "We can now add the styles of the Modal:", _jsx(Code, { code: `
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
						`, language: 'js' }), "Job done!", _jsx("br", {}), "Now to see it in action you have two options:", _jsx(InteractiveExposedExample, {})] })),
        },
        {
            title: 'Why not using props',
            id: 'why-no-props',
            content: (_jsx(_Fragment, { children: _jsxs("p", { children: ["As said before, implementing the modal in a \"React approach\" (using props) would work perfectly fine. The only problem with that approach would be (other than being conceptually wrong, because you move the state up) that you'd cause the re-render of two components instead of only one. Why?", _jsx("br", {}), "To do that, you'd have to create the \"open\" state on the parent component that handles the", _jsx("code", { children: "Modal" }), ", and set the new state accordingly to the user's interactions. So, when the user clicks a button, if you use the \"props approach\" you will cause the re-rendering of the modal and of the parent component itself. If you implement the \"", _jsx("b", { children: "exposed" }), "\" approach, you will only cause the re-render of the modal, so your application will be more efficient."] }) })),
        },
    ],
};
export default function UseExposed() {
    return getPageLayout(content);
}
defineWompo(UseExposed, {
    name: 'useexposed-hook-page',
});
