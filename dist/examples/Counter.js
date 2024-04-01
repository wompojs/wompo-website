import { useState as u, defineWompo as r, html as c } from 'wompo';
export default function e() {
	const [t, n] = u(0);
	function o() {
		n(t + 1);
	}
	return c`<button @click="${o}">Pressed ${t} times</button>`;
}
r(e, { name: 'counter-example' });
