import { WompoProps, defineWompo, useState, html, useEffect } from 'wompo';
import Header from '../components/Header.js';
import SideMenu from '../components/SideMenu.js';
import { ChildRoute } from 'wompo-router';
import Footer from '../components/Footer.js';
import MenuIcon from '../components/MenuIcon.js';
import { useCurrentRoute } from 'wompo-router';
import { docsRoutes } from '../utils/routes.js';

export default function Layout({ styles: s }: WompoProps) {
	const [open, setOpen] = useState(false);
	const currentRoute = useCurrentRoute();
	const toggleMenu = () => {
		if (open) {
			document.body.style.overflow = 'auto';
			setOpen(false);
		} else {
			document.body.style.overflow = 'hidden';
			setOpen(true);
		}
	};
	useEffect(() => {
		document.body.style.overflow = 'auto';
		setOpen(false);
	}, [currentRoute]);
	return html`
		<div>
			<${Header}
				menuIcon=${html`<${MenuIcon} class=${s.icon} open=${open} @click=${toggleMenu} />`}
			/>
			<div class=${s.pageContent}>
				<${SideMenu}
					class=${`${s.menu} ${open && s.open}`}
					menu=${docsRoutes}
					title=${html`<div style=${{ fontSize: 14, color: '#585858', padding: '2rem' }}>
						wompo@1.0.17
					</div>`}
				/>
				<div style=${{ width: '100%' }}>
					<${ChildRoute} />
				</div>
			</div>
			<${Footer} class=${s.footer} />
		</div>
	`;
}
Layout.css = `
	.pageContent {
		display: flex;
		height: 100%;
		background-color: #fff;
		z-index: 2;
		position: relative;
	}
	.footer {
		width: 100%;
	}
	.icon {
		display: none;
	}

	@media (width < 1300px){
		.pageContent [class="side-content"] {
			display: none;
		}
	}

	@media (width < 1050px){
		.icon {
			display: block;
		}
		.menu {
			box-shadow: 0 0 10px #0004;
			transition: transform .3s ease-in-out;
			background-color: #fff;
			position: fixed;
			left: 0;
			z-index: 1000;
			top: 60px;
			bottom: 0;
			width: 100vw;
			max-width: 50rem;
			transform: translateX(-105%);
			height: unset;
		}
		.menu.open {
			transform: translateX(0);
		}
	}
`;

defineWompo(Layout, {
	name: 'docs-layout',
});
