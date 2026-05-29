import { defineWompo, html, type WompoProps, useEffect, useState } from 'wompo';
import { createTranslator, type Messages } from 'seawomp/i18n';
import Header from '../../src/components/Header.js';
import Footer from '../../src/components/Footer.js';
import MenuIcon from '../../src/components/MenuIcon.js';
import SideMenu from '../../src/components/SideMenu.js';
import type { DocPageData } from '../../src/docs/types.js';

type DocsLayoutData =
	| (DocPageData & { locale: string; messages: Messages })
	| { locale: string; messages: Messages; notFound: true }
	| null;

interface Props extends WompoProps {
	data?: DocsLayoutData;
	url?: URL;
}

function hasDocsData(
	data?: DocsLayoutData,
): data is DocPageData & { locale: string; messages: Messages } {
	return Boolean(data && !('notFound' in data));
}

function DocsLayout({ children, data, url, styles: s }: Props) {
	const t = createTranslator(data?.messages ?? {});
	const [open, setOpen] = useState(false);
	const docData = hasDocsData(data) ? data : null;

	useEffect(() => {
		document.body.style.overflow = open ? 'hidden' : 'auto';
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [open]);

	useEffect(() => {
		const closeMenu = () => setOpen(false);
		window.addEventListener('seawomp:navigated', closeMenu);
		return () => window.removeEventListener('seawomp:navigated', closeMenu);
	}, []);

	if (!docData) {
		return html`
			<${Header} locale=${data?.locale} pathname=${url?.pathname} />
			<main class=${s.plainDocs}>${children}</main>
			<${Footer} messages=${data?.messages} />
		`;
	}

	const toggleMenu = () => setOpen(!open);

	return html`
		<${Header}
			locale=${docData.locale}
			pathname=${url?.pathname}
			toggleMenu=${toggleMenu}
			menuOpen=${open}
		/>
		<div class=${s.docsShell}>
			${open
				? html`<button
						class=${s.overlay}
						aria-label="Close documentation menu"
						@click=${toggleMenu}
					></button>`
				: ''}
			<${SideMenu}
				class=${`${s.leftMenu} ${open ? s.open : ''}`}
				menu=${docData.menu}
				currentPath=${docData.doc.currentPath}
				trackActive=${true}
				title=${html`<span class=${s.versionBadge}><span></span>${t('docs.version')}</span>`}
				style="height: 100dvh"
			/>
			<div class=${s.docsContent}>${children}</div>
		</div>
		<${Footer} messages=${data?.messages} />
	`;
}

DocsLayout.css = `
	:host {
		display: block;
		min-height: 100vh;
		background: var(--site-bg);
	}
	.docsShell {
		--docs-bg: var(--site-bg);
		--docs-panel: var(--site-surface);
		--docs-border: var(--site-border);
		--docs-text-muted: var(--site-text-muted);
		--docs-nav-h: 6.7rem;
		display: grid;
		grid-template-columns: minmax(22rem, 27rem) minmax(0, 1fr);
		gap: 3rem;
		align-items: start;
		min-height: calc(100vh - var(--docs-nav-h));
		background: var(--docs-bg);
		position: relative;
		isolation: isolate;
		z-index: 2;
	}
	.docsShell::before {
		content: "";
		position: fixed;
		inset: var(--docs-nav-h) 0 0;
		z-index: -1;
		pointer-events: none;
		background:
			radial-gradient(
				circle 42rem at 72% 18%,
				var(--site-grid-glow),
				var(--site-primary-soft) 35%,
				#573ef603 60%,
				transparent 78%
			),
			linear-gradient(var(--site-grid-line) 1px, transparent 1px),
			linear-gradient(90deg, var(--site-grid-line) 1px, transparent 1px);
		background-size: auto, 42px 42px, 42px 42px;
		mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
	}
	.docsShell > * {
		position: relative;
		z-index: 1;
	}
	.leftMenu {
		grid-column: 1;
		position: sticky;
		top: var(--docs-nav-h);
		height: calc(100vh - var(--docs-nav-h));
		z-index: 1;
	}
	.leftMenu nav {
		padding-top: 2.4rem;
	}
	.leftMenu [class*="titleSlot"] {
		display: flex;
		line-height: 1;
		margin-bottom: 2rem;
	}
	.docsContent {
		grid-column: 2;
		min-width: 0;
	}
	.docsContent > seawomp-route-view {
		display: block;
		min-width: 0;
	}
	.versionBadge {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
		padding: 0.55rem 0.9rem;
		border: 1px solid var(--site-border-strong);
		background: linear-gradient(135deg, var(--site-surface) 0%, var(--site-surface-soft) 100%);
		color: var(--site-primary);
		border-radius: 999px;
		font-size: 1.18rem;
		font-weight: 800;
		line-height: 1;
		letter-spacing: 0.02em;
	}
	.versionBadge > span {
		width: 0.65rem;
		height: 0.65rem;
		border-radius: 50%;
		background: var(--site-primary);
		box-shadow: 0 0 0 0.35rem var(--site-primary-soft);
	}
	.overlay {
		display: none;
	}
	.plainDocs {
		min-height: 70vh;
		background: var(--site-bg);
	}

	@media (width < 1050px){
		.docsShell {
			display: block;
		}
		.leftMenu {
			box-shadow: 0 2rem 5rem var(--site-shadow-strong);
			transition: transform .3s ease-in-out;
			position: fixed;
			left: 0;
			z-index: 1000;
			top: 0;
			bottom: 0;
			height: 100vh;
			height: 100dvh;
			width: min(38rem, 88vw);
			transform: translateX(-105%);
		}
		.leftMenu.open {
			transform: translateX(0);
		}
		.overlay {
			display: block;
			position: fixed;
			inset: 0;
			z-index: 999;
			border: 0;
			background: var(--site-overlay);
			cursor: pointer;
		}
	}
`;

defineWompo(DocsLayout, { name: 'wompo-docs-layout', island: 'load' });
export default DocsLayout;
export { head } from '../layout.js';
