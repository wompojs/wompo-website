import { WompProps, defineWomp } from 'womp';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import { ChildRoute } from 'womp-router';

const mainMenu = [
	{
		title: 'Overview',
		link: 'overview',
	},
	{
		title: 'Quick start',
		link: 'quick-start',
	},
	{
		title: 'Hooks',
		link: '/docs/overview',
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
