import{defineWompo as l,html as e}from"wompo";import t from"../Code.js";import a from"./CounterComponent.js";export default function n({styles:s}){return e`<section class="section">
		<div class=${s.container}>
			<div style="position: relative;">
				<${a}
					initialCount=${5}
					class=${s.counter}
					style=${{transform:"rotate(45deg)",top:20,left:30}}
				/>
				<${a}
					initialCount=${22}
					class=${s.counter}
					style=${{transform:"rotate(-20deg)",top:50,right:30}}
				/>
				<${a}
					initialCount=${1}
					class=${s.counter}
					style=${{transform:"rotate(10deg)",bottom:10,right:30}}
				/>
				<${a}
					class=${s.counter}
					style=${{transform:"translate(-50%, -50%)",top:"50%",left:"50%"}}
				/>
			</div>
			<div style="position: relative;">
				<${t}
					style=${{boxShadow:"0 5px 5px #0004"}}
					elaborate=${!1}
					code=${`<span class="hljs-comment">// Create a Counter Component</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">CounterComponent</span>(<span class="hljs-params">{ start = <span class="hljs-number">0</span> }</span>){
  <span class="hljs-keyword">const</span> [counter, setCounter] = <span class="hljs-title function_">useState</span>(start);
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">increment</span> = (<span class="hljs-params"></span>) =&gt; <span class="hljs-title function_">setCounter</span>(counter + <span class="hljs-number">1</span>)
  <span class="hljs-keyword">return</span> html\`<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=</span></span><span class="hljs-subst">\${increment}</span><span class="language-xml"><span class="hljs-tag">&gt;</span>
    </span><span class="hljs-subst">\${counter}</span><span class="language-xml">
  <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>\`</span>;
}`}
					language="js"
				/>
				<${t}
					class=${s.codeAbove}
					style=${{position:"absolute",boxShadow:"0 5px 5px #0004",zIndex:"2"}}
					elaborate=${!1}
					margin="0"
					code=${`<span class="hljs-comment">&lt;!-- Render it everywhere infinite times --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">counter-component</span> <span class="hljs-attr">start</span>=<span class="hljs-string">"5"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">counter-component</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">counter-component</span> <span class="hljs-attr">start</span>=<span class="hljs-string">"22"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">counter-component</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">counter-component</span> <span class="hljs-attr">start</span>=<span class="hljs-string">"1"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">counter-component</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">counter-component</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">counter-component</span>&gt;</span>`}
					language="html"
				/>
			</div>
		</div>
	</section>`}n.css=`
  .container {
    display: flex;
    gap: 5rem;
    margin-bottom: 50rem;
		width: 100%;
		max-width:
  }
  .container > * {
    width: 100%;
  }
  .counter {
    position: absolute;
  }
	.codeAbove {
		bottom: -80px;
		right: -40px;
	}

	@media (width < 1200px) {
		.container {
			flex-direction: column;
			align-items: center;
			padding: 0 2rem;
			margin: 0;
		}
		.codeAbove {
			bottom: -100px;
			right: -2rem;
		}
		.container > :nth-child(1) {
			order: 1;
			margin: 10rem auto 0 auto;
			max-width: 40rem;
			min-height: 40rem;
		}
	}
`,l(n,{name:"example-section"});
