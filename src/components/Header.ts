import { type WompoProps, defineWompo, html, type RenderHtml } from 'wompo';

interface HeaderProps extends WompoProps {
	menuIcon?: RenderHtml;
}

export default function Header({ styles: s, menuIcon }: HeaderProps) {
	return html`
		<header class=${s.header}>
			<div class=${s.logo}>
				${menuIcon && menuIcon}
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
				</a>
			</div>

			<ul>
				<li>
					<a href="/docs/introduction">Docs</a>
				</li>
				${
					/*<li>
					<a class=${s.link} href="https://opencollective.com/wompo" target="_blank">
						Donate
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							viewBox="0 0 16 16"
						>
							<path
								fill-opacity=".4"
								d="M12.995 8.195c0 .937-.312 1.912-.78 2.693l1.99 1.99c.976-1.327 1.6-2.966 1.6-4.683 0-1.795-.624-3.434-1.561-4.76l-2.068 2.028c.468.781.78 1.679.78 2.732z"
							/>
							<path
								d="M8 13.151a4.995 4.995 0 1 1 0-9.99c1.015 0 1.951.273 2.732.82l1.95-2.03a7.805 7.805 0 1 0 .04 12.449l-1.951-2.03a5.07 5.07 0 0 1-2.732.781z"
							/>
						</svg>
					</a>
				</li>*/ ''
				}
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
    gap: 20px;
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
	}
`;

defineWompo(Header, {
	name: 'wompo-header',
});
