import { WompoProps, defineWompo, useEffect, useRef } from 'wompo';

interface CodeProps extends WompoProps {
	code: string;
	language: 'js' | 'jsx' | 'html' | 'ts' | 'css';
	margin?: string;
}

export default function Code({ code, language, styles: s, margin = '4rem' }: CodeProps) {
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
			<pre class={s.pre} style={{ margin: `${margin} 0` }}>
				<code ref={codeRef}></code>
			</pre>
		</>
	);
}

Code.css = `
  :host {
    display: block;
    width: 100%;
		border-radius: 10px;
  }
  .pre {
    width: 100%;
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

defineWompo(Code, {
	name: 'wompo-code',
	shadow: true,
});
