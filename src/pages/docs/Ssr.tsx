import { defineWompo } from 'wompo';
import getPageLayout, { Contents } from '../../utils/getPageLayout.js';
import Note from '../../components/Note.js';

const content: Contents = {
	title: 'SSR',
	description: 'How to Server Side Render your components.',
	sections: [
		{
			title: 'Coming soon',
			id: 'coming-soon',
			content: (
				<>
					<Note severity='warning'>
						We are sad to inform you that Server Side Rendering (SSR) is not currently available for
						Wompo. The good news is that <b>we are working on it!</b> Feel free to give your own
						contribution on <a href='https://github.com/wompojs/wompo'>GitHub</a>. It would be
						highly appreciated!
					</Note>
				</>
			),
		},
	],
};

export default function Ssr() {
	return getPageLayout(content);
}

defineWompo(Ssr, {
	name: 'ssr-page',
});
