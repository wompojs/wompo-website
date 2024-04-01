import { defineWompo } from 'wompo';
import getPageLayout, { Contents } from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
import { Link } from 'wompo-router';
import Note from '../../../components/Note.js';
import LazyExample from '../../../examples/LazyExample.js';
import LazySuspenseExample from '../../../examples/LazySuspenseExample.js';

const content: Contents = {
	title: 'wompDefaultOptions',
	description: (
		<>How to customize the default options of Wompo components to satisfy your exigencies.</>
	),
	sections: [
		{
			title: 'Description',
			id: 'description',
			content: (
				<>
					<p>
						Wompo exposes a <code>wompDefaultOptions</code> object that is used to get the default
						values to use as the second parameter of the{' '}
						<Link to='/docs/apis/defineWompo'>defineWompo</Link> function.
						<br />
						The options you can modify are:
						<ul>
							<li>
								<b>
									<code>shadow</code>
								</b>{' '}
								- Default "false".
							</li>
							<li>
								<b>
									<code>cssModule</code>
								</b>{' '}
								- Default "true".
							</li>
						</ul>
						To know more about these options see the documentation about the{' '}
						<Link to='/docs/apis/defineWompo#usage'>defineWompo</Link> function.
					</p>
				</>
			),
		},
		{
			title: 'Example',
			id: 'example: default shadow',
			content: (
				<>
					<p>
						One common use case is to make your components use the Shadow DOM by default. To get
						this result, you should modify the default option{' '}
						<b>before you define any other component</b>. Components rendered <i>before</i> you
						actually modify the default options will still have the old options applied.
					</p>
					<Code
						code={`
							import { wompDefaultOptions } from 'wompo';

							wompDefaultOptions.shadow = true;
						`}
						language='js'
					/>
				</>
			),
		},
	],
};

export default function WompoDefaultOptions() {
	return getPageLayout(content);
}

defineWompo(WompoDefaultOptions, {
	name: 'wompo-default-options-apis-page',
});
