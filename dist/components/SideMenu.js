import{defineWompo as r,html as e}from"wompo";import{NavLink as l}from"wompo-router";import a from"./SubMenu.js";export default function i({styles:t,menu:n,title:s}){return e`
		<aside class=${t.menu}>
			<nav>
				${s}
				<ul class=${t.ul}>
					${n.map(o=>e`
							<li>
								${o.subRoutes?e`<${a} item=${o} prefix=${o.link} /> `:e`<${l} class="link" to=${o.link}>${o.title}</${l}>`}
							</li>
						`)}
				</ul>
			</nav>
		</aside>
	`}i.css=`
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
