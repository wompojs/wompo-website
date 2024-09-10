import{defineWompo as a,html as s,useExposed as i,useState as r}from"wompo";export default function e({children:l,styles:o}){const[n,t]=r(!1),p=()=>{document.body.style.overflow="hidden",t(!0)},d=()=>{document.body.style.overflow="auto",t(!1)};return i({open:p,close:d}),s`
		<div class=${`${o.backdrop} ${n&&o.open}`}>
			<div class=${o.modal}>
				${l}
				<button @click=${d}>X</button>
			</div>
		</div>
	`}e.css=`
  :host {
    display: inline-block;
  }
  .backdrop.open {
    display: block;
  }
  .backdrop {
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
    height: auto;
    max-width: 90vw;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    background-color: #fff;
    padding: 30px;
  }
`,a(e,{name:"modal-example"});
