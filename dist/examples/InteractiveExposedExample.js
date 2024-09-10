import{defineWompo as a,html as i,useRef as p,useEffect as r}from"wompo";import c from"./ModalExample.js";import n from"../components/Code.js";export default function l(){const e=p(),m=()=>{e.current.open()};return r(()=>{const t=n.componentName,o=new c.class;o.innerHTML=`Yoo good job!! Now i guess you can even close it by writing this in the
			console:
			<${t} code="document.querySelector('modal-example').close()" language="js"></${t}>
			Or simply click the "X" button... But we are sad if you do it.
		`,e.current=o,document.body.appendChild(o)},[]),i`
		<ol>
			<li>
				Very cool option 😎
				<br />
				Write this in the console and open it yourself!
				<${n} code="document.querySelector('modal-example').open()" language="js" />
			</li>
			<li>
				Boring option 😴
				<br />
				Just press this <button @click=${m}>button</button>. We will do it for you.
			</li>
		</ol>
	`}a(l,{name:"interactive-exposed-example"});
