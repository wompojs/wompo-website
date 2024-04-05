import{Fragment as m,jsx as o,jsxs as u}from"wompo/jsx-runtime";import{defineWompo as g,useEffect as h,useRef as f}from"wompo";export default function s({code:n,language:c,styles:i,margin:a="4rem"}){const r=f();return h(()=>{let e=n.replace(/\t/g,"  ");const t=/^\n(\s+)/.exec(e);if(t){const p=t[1],l=new RegExp(`^${p}`,"gm");e=e.replace(l,"").replace(/^\n/,"").replace(/\n\s+$/g,"")}const d=window.hljs.highlight(e,{language:c});r.current.innerHTML=d.value},[]),u(m,{children:[o("link",{rel:"stylesheet",href:"https://unpkg.com/highlightjs@9.16.2/styles/xcode.css"}),o("pre",{class:i.pre,style:{margin:`${a} 0`},children:o("code",{ref:r})})]})}s.css=`
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
`,g(s,{name:"wompo-code",shadow:!0});
