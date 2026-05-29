import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { DocLink, DocPage, DocPageData, DocRoute, DocSection } from './types.js';
import { highlightCodeBlock, normalizeCodeLanguage } from '../utils/codeHighlight.js';

interface Frontmatter {
	title: string;
	description: string;
	metaTitle: string;
	metaDescription: string;
	navTitle: string;
	order: number;
}

interface DocRecord {
	slug: string;
	filePath: string;
	publicPath: string;
	frontmatter: Frontmatter;
	markdown: string;
}

interface Catalog {
	records: DocRecord[];
	menu: DocRoute[];
	flat: DocRecord[];
	signature: string;
}

const DOCS_ROOT = path.join(process.cwd(), 'content/docs');
const DEFAULT_LOCALE = 'en';
const HEADING_RE = /^##\s+(.+?)(?:\s+\{#([A-Za-z0-9_-]+)\})?\s*$/gm;
let cache = new Map<string, Catalog>();

marked.setOptions({
	gfm: true,
});

const COPY_ICON =
	'<svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M5 1.75A1.75 1.75 0 0 1 6.75 0h6.5C14.216 0 15 .784 15 1.75v9.5A1.75 1.75 0 0 1 13.25 13H12.5V14.25A1.75 1.75 0 0 1 10.75 16h-6.5A1.75 1.75 0 0 1 2.5 14.25v-9.5C2.5 3.784 3.284 3 4.25 3H5zm1.5 0V3h4.25c.966 0 1.75.784 1.75 1.75V11.5h.75a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25h-6.5a.25.25 0 0 0-.25.25M4.25 4.5a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25z"/></svg>';
const CHECK_ICON =
	'<svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 1 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0"/></svg>';

function copyButton(): string {
	return `<button class="code-copy-btn" type="button" aria-label="Copy code"><span class="code-copy-icon">${COPY_ICON}</span><span class="code-copy-check">${CHECK_ICON}</span><span class="code-copy-label">Copy</span></button>`;
}

marked.use({
	renderer: {
		code(token) {
			const lang = normalizeCodeLanguage(token.lang);
			return `<figure class="code-block">${copyButton()}<pre><code class="hljs language-${lang}" data-highlighted="server">${highlightCodeBlock(token.text, lang)}</code></pre></figure>`;
		},
	},
});

export function getDocPage(slugParts: string[], locale = DEFAULT_LOCALE): DocPageData | null {
	const catalog = getCatalog(locale);
	const slug = slugParts.length ? slugParts.join('/') : 'introduction';
	const current = catalog.records.find((record) => record.slug === slug);
	if (!current) return null;

	const flatIndex = catalog.flat.findIndex((record) => record.slug === current.slug);
	const prev = catalog.flat[flatIndex - 1];
	const next = catalog.flat[flatIndex + 1];

	return {
		doc: {
			title: current.frontmatter.title,
			description: current.frontmatter.description,
			metaTitle: current.frontmatter.metaTitle,
			metaDescription: current.frontmatter.metaDescription,
			currentPath: current.publicPath,
			sections: renderSections(current.markdown, locale),
			prev: prev ? toDocLink(prev) : undefined,
			next: next ? toDocLink(next) : undefined,
		},
		menu: catalog.menu,
	};
}

export function getDocStaticPaths(locales = discoverDocLocales()): string[] {
	const paths = new Set<string>();
	for (const locale of locales) {
		for (const record of getCatalog(locale).records) {
			paths.add(record.publicPath);
		}
	}
	return [...paths].sort();
}

function getCatalog(locale: string) {
	const cacheKey = locale || DEFAULT_LOCALE;
	const signature = catalogSignature(cacheKey);
	const cached = cache.get(cacheKey);
	if (cached && cached.signature === signature) return cached;
	const records = scanDocs(cacheKey);
	const menu = buildMenu(records);
	const flat = flattenMenuOrder(records, menu);
	const catalog = { records, menu, flat, signature };
	cache.set(cacheKey, catalog);
	return catalog;
}

