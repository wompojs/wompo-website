import{defineWomp as c,html as s,useEffect as u,useRef as f,useState as m}from"womp";const p=["Complete this tutorial","Buy groceries","Wash the car"];export default function d(){const[o,i]=m(p),n=f(),l=()=>{const t=n.current,e=t.value;e.trim()&&(i([...o,e]),t.value="")},r=t=>{i(o.filter((e,a)=>a!==t))};return u(()=>{const t=localStorage.getItem("todos");t&&i(JSON.parse(t))},[]),u(()=>{localStorage.setItem("todos",JSON.stringify(o))},[o]),s`
		<div>
			<div>
				<input ref=${n} />
				<button @click=${l}>+</button>
			</div>
			<ul>
				${o.map((t,e)=>s`<li>
						<button @click=${()=>r(e)}>X</button>
						<span>${t}</span>
					</li>`)}
			</ul>
		</div>
	`}c(d,{name:"todo-list-tutorial"});
