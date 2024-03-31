import { defineWomp, html } from 'womp';

const staticTemplate = html`<i>I am static</i>`;

const dynamicTemplate = html`<div>
	I will render here the content of the [staticTemplate]: ${staticTemplate}.<br />
	I can also render this values: <br />
	Numbers: ${0}<br />
	Strings: ${'ciao!'}<br />
	Arrays: ${[0, 1, 2, 'three', html`four`]}<br />
	Other templates: ${html`Look!`}<br />
	<br />
	I can even conditionally render content: ${false && 'I will not be shown, *sad face'}<br />
	${true && 'I am visible!'}<br />
	<br />
	Falsy values will be ignored (except for numbers and strings): ${null} ${undefined} ${false}.
</div>`;

export default function HtmlExample() {
	return dynamicTemplate;
}

defineWomp(HtmlExample);
