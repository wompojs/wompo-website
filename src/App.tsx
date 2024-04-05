import { defineWompo } from 'wompo';
import { Route, Routes } from 'wompo-router';
import Layout from './layout/Layout.js';
import { docsRoutes } from './utils/routes.js';

export default function App() {
	return (
		<Routes>
			<Route path='/docs' element={<Layout />}>
				{docsRoutes.map((docPage) => (
					<>
						<Route
							path={docPage.path}
							meta={docPage.meta}
							fallback={<i></i>}
							lazy={() => import(docPage.pagePath)}
						/>
						{docPage.subRoutes &&
							docPage.subRoutes.map((subRoute) => (
								<Route
									meta={subRoute.meta}
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
