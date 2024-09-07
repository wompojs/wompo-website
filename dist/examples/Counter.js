import { useState, defineWompo, html } from 'wompo';
export default function Counter() {
    const [count, setCount] = useState(0);
    function incrementCounter() {
        setCount(count + 1);
    }
    return html `<button @click="${incrementCounter}">Pressed ${count} times</button>`;
}
defineWompo(Counter, {
    name: 'counter-example',
});
