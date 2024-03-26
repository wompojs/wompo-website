import { Fragment, jsx, jsxs } from "womp/jsx-runtime";
import { defineWomp, useEffect, useRef } from "womp";
export default function Code({ code, lang, styles: s }) {
  const codeRef = useRef();
  useEffect(() => {
    let formatted = code.replace(/\t/g, "  ");
    const firstLineSpaces = /^\n(\s+)/.exec(formatted);
    const spaces = firstLineSpaces[1];
    const removeStart = new RegExp(`^${spaces}`, "gm");
    formatted = formatted.replace(removeStart, "").replace(/^\n/, "").replace(/\n\s+$/g, "");
    const highlighted = window.hljs.highlight(formatted, { language: lang });
    codeRef.current.innerHTML = highlighted.value;
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("link", { rel: "stylesheet", href: "https://unpkg.com/highlightjs@9.16.2/styles/xcode.css" }),
    /* @__PURE__ */ jsx("pre", { class: s.pre, children: /* @__PURE__ */ jsx("code", { ref: codeRef }) })
  ] });
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
    background-color: #f6f6f6;
    border-radius: 10px;
  }
`;
defineWomp(Code, {
  shadow: true
});
