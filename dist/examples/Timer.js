import { useState as c, defineWompo as a, html as m, useRef as s } from 'wompo';
export default function r() {
	const [e, n] = c(0),
		t = s(null);
	function i() {
		t.current = setInterval(() => {
			n((o) => o + 1);
		}, 10);
	}
	function u() {
		clearInterval(t.current), (t.current = null);
	}
	function l() {
		n(0);
	}
	return m`<div>
		<button @click=${i} disabled=${t.current !== null}>Start</button>
		<button @click=${u} disabled=${t.current === null}>Stop</button>
		<button @click=${l} disabled=${e === 0}>Reset</button>
		<p>${(e / 100).toFixed(2)}</p>
	</div>`;
}
a(r, { name: 'timer-example' });
