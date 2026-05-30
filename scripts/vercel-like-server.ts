/* Local emulation of Vercel's static hosting for `.seawomp/static`.
 *
 * Run `bun run build` first, then `bun run serve:vercel-like`. Unlike `seawomp start`, this matches
 * Vercel's production cache headers exactly, so cache-revalidation behaviour (and bugs that only
 * surface under it) can be reproduced locally:
 *   - clean URLs: /docs/installation -> /docs/installation/index.html
 *   - /_assets/* => immutable; everything else => public, max-age=0, must-revalidate (Vercel default)
 *   - ETag + conditional 304 so must-revalidate behaves like prod
 *
 * Note: this reproduces Vercel's *caching*, not the production *hostname*. Third-party scripts gated
 * to `wompo.dev` (e.g. the iubenda consent manager) won't run here.
 */
import { stat, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

const ROOT = path.resolve(process.cwd(), '.seawomp/static');
const PORT = Number(process.env.PORT ?? 5173);

const MIME: Record<string, string> = {
	'.html': 'text/html; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.js': 'application/javascript',
	'.mjs': 'application/javascript',
	'.json': 'application/json',
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.webp': 'image/webp',
	'.avif': 'image/avif',
	'.ico': 'image/x-icon',
	'.woff': 'font/woff',
	'.woff2': 'font/woff2',
	'.txt': 'text/plain; charset=utf-8',
	'.xml': 'application/xml',
};

async function resolveFile(pathname: string): Promise<string | null> {
	let rel = decodeURIComponent(pathname.replace(/^\/+/, ''));
	if (rel === '') rel = 'index.html';
	const abs = path.resolve(ROOT, rel);
	if (!abs.startsWith(ROOT)) return null;
	// direct file?
	try {
		const s = await stat(abs);
		if (s.isFile()) return abs;
		if (s.isDirectory()) {
			const idx = path.join(abs, 'index.html');
			if ((await stat(idx)).isFile()) return idx;
		}
	} catch {}
	// clean URL: /docs/installation -> /docs/installation/index.html
	try {
		const idx = path.join(abs, 'index.html');
		if ((await stat(idx)).isFile()) return idx;
	} catch {}
	return null;
}

Bun.serve({
	port: PORT,
	async fetch(req) {
		const url = new URL(req.url);
		const abs = await resolveFile(url.pathname);
		if (!abs) return new Response('Not found', { status: 404 });
		const data = await readFile(abs);
		const ext = path.extname(abs).toLowerCase();
		const type = MIME[ext] ?? 'application/octet-stream';
		const etag = '"' + createHash('md5').update(data).digest('hex') + '"';
		const cacheControl =
			url.pathname.startsWith('/_assets/')
				? 'public, max-age=31536000, immutable'
				: 'public, max-age=0, must-revalidate';
		if (req.headers.get('if-none-match') === etag) {
			return new Response(null, {
				status: 304,
				headers: { etag, 'cache-control': cacheControl },
			});
		}
		return new Response(data, {
			headers: { 'content-type': type, etag, 'cache-control': cacheControl },
		});
	},
});
console.log(`vercel-like static server → http://localhost:${PORT} (root: ${ROOT})`);
