import { Fragment as n, jsx as s, jsxs as t } from 'wompo/jsx-runtime';
import { defineWompo as h } from 'wompo';
import { Link as g, Route as a, Routes as c } from 'wompo-router';
import u from './layout/Layout.js';
const i = [
	{ path: 'overview', pagePath: './pages/docs/Introduction.js' },
	{ path: 'quick-start', pagePath: './pages/docs/QuickStart.js' },
	{ path: 'complex-example', pagePath: './pages/docs/ComplexExample.js' },
	{ path: 'styling', pagePath: './pages/docs/Styling.js' },
	{
		path: 'hooks',
		pagePath: './pages/docs/hooks/Hooks.js',
		subRoutes: [
			{ path: 'useAsync', pagePath: './pages/docs/hooks/UseAsync.js' },
			{ path: 'useCallback', pagePath: './pages/docs/hooks/UseCallback.js' },
			{ path: 'useContext', pagePath: './pages/docs/hooks/UseContext.js' },
			{ path: 'useEffect', pagePath: './pages/docs/hooks/UseEffect.js' },
			{ path: 'useExposed', pagePath: './pages/docs/hooks/UseExposed.js' },
			{ path: 'useHook', pagePath: './pages/docs/hooks/UseHook.js' },
			{ path: 'useId', pagePath: './pages/docs/hooks/UseId.js' },
			{ path: 'useLayoutEffect', pagePath: './pages/docs/hooks/UseLayoutEffect.js' },
			{ path: 'useMemo', pagePath: './pages/docs/hooks/UseMemo.js' },
			{ path: 'useReducer', pagePath: './pages/docs/hooks/UseReducer.js' },
			{ path: 'useRef', pagePath: './pages/docs/hooks/UseRef.js' },
			{ path: 'useState', pagePath: './pages/docs/hooks/UseState.js' },
		],
	},
	{ path: 'custom-hooks', pagePath: './pages/docs/CustomHooks.js' },
	{
		path: 'components',
		pagePath: './pages/docs/components/Components.js',
		subRoutes: [{ path: 'suspense', pagePath: './pages/docs/components/SuspenseComponent.js' }],
	},
	{
		path: 'apis',
		pagePath: './pages/docs/apis/Apis.js',
		subRoutes: [
			{ path: 'createContext', pagePath: './pages/docs/apis/CreateContext.js' },
			{ path: 'defineWompo', pagePath: './pages/docs/apis/DefineWompo.js' },
			{ path: 'element', pagePath: './pages/docs/apis/ElementApi.js' },
			{ path: 'html', pagePath: './pages/docs/apis/HtmlApi.js' },
			{ path: 'lazy', pagePath: './pages/docs/apis/LazyApi.js' },
			{ path: 'registeredComponents', pagePath: './pages/docs/apis/registeredComponents.js' },
			{ path: 'wompDefaultOptions', pagePath: './pages/docs/apis/WompoDefaultOptions.js' },
		],
	},
];
export default function o() {
	return t(c, {
		children: [
			s(a, { path: '/', element: s('i', { children: s(g, { to: '/docs', children: 'docs' }) }) }),
			t(a, {
				path: '/docs',
				element: s(u, {}),
				children: [
					i.map((e) =>
						t(n, {
							children: [
								s(a, { path: e.path, fallback: s('i', {}), lazy: () => import(e.pagePath) }),
								e.subRoutes &&
									e.subRoutes.map((p) =>
										s(a, {
											path: `${e.path}/${p.path}`,
											fallback: s('i', {}),
											lazy: () => import(p.pagePath),
										})
									),
							],
						})
					),
					s(a, { index: !0, redirect: 'overview' }),
				],
			}),
		],
	});
}
h(o, { name: 'wompo-root' }); //! Rules: Always return same template.
//! style=${object}
//! cssModule
