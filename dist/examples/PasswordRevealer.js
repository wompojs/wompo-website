import{defineWompo as r,html as s,useRef as a}from"wompo";export default function o(){const e=a(null);return s`<div>
		<label>
			Type your password here:
			<input ref=${e} type="password" autocomplete="off" />
			<button @click=${()=>{alert(`Your password is: "${e.current.value}" \u{1F608}`)}}>I'll show your password to everyone!</button>
		</label>
	</div>`}r(o,{name:"password-revealer-example"});
