import { defineWomp } from 'womp';
import getPageLayout, { Contents } from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
import { Link } from 'womp-router';
import Note from '../../../components/Note.js';
import LazyExample from '../../../examples/LazyExample.js';
import LazySuspenseExample from '../../../examples/LazySuspenseExample.js';

const content: Contents = {
	title: 'wompDefaultOptions',
	description: (
		<>How to customize the default options of Womp components to satisfy your exigencies.</>
	),
	sections: [
		{
			title: 'Description',
			id: 'description',
			content: (
				<>
					<p>
						Womp exposes a <code>wompDefaultOptions</code> object that is used to get the default
						values to use as the second parameter of the{' '}
						<Link to='/docs/apis/defineWomp'>defineWomp</Link> function.
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
						<Link to='/docs/apis/defineWomp#usage'>defineWomp</Link> function.
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
							import { wompDefaultOptions } from 'womp';

							wompDefaultOptions.shadow = true;
						`}
						language='js'
					/>
				</>
			),
		},
	],
};

export default function WompDefaultOptions() {
	return getPageLayout(content);
}

defineWomp(WompDefaultOptions, {
	name: 'womp-default-options-apis-page',
});
