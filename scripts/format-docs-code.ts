import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const DOCS_ROOT = path.join(process.cwd(), 'content/docs');
const FORMAT_OPTIONS: ts.FormatCodeSettings = {
	indentSize: 2,
	tabSize: 2,
	convertTabsToSpaces: true,
	newLineCharacter: '\n',
	insertSpaceAfterCommaDelimiter: true,
	insertSpaceAfterSemicolonInForStatements: true,
	insertSpaceBeforeAndAfterBinaryOperators: true,
	insertSpaceAfterKeywordsInControlFlowStatements: true,
	insertSpaceAfterFunctionKeywordForAnonymousFunctions: false,
	insertSpaceBeforeFunctionParenthesis: false,
	placeOpenBraceOnNewLineForFunctions: false,
	placeOpenBraceOnNewLineForControlBlocks: false,
};

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

function normalizeLanguage(lang: string): string {
	const value = lang.trim().toLowerCase();
	if (value === 'javascript') return 'js';
	if (value === 'typescript') return 'ts';
	if (value === 'bash' || value === 'shell' || value === 'zsh') return 'sh';
	if (value === 'htm') return 'html';
	return value;
}

function trimCode(code: string): string {
	const lines = code.replace(/\r\n/g, '\n').replace(/\t/g, '  ').split('\n');
	while (lines.length && !lines[0].trim()) lines.shift();
	while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
	return lines.map((line) => line.trimEnd()).join('\n');
}

function formatScript(code: string, lang: string): string {
	const file = `snippet.${lang === 'ts' ? 'ts' : 'js'}`;
	const host: ts.LanguageServiceHost = {
		getScriptFileNames: () => [file],
		getScriptVersion: () => '0',
		getScriptSnapshot: (name) => (name === file ? ts.ScriptSnapshot.fromString(code) : undefined),
		getCurrentDirectory: () => process.cwd(),
		getCompilationSettings: () => ({
			allowJs: true,
			checkJs: false,
			target: ts.ScriptTarget.ESNext,
		}),
		getDefaultLibFileName: (options) => ts.getDefaultLibFilePath(options),
		fileExists: ts.sys.fileExists,
		readFile: ts.sys.readFile,
		readDirectory: ts.sys.readDirectory,
	};
	const service = ts.createLanguageService(host);
	const edits = service.getFormattingEditsForRange(file, 0, code.length, FORMAT_OPTIONS);
	let formatted = code;

	for (const edit of edits.sort((a, b) => b.span.start - a.span.start)) {
		formatted =
			formatted.slice(0, edit.span.start) +
			edit.newText +
			formatted.slice(edit.span.start + edit.span.length);
	}

	service.dispose();
	return formatted;
}

function formatCodeBlock(rawLang: string, rawCode: string): string {
	const lang = normalizeLanguage(rawLang);
	let code = trimCode(rawCode);

	if (lang === 'js' || lang === 'ts') {
		code = formatScript(code, lang);
	}

	return `\`\`\`${lang}\n${trimCode(code)}\n\`\`\``;
}

function formatFile(file: string): boolean {
	const original = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
	const formatted = original.replace(
		/^```([A-Za-z0-9_-]+)[ \t]*\n([\s\S]*?)^```[ \t]*$/gm,
		(_match, lang: string, code: string) => formatCodeBlock(lang, code),
	);

	if (formatted === original) return false;
	fs.writeFileSync(file, formatted);
	return true;
}

let changed = 0;
for (const file of walk(DOCS_ROOT)) {
	if (formatFile(file)) changed++;
}

console.log(`Formatted code blocks in ${changed} Markdown files.`);
