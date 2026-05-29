import fs from 'node:fs';
import path from 'node:path';

const DOCS_ROOT = path.join(process.cwd(), 'content/docs');
const VALID_LANGUAGES = new Set(['js', 'ts', 'html', 'css', 'sh']);

interface Issue {
	file: string;
	line: number;
	message: string;
}

function walk(dir: string): string[] {
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	const files: string[] = [];

	for (const entry of entries) {
		const absolute = path.join(dir, entry.name);
		if (entry.isDirectory()) files.push(...walk(absolute));
		else if (entry.isFile() && entry.name.endsWith('.md')) files.push(absolute);
	}

	return files.sort();
}

function relative(file: string): string {
	return path.relative(process.cwd(), file).replaceAll(path.sep, '/');
}

function checkFile(file: string): Issue[] {
	const issues: Issue[] = [];
	const lines = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n').split('\n');
	let inCode = false;
	let startLine = 0;
	let lang = '';

	for (let index = 0; index < lines.length; index++) {
		const lineNo = index + 1;
		const line = lines[index];
		const fence = line.match(/^(```)(.*)$/);

		if (fence) {
			const markerRest = fence[2].trim();

			if (!inCode) {
				if (!markerRest) {
					issues.push({ file, line: lineNo, message: 'Code fence must declare a language.' });
				} else if (!VALID_LANGUAGES.has(markerRest)) {
					issues.push({ file, line: lineNo, message: `Unsupported code fence language "${markerRest}".` });
				}

				inCode = true;
				startLine = lineNo;
				lang = markerRest;
				continue;
			}

			if (markerRest) {
				issues.push({ file, line: lineNo, message: 'Closing code fence must be alone on its line.' });
			}

			inCode = false;
			startLine = 0;
			lang = '';
			continue;
		}

		if (!inCode) continue;

		if (line.includes('\t')) {
			issues.push({ file, line: lineNo, message: 'Code block contains a tab; use spaces.' });
		}

		if (line.trimEnd() !== line) {
			issues.push({ file, line: lineNo, message: 'Code block contains trailing whitespace.' });
		}

		const indentation = line.match(/^ */)?.[0].length ?? 0;
		if (line.trim() && indentation >= 14) {
			issues.push({
				file,
				line: lineNo,
				message: `Suspicious indentation (${indentation} spaces) in ${lang || 'unknown'} code block.`,
			});
		}
	}

	if (inCode) {
		issues.push({ file, line: startLine, message: 'Code fence is not closed.' });
	}

	return issues;
}

const issues = walk(DOCS_ROOT).flatMap(checkFile);

if (issues.length) {
	for (const issue of issues) {
		console.error(`${relative(issue.file)}:${issue.line}: ${issue.message}`);
	}
	process.exit(1);
}

console.log('Documentation code blocks look valid.');
