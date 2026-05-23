import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// In dev we serve over plain HTTP, so any cached Strict-Transport-Security from a previous
// visit (or from the production deployment) makes the browser refuse to load static assets
// with a "TLS error". We disable HSTS in non-production AND actively clear any cached value
// by sending `max-age=0`.
const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
	app.use((req, res, next) => {
		res.setHeader('Strict-Transport-Security', 'max-age=0');
		next();
	});
}

app.use(
	helmet({
		// Helmet's default HSTS (max-age 1 year, includeSubDomains) is fine on Vercel where
		// every response is HTTPS, but it breaks the local HTTP dev server. Off in dev.
		strictTransportSecurity: isProduction,
		contentSecurityPolicy: {
			directives: {
				'script-src': [
					"'self'",
					'*.iubenda.com',
					'*.googletagmanager.com',
					"'nonce-WMPnf03nceIJfn22wc3e9h3wwfg3'",
				],
				'connect-src': [
					"'self'",
					'*.googletagmanager.com',
					'*.google-analytics.com',
					'*.iubenda.com',
				],
				'img-src': ["'self'", 'data:', '*.googletagmanager.com'],
				'frame-src': ["'self'", '*.iubenda.com'],
			},
		},
	}),
);
app.use(compression()); // gzip support

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/public'));
app.use('/wompo', express.static(__dirname + '/node_modules/wompo'));
app.use('/wompo-router', express.static(__dirname + '/node_modules/wompo-router/dist'));
app.use('/plugins', express.static(__dirname + '/plugins'));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'docs.html'));
});

/* const port = 3000;
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
}); */

export default app;
