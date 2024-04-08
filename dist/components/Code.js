import{Fragment as m,jsx as r,jsxs as b}from"wompo/jsx-runtime";import{defineWompo as f,useEffect as h,useRef as u}from"wompo";export default function s({code:t,language:i,styles:a,elaborate:c=!0,margin:l="4rem"}){const o=u();return h(()=>{if(c){let e=t.replace(/\t/g,"  ");const n=/^\n(\s+)/.exec(e);if(n){const d=n[1],g=new RegExp(`^${d}`,"gm");e=e.replace(g,"").replace(/^\n/,"").replace(/\n\s+$/g,"")}const p=window.hljs.highlight(e,{language:i});o.current.innerHTML=p.value}else o.current.innerHTML=t},[]),b(m,{children:[r("link",{rel:"stylesheet",href:"https://unpkg.com/highlightjs@9.16.2/styles/xcode.css"}),r("pre",{class:a.pre,style:{margin:`${l} 0`},children:r("code",{ref:o})})]})}s.css=`
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
`,f(s,{name:"wompo-code",shadow:!0});
