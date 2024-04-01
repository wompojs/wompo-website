import express from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(compression()); // gzip support

const port = 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static('dist'));
app.use(express.static('public'));
app.use('/womp', express.static('node_modules/womp'));
app.use('/womp-router', express.static('node_modules/womp-router/dist'));
app.use('/plugins', express.static('plugins'));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
