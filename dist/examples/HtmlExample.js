import{defineWompo as r,html as e}from"wompo";const n=e`<i>I am static</i>`,a=e`<div>
	I will render here the content of the [staticTemplate]: ${n}.<br />
	I can also render this values: <br />
	Numbers: ${0}<br />
	Strings: ${"ciao!"}<br />
	Arrays: ${[0,1,2,"three",e`four`]}<br />
	Other templates: ${e`Look!`}<br />
	<br />
	I can even conditionally render content: ${!1}<br />
	${"I am visible!"}<br />
	<br />
	Falsy values will be ignored (except for numbers and strings): ${null} ${void 0} ${!1}.
</div>`;export default function t(){return a}r(t,{name:"html-example"});
