import { lazy, html, defineWomp, Suspense } from 'womp';

function simulateBigComponent(promise: Promise<any>) {
	return new Promise((resolve) => {
		setTimeout(resolve, 5000);
	}).then(() => promise);
}

const LazyComponent = lazy(() => simulateBigComponent(import('./LazyComponent.js')));

export default function LazySuspenseExample() {
	return html`
    <p>This content is static. Below me the lazy component will be rendered!</p>
    <${Suspense} fallback=${html`<i>Loading...</i>`}>
      <${LazyComponent}>I should be blue...</${LazyComponent}>
    </${Suspense}>
  `;
}

defineWomp(LazySuspenseExample, {
	name: 'lazy-suspense-example',
});
