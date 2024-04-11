import{defineWompo as e,html as i}from"wompo";import l from"./Logo.js";export default function t({styles:o}){return i`<footer class=${o.footer}>
		<section class=${o.section}>
			<nav>
				<div style="display: flex; flex-direction:column;">
					<a href="/" title="Homepage">
						<${l} />
						Wompo
					</a>
					<p style="font-size: 10px;">©2024</p>
				</div>
				<ul>
					<li class=${o.title}>Learn</li>
					<li><a href="/docs/introduction">Introduction</a></li>
					<li><a href="/docs/installation">Installation</a></li>
					<li><a href="/docs/hooks">Hooks</a></li>
					<li><a href="/docs/apis">APIs</a></li>
				</ul>
				<ul>
					<li class=${o.title}>Guides</li>
					<li><a href="/docs/guides/quick-start">Quick Start</a></li>
					<li><a href="/docs/guides/complex-example">Complex example</a></li>
					<li><a href="/docs/guides/styling">Styling</a></li>
					<li><a href="/docs/guides/custom-hooks">Custom Hooks</a></li>
				</ul>
				${""}
				<ul>
					<li class=${o.title}>Contribute</li>
					<li>
						<a href="https://github.com/wompojs/wompo" target="_blank">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								viewBox="0 0 16 16"
							>
								<path
									d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
								/>
							</svg>
							Github
						</a>
					</li>
					<li>
						<a href="https://ko-fi.com/wompo" target="_blank">
							<img
								height="27"
								width="27"
								style="border:0px;height:27px;width:27px"
								src="/kofi.png"
								border="0"
								alt="Support Wompo"
							/>
							Donate
						</a>
					</li>
				</ul>
			</nav>
		</section>
	</footer>`}t.css=`
  .footer {
    background-color: #573ef6;
    color: #dfdfdf;
    width: 100%;
    padding: 10rem 4rem;
		box-sizing: border-box;
  }
  .footer nav {
    display: flex;
    justify-content: space-between;
    align-items: start;
  }
  .footer ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .footer ul .title {
    font-size: 2.5rem;
    color: #fff;
		text-align: left;
  }
  .footer a {
    text-decoration: none;
    color: currentColor;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .footer li a svg {
    width: 20px;
    height: 20px;
  }
  .footer ul a:hover {
    text-decoration: underline;
  }
  .footer .section {
    margin: 0 auto;
    max-width: 1080px;
    font-size: 1.8rem;
    position: relative;
    display: block;
  }

	@media (width < 650px){
		.footer ul .title {
			text-align: center;
		}
		.footer nav {
			flex-direction: column;
			text-align: center;
			align-items: center;
			gap: 4rem;
		}
		.footer nav li {
			text-align: center;
			margin: 3px 0;
		}
		.footer nav li a {
			justify-content: center;
		}
	}
`,e(t,{name:"wompo-footer"});
