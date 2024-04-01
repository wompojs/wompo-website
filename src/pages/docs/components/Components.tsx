import { defineWomp } from 'womp';
import getPageLayout, { Contents } from '../../../utils/getPageLayout.js';
import { Link } from 'womp-router';

const content: Contents = {
	title: 'Built-in components',
	description: (
		<>
			Womp exposes some specific built-in components that you can use to improve your application.
			You are then free to create your owns.
		</>
	),
	sections: [
		{
			title: 'Components',
			id: 'components',
			content: (
				<>
					<p>
						The list of built-in Womp components are the following:
						<ul>
							<li>
								<Link to='suspense'>Suspense</Link> - Will let you display a fallback UI while the
								children are stil loading or performinc async operations.
							</li>
						</ul>
					</p>
				</>
			),
		},
	],
};

export default function ComponentsPage() {
	return getPageLayout(content);
}

defineWomp(ComponentsPage, {
	name: 'components-page',
});
