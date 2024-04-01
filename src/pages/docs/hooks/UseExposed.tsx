import { defineWomp } from 'womp';
import getPageLayout, { Contents } from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
import { Link } from 'womp-router';
import InteractiveExposedExample from '../../../examples/InteractiveExposedExample.js';
import Note from '../../../components/Note.js';

const content: Contents = {
	title: 'useExposed hook',
	description: (
		<>
			How to use the <code>useExposed</code> hook to expose some data in the DOM.
		</>
	),
	sections: [
		{
			title: 'Description',
			id: 'description',
			content: (
				<>
					<p>
						The <code>useExposed</code> hook will let you expose some data into the DOM so that it
						can be accessed from other scripts or by selecting the HTML node through{' '}
						<code>document.querySelector</code> or through the{' '}
						<Link to='/docs/hooks/useRef'>useRef</Link> hook.
					</p>
					<p>
						Unlike <b>React</b>, Womp components are meant to be <u>isolated</u>, meaning that their
						state should't dependend on props, even though it is possible. This is becasue Womp
						Components are actually DOM elements, meaning that they can be accessed by other scripts
						and call methods or access data. This allows to <b>isolate</b> the state and make it
						depend on the component itself (and that's it). A great example can be a <b>Modal</b>{' '}
						component:
						<br />
						In React, you would create the component and make it accept an "open" prop to handle its
						state. In Womp you can also do it, but it's <b>not recommended</b>. Instead, you want to
						handle the state internally by creating the <code>open()</code> and <code>close()</code>{' '}
						methods, and call them from outside. This allows <b>great code reduction</b> (you don't
						have to re-create the same logic for opening and closing the modal wherever it is used)
						and <b>isolation</b>.
					</p>
					<Note severity='info'>
						Unlike all the other hooks, the <code>useExposed</code> hook can be used inside
						conditional statements.
					</Note>
				</>
			),
		},
		{
			title: 'Usage',
			id: 'usage',
			content: (
				<>
					<Code
						code={`
							useExposed(object);
						`}
						language='js'
					/>
					<p>
						The hook accepts one single parameter, which is an object representing the keys you want
						to expose and their corresponding values. For example:
					</p>
					<Code
						code={`
							function ExampleComponent(){
								useExposed({
									jumpscare: () => alert('Bu!'),
								})
								return html\`\`;
							}
						`}
						language='js'
					/>
					This element exposes the <b>jumpscare</b> function, that you can call by selecting the
					element:
					<Code
						code={`
							<example-component></example-component>
							<script>
								document.querySelector('example-component').jumpscare();
							</script>
						`}
						language='html'
					/>
				</>
			),
		},
		{
			title: 'Example: modal',
			id: 'modal-example',
			content: (
				<>
					<p>
						To understand better how the <code>useExposed</code> hook works, we will create a Modal
						component, and call its methods from an outer script.
					</p>
					<Code
						code={`
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
						`}
						language='js'
					/>
					We can now add the styles of the Modal:
					<Code
						code={`
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
						`}
						language='js'
					/>
					Job done!
					<br />
					Now to see it in action you have two options:
					<InteractiveExposedExample />
				</>
			),
		},
		{
			title: 'Why not using props',
			id: 'why-no-props',
			content: (
				<>
					<p>
						As said before, implementing the modal in a "React approach" (using props) would work
						perfectly fine. The only problem with that approach would be (other than being
						conceptually wrong, because you move the state up) that you'd cause the re-render of two
						components instead of only one. Why?
						<br />
						To do that, you'd have to create the "open" state on the parent component that handles
						the
						<code>Modal</code>, and set the new state accordingly to the user interactions. So, when
						the user clicks a button, if you use the "props approach" you will cause the
						re-rendering of the modal and of the parent component itself. If you implement the "
						<b>exposed</b>" approach, you will only cause the re-render of the modal, so your
						application will be more efficient.
					</p>
				</>
			),
		},
	],
};

export default function UseExposed() {
	return getPageLayout(content);
}

defineWomp(UseExposed, {
	name: 'useexposed-hook-page',
});
