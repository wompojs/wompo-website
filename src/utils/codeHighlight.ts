export type CodeLanguage = 'text' | 'js' | 'jsx' | 'ts' | 'tsx' | 'html' | 'xml' | 'css' | 'json' | 'sh';

export function dedentCode(code: string): string {
	const lines = code.replace(/\r\n/g, '\n').replace(/\t/g, '  ').split('\n');
	while (lines.length && !lines[0].trim()) lines.shift();
	while (lines.length && !lines[lines.length - 1].trim()) lines.pop();

	const indents = lines
		.filter((line) => line.trim())
		.map((line) => /^ */.exec(line)?.[0].length ?? 0);
	const minIndent = indents.length ? Math.min(...indents) : 0;
	return lines.map((line) => line.slice(Math.min(minIndent, /^ */.exec(line)?.[0].length ?? 0))).join('\n');
}

export function normalizeCodeLanguage(lang?: string): CodeLanguage {
	const value = (lang || 'text').trim().toLowerCase();
	if (value === 'javascript') return 'js';
	if (value === 'typescript') return 'ts';
	if (value === 'htm') return 'html';
	if (value === 'jsonc') return 'json';
	if (value === 'bash' || value === 'shell' || value === 'zsh') return 'sh';
	return (value || 'text') as CodeLanguage;
}

export function highlightCodeBlock(code: string, lang: string): string {
	const language = normalizeCodeLanguage(lang);
	const normalized = dedentCode(code);
	if (language === 'html' || language === 'xml') return highlightHtml(normalized);
	if (language === 'css') return highlightCss(normalized);
	if (language === 'json') return highlightJson(normalized);
	if (language === 'sh') return highlightShell(normalized);
	if (language === 'js' || language === 'jsx' || language === 'ts' || language === 'tsx') {
		return highlightScript(normalized);
	}
	return escapeHtml(normalized);
}

function highlightScript(code: string): string {
	const tokenRe =
		/\/\/[^\n]*|\/\*[\s\S]*?\*\/|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`|\b(?:async|await|break|case|catch|class|const|continue|default|else|export|extends|false|for|from|function|if|import|interface|let|new|null|return|switch|throw|true|try|type|typeof|undefined|var|while)\b|\b\d+(?:\.\d+)?\b/g;
	return highlightWithRegex(code, tokenRe, (token) => {
		if (token.startsWith('//') || token.startsWith('/*')) return 'hljs-comment';
		if (/^['"`]/.test(token)) return 'hljs-string';
		if (/^\d/.test(token)) return 'hljs-number';
		return 'hljs-keyword';
	});
}

function highlightCss(code: string): string {
	const tokenRe =
		/\/\*[\s\S]*?\*\/|#[0-9a-fA-F]{3,8}\b|\b\d+(?:\.\d+)?(?:px|rem|em|%|vh|vw|s|ms)?\b|[a-z-]+(?=\s*:)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g;
	return highlightWithRegex(code, tokenRe, (token) => {
		if (token.startsWith('/*')) return 'hljs-comment';
		if (/^['"]/.test(token)) return 'hljs-string';
		if (/^#|\d/.test(token)) return 'hljs-number';
		return 'hljs-attribute';
	});
}

function highlightJson(code: string): string {
	const tokenRe = /"(?:\\.|[^"\\])*"(?=\s*:)|"(?:\\.|[^"\\])*"|\b(?:true|false|null)\b|-?\b\d+(?:\.\d+)?\b/g;
	return highlightWithRegex(code, tokenRe, (token) => {
		if (/^"/.test(token)) return 'hljs-string';
		if (/^-?\d/.test(token)) return 'hljs-number';
		return 'hljs-keyword';
	});
}

function highlightShell(code: string): string {
	const tokenRe =
		/#.*$|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:bun|npm|pnpm|yarn|npx|cd|mkdir|touch|cp|mv|rm|export)\b|--?[A-Za-z][\w-]*|\b\d+(?:\.\d+)?\b/gm;
	return highlightWithRegex(code, tokenRe, (token) => {
		if (token.startsWith('#')) return 'hljs-comment';
		if (/^['"]/.test(token)) return 'hljs-string';
		if (/^-/.test(token)) return 'hljs-attribute';
		if (/^\d/.test(token)) return 'hljs-number';
		return 'hljs-keyword';
	});
}

function highlightHtml(code: string): string {
	const escaped = escapeHtml(code);
	return escaped.replace(
		/(&lt;\/?)([A-Za-z][\w-]*)([\s\S]*?)(&gt;)/g,
		(_all, open, tag, attrs, close) => {
			const highlightedAttrs = attrs.replace(
				/([\w:@-]+)(=)(&quot;.*?&quot;|'.*?')/g,
				'<span class="hljs-attr">$1</span>$2<span class="hljs-string">$3</span>',
			);
			return `<span class="hljs-tag">${open}<span class="hljs-name">${tag}</span>${highlightedAttrs}${close}</span>`;
		},
	);
}

function highlightWithRegex(
	code: string,
	tokenRe: RegExp,
	classForToken: (token: string) => string,
): string {
	let out = '';
	let lastIndex = 0;
	for (const match of code.matchAll(tokenRe)) {
		const index = match.index ?? 0;
		const token = match[0];
		out += escapeHtml(code.slice(lastIndex, index));
		out += `<span class="${classForToken(token)}">${escapeHtml(token)}</span>`;
		lastIndex = index + token.length;
	}
	out += escapeHtml(code.slice(lastIndex));
	return out;
}

export function escapeHtml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}
