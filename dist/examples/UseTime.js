import{useRef as o,useEffect as r,html as s,defineWompo as c}from"wompo";function i(){const e=o(0);return r(()=>{const t=setInterval(()=>{e.current+=1},1e3);return()=>{clearInterval(t)}},[]),e}export default function n(){const e=i();return s`
		<button @click=${()=>{alert(`I was rendered ${e.current} seconds ago`)}}>
			If you click me I'll show you how many seconds ago I was rendered!
		</button>
	`}c(n,{name:"use-time-hook-example"});
