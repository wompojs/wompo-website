import { type WompoProps, defineWompo, html } from 'wompo';

export default function BuiltInCssModules({ styles: s }: WompoProps) {
	return html`
		<div class=${s.container}>
			Look how beautiful I am! And my beauty will not affect other components' own beauty. Every
			component is unique on its own, even without having to live in the obscure world of
			<b>Shadow DOM</b>.
		</div>
	`;
}
BuiltInCssModules.css = `
  .container {
    padding: 30px 60px;
    border-radius: 100px 15px 100px 15px;
    background-color: var(--site-primary-soft-strong);
    position: relative;
  }
  .container::after {
    content: "";
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: var(--site-primary);
    border-radius: 50%;
    right: -20px;
    top: -10px;
  }
`;

defineWompo(BuiltInCssModules, { name: 'built-in-css-modules' });
