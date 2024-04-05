import { defineWompo, html, useState } from 'wompo';

export default function CounterComponent({ initialCount = 0 }: any) {
	const [counter, setCounter] = useState(initialCount);
	const increment = () => setCounter(counter + 1);
	return html`<button @click=${increment}>${counter}</button>`;
}
CounterComponent.css = `
  button {
    font-size: 5rem;
    border-radius: 10px;
    cursor: pointer;
    border: none;
    background-color: #573ef6;
    color: #fff;
    width: 10rem;
    height: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 3px 3px 3px #e2defd;
    touch-action: manipulation;
  }
`;
defineWompo(CounterComponent, { shadow: true, cssModule: false, name: 'home-counter' });
