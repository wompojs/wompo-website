import { defineWompo, html, unsafelyRenderString, type WompoProps } from 'wompo';
import DocsDocument from '../../../../src/docs/DocsDocument.js';
import type { DocPageData } from '../../../../src/docs/types.js';
import { seoI18nHead, type Messages } from 'seawomp/i18n';
import { i18nConfig } from '../../../../src/i18n-config.js';

type ExtendedDocPageData = DocPageData & { locale: string; messages: Messages };
type MissingDocPageData = { locale: string; messages: Messages; notFound: true };
const SITE_URL = 'https://wompo.dev';

interface Props extends WompoProps {
	data?: ExtendedDocPageData | MissingDocPageData | null;
}

function DocsPage({ data }: Props) {
	if (!data || 'notFound' in data) {
		return html`<${DocsDocument} data=${null} locale=${data?.locale} messages=${data?.messages} />`;
	}
	const { locale, messages, ...docData } = data;
	return html`<${DocsDocument} data=${docData} locale=${locale} messages=${messages} />`;
}

defineWompo(DocsPage, { name: 'docs-page' });
export default DocsPage;

export async function generateStaticPaths() {
	const { getDocStaticPaths } = await import('../../../../src/docs/markdown.js');
	return getDocStaticPaths();
}

function escHtml(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}

function absoluteUrl(path: string): string {
	return new URL(path, SITE_URL).toString();
}

function jsonLd(data: unknown): string {
	return JSON.stringify(data).replace(/</g, '\\u003c');
}

function breadcrumbs(path: string, pageTitle: string) {
	const parts = path.split('/').filter(Boolean);
	const localePrefix = parts[0] === 'it' ? '/it' : '';
	const docsIndex = parts.indexOf('docs');
	const items = [
		{ name: 'Wompo', item: absoluteUrl(localePrefix || '/') },
		{ name: 'Docs', item: absoluteUrl(`${localePrefix}/docs/introduction`) },
	];
	let current = `${localePrefix}/docs`;
	for (const part of parts.slice(docsIndex + 1)) {
		current += '/' + part;
		items.push({
			name: part === parts.at(-1) ? pageTitle : part.replace(/-/g, ' '),
			item: absoluteUrl(current),
		});
	}
	return items.map((entry, index) => ({
		'@type': 'ListItem',
		position: index + 1,
		name: entry.name,
		item: entry.item,
	}));
}

export function head({ data }: { data?: ExtendedDocPageData | MissingDocPageData | null }) {
	if (!data || 'notFound' in data) return null;
	const title = data.doc.metaTitle;
	const desc = data.doc.metaDescription;
	const path = data.doc.currentPath.replace(/^\/it(?=\/docs(?:\/|$))/, '');
	const canonicalUrl = absoluteUrl(data.doc.currentPath);
	const inLanguage = data.locale === 'it' ? 'it-IT' : 'en-US';
	const section = path.split('/').filter(Boolean)[1] ?? 'docs';
	const structuredData = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'TechArticle',
				headline: data.doc.metaTitle,
				description: data.doc.metaDescription,
				url: canonicalUrl,
				mainEntityOfPage: canonicalUrl,
				inLanguage,
				articleSection: section,
				author: {
					'@type': 'Person',
					name: 'Lorenzo Lannino',
				},
				publisher: {
					'@type': 'Organization',
					name: 'Wompo',
					url: SITE_URL,
					logo: {
						'@type': 'ImageObject',
						url: absoluteUrl('/icons/512.png'),
					},
				},
			},
			{
				'@type': 'BreadcrumbList',
				itemListElement: breadcrumbs(data.doc.currentPath, data.doc.title),
			},
		],
	};
	return html`
		${raw(`<title>${escHtml(title)}</title>`)}
		<meta name="description" content="${desc}" />
		<meta property="og:title" content="${title}" />
		<meta property="og:description" content="${desc}" />
		<meta property="og:type" content="article" />
		<meta property="og:image" content="${absoluteUrl('/wompo-preview.jpg')}" />
		<meta name="twitter:title" content="${title}" />
		<meta name="twitter:description" content="${desc}" />
		<meta name="twitter:image" content="${absoluteUrl('/wompo-preview.jpg')}" />
		${seoI18nHead({
			siteUrl: SITE_URL,
			pathname: data.doc.currentPath,
			i18n: i18nConfig,
			locale: data.locale,
			ogLocale: { en: 'en_US', it: 'it_IT' },
		})}
		${raw(`<script type="application/ld+json">${jsonLd(structuredData)}</script>`)}
	`;
}

function raw(fragment: string) {
	return unsafelyRenderString(fragment);
}
