import { Fragment, jsx, jsxs } from "womp/jsx-runtime";
import { defineWomp } from "womp";
import getPageLayout from "../../../utils/getPageLayout.js";
import Code from "../../../components/Code.js";
import { Link } from "womp-router";
import InteractiveExposedExample from "../../../examples/InteractiveExposedExample.js";
import Note from "../../../components/Note.js";
const content = {
  title: "useExposed hook",
  description: /* @__PURE__ */ jsxs(Fragment, { children: [
    "How to use the ",
    /* @__PURE__ */ jsx("code", { children: "useExposed" }),
    " hook to expose some data in the DOM."
  ] }),
  sections: [
    {
      title: "Description",
      id: "description",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "The ",
          /* @__PURE__ */ jsx("code", { children: "useExposed" }),
          " hook will let you expose some data into the DOM so that it can be accessed from other scripts or by selecting the HTML node through",
          " ",
          /* @__PURE__ */ jsx("code", { children: "document.querySelector" }),
          " or through the",
          " ",
          /* @__PURE__ */ jsx(Link, { to: "/docs/hooks/useRef", children: "useRef" }),
          " hook."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Unlike ",
          /* @__PURE__ */ jsx("b", { children: "React" }),
          ", Womp components are meant to be ",
          /* @__PURE__ */ jsx("u", { children: "isolated" }),
          ", meaning that their state should't dependend on props, even though it is possible. This is becasue Womp Components are actually DOM elements, meaning that they can be accessed by other scripts and call methods or access data. This allows to ",
          /* @__PURE__ */ jsx("b", { children: "isolate" }),
          " the state and make it depend on the component itself (and that's it). A great example can be a ",
          /* @__PURE__ */ jsx("b", { children: "Modal" }),
          " ",
          "component:",
          /* @__PURE__ */ jsx("br", {}),
          `In React, you would create the component and make it accept an "open" prop to handle its state. In Womp you can also do it, but it's `,
          /* @__PURE__ */ jsx("b", { children: "not recommended" }),
          ". Instead, you want to handle the state internally by creating the ",
          /* @__PURE__ */ jsx("code", { children: "open()" }),
          " and ",
          /* @__PURE__ */ jsx("code", { children: "close()" }),
          " ",
          "methods, and call them from outside. This allows ",
          /* @__PURE__ */ jsx("b", { children: "great code reduction" }),
          " (you don't have to re-create the same logic for opening and closing the modal wherever it is used) and ",
          /* @__PURE__ */ jsx("b", { children: "isolation" }),
          "."
        ] }),
        /* @__PURE__ */ jsxs(Note, { severity: "info", children: [
          "Unlike all the other hooks, the ",
          /* @__PURE__ */ jsx("code", { children: "useExposed" }),
          " hook can be used inside conditional statements."
        ] })
      ] })
    },
    {
      title: "Usage",
      id: "usage",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
							useExposed(object);
						`,
            lang: "js"
          }
        ),
        /* @__PURE__ */ jsx("p", { children: "The hook accepts one single parameter, which is an object representing the keys you want to expose and their corresponding values. For example:" }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
							function ExampleComponent(){
								useExposed({
									jumpscare: () => alert('Bu!'),
								})
								return html\`\`;
							}
						`,
            lang: "js"
          }
        ),
        "This element exposes the ",
        /* @__PURE__ */ jsx("b", { children: "jumpscare" }),
        " function, that you can call by selecting the element:",
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
							<example-component></example-component>
							<script>
								document.querySelector('example-component').jumpscare();
							<\/script>
						`,
            lang: "html"
          }
        )
      ] })
    },
    {
      title: "Example: modal",
      id: "modal-example",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "To understand better how the ",
          /* @__PURE__ */ jsx("code", { children: "useExposed" }),
          " hook works, we will create a Modal component, and call its methods from an outer script."
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
							import { defineWomp, html, useExposed, useState } from 'womp';

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

							defineWomp(ModalExample);
						`,
            lang: "js"
          }
        ),
        "We can now add the styles of the Modal:",
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
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
						`,
            lang: "js"
          }
        ),
        "Job done!",
        /* @__PURE__ */ jsx("br", {}),
        "Now to see it in action you have two options:",
        /* @__PURE__ */ jsx(InteractiveExposedExample, {})
      ] })
    },
    {
      title: "Why not using props",
      id: "why-no-props",
      content: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("p", { children: [
        `As said before, implementing the modal in a "React approach" (using props) would work perfectly fine. The only problem with that approach would be (other than being conceptually wrong, because you move the state up) that you'd cause the re-render of two components instead of only one. Why?`,
        /* @__PURE__ */ jsx("br", {}),
        `To do that, you'd have to create the "open" state on the parent component that handles the`,
        /* @__PURE__ */ jsx("code", { children: "Modal" }),
        ', and set the new state accordingly to the user interactions. So, when the user clicks a button, if you use the "props approach" you will cause the re-rendering of the modal and of the parent component itself. If you implement the "',
        /* @__PURE__ */ jsx("b", { children: "exposed" }),
        '" approach, you will only cause the re-render of the modal, so your application will be more efficient.'
      ] }) })
    }
  ]
};
export default function UseExposed() {
  return getPageLayout(content);
}
defineWomp(UseExposed);
