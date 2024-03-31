import { html, defineWomp } from "womp";
export default function IsolatedComponent() {
  return html`
		<p>
			Even though my styles are super generic, I will not affect external elements and I will not be
			affected by external styles!
		</p>
	`;
}
IsolatedComponent.css = `
  :host {
    display: block;
  }
  p {
    padding: 5px;
    border-radius: 5px;
    background-color: #3489a6;
    color: #fff;
  }
`;
defineWomp(IsolatedComponent, {
  name: "super-cool-isolated-component",
  // The content will be placed inside a Shadow Root
  shadow: true,
  // Since it's already "isolated", it's not necessary to have the CSS Module
  cssModule: false
});
