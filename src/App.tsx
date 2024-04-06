import { defineWompo } from 'wompo';
import { Route, Routes } from 'wompo-router';
import Layout from './layout/Layout.js';
import { docsRoutes } from './utils/routes.js';
import LoadingPlaceholder from './components/LoadingPlaceholder.js';

export default function App() {
	return (
		<Routes>
			<Route path='/docs' element={<Layout />}>
				{docsRoutes.map((docPage) => (
					<>
						<Route
							path={docPage.path}
							meta={docPage.meta}
							fallback={<LoadingPlaceholder />}
							lazy={() => import(docPage.pagePath)}
						/>
						{docPage.subRoutes &&
							docPage.subRoutes.map((subRoute) => (
								<Route
									meta={subRoute.meta}
									path={`${docPage.path}/${subRoute.path}`}
									fallback={<LoadingPlaceholder />}
									lazy={() => import(subRoute.pagePath)}
								/>
							))}
					</>
				))}
				<Route index redirect='overview' />
			</Route>
			<Route path='*' lazy={() => import('./pages/NotFound.js')} />
		</Routes>
	);
}
defineWompo(App, {
	name: 'wompo-root',
});

//! Rules: Always return same template.
