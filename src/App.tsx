import { defineWompo } from 'wompo';
import { Route, Routes } from 'wompo-router';
import Layout from './layout/Layout.js';

interface DocRoute {
	path: string;
	pagePath: string;
	subRoutes?: DocRoute[];
}

const docsRoutes: DocRoute[] = [
	{
		path: 'overview',
		pagePath: './pages/docs/Introduction.js',
	},
	{
		path: 'quick-start',
		pagePath: './pages/docs/QuickStart.js',
	},
	{
		path: 'complex-example',
		pagePath: './pages/docs/ComplexExample.js',
	},
	{
		path: 'styling',
		pagePath: './pages/docs/Styling.js',
	},
	{
		path: 'hooks',
		pagePath: './pages/docs/hooks/Hooks.js',
		subRoutes: [
			{
				path: 'useAsync',
				pagePath: './pages/docs/hooks/UseAsync.js',
			},
			{
				path: 'useCallback',
				pagePath: './pages/docs/hooks/UseCallback.js',
			},
			{
				path: 'useContext',
				pagePath: './pages/docs/hooks/UseContext.js',
			},
			{
				path: 'useEffect',
				pagePath: './pages/docs/hooks/UseEffect.js',
			},
			{
				path: 'useExposed',
				pagePath: './pages/docs/hooks/UseExposed.js',
			},
			{
				path: 'useHook',
				pagePath: './pages/docs/hooks/UseHook.js',
			},
			{
				path: 'useId',
				pagePath: './pages/docs/hooks/UseId.js',
			},
			{
				path: 'useLayoutEffect',
				pagePath: './pages/docs/hooks/UseLayoutEffect.js',
			},
			{
				path: 'useMemo',
				pagePath: './pages/docs/hooks/UseMemo.js',
			},
			{
				path: 'useReducer',
				pagePath: './pages/docs/hooks/UseReducer.js',
			},
			{
				path: 'useRef',
				pagePath: './pages/docs/hooks/UseRef.js',
			},
			{
				path: 'useState',
				pagePath: './pages/docs/hooks/UseState.js',
			},
		],
	},
	{
		path: 'custom-hooks',
		pagePath: './pages/docs/CustomHooks.js',
	},
	{
		path: 'components',
		pagePath: './pages/docs/components/Components.js',
		subRoutes: [
			{
				path: 'suspense',
				pagePath: './pages/docs/components/SuspenseComponent.js',
			},
		],
	},
	{
		path: 'apis',
		pagePath: './pages/docs/apis/Apis.js',
		subRoutes: [
			{
				path: 'createContext',
				pagePath: './pages/docs/apis/CreateContext.js',
			},
			{
				path: 'defineWompo',
				pagePath: './pages/docs/apis/DefineWompo.js',
			},
			{
				path: 'element',
				pagePath: './pages/docs/apis/ElementApi.js',
			},
			{
				path: 'html',
				pagePath: './pages/docs/apis/HtmlApi.js',
			},
			{
				path: 'lazy',
				pagePath: './pages/docs/apis/LazyApi.js',
			},
			{
				path: 'registeredComponents',
				pagePath: './pages/docs/apis/registeredComponents.js',
			},
			{
				path: 'wompDefaultOptions',
				pagePath: './pages/docs/apis/WompoDefaultOptions.js',
			},
		],
	},
	{
		path: 'jsx',
		pagePath: './pages/docs/Jsx.js',
	},
	{
		path: 'typescript',
		pagePath: './pages/docs/Typescript.js',
	},
];

export default function App() {
	return (
		<Routes>
			<Route path='/docs' element={<Layout />}>
				{docsRoutes.map((docPage) => (
					<>
						<Route path={docPage.path} fallback={<i></i>} lazy={() => import(docPage.pagePath)} />
						{docPage.subRoutes &&
							docPage.subRoutes.map((subRoute) => (
								<Route
									path={`${docPage.path}/${subRoute.path}`}
									fallback={<i></i>}
									lazy={() => import(subRoute.pagePath)}
								/>
							))}
					</>
				))}
				<Route index redirect='overview' />
			</Route>
		</Routes>
	);
}
defineWompo(App, {
	name: 'wompo-root',
});

//! Rules: Always return same template.
//! style=${object}
//! cssModule
