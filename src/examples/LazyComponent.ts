import { html, defineWompo, type WompoProps } from 'wompo';

export default function LazyComponent({ children }: WompoProps) {
	return html`
		<div style="font-size: 20px; color: blue;">${children}<br />I was lazy loaded!</div>
	`;
}

defineWompo(LazyComponent, {
	name: 'lazy-component-example',
});
