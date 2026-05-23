var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
import { defineWompo, html } from "wompo";
import Logo from "./Logo.js";
export default function Footer({ styles: s }) {
  return html(_a || (_a = __template(["<footer class=", ">\n		<section class=", '>\n			<nav>\n				<div style="display: flex; flex-direction:column;">\n					<a href="/" title="Homepage">\n						<', ' />\n						Wompo\n					</a>\n					<p style="font-size: 10px;">\xA92024</p>\n				</div>\n				<ul>\n					<li class=', '>Learn</li>\n					<li><a href="/docs/introduction">Introduction</a></li>\n					<li><a href="/docs/installation">Installation</a></li>\n					<li><a href="/docs/hooks">Hooks</a></li>\n					<li><a href="/docs/apis">APIs</a></li>\n				</ul>\n				<ul>\n					<li class=', '>Guides</li>\n					<li><a href="/docs/guides/quick-start">Quick Start</a></li>\n					<li><a href="/docs/guides/complex-example">Complex example</a></li>\n					<li><a href="/docs/guides/styling">Styling</a></li>\n					<li><a href="/docs/guides/custom-hooks">Custom Hooks</a></li>\n				</ul>\n\n				<ul>\n					<li class=', `>Privacy</li>
					<li>
						<a
							href="https://www.iubenda.com/privacy-policy/24984791"
							class="iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe "
							title="Privacy Policy "
							>Privacy Policy</a
						>
						<script type="text/javascript" nonce="WMPnf03nceIJfn22wc3e9h3wwfg3">
							(function (w, d) {
								var loader = function () {
									var s = d.createElement('script'),
										tag = d.getElementsByTagName('script')[0];
									s.src = 'https://cdn.iubenda.com/iubenda.js';
									tag.parentNode.insertBefore(s, tag);
								};
								if (w.addEventListener) {
									w.addEventListener('load', loader, false);
								} else if (w.attachEvent) {
									w.attachEvent('onload', loader);
								} else {
									w.onload = loader;
								}
							})(window, document);
						<\/script>
					</li>
					<li>
						<a
							href="https://www.iubenda.com/privacy-policy/24984791/cookie-policy"
							class="iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe "
							title="Cookie Policy"
							>Cookie Policy</a
						>
						<script type="text/javascript" nonce="WMPnf03nceIJfn22wc3e9h3wwfg3">
							(function (w, d) {
								var loader = function () {
									var s = d.createElement('script'),
										tag = d.getElementsByTagName('script')[0];
									s.src = 'https://cdn.iubenda.com/iubenda.js';
									tag.parentNode.insertBefore(s, tag);
								};
								if (w.addEventListener) {
									w.addEventListener('load', loader, false);
								} else if (w.attachEvent) {
									w.attachEvent('onload', loader);
								} else {
									w.onload = loader;
								}
							})(window, document);
						<\/script>
					</li>
				</ul>

				<ul>
					<li class=`, '>Contribute</li>\n					<li>\n						<a href="https://github.com/wompojs/wompo" target="_blank">\n							<svg\n								xmlns="http://www.w3.org/2000/svg"\n								width="16"\n								height="16"\n								fill="currentColor"\n								viewBox="0 0 16 16"\n							>\n								<path\n									d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"\n								/>\n							</svg>\n							Github\n						</a>\n					</li>\n					<li>\n						<a href="https://ko-fi.com/wompo" target="_blank">\n							<img\n								height="27"\n								width="27"\n								style="border:0px;height:27px;width:27px"\n								src="/kofi.png"\n								border="0"\n								alt="Support Wompo"\n							/>\n							Donate\n						</a>\n					</li>\n				</ul>\n			</nav>\n		</section>\n	</footer>'])), s.footer, s.section, Logo, s.title, s.title, s.title, s.title);
}
Footer.css = `
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
`;
defineWompo(Footer, { name: "wompo-footer" });
