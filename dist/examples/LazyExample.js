import { lazy as m, html as i, defineWompo as l } from 'wompo';
function a(n) {
	return new Promise((o) => {
		setTimeout(o, 5e3);
	}).then(() => n);
}
const e = m(() => a(import('./LazyComponent.js')));
export default function t() {
	return i`
    <p>This content is static. Below me the lazy component will be rendered!</p>
    <${e}>I should be blue...</${e}>
  `;
}
l(t, { name: 'lazy-example' });
