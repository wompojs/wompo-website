import{defineWompo as n,html as i,useRef as r}from"wompo";import o from"./ModalExample.js";import t from"../components/Code.js";export default function l(){const e=r();return i`
		<ol>
			<li>
				Very cool option 😎
				<br>
				Write this in the console and open it yourself!
				<${t} code="document.querySelector('modal-example').open()" language="js" />
				<${o} ref=${e}>
					Yoo good job!! Now i guess you can even close it by writing this in the console:
					<${t} code="document.querySelector('modal-example').close()" language="js" />
					Or simply click the "X" button... But we are sad if you do it.
				</${o}>
			</li>
			<li>
				Boring option 😴
				<br />
				Just press this <button @click=${()=>{e.current.open()}}>button</button>. We will do it for you.
			</li>
		</ol>
	`}n(l,{name:"interactive-exposed-example"});
