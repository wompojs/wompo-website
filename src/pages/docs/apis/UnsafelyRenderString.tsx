import { defineWompo } from 'wompo';
import getPageLayout, { Contents } from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
import Note from '../../../components/Note.js';

const content: Contents = {
	title: 'unsafelyRenderString API',
	description: (
		<>
			How to use the <code>unsafelyRenderString</code> function to render a string variable that
			includes html code.
		</>
	),
	sections: [
		{
			title: 'Description',
			id: 'description',
			content: (
				<>
					<p>
						The <code>unsafelyRenderString</code> function is used to render a string variable that
						includes html code. This is needed because by default, for security reasons, Wompo
						escapes HTML code that is included in string variables included in a template. To avoid
						this automatic escaping, you should use the <code>unsafelyRenderString</code> function.
						<br />
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
							const escaped = unsafelyRenderString(variable);
						`}
						language='js'
					/>
					<p>
						The <code>unsafelyRenderString</code> function accepts one single argument, which is the
						string variable that will be escaped.
					</p>

					<Note severity='warning'>
						Only use this function when you are absolutely sure that the variable doesnt include
						dangerous code. Avoid this approach when your variable arrives from the final user's
						input.
					</Note>
				</>
			),
		},
	],
};

export default function UnsafelyRenderStringApi() {
	return getPageLayout(content);
}

defineWompo(UnsafelyRenderStringApi, {
	name: 'unsafely-render-string-api-apis-page',
});
