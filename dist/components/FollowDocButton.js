import{jsx as o,jsxs as l}from"wompo/jsx-runtime";import{defineWompo as d}from"wompo";import{Link as a}from"wompo-router";export default function t({styles:i,to:r,title:n,description:s,next:e}){return o(a,{to:r,class:i.button,children:l("div",{style:{display:"flex",height:"100%"},children:[!e&&o("svg",{style:{marginRight:"15px",alignSelf:"center"},xmlns:"http://www.w3.org/2000/svg",width:"26",height:"26",fill:"currentColor",viewBox:"0 0 16 16",children:o("path",{"fill-rule":"evenodd",d:"M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"})}),l("div",{style:{width:"100%"},children:[o("h3",{children:n}),o("p",{children:s})]}),e&&o("svg",{style:{marginLeft:"15px",alignSelf:"center"},xmlns:"http://www.w3.org/2000/svg",width:"26",height:"26",fill:"currentColor",viewBox:"0 0 16 16",children:o("path",{"fill-rule":"evenodd",d:"M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"})})]})})}t.css=`
  :host {
    display: block;
    width: 100%;
		cursor: pointer;
  }
  :host:hover .button {
    background-color: #E3DEFE;
  }
  .button {
    height: 100%;
    padding: 2rem;
    border: 1px solid #573EF6;
    color: #573EF6;
    border-radius: 10px;
    background-color: #fff;
  }
  .button * {
    margin: 0;
  }
  .button h3 {
    margin-bottom: 1rem;
		font-size: 1.5rem;
  }
	@media (width < 600px){
		.button p {
			text-overflow: ellipsis;
			overflow: hidden;
			display: -webkit-box;
			-webkit-line-clamp: 5;
			line-clamp: 2;
			-webkit-box-orient: vertical;
		}
	}
`,d(t,{name:"follow-doc-button"});
