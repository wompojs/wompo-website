import { html, defineWomp, WompProps } from 'womp';

export default function LazyComponent({ children }: WompProps) {
	return html`
		<div style="font-size: 20px; color: blue;">${children}<br />I was lazy loaded!</div>
	`;
}

defineWomp(LazyComponent, {
	name: 'lazy-component-example',
});
