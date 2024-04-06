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
					/* '*.iubenda.com',
					'*.googletagmanager.com', */
					"'nonce-WMPnf03nceIJfn22wc3e9h3wwfg3'",
				],
				// 'connect-src': ['*.google-analytics.com', '*.iubenda.com'],
			},
		},
	})
);
app.use(compression()); // gzip support

const port = 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static('dist'));
app.use(express.static('public'));
app.use('/wompo', express.static('node_modules/wompo'));
app.use('/wompo-router', express.static('node_modules/wompo-router/dist'));
app.use('/plugins', express.static('plugins'));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'docs.html'));
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
