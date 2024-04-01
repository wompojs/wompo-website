import { WompProps, defineWomp, useEffect, useRef } from 'womp';

interface CodeProps extends WompProps {
	code: string;
	language: 'js' | 'jsx' | 'html' | 'ts' | 'css';
}

export default function Code({ code, language, styles: s }: CodeProps) {
	const codeRef = useRef<HTMLElement>();
	useEffect(() => {
		let formatted = code.replace(/\t/g, '  ');
		const firstLineSpaces = /^\n(\s+)/.exec(formatted);
		if (firstLineSpaces) {
			const spaces = firstLineSpaces[1];
			const removeStart = new RegExp(`^${spaces}`, 'gm');
			formatted = formatted
				.replace(removeStart, '')
				.replace(/^\n/, '')
				.replace(/\n\s+$/g, '');
		}
		const highlighted = (window as any).hljs.highlight(formatted, { language: language });
		codeRef.current.innerHTML = highlighted.value;
	}, []);
	return (
		<>
			<link rel='stylesheet' href='https://unpkg.com/highlightjs@9.16.2/styles/xcode.css' />
			<pre class={s.pre}>
				<code ref={codeRef}></code>
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
  }
  .pre > code {
		overflow: auto;
    display: block;
    position: relative;
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
    background-color: #f6f6f6;
    border-radius: 10px;
  }
`;

defineWomp(Code, {
	name: 'womp-code',
	shadow: true,
});
