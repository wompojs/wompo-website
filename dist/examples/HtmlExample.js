import { defineWompo, html } from "wompo";
const staticTemplate = html`<i>I am static</i>`;
const dynamicTemplate = html`<div>
	I will render here the content of the [staticTemplate]: ${staticTemplate}.<br />
	I can also render this values: <br />
	Numbers: ${0}<br />
	Strings: ${"ciao!"}<br />
	Arrays: ${[0, 1, 2, "three", html`four`]}<br />
	Other templates: ${html`Look!`}<br />
	<br />
	I can even conditionally render content: ${false}<br />
	${"I am visible!"}<br />
	<br />
	Falsy values will be ignored (except for numbers and strings): ${null} ${void 0} ${false}.
</div>`;
export default function HtmlExample() {
  return dynamicTemplate;
}
defineWompo(HtmlExample, {
  name: "html-example"
});
