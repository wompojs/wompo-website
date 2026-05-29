import { type WompoProps, defineWompo, html, useEffect, useRef, useState } from 'wompo';
import { Link } from 'seawomp/components';
import { useRoute } from 'seawomp/client';
import type { DocRoute } from '../docs/types.js';

interface SubMenuProps extends WompoProps {
	item: DocRoute;
	currentPath: string;
}

export default function SubMenu({ item, currentPath, styles: s }: SubMenuProps) {
	// `<side-menu>` is NOT an island, so it never re-renders after hydration and the
	// `currentPath` prop it hands us is frozen at the value from the first server render.
	// `<sub-menu>` *is* an island, so it runs hooks on the client — we read the live route
	// here via `useRoute` (seeded with the SSR `currentPath` so the server output is correct)
	// and recompute the active/expanded state on every SPA navigation.
	const route = useRoute(currentPath || undefined);
	const activePath = route.pathname || currentPath;

	const onParent = activePath === item.link;
	const onChild = activePath.startsWith(`${item.link}/`);
	const autoExpanded = onParent || onChild;
	const selfActive = onParent;

	// Open state: defaults to the auto-expanded value, re-synced whenever the active route
	// changes (so navigating into a section opens it and leaving collapses it), while still
	// allowing a manual chevron toggle in between navigations.
	const [open, setOpen] = useState(autoExpanded);
	const lastPath = useRef(activePath);
	useEffect(() => {
		if (lastPath.current !== activePath) {
			lastPath.current = activePath;
			setOpen(autoExpanded);
		}
	}, [activePath]);

	const toggle = (event: Event) => {
		// The chevron lives inside the parent `<a>` (so it inherits the row styling), but a tap
		// on it must toggle the panel WITHOUT navigating. Stop the event before it reaches the
		// anchor's click handler and prevent the default just in case delegation order differs.
		event.preventDefault();
		event.stopPropagation();
		setOpen(!open);
	};
	const onKeyToggle = (event: KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') toggle(event);
	};

	const openStr = open ? 'true' : 'false';

	return html`
			<${Link}
				href=${item.link}
				class=${`link ${s.hasMenu} ${selfActive ? s.active : ''}`}
			>
				<span class=${s.label}>${item.title}</span>
				<span
					class=${s.chevron}
					data-open=${openStr}
					role="button"
					tabindex="0"
					aria-expanded=${openStr}
					aria-label=${`${open ? 'Collapse' : 'Expand'} ${item.title}`}
					@click=${toggle}
					@keydown=${onKeyToggle}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='16'
						height='16'
						fill='currentColor'
						viewBox='0 0 16 16'
					>
						<path
							fill-rule='evenodd'
							d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708'
						/>
					</svg>
				</span>
			</${Link}>
			<div
				class=${s.subMenuWrap}
				data-submenu-panel=${item.link}
				data-open=${openStr}
			>
				<ul class=${s.subMenu}>
					${item.subRoutes.map(
						(subMenuItem) => html`
						<li>
							<${Link}
								class=${activePath === subMenuItem.link ? `link ${s.active}` : 'link'}
								href=${subMenuItem.link}
							>
								${subMenuItem.title}
							</${Link}>
						</li>
					`
					)}
				</ul>
			</div>
	`;
}
SubMenu.css = `
	.subMenuWrap {
		display: grid;
		grid-template-rows: 0fr;
		margin: 0;
		overflow: hidden;
		transition: grid-template-rows .26s ease, margin .26s ease;
		position: relative;
	}
	.subMenuWrap[data-open="true"] {
		grid-template-rows: 1fr;
		margin: 0.2rem 0 0.6rem;
	}
  .subMenu {
		min-height: 0;
		overflow: hidden;
		list-style: none;
		padding: 0;
		margin: 0;
		position: relative;
	}
	.subMenu::before {
		content: "";
		position: absolute;
		left: 1.55rem;
		top: 0.2rem;
		bottom: 0.2rem;
		width: 1px;
		background: linear-gradient(180deg, transparent, var(--site-menu-line) 18%, var(--site-menu-line) 82%, transparent);
	}
	.subMenu li {
		list-style: none;
	}
	.subMenu a {
		font-size: 1.32rem !important;
		padding-left: 2.6rem !important;
		font-weight: 500 !important;
		color: var(--site-text-muted) !important;
		position: relative;
	}
	.subMenu a:hover {
		color: var(--site-text-strong) !important;
	}
  .hasMenu {
		align-items: center;
		justify-content: flex-start;
		gap: 0.6rem;
	}
	.label {
		flex: 0 1 auto;
		min-width: 0;
	}
	.chevron {
		flex: 0 0 auto;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.2rem;
		height: 2.2rem;
		margin: -0.4rem -0.4rem -0.4rem 0;
		border-radius: 6px;
		cursor: pointer;
		color: inherit;
	}
	.chevron:hover {
		background: var(--site-primary-soft);
	}
	.chevron svg {
		transition: transform .26s ease-in-out;
		opacity: 0.55;
	}
	.chevron[data-open="true"] svg {
		transform: rotate(90deg);
		opacity: 0.85;
	}
	.hasMenu.active, .hasMenu[aria-current="page"] {
		background: linear-gradient(90deg, var(--site-primary-soft-strong) 0%, var(--site-primary-soft) 100%) !important;
		color: var(--site-primary) !important;
		font-weight: 700 !important;
	}
	.subMenu a.active, .subMenu a[aria-current="page"] {
		background: linear-gradient(90deg, var(--site-primary-soft-strong) 0%, var(--site-primary-soft) 100%) !important;
		color: var(--site-primary) !important;
		font-weight: 700 !important;
	}
	.subMenu a.active::before, .subMenu a[aria-current="page"]::before {
		content: "";
		position: absolute;
		left: 1.4rem;
		top: 50%;
		transform: translateY(-50%);
		width: 0.6rem;
		height: 0.6rem;
		border-radius: 50%;
		background: var(--site-primary);
		box-shadow: 0 0 0 0.3rem var(--site-primary-soft-strong);
		z-index: 1;
	}

	@media (width < 1050px) {
		.hasMenu {
			justify-content: space-between;
		}
		.label {
			flex: 1 1 auto;
		}
		.chevron {
			width: 2.8rem;
			height: 2.8rem;
		}
	}
`;

defineWompo(SubMenu, {
	name: 'sub-menu',
	island: 'load',
});