function catalogSignature(locale: string): string {
	const root = docsRootFor(locale);
	if (!fs.existsSync(root)) return 'missing';
	const localizedLocales =
		locale === DEFAULT_LOCALE
			? discoverDocLocales().filter((entry) => entry !== DEFAULT_LOCALE)
			: [];
	return walk(root)
		.filter((file) => file.endsWith('.md') && !isInsideLocalizedRoot(file, root, localizedLocales))
		.map((file) => {
			const stat = fs.statSync(file);
			return `${normalize(path.relative(root, file))}:${stat.mtimeMs}:${stat.size}`;
		})
		.sort()
		.join('|');
}

function scanDocs(locale: string): DocRecord[] {
	const root = docsRootFor(locale);
	if (!fs.existsSync(root)) return [];
	const localizedLocales =
		locale === DEFAULT_LOCALE
			? discoverDocLocales().filter((entry) => entry !== DEFAULT_LOCALE)
			: [];
	const files = walk(root).filter(
		(file) => file.endsWith('.md') && !isInsideLocalizedRoot(file, root, localizedLocales),
	);
	return files
		.map((filePath) => {
			const relative = normalize(path.relative(root, filePath));
			const slug = toSlug(relative);
			const raw = fs.readFileSync(filePath, 'utf-8');
			const parsed = matter(raw);
			const frontmatter = readFrontmatter(parsed.data, filePath);
			return {
				slug,
				filePath,
				publicPath: localizeDocPath(slug, locale),
				frontmatter,
				markdown: parsed.content.trim(),
			};
		})
		.sort(compareRecords);
}

function docsRootFor(locale: string): string {
	if (locale === DEFAULT_LOCALE) return DOCS_ROOT;
	const localizedRoot = path.join(DOCS_ROOT, locale);
	return fs.existsSync(localizedRoot) ? localizedRoot : DOCS_ROOT;
}

function discoverDocLocales(): string[] {
	const locales = [DEFAULT_LOCALE];
	if (!fs.existsSync(DOCS_ROOT)) return locales;

	for (const entry of fs.readdirSync(DOCS_ROOT, { withFileTypes: true })) {
		if (!entry.isDirectory() || entry.name === DEFAULT_LOCALE) continue;
		if (fs.existsSync(path.join(DOCS_ROOT, entry.name, 'introduction.md'))) {
			locales.push(entry.name);
		}
	}

	return locales;
}

function isInsideLocalizedRoot(filePath: string, root: string, locales: string[]): boolean {
	if (!locales.length) return false;
	const [first] = normalize(path.relative(root, filePath)).split('/');
	return locales.includes(first);
}

function walk(dir: string): string[] {
	const out: string[] = [];
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const abs = path.join(dir, entry.name);
		if (entry.isDirectory()) out.push(...walk(abs));
		else if (entry.isFile()) out.push(abs);
	}
	return out;
}

function toSlug(relative: string): string {
	const noExt = relative.replace(/\.md$/, '');
	return noExt.endsWith('/index') ? noExt.slice(0, -'/index'.length) : noExt;
}

function readFrontmatter(data: any, filePath: string): Frontmatter {
	const required = ['title', 'description', 'metaTitle', 'metaDescription', 'navTitle', 'order'];
	for (const key of required) {
		if (data[key] === undefined || data[key] === null || data[key] === '') {
			throw new Error(`Missing frontmatter field "${key}" in ${filePath}`);
		}
	}
	return {
		title: String(data.title),
		description: String(data.description),
		metaTitle: String(data.metaTitle),
		metaDescription: String(data.metaDescription),
		navTitle: String(data.navTitle),
		order: Number(data.order),
	};
}

function buildMenu(records: DocRecord[]): DocRoute[] {
	const topLevel = records
		.filter((record) => !record.slug.includes('/'))
		.map((record) => toRoute(record));

	for (const parent of topLevel) {
		const prefix = `${parent.path}/`;
		const children = records
			.filter(
				(record) =>
					record.slug.startsWith(prefix) && !record.slug.slice(prefix.length).includes('/'),
			)
			.map((record) => toRoute(record));
		if (children.length) parent.subRoutes = children;
	}

	return topLevel.sort((a, b) => orderFor(records, a.link) - orderFor(records, b.link));
}

