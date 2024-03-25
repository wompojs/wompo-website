import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "womp/jsx-runtime";
import { defineWomp, useEffect, useRef } from 'womp';
export default function Code({ code, lang, styles: s }) {
    const codeRef = useRef();
    useEffect(() => {
        const firstLineSpaces = /^\n(\s+)/.exec(code);
        console.log(firstLineSpaces);
        const spaces = firstLineSpaces[1];
        let regex = ``;
        for (let i = 0; i < spaces.length; i++) {
            regex += '[\\s|\\t]';
        }
        const removeStart = new RegExp(regex, 'g');
        const formatted = code
            .replace(removeStart, '\n')
            .replace(/^\n/, '')
            .replace(/\n\s+$/g, '');
        const highlighted = window.hljs.highlight(formatted, { language: lang });
        codeRef.current.innerHTML = highlighted.value;
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx("link", { rel: "stylesheet", href: "https://unpkg.com/highlightjs@9.16.2/styles/xcode.css" }), _jsx("pre", { class: s.pre, children: _jsx("code", { ref: codeRef, children: code }) })] }));
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
