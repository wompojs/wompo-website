import { defineWompo } from 'wompo';
import getPageLayout, { Contents } from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
import { Link } from 'wompo-router';
import Note from '../../../components/Note.js';
import IsolatedComponent from '../../../examples/IsolatedComponent.js';

const content: Contents = {
	title: 'Element API',
	description: (
		<>
			How to use the <code>Element API</code> to manually control a component and call methods on
			it.
		</>
	),
	sections: [
		{
			title: 'Description',
			id: 'description',
			content: (
				<>
					<p>
						Every Wompo Component will be rendered in the DOM as a Web Component, so it'll be
						accessible by your scripts. In this guide we will explore what methods you can call and
						which properties you can access.
					</p>
				</>
			),
		},
		{
			title: 'Methods',
			id: 'methods',
			content: (
				<>
					<p>
						Every element exposes the followig methods:
						<ul>
							<li>
								<code>
									<b>requestRender()</b>
								</code>{' '}
								- If called, it will start the rendering process of the component.
							</li>
							<li>
								<code>
									<b>onDisconnected()</b>
								</code>{' '}
								- Should not be called directly: it's a callback function that you can override, and
								will be executed whenever the component is disconnected from the DOM.
							</li>
							<li>
								<code>
									<b>updateProp(propName, newValue)</b>
								</code>{' '}
								- It will update a <b>prop</b> of the component and automatically ask to re-render
								it if the new value differs from the previous one. The first parameter is the name
								of the prop you want to update, and the second is the new value you want to set on
								it.
							</li>
						</ul>
					</p>
					<Note severity='info'>
						If you used the <Link to='/docs/hooks/useExposed'>useExposed</Link> hook inside of your
						component, the component will also have the methods you exposed.
					</Note>
				</>
			),
		},
		{
			title: 'Properties',
			id: 'methods',
			content: (
				<>
					<p>
						Every element exposes the followig properties:
						<ul>
							<li>
								<code>
									<b>props</b>
								</code>{' '}
								- The object containing all the props of the component.
							</li>
							<li>
								<code>
									<b>hooks</b>
								</code>{' '}
								- The list of hooks that the component has. You can access this property but we
								strongly recommend to <b>not modify</b> any of them. It is exposed only so that you
								can <b>add</b> your own hooks. See the <Link to='/docs/hooks/useHook'>useHook</Link>{' '}
								hook to know more.
							</li>
						</ul>
					</p>
					<Note severity='info'>
						If you used the <Link to='/docs/hooks/useExposed'>useExposed</Link> hook inside of your
						component, the component will also have the properties you exposed.
					</Note>
				</>
			),
		},
	],
};

export default function ElementApi() {
	return getPageLayout(content);
}

defineWompo(ElementApi, {
	name: 'element-api-apis-page',
});
