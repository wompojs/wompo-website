import { defineWompo } from 'wompo';
import getPageLayout, { Contents } from '../../../utils/getPageLayout.js';
import Note from '../../../components/Note.js';

const content: Contents = {
	title: 'registeredComponents',
	description: <>Hot to get the collection of the components registered in the browser.</>,
	sections: [
		{
			title: 'Description',
			id: 'description',
			content: (
				<>
					<p>
						The <code>registeredComponent</code> exported object is an object exported by the Wompo
						library that has the names of the registered Web Components as keys, and their
						corresponding functional Component as a value (not the generated HTML class).
					</p>
					<Note severity='warning'>This object is supposed to be read-only.</Note>
				</>
			),
		},
	],
};

export default function RegisteredComponents() {
	return getPageLayout(content);
}

defineWompo(RegisteredComponents, {
	name: 'registered-components-apis-page',
});
