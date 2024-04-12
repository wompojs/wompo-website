import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(
	helmet({
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
				'img-src': ["'self'", '*.googletagmanager.com'],
				'frame-src': ["'self'", '*.iubenda.com'],
			},
		},
	})
);
app.use(compression()); // gzip support

// const port = 8000;

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

/* app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
}); */

export default app;
