import { WompProps, defineWomp, useEffect, useRef } from 'womp';

interface CodeProps extends WompProps {
	code: string;
	lang: 'jsx' | 'html';
}

export default function Code({ code, lang, styles: s }: CodeProps) {
	const codeRef = useRef<HTMLElement>();
	useEffect(() => {
		const firstLineSpaces = /^\n(\s+)/.exec(code);
		const removeStart = new RegExp(`${firstLineSpaces[1]}`, 'g');
		const formatted = code
			.replace(removeStart, '')
			.replace(/^\n/, '')
			.replace(/\n\s+$/, '');
		const highlighted = (window as any).hljs.highlight(formatted, { language: lang });
		console.log(highlighted);
		codeRef.current.innerHTML = highlighted.value;
	}, []);
	return (
		<>
			<link rel="stylesheet" href="https://unpkg.com/highlightjs@9.16.2/styles/xcode.css" />
			<pre class={s.pre}>
				<code ref={codeRef}>{code}</code>
			</pre>
		</>
	);
}

Code.css = `
  :host {
    display: block;
    width: 100%;
  }
  .pre {
    width: 100%;
    margin: 4rem 0;
    overflow: auto;
  }
  .pre > code {
    display: block;
    position: relative;
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
    background-color: #fafafa;
    border-radius: 10px;
  }
`;

defineWomp(Code, {
	shadow: true,
});
