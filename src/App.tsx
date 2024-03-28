import { defineWomp } from 'womp';
import { Link, Route, Routes } from 'womp-router';
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
		path: 'hooks',
		pagePath: './pages/docs/hooks/Hooks.js',
		subRoutes: [
			{
				path: 'useState',
				pagePath: './pages/docs/hooks/UseState.js',
			},
		],
	},
];

export default function App() {
	return (
		<Routes>
			<Route
				path='/'
				element={
					<i>
						<Link to='/docs'>docs</Link>
					</i>
				}
			/>
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
defineWomp(App, {
	name: 'womp-app',
});

//! Rules: Always return same template.
//! style=${object}
//! cssModule
