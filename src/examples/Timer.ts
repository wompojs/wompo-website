import { useState, defineWompo, html, useRef } from 'wompo';

export default function Timer() {
	const [timer, setTimer] = useState(0);
	const intervalId = useRef(null);

	function startTimer() {
		intervalId.current = setInterval(() => {
			setTimer((oldTimer) => oldTimer + 1);
		}, 10);
	}

	function stopTimer() {
		clearInterval(intervalId.current);
		intervalId.current = null;
	}

	function resetTimer() {
		setTimer(0);
	}

	return html`<div>
		<button @click=${startTimer} disabled=${intervalId.current !== null}>Start</button>
		<button @click=${stopTimer} disabled=${intervalId.current === null}>Stop</button>
		<button @click=${resetTimer} disabled=${timer === 0}>Reset</button>
		<p>${(timer / 100).toFixed(2)}</p>
	</div>`;
}

defineWompo(Timer, {
	name: 'timer-example',
});
