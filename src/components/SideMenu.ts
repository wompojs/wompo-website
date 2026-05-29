import { type RenderHtml, type WompoProps, defineWompo, html } from 'wompo';
import { Link } from 'seawomp/components';
import { useRoute } from 'seawomp/client';
import SubMenu from './SubMenu.js';
import type { DocRoute } from '../docs/types.js';

interface SideMenuProps extends WompoProps {
	menu: DocRoute[];
	currentPath?: string;
	title?: RenderHtml | string;
	trackActive?: boolean;
}

export default function SideMenu({
	styles: s,
	menu,
	currentPath = '',
	title,
	trackActive,
}: SideMenuProps) {
	const route = useRoute(currentPath || undefined);
	const activePath = trackActive ? route.pathname : currentPath;
	const isActive = (href: string) => activePath === href;

	const renderLink = (item: DocRoute) => {
		const active = isActive(item.link);
		if (item.link.startsWith('#')) {
			return html`
				<a
					class=${active ? `link ${s.active}` : 'link'}
					href=${item.link}
					ariaCurrent=${active ? 'page' : 'false'}
				>
					${item.title}
				</a>
			`;
		}
		return html`
			<${Link}
				class=${active ? `link ${s.active}` : 'link'}
				href=${item.link}
			>
				${item.title}
			</${Link}>
		`;
	};
	return html`
		<aside class=${s.menu}>
			<nav class=${s.nav}>
				${title ? html`<div class=${s.titleSlot}>${title}</div>` : ''}
				<ul class=${s.ul}>
					${menu.map(
						(item) => html`
							<li>
								${item.subRoutes
									? html`<${SubMenu} item=${item} currentPath=${activePath} /> `
									: renderLink(item)}
							</li>
						`,
					)}
				</ul>
			</nav>
		</aside>
	`;
}

SideMenu.css = `
	:host {
		display: block;
		position: sticky;
		top: 6.4rem;
		height: calc(100vh - 6.4rem);
		width: 100%;
		overflow: auto;
		background: linear-gradient(180deg, var(--site-surface-glass) 0%, var(--site-header-glass) 100%);
		backdrop-filter: blur(12px) saturate(160%);
		-webkit-backdrop-filter: blur(12px) saturate(160%);
		border-right: 1px solid var(--site-border);
		scrollbar-width: thin;
		scrollbar-color: var(--site-scrollbar) transparent;
	}
	:host::-webkit-scrollbar {
		width: 8px;
	}
	:host::-webkit-scrollbar-thumb {
		background: var(--site-scrollbar);
		border-radius: 999px;
	}
	:host::-webkit-scrollbar-thumb:hover {
		background: var(--site-scrollbar-hover);
	}
	.menu {
		min-height: 100%;
	}
	.nav {
		padding: 1.4rem 1.4rem 3rem;
	}
	.titleSlot {
		margin: 0 0 1.8rem;
	}
	.titleSlot > div,
	.titleSlot > span {
		display: inline-flex;
		align-items: center;
		font-size: 1.2rem;
		font-weight: 700;
		letter-spacing: 0;
	}
	.titleSlot h3 {
		text-transform: uppercase;
		font-size: 1.1rem;
		font-weight: 800;
		color: var(--site-text-soft);
		letter-spacing: 0.08em;
		margin: 0 0 1rem;
		padding: 0 1.2rem;
	}
	.ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
		gap: 1px;
  }
	.ul li {
		list-style: none;
	}
	.ul [class*="link"] {
		width: 100%;
	}
  .ul a {
    text-decoration: none;
    color: var(--site-text-muted);
    padding: 0.75rem 1.1rem;
    display: flex;
		align-items: center;
		border-radius: 8px;
    transition: color .18s, background-color .18s, box-shadow .18s, transform .18s;
		font-size: 1.4rem;
		font-weight: 500;
		line-height: 1.35;
		letter-spacing: 0.005em;
  }
  .ul a:hover {
		background-color: var(--site-primary-soft);
		color: var(--site-text-strong);
	}
	.ul a.active, .ul a[aria-current="page"] {
		background: linear-gradient(90deg, var(--site-primary-soft-strong) 0%, var(--site-primary-soft) 100%);
		color: var(--site-primary);
		font-weight: 700;
		box-shadow: inset 2px 0 0 var(--site-primary);
  }
	@media (width < 1050px) {
		side-menu {
			top: 0;
			height: 100vh;
			height: 100dvh;
			padding-top: 6.4rem;
		}
	}
`;

defineWompo(SideMenu, {
	name: 'side-menu',
});
