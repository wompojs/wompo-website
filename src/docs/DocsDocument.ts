import { defineWompo, html, type WompoProps, unsafelyRenderString, useEffect } from 'wompo';
import { createTranslator, type Messages } from 'seawomp/i18n';
import { Link } from 'seawomp/components';
import ContentSection from '../components/ContentSection.js';
import FollowDocButton from '../components/FollowDocButton.js';
import MainContent from '../components/MainContent.js';
import SideMenu from '../components/SideMenu.js';
import '../examples/Counter.js';
import '../examples/AsyncProfileExample.js';
import '../examples/ContextSessionExample.js';
import '../examples/HtmlExample.js';
import '../examples/InteractiveExposedExample.js';
import '../examples/IsolatedComponent.js';
import '../examples/LazyExample.js';
import '../examples/LazySuspenseExample.js';
import '../examples/LoggedInUser.js';
import '../examples/PasswordRevealer.js';
import '../examples/StateInitializer.js';
import '../examples/ThemeExample.js';
import '../examples/Timer.js';
import '../examples/UseTime.js';
import '../examples/UserForm.js';
import '../examples/Zoo.js';
import '../tutorials/TodoList.js';
import type { DocPageData, DocRoute } from './types.js';

interface Props extends WompoProps {
	data?: DocPageData | null;
	locale?: string;
	messages?: Messages;
}

function sectionMenu(data: DocPageData): DocRoute[] {
	return data.doc.sections.map((section) => ({
		title: section.title,
		link: `#${section.id}`,
		path: section.id,
		meta: {
			title: section.title,
			description: '',
		},
	}));
}

function highlightCode() {
	const hljs = (window as any).hljs;
	if (!hljs) {
		window.setTimeout(highlightCode, 50);
		return;
	}
	document.querySelectorAll('pre code:not([data-highlighted])').forEach((node) => {
		hljs.highlightElement(node);
	});
}

function DocsDocument({ data, locale, messages, styles: s }: Props) {
	const t = createTranslator(messages ?? {});

	useEffect(() => {
		if (!data) return;
		highlightCode();
	}, [data?.doc.currentPath]);

	if (!data) {
		return html`
			<main class=${s.notFound}>
				<h1>${t('docs.not_found')}</h1>
				<${Link} href="/docs/introduction">${t('docs.back_to_docs')}</${Link}>
			</main>
		`;
	}

	return html`
		<div class=${s.docsPage}>
			<div class=${s.contentRow}>
				<${MainContent} title=${data.doc.title} description=${data.doc.description}>
					${data.doc.sections.map(
						(section) => html`
							<${ContentSection} title=${section.title} sectionId=${section.id}>
								${unsafelyRenderString(section.html)}
							</${ContentSection}>
						`,
					)}
					<div class=${s.followLinks}>
						${
							data.doc.prev
								? html`
										<${FollowDocButton}
											to=${data.doc.prev.link}
											title=${data.doc.prev.title}
											description=${data.doc.prev.description}
											next=${false}
										/>
									`
								: html`<div style=${{ width: '100%' }}></div>`
						}
						${
							data.doc.next
								? html`
										<${FollowDocButton}
											to=${data.doc.next.link}
											title=${data.doc.next.title}
											description=${data.doc.next.description}
											next=${true}
										/>
									`
								: html`<div style=${{ width: '100%' }}></div>`
						}
					</div>
				</${MainContent}>
			</div>
			<${SideMenu}
				class=${s.toc}
				menu=${sectionMenu(data)}
				currentPath=""
				title=${html`<h3>${t('docs.in_this_page')}</h3>`}
			/>
		</div>
	`;
}

DocsDocument.css = `
	.docsPage {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(18rem, 24rem);
		gap: 3rem;
		align-items: start;
		min-width: 0;
	}
	.contentRow {
		min-width: 0;
		padding: 0 0 8rem;
	}
	.followLinks {
		display: flex;
		gap: 1.6rem;
		align-items: stretch;
		margin: 7rem 0 0;
	}
	.notFound {
		padding: 12rem 2rem;
		text-align: center;
		min-height: 60vh;
		background: var(--site-bg);
	}
	.toc {
		background: linear-gradient(180deg, var(--site-surface-glass) 0%, var(--site-header-glass) 100%);
		border-right: 0;
		border-left: 1px solid var(--site-border);
		backdrop-filter: none;
		-webkit-backdrop-filter: none;
	}
	.toc nav {
		padding: 3rem 1.4rem 4rem 2.2rem;
	}
	.toc h3 {
		text-transform: uppercase;
		font-size: 1.05rem;
		letter-spacing: 0.11em;
		font-weight: 800;
		color: var(--site-text-soft);
		margin: 0 0 1.3rem;
		padding: 0 1rem;
	}
	.toc a {
		color: var(--site-text-muted);
		font-size: 1.28rem;
		font-weight: 500;
		padding: 0.45rem 1rem;
		border-radius: 6px;
		line-height: 1.45;
	}
	.toc a:hover {
		color: var(--site-text-strong);
		background: var(--site-primary-soft);
	}
	.toc a.active, .toc a[aria-current="page"] {
		background: transparent;
		color: var(--site-primary);
		font-weight: 700;
		box-shadow: inset 2px 0 0 var(--site-primary);
	}

	@media (width < 1240px){
		.toc {
			display: none;
		}
	}

	@media (width < 1050px){
		.docsPage {
			display: block;
		}
		.contentRow {
			padding: 5.2rem 1.6rem 7rem;
		}
	}

	@media (width < 700px){
		.followLinks {
			flex-direction: column;
		}
		.contentRow {
			padding: 5rem 1rem 6rem;
		}
	}
`;

defineWompo(DocsDocument, { name: 'docs-document' });
export default DocsDocument;
