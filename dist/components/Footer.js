import{defineWompo as t,html as i}from"wompo";export default function o({styles:e}){return i`<footer class=${e.footer}>
		<section class=${e.section}>
			<nav>
				<a href="/" title="Homepage">
					<svg
						width="40px"
						height="40px"
						viewBox="-10.5 -9.45 21 18.9"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle cx="0" cy="0" r="2" fill="currentColor"></circle>
						<g stroke="currentColor" stroke-width="1" fill="none">
							<ellipse rx="10" ry="4.5"></ellipse>
							<ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
							<ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
						</g>
					</svg>
					Wompo
				</a>
				<ul>
					<li class=${e.title}>Learn</li>
					<li><a href="/docs/introduction">Overview</a></li>
					<li><a href="/docs/installation">Installation</a></li>
					<li><a href="/docs/hooks">Hooks</a></li>
					<li><a href="/docs/apis">APIs</a></li>
				</ul>
				<ul>
					<li class=${e.title}>Guides</li>
					<li><a href="/docs/guides/quick-start">Quick Start</a></li>
					<li><a href="/docs/guides/complex-example">Complex example</a></li>
					<li><a href="/docs/guides/styling">Styling</a></li>
					<li><a href="/docs/guides/custom-hooks">Custom Hooks</a></li>
				</ul>
				<ul>
					<li class=${e.title}>Contribute</li>
					${""}
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
				</ul>
			</nav>
		</section>
	</footer>`}o.css=`
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
		.footer {
			margin-top: 5rem;
		}
		.footer nav {
			flex-direction: column;
			text-align: center;
			align-items: center;
			gap: 4rem;
		}
		.footer nav li {
			text-align: center;
		}
		.footer nav li a {
			justify-content: center;
		}
	}
`,t(o,{name:"wompo-footer"});
