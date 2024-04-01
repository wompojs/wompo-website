import{jsx as n,jsxs as p}from"womp/jsx-runtime";import{defineWomp as r}from"womp";import{NavLink as a}from"womp-router";import s from"./SubMenu.js";export default function i({styles:t,menu:o,title:l}){return n("aside",{class:t.menu,children:p("nav",{children:[l,n("ul",{class:t.ul,children:o.map(e=>n("li",{children:e.menu?n(s,{item:e,prefix:e.link}):n(a,{class:"link",to:e.link,children:e.title})}))})]})})}i.css=`
	:host {
		padding-top: 70px;
		margin-top: -70px;
		display: block;
		position: sticky;
		top: 0;
		left: 0;
		height: 100vh;
		width: 20%;
		max-width: 30rem;
		overflow: auto;
	}
	.menu h3 {
		text-transform: uppercase;
		font-size: 2rem;
		font-weight: bold;
		color: #555;
	}
	.ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
  }
	.ul [class*="link"] {
		width: 100%;
	}
  .ul a {
    text-decoration: none;
    color: #573ef6;
    padding: 10px 20px;
    display: flex;
    transition: all .1s;
    border-radius: 30px;
  }
  .ul a:hover, .ul a[class="active"] {
    background-color: #573ef630;
  }
`,r(i,{name:"side-menu"});
