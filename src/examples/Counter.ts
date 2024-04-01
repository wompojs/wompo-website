import { useState, defineWomp, html } from 'womp';

export default function Counter() {
	const [count, setCount] = useState(0);

	function incrementCounter() {
		setCount(count + 1);
	}

	return html`<button @click="${incrementCounter}">Pressed ${count} times</button>`;
}

defineWomp(Counter, {
	name: 'counter-example',
});
