import { Fragment as t, jsx as e, jsxs as o } from 'wompo/jsx-runtime';
import { defineWompo as l } from 'wompo';
import d from '../../../utils/getPageLayout.js';
import { Link as n } from 'wompo-router';
import i from '../../../components/Note.js';
const p = {
	title: 'Element API',
	description: o(t, {
		children: [
			'How to use the ',
			e('code', { children: 'Element API' }),
			' to manually control a component and call methods on it.',
		],
	}),
	sections: [
		{
			title: 'Description',
			id: 'description',
			content: e(t, {
				children: e('p', {
					children:
						"Every Wompo Component will be rendered in the DOM as a Web Component, so it'll be accessible by your scripts. In this guide we will explore what methods you can call and which properties you can access.",
				}),
			}),
		},
		{
			title: 'Methods',
			id: 'methods',
			content: o(t, {
				children: [
					o('p', {
						children: [
							'Every element exposes the followig methods:',
							o('ul', {
								children: [
									o('li', {
										children: [
											e('code', { children: e('b', { children: 'requestRender()' }) }),
											' ',
											'- If called, it will start the rendering process of the component.',
										],
									}),
									o('li', {
										children: [
											e('code', { children: e('b', { children: 'onDisconnected()' }) }),
											' ',
											"- Should not be called directly: it's a callback function that you can override, and will be executed whenever the component is disconnected from the DOM.",
										],
									}),
									o('li', {
										children: [
											e('code', {
												children: e('b', { children: 'updateProp(propName, newValue)' }),
											}),
											' ',
											'- It will update a ',
											e('b', { children: 'prop' }),
											' of the component and automatically ask to re-render it if the new value differs from the previous one. The first parameter is the name of the prop you want to update, and the second is the new value you want to set on it.',
										],
									}),
								],
							}),
						],
					}),
					o(i, {
						severity: 'info',
						children: [
							'If you used the ',
							e(n, { to: '/docs/hooks/useExposed', children: 'useExposed' }),
							' hook inside of your component, the component will also have the methods you exposed.',
						],
					}),
				],
			}),
		},
		{
			title: 'Properties',
			id: 'methods',
			content: o(t, {
				children: [
					o('p', {
						children: [
							'Every element exposes the followig properties:',
							o('ul', {
								children: [
									o('li', {
										children: [
											e('code', { children: e('b', { children: 'props' }) }),
											' ',
											'- The object containing all the props of the component.',
										],
									}),
									o('li', {
										children: [
											e('code', { children: e('b', { children: 'hooks' }) }),
											' ',
											'- The list of hooks that the component has. You can access this property but we strongly recommend to ',
											e('b', { children: 'not modify' }),
											' any of them. It is exposed only so that you can ',
											e('b', { children: 'add' }),
											' your own hooks. See the ',
											e(n, { to: '/docs/hooks/useHook', children: 'useHook' }),
											' ',
											'hook to know more.',
										],
									}),
								],
							}),
						],
					}),
					o(i, {
						severity: 'info',
						children: [
							'If you used the ',
							e(n, { to: '/docs/hooks/useExposed', children: 'useExposed' }),
							' hook inside of your component, the component will also have the properties you exposed.',
						],
					}),
				],
			}),
		},
	],
};
export default function s() {
	return d(p);
}
l(s, { name: 'element-api-apis-page' });
