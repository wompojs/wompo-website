'use client';
import { WompProps, defineWomp, html, useState } from 'womp';
import MainContent from './MainContent';

export default function Counter({ styles: s, children }: WompProps) {
	const [counter, setCounter] = useState(0);
	return html`
		<div>
			<button @click=${() => setCounter(counter - 1)} class=${s.button}>-</button>
			<span>$${counter}</span>
			<button @click=${() => setCounter(counter + 1)} class=${s.button}>+</button>
			${children}
		</div>
	`;
}

defineWomp(Counter, { shadow: true });
