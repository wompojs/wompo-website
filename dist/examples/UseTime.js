import { useRef, useEffect, html, defineWomp } from "womp";
function useTime() {
  const timeRef = useRef(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      timeRef.current += 1;
    }, 1e3);
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
defineWomp(UseTime);
