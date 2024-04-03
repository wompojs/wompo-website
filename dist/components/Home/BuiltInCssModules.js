import{defineWompo as t,html as n}from"wompo";export default function o({styles:e}){return n`
		<div class=${e.container}>
			Look how beautiful I am! And my beauty will not affect other components' own beauty. Every
			component is unique on its own, even without having to live in the obscure world of
			<b>Shadow DOM</b>.
		</div>
	`}o.css=`
  .container {
    padding: 30px 60px;
    border-radius: 100px 15px 100px 15px;
    background-color: #573ef630;
    position: relative;
  }
  .container::after {
    content: "";
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: #573ef6;
    border-radius: 50%;
    right: -20px;
    top: -10px;
  }
`,t(o,{name:"built-in-css-modules"});
