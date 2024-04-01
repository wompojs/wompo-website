import { useRef, useEffect, html, defineWompo } from 'wompo';

function useTime() {
	// Initialize the timer
	const timeRef = useRef(0);
	// Start the timer when the component is rendered for the first time
	useEffect(() => {
		const intervalId = setInterval(() => {
			// Update the timer by one every second.
			timeRef.current += 1;
		}, 1000);
		return () => {
			clearInterval(intervalId);
		};
	}, []);
	return timeRef;
}

export default function UseTime() {
	const timeSinceFirstRender = useTime();
	const showTime = () => {
		alert(`I was rendered ${timeSinceFirstRender.current} seconds ago`);
	};
	return html`
		<button @click=${showTime}>
			If you click me I'll show you how many seconds ago I was rendered!
		</button>
	`;
}

defineWompo(UseTime, {
	name: 'use-time-hook-example',
});
