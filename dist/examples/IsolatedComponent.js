import{html as o,defineWompo as t}from"wompo";export default function e(){return o`
		<p>
			Even though my styles are super generic, I will not affect external elements and I will not be
			affected by external styles!
		</p>
	`}e.css=`
  :host {
    display: block;
  }
  p {
    padding: 5px;
    border-radius: 5px;
    background-color: #3489a6;
    color: #fff;
  }
`,t(e,{name:"super-cool-isolated-component",shadow:!0,cssModule:!1});
