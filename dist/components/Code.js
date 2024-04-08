import { Fragment, jsx, jsxs } from "wompo/jsx-runtime";
import { defineWompo, useEffect, useRef } from "wompo";
export default function Code({
  code,
  language,
  styles: s,
  elaborate = true,
  margin = "4rem"
}) {
  const codeRef = useRef();
  useEffect(() => {
    if (elaborate) {
      let formatted = code.replace(/\t/g, "  ");
      const firstLineSpaces = /^\n(\s+)/.exec(formatted);
      if (firstLineSpaces) {
        const spaces = firstLineSpaces[1];
        const removeStart = new RegExp(`^${spaces}`, "gm");
        formatted = formatted.replace(removeStart, "").replace(/^\n/, "").replace(/\n\s+$/g, "");
      }
      const highlighted = window.hljs.highlight(formatted, { language });
      codeRef.current.innerHTML = highlighted.value;
    } else {
      codeRef.current.innerHTML = code;
    }
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("link", { rel: "stylesheet", href: "https://unpkg.com/highlightjs@9.16.2/styles/xcode.css" }),
    /* @__PURE__ */ jsx("pre", { class: s.pre, style: { margin: `${margin} 0` }, children: /* @__PURE__ */ jsx("code", { ref: codeRef }) })
  ] });
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
  name: "wompo-code",
  shadow: true
});
