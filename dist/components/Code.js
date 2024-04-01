import { Fragment as f, jsx as o, jsxs as m } from 'wompo/jsx-runtime';
import { defineWompo as l, useEffect as g, useRef as h } from 'wompo';
export default function s({ code: c, language: n, styles: i }) {
	const r = h();
	return (
		g(() => {
			let e = c.replace(/\t/g, '  ');
			const t = /^\n(\s+)/.exec(e);
			if (t) {
				const a = t[1],
					d = new RegExp(`^${a}`, 'gm');
				e = e
					.replace(d, '')
					.replace(/^\n/, '')
					.replace(/\n\s+$/g, '');
			}
			const p = window.hljs.highlight(e, { language: n });
			r.current.innerHTML = p.value;
		}, []),
		m(f, {
			children: [
				o('link', {
					rel: 'stylesheet',
					href: 'https://unpkg.com/highlightjs@9.16.2/styles/xcode.css',
				}),
				o('pre', { class: i.pre, children: o('code', { ref: r }) }),
			],
		})
	);
}
(s.css = `
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
`),
	l(s, { name: 'wompo-code', shadow: !0 });
