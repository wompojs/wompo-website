import { WompProps, defineWomp } from 'womp';
import Header from '../components/Header.js';
import SideMenu, { MenuItem } from '../components/SideMenu.js';
import { ChildRoute } from 'womp-router';

const mainMenu: MenuItem[] = [
	{
		title: 'Overview',
		link: 'overview',
	},
	{
		title: 'Quick start',
		link: 'quick-start',
	},
	{
		title: 'Complex Example',
		link: 'complex-example',
	},
	{
		title: 'Hooks',
		link: '/docs/hooks',
		menu: [
			{
				title: 'useState',
				link: '/docs/hooks/useState',
			},
		],
	},
];

export default function Layout({ styles: s }: WompProps) {
	return (
		<div>
			<Header />
			<div style={{ display: 'flex', height: '100%' }} class={s.pageContent}>
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
Layout.css = `
	:host {
    display: flex;
  }
  :host .pageContent {
    display: none;
  }
	@media (width > 1300px){
    :host .pageContent {
      display: block;
    }
  }
`;

defineWomp(Layout);
