#!/usr/bin/env node

import * as esbuild from 'esbuild';
import fs from 'fs';

// Recursive function to get files
function getFiles(dir, files = []) {
	const fileList = fs.readdirSync(dir);
	for (const file of fileList) {
		const name = `${dir}/${file}`;
		if (fs.statSync(name).isDirectory()) {
			getFiles(name, files);
		} else {
			if (name.match(/\.[t|j]sx?$/)) files.push(name);
		}
	}
	return files;
}

const files = getFiles('./src');

let ctx = await esbuild.context({
	entryPoints: files,
	bundle: false,
	outdir: 'dist',
	allowOverwrite: true,
	plugins: [
		{
			name: 'add-js',
			setup(build) {
				build.onResolve({ filter: /.*/ }, (args) => {
					if (args.importer) return { path: args.path + '.js', external: true };
				});
			},
		},
	],
});

await ctx.watch();

let { host, port } = await ctx.serve({
	servedir: '.',
	fallback: './index.html',
	port: 3000,
});

console.log('started at ' + port);
