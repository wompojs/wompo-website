import { defineWomp } from 'womp';
import getPageLayout, { Contents } from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';

const content: Contents = {
	title: 'UseLayoutEffect hook',
	description: (
		<>
			How to use the <code>UseLayoutEffect</code> hook to generate a unique ID for your components.
		</>
	),
	sections: [
		{
			title: 'Description',
			id: 'description',
			content: (
				<>
					<p>
						Hard-coding IDs in components is very often a bad idea. The <code>UseLayoutEffect</code>{' '}
						hook will solve this problem.
					</p>
					<p>
						This hook will generate a unique string ID for your component in the following format:{' '}
						<code>:w&lt;number&gt;:</code>. The number in between will simply be a counter that will
						be incremented every time the hook is called for the first time in a component. This
						ensures that the ID will be unique, but the ID will probably NOT be the same every time
						you reload the application.
					</p>
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
							const id = UseLayoutEffect();
						`}
						lang='js'
					/>
					<p>
						The <code>UseLayoutEffect</code> hook accepts no parameters and will return always the
						same value across re-renders.
					</p>
				</>
			),
		},
		{
			title: 'Example: Accessibility',
			id: 'modal-example',
			content: (
				<>
					<p>
						A common use case for the <code>UseLayoutEffect</code> is to solve accessibility
						problems or simply setting a "for" attribute to a label element.
					</p>
					<Code
						code={`
							import { defineWomp, html, UseLayoutEffect } from 'womp';

							export default function InputExample() {
								const hintId = UseLayoutEffect(); // :w0:
								const inputId = UseLayoutEffect(); // :w1:

								return html\`
									<label for=\${inputId}>Password:</label>
                  <input id=\${inputId} aria-describedby=\${hintId} />
                  <p id=\${hintId}>The password should contain at least 8 characters</p>
								\`;
							}

							defineWomp(InputExample);
						`}
						lang='js'
					/>
					<p>
						Even if the <code>InputExample</code> is rendered multiple times, it'll always keep
						working without having IDs clashes.
					</p>
				</>
			),
		},
	],
};

export default function UseLayoutEffect() {
	return getPageLayout(content);
}

defineWomp(UseLayoutEffect);
