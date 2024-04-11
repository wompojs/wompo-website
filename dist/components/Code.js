import{Fragment as m,jsx as r,jsxs as b}from"wompo/jsx-runtime";import{defineWompo as g,useEffect as h,useRef as u}from"wompo";export default function s({code:t,language:a,styles:i,elaborate:c=!0,margin:l="4rem"}){const o=u();return h(()=>{if(c){let e=t.replace(/\t/g,"  ");const n=/^\n(\s+)/.exec(e);if(n){const p=n[1],f=new RegExp(`^${p}`,"gm");e=e.replace(f,"").replace(/^\n/,"").replace(/\n\s+$/g,"")}const d=window.hljs.highlight(e,{language:a});o.current.innerHTML=d.value}else o.current.innerHTML=t},[]),b(m,{children:[r("link",{rel:"stylesheet",href:"/xcodeStyles.css"}),r("pre",{class:i.pre,style:{margin:`${l} 0`},children:r("code",{ref:o})})]})}s.css=`
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
