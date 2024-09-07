import { defineWompo, html } from 'wompo';
import Logo from './Logo.js';
export default function Header({ styles: s, menuIcon }) {
    return html `
		<header class=${s.header}>
			<div class=${s.logo}>
				${menuIcon && menuIcon}
				<a href="/" title="Homepage">
					<${Logo} />
				</a>
			</div>

			<ul>
				<li>
					<a href="/docs/introduction">Docs</a>
				</li>
				<li>
					<a class=${s.link} href="https://ko-fi.com/wompo" target="_blank">
						Donate
						<img
							height="27"
							width="27"
							style="border:0px;height:27px;"
							src="/kofi.png"
							border="0"
							alt="Support Wompo"
						/>
					</a>
				</li>
				<li>
					<a class="${s.link}" href="https://github.com/wompojs/wompo" target="_blank">
						Github
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
					</a>
				</li>
			</ul>
		</header>
	`;
}
Header.css = `
	:host {
		display: block;
		position: sticky;
		top: 0;
		left: 0;
		width: 100vw;
		background-color: #fff;
		z-index: 100;
		box-shadow: 1px 1px 4px #00000040;
		transition-property: color, background-color, top;
		transition-duration: .5s;
		transition-timing-function: ease-in-out;
		color: #333;
	}
  .header {
    padding: 10px 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
  }
  .header ul, .logo {
    display: flex;
		gap: 5px;
    list-style: none;
		align-items: center;
    padding: 0;
    margin: 0;
  }
	.header ul li a {
    padding: 10px;
		border-radius: 10px;
  }
	.header ul li a:hover {
		background-color: #0003;
	}
	.header ul svg {
		width: 2rem;
		height: 2rem;
	}
  .header a {
    color: currentColor;
    text-decoration: none;
  }
	.link {
		display: flex;
		align-items: center;
		gap: 10px;
		cursor: pointer;
	}
	@media (width < 700px){
		.link svg, .link img {
			display: none;
		}
	}
`;
defineWompo(Header, {
    name: 'wompo-header',
});
