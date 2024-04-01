import{jsx as e}from"womp/jsx-runtime";import{defineWomp as t}from"womp";const d=[{title:"Home",link:"/"},{title:"Docs",link:"/docs"}];export default function o({styles:a}){return e("header",{class:a.header,children:e("ul",{children:d.map(l=>e("li",{children:e("a",{href:l.link,children:l.title})}))})})}o.css=`
	:host {
		display: block;
		position: sticky;
		top: 0;
		left: 0;
		width: 100vw;
		background-color: #fff;
		z-index: 100;
		box-shadow: 1px 1px 4px #00000040;
	}
  .header {
    padding: 20px;
  }
  .header ul {
    display: flex;
    gap: 20px;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .header ul li a {
    color: #333;
    text-decoration: none;
  }
`,t(o,{name:"womp-header"});
