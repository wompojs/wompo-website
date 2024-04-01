import{html as p,defineWomp as m}from"womp";export default function o({children:e}){return p`
		<div style="font-size: 20px; color: blue;">${e}<br />I was lazy loaded!</div>
	`}m(o,{name:"lazy-component-example"});
