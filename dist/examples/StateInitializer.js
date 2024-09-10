import{useState as n,defineWompo as a,html as i}from"wompo";function r(){const e=[];for(let t=1;t<=10;t++)e.push({title:`Todo N.${t}`,id:t});return e}export default function o(){const[e,t]=n(r);return i`<ul>
		${e.map(l=>i`<li>${l.title}</li>`)}
	</ul>`}a(o,{name:"state-initializer-example"});
