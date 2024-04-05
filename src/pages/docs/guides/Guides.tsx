import { defineWompo } from 'wompo';
import getPageLayout, { Contents } from '../../../utils/getPageLayout.js';
import { Link } from 'wompo-router';

const content: Contents = {
	title: 'Wompo Guides',
	description: 'Learn Wompo by following these easy tutorials and guides.',
	sections: [
		{
			title: 'Coming soon',
			id: 'coming-soon',
			content: (
				<>
					<p>
						Wompo has the following resources to help you learn and understand completely how Wompo
						works and what you can do to create your perfect application and share your custom
						components with the world.
					</p>
					<ul>
						<li>
							<Link to='quick-start'>Quick Start</Link> - Learn the 80% of Wompo by simply creating
							a <code>Counter</code> component.
						</li>
						<li>
							<Link to='complex-example'>Complex Example</Link> - Explore more of the Wompo library
							and try more hooks by building a <b>Todo List</b> application.
						</li>
						<li>
							<Link to='styling'>Styling</Link> - Explore different ways to style your custom
							components and create your unique components to share to the world.
						</li>
						<li>
							<Link to='custom-hooks'>Custom Hooks</Link> - See how you can create your custom hooks
							to avoid repeated code and optimize your components.
						</li>
					</ul>
				</>
			),
		},
	],
};

export default function Guides() {
	return getPageLayout(content);
}

defineWompo(Guides, {
	name: 'guides-page',
});
