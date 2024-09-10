import{defineWompo as s,html as a,useExposed as r,useState as c}from"wompo";export default function e({children:n,styles:o}){const[p,t]=c(!1),l=()=>{document.body.style.overflow="hidden",t(!0)},d=()=>{document.body.style.overflow="auto",t(!1)};return r({open:l,close:d}),a`
		<div class=${`${o.backdrop} ${p&&o.open}`} @click=${d}>
			<div class=${o.modal} @click=${i=>i.stopPropagation()}>${n}</div>
		</div>
	`}e.css=`
  :host {
    display: inline;
  }
  .backdrop.open {
    display: block;
  }
  .backdrop {
    cursor: pointer;
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #00000040;
    z-index: 1000;
  }
  .modal {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 600px;
    height: 80vh;
    max-height: 1000px;
    max-width: 90vw;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    background-color: #fff;
    padding: 30px;
  }
`,s(e,{name:"wompo-modal"});
