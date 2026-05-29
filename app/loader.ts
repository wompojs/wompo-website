import path from 'node:path';
import type { LoaderArgs } from 'seawomp';
import { getLocale, loadMessages } from 'seawomp/i18n';
import { i18nConfig } from '../src/i18n-config.js';

const MESSAGES_DIR = path.join(process.cwd(), 'messages');

export async function loader({ url }: LoaderArgs) {
	const locale = getLocale(url, i18nConfig);
	const messages = await loadMessages(locale, MESSAGES_DIR);
	return { locale, messages };
}
