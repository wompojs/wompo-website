import { lazy, html, defineWompo } from "wompo";
function simulateBigComponent(promise) {
  return new Promise((resolve) => {
    setTimeout(resolve, 5e3);
  }).then(() => promise);
}
const LazyComponent = lazy(() => simulateBigComponent(import("./LazyComponent.js")));
export default function LazyExample() {
  return html`
    <p>This content is static. Below me the lazy component will be rendered!</p>
    <${LazyComponent}>I should be blue...</${LazyComponent}>
  `;
}
defineWompo(LazyExample, {
  name: "lazy-example"
});
