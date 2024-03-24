import { defineWomp } from 'womp';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import { ChildRoute } from 'womp-router';

const mainMenu = [
	{
		title: 'Overview',
		link: '/docs/overview',
	},
	{
		title: 'Props',
		link: '/docs/overview',
	},
	{
		title: 'State',
		link: '/docs/overview',
	},
	{
		title: 'Hooks',
		link: '/docs/overview',
	},
];

export default function Layout() {
	return (
		<div>
			<Header />
			<div style={{ display: 'flex', height: '100%' }}>
				<SideMenu
					menu={mainMenu}
					title={<div style={{ fontSize: 14, color: '#999', padding: '2rem' }}>womp@1.0.0</div>}
				/>
				<div style={{ width: '100%' }}>
					<ChildRoute />
				</div>
			</div>
		</div>
	);
}

defineWomp(Layout);
