import { defineWompo } from 'wompo';
import getPageLayout, { Contents } from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
import { Link } from 'wompo-router';
import InteractiveExposedExample from '../../../examples/InteractiveExposedExample.js';

const content: Contents = {
	title: 'useSelf hook',
	description: (
		<>
			How to use the <code>useSelf</code> hook to get the instance of the element itself.
		</>
	),
	sections: [
		{
			title: 'Description',
			id: 'description',
			content: (
				<>
					<p>
						Sometimes you want to modify a custom element itself inside of it's own render function.
						To get the instance element, you can actually use the <code>this</code> keyword, but a
						better option is to use the <code>useSelf</code> hook.
					</p>
					<p>
						This hook will simply return the instance element, but it's typescript friendly and it's
						safer to use, becasue the <code>this</code> keyword can be altered.
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
							const self = useSelf();
						`}
						language='js'
					/>
					<p>
						The <code>useSelf</code> hook accepts no parameters.
					</p>
				</>
			),
		},
		{
			title: 'Example: custom class',
			id: 'modal-example',
			content: (
				<>
					<p>
						An example is to add a custom class to the element based on some conditions. To do that,
						you can use the <code>useSelf</code> hook to access the element's instance.
					</p>
					<Code
						code={`
							import { defineWompo, html, useSelf } from 'wompo';

							export default function InputExample({ disabled, styles: s }) {
								const self = useSelf();

                useEffect(() => {
                  if(disabled) self.classList.add(s.disabled);
                }, [disabled])

								return html\`
                  <input disabled=\${disabled} />
								\`;
							}

              InputExample.css = \`
                .disabled {
                  opacity: .7;
                  cursor: not-allowed;
                }
              \`;

							defineWompo(InputExample);
						`}
						language='js'
					/>
				</>
			),
		},
	],
};

export default function UseSelf() {
	return getPageLayout(content);
}

defineWompo(UseSelf, {
	name: 'use-self-hook-page',
});
