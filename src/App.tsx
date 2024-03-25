import { defineWomp } from 'womp';
import { Link, Route, Routes } from 'womp-router';
import Layout from './layout/Layout';

export default function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<i>
						<Link to="/docs">docs</Link>
					</i>
				}
			/>
			<Route path="/docs" element={<Layout />}>
				<Route
					path="overview"
					fallback={<i>Loading...</i>}
					lazy={() => import('./pages/Introduction.js')}
				/>
				<Route
					path="quick-start"
					fallback={<i>Loading...</i>}
					lazy={() => import('./pages/QuickStart.js')}
				/>
				<Route index fallback={<i>Loading...</i>} lazy={() => import('./pages/Introduction.js')} />
			</Route>
		</Routes>
	);
}
defineWomp(App, {
	name: 'womp-app',
});
