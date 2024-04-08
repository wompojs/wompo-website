import { html, defineWompo } from "wompo";
export default function LazyComponent({ children }) {
  return html`
		<div style="font-size: 20px; color: blue;">${children}<br />I was lazy loaded!</div>
	`;
}
defineWompo(LazyComponent, {
  name: "lazy-component-example"
});
