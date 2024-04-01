import { lazy, html, defineWomp } from 'womp';

function simulateBigComponent(promise: Promise<any>) {
	return new Promise((resolve) => {
		setTimeout(resolve, 5000);
	}).then(() => promise);
}

const LazyComponent = lazy(() => simulateBigComponent(import('./LazyComponent.js')));

export default function LazyExample() {
	return html`
    <p>This content is static. Below me the lazy component will be rendered!</p>
    <${LazyComponent}>I should be blue...</${LazyComponent}>
  `;
}

defineWomp(LazyExample, {
	name: 'lazy-example',
});