function flattenMenuOrder(records: DocRecord[], menu: DocRoute[]): DocRecord[] {
	const byPath = new Map(records.map((record) => [record.publicPath, record]));
	const flat: DocRecord[] = [];
	for (const route of menu) {
		const record = byPath.get(route.link);
		if (record) flat.push(record);
		for (const child of route.subRoutes ?? []) {
			const childRecord = byPath.get(child.link);
			if (childRecord) flat.push(childRecord);
		}
	}
	return flat;
}

function toRoute(record: DocRecord): DocRoute {
	return {
		title: record.frontmatter.navTitle,
		link: record.publicPath,
		path: record.slug.split('/').at(-1) ?? record.slug,
		meta: {
			title: record.frontmatter.metaTitle,
			description: record.frontmatter.metaDescription,
		},
	};
}

function compareRecords(a: DocRecord, b: DocRecord): number {
	const pathA = a.slug.split('/');
	const pathB = b.slug.split('/');
	if (pathA.length !== pathB.length) return pathA.length - pathB.length;
	return a.frontmatter.order - b.frontmatter.order;
}

function orderFor(records: DocRecord[], publicPath: string): number {
	return records.find((record) => record.publicPath === publicPath)?.frontmatter.order ?? 0;
}

function toDocLink(record: DocRecord): DocLink {
	return {
		title: record.frontmatter.metaTitle,
		link: record.publicPath,
		description: record.frontmatter.metaDescription,
	};
}

function renderSections(markdown: string, locale: string): DocSection[] {
	const matches = [...markdown.matchAll(HEADING_RE)];
	if (!matches.length) {
		return [
			{
				title: 'Overview',
				id: 'overview',
				html: renderMarkdown(markdown, locale),
			},
		];
	}

	return matches.map((match, index) => {
		const next = matches[index + 1];
		const title = match[1].trim();
		const id = match[2]?.trim() || slugify(title);
		const bodyStart = (match.index ?? 0) + match[0].length;
		const bodyEnd = next?.index ?? markdown.length;
		return {
			title,
			id,
			html: renderMarkdown(markdown.slice(bodyStart, bodyEnd).trim(), locale),
		};
	});
}

function renderMarkdown(markdown: string, locale: string): string {
	const normalized = markdown
		.replace(/(^|\n)<p>:::(info|warning|success|danger)\s*\n/g, '$1:::$2\n')
		.replace(/\n:::<\/p>(?=\n|$)/g, '\n:::');
	const withCallouts = normalized.replace(
		/^:::(info|warning|success|danger)\s*\n([\s\S]*?)\n:::\s*$/gm,
		(_all, severity, body) =>
			`<div class="doc-callout ${severity}">\n${marked.parse(body.trim())}\n</div>`,
	);
	const html = marked.parse(withCallouts) as string;
	return wrapInternalLinks(html, locale);
}

/** Markdown is rendered to an HTML string in the loader and injected into the page via
 * unsafelyRenderString — wompo SSR doesn't invoke the <seawomp-link> Link component for raw
 * tags inside that string, so the href has to be locale-prefixed here. The wrapping
 * <seawomp-link> is still emitted to opt the inner <a> into client-side navigation. */
function wrapInternalLinks(html: string, locale: string): string {
	return html.replace(
		/<a href="(\/(?:it\/)?docs[^"]*)"([^>]*)>([\s\S]*?)<\/a>/g,
		(_all, href, attrs, label) => {
			const normalized = href.replace(/^\/it(?=\/docs(?:\/|$))/, '');
			const localized = locale === DEFAULT_LOCALE ? normalized : `/${locale}${normalized}`;
			return `<seawomp-link href="${localized}"${attrs}>${label}</seawomp-link>`;
		},
	);
}

function localizeDocPath(slug: string, locale: string): string {
	const path = `/docs/${slug}`;
	if (locale === DEFAULT_LOCALE) return path;
	return `/${locale}${path}`;
}

function slugify(value: string): string {
	return value
		.toLowerCase()
		.trim()
		.replace(/<[^>]+>/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

function normalize(value: string): string {
	return value.split(path.sep).join('/');
}
