import path from 'node:path';
import type { LoaderArgs } from 'seawomp';
import { getLocale, loadMessages } from 'seawomp/i18n';
import { i18nConfig } from '../../../../src/i18n-config.js';
import { getDocPage } from '../../../../src/docs/markdown.js';

const MESSAGES_DIR = path.join(process.cwd(), 'messages');

export async function loader({ params, url }: LoaderArgs<{ slug?: string }>) {
	const slug = params.slug ? params.slug.split('/').filter(Boolean) : [];
	const locale = getLocale(url, i18nConfig);
	const messages = await loadMessages(locale, MESSAGES_DIR);
	const docData = getDocPage(slug, locale);
	if (!docData) return { locale, messages, notFound: true };
	return { ...docData, locale, messages };
}
