import { type WompoProps, defineWompo, html, unsafelyRenderString, useRef, useState } from 'wompo';
import { dedentCode, escapeHtml, highlightCodeBlock } from '../utils/codeHighlight.js';

interface CodeProps extends WompoProps {
	code: string;
	language: 'js' | 'jsx' | 'html' | 'ts' | 'css' | 'sh';
	margin?: string;
	elaborate?: boolean;
}

const COPY_ICON_SVG = `<svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M5 1.75A1.75 1.75 0 0 1 6.75 0h6.5C14.216 0 15 .784 15 1.75v9.5A1.75 1.75 0 0 1 13.25 13H12.5V14.25A1.75 1.75 0 0 1 10.75 16h-6.5A1.75 1.75 0 0 1 2.5 14.25v-9.5C2.5 3.784 3.284 3 4.25 3H5zm1.5 0V3h4.25c.966 0 1.75.784 1.75 1.75V11.5h.75a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25h-6.5a.25.25 0 0 0-.25.25M4.25 4.5a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25z"/></svg>`;
const CHECK_ICON_SVG = `<svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 1 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0"/></svg>`;

export default function Code({
	code,
	language,
	styles: s,
	elaborate = true,
	margin = '4rem',
}: CodeProps) {
	const codeHtml = elaborate ? highlightCodeBlock(code, language) : escapeHtml(code);
	const rawCode = dedentCode(code);
	const [copied, setCopied] = useState(false);
	const timerRef = useRef<number>();

	const handleCopy = async () => {
		try {
			if (navigator.clipboard?.writeText) {
				await navigator.clipboard.writeText(rawCode);
			} else {
				const area = document.createElement('textarea');
				area.value = rawCode;
				area.style.position = 'fixed';
				area.style.opacity = '0';
				document.body.appendChild(area);
				area.select();
				document.execCommand('copy');
				document.body.removeChild(area);
			}
			setCopied(true);
			window.clearTimeout(timerRef.current);
			timerRef.current = window.setTimeout(() => setCopied(false), 1600);
		} catch {}
	};

	return html`
		<figure class=${s.figure} style=${{ margin: `${margin} 0` }}>
			<button
				type="button"
				class=${`${s.copyBtn} ${copied ? s.copied : ''}`}
				aria-label="Copy code"
				@click=${handleCopy}
			>
				${unsafelyRenderString(copied ? CHECK_ICON_SVG : COPY_ICON_SVG)}
				<span>${copied ? 'Copied' : 'Copy'}</span>
			</button>
			<pre class=${s.pre}>
				<code class="hljs language-${language}" data-highlighted="server">${unsafelyRenderString(codeHtml)}</code>
			</pre>
		</figure>
	`;
}

Code.css = `
  :host {
    display: block;
    width: 100%;
		border-radius: 8px;
  }
	.figure {
		position: relative;
		width: 100%;
		padding: 0;
	}
	.copyBtn {
		position: absolute;
		top: 1rem;
		right: 1rem;
		z-index: 2;
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.45rem 0.75rem;
		border: 1px solid #ffffff1c;
		background: #ffffff10;
		color: #d3cdf0;
		font-size: 1.15rem;
		font-weight: 600;
		font-family: inherit;
		border-radius: 6px;
		cursor: pointer;
		opacity: 0;
		transition: opacity .18s, background-color .18s, color .18s, border-color .18s;
	}
	.copyBtn:hover {
		background: #ffffff22;
		color: #fff;
		border-color: #ffffff2c;
	}
	.figure:hover .copyBtn,
	.copyBtn:focus-visible {
		opacity: 1;
	}
	.copyBtn.copied {
		background: var(--site-primary);
		border-color: var(--site-primary);
		color: #fff;
		opacity: 1;
	}
	.copyBtn svg {
		display: block;
		flex: 0 0 auto;
	}
  .pre {
    width: 100%;
		margin: 0;
  }
  .pre > code {
		overflow: auto;
    display: block;
    position: relative;
    padding: 1.8rem;
    width: 100%;
    box-sizing: border-box;
    background-color: var(--site-code-bg);
		color: var(--site-code-text);
    border-radius: 8px;
		border: 1px solid var(--site-code-border);
		box-shadow: inset 0 1px 0 #ffffff12;
		font-size: 1.42rem;
		line-height: 1.65;
  }
	.hljs-comment,
	.hljs-quote,
	.xml .hljs-meta {
		color: #8b84a6;
	}
	.hljs-tag,
	.hljs-attribute,
	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-literal,
	.hljs-name {
		color: #c4b5fd;
	}
	.hljs-variable,
	.hljs-template-variable {
		color: #93c5fd;
	}
	.hljs-code,
	.hljs-string,
	.hljs-meta-string {
		color: #86efac;
	}
	.hljs-regexp,
	.hljs-link {
		color: #67e8f9;
	}
	.hljs-title,
	.hljs-symbol,
	.hljs-bullet,
	.hljs-number {
		color: #fbbf24;
	}
	.hljs-section,
	.hljs-meta {
		color: #f0abfc;
	}
	.hljs-class .hljs-title,
	.hljs-type,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-params {
		color: #f9a8d4;
	}
	.hljs-attr {
		color: #fde68a;
	}
	.hljs-subst {
		color: #f7f5ff;
	}
	.hljs-formula {
		background-color: #2a2440;
		font-style: italic;
	}
	.hljs-addition {
		background-color: #064e3b;
	}
	.hljs-deletion {
		background-color: #7f1d1d;
	}
	.hljs-selector-id,
	.hljs-selector-class {
		color: #fdba74;
	}
	.hljs-doctag,
	.hljs-strong {
		font-weight: bold;
	}
	.hljs-emphasis {
		font-style: italic;
	}
`;

defineWompo(Code, {
	name: 'wompo-code',
	shadow: true,
});
