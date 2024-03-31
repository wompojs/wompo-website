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
				title: 'useAsync',
				link: '/docs/hooks/useAsync',
			},
			{
				title: 'useCallback',
				link: '/docs/hooks/useCallback',
			},
			{
				title: 'useContext',
				link: '/docs/hooks/useContext',
			},
			{
				title: 'useEffect',
				link: '/docs/hooks/useEffect',
			},
			{
				title: 'useExposed',
				link: '/docs/hooks/useExposed',
			},
			{
				title: 'useHook',
				link: '/docs/hooks/useHook',
			},
			{
				title: 'useId',
				link: '/docs/hooks/useId',
			},
			{
				title: 'useLayoutEffect',
				link: '/docs/hooks/useLayoutEffect',
			},
			{
				title: 'useMemo',
				link: '/docs/hooks/useMemo',
			},
			{
				title: 'useReducer',
				link: '/docs/hooks/useReducer',
			},
			{
				title: 'useRef',
				link: '/docs/hooks/useRef',
			},
			{
				title: 'useState',
				link: '/docs/hooks/useState',
			},
		],
	},
	{
		title: 'Custom hooks',
		link: '/docs/custom-hooks',
	},
	{
		title: 'APIs',
		link: '/docs/apis',
		menu: [
			{
				title: 'createContext',
				link: '/docs/apis/createContext',
			},
			{
				title: 'defineWomp',
				link: '/docs/apis/defineWomp',
			},
			{
				title: 'Element API',
				link: '/docs/apis/element',
			},
			{
				title: 'html',
				link: '/docs/apis/html',
			},
			{
				title: 'lazy',
				link: '/docs/apis/lazy',
			},
			{
				title: 'registeredComponents',
				link: '/docs/apis/registeredComponents',
			},
			{
				title: 'wompDefaultOptions',
				link: '/docs/apis/wompDefaultOptions',
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
