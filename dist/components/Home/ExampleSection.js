import{defineWompo as r,html as i}from"wompo";import n from"../Code.js";import o from"./CounterComponent.js";export default function e({styles:t}){return i`<section class="section">
		<div class=${t.container}>
			<div style="position: relative;">
				<${o}
					initialCount=${5}
					class=${t.counter}
					style=${{transform:"rotate(45deg)",top:20,left:30}}
				/>
				<${o}
					initialCount=${22}
					class=${t.counter}
					style=${{transform:"rotate(-20deg)",top:50,right:30}}
				/>
				<${o}
					initialCount=${1}
					class=${t.counter}
					style=${{transform:"rotate(10deg)",bottom:10,right:30}}
				/>
				<${o}
					class=${t.counter}
					style=${{transform:"translate(-50%, -50%)",top:"50%",left:"50%"}}
				/>
			</div>
			<div style="position: relative;">
				<${n}
					style=${{boxShadow:"0 5px 5px #0004"}}
					code=${`
            // Create a Counter Component
            function CounterComponent({ start = 0 }){
              const [counter, setCounter] = useState(start);
              const increment = () => setCounter(counter + 1)
              return html\`<button @click=\${increment}>
                \${counter}
              </button>\`;
            }

          `}
					language="js"
				/>
				<${n}
					style=${{position:"absolute",bottom:-80,right:-40,boxShadow:"0 5px 5px #0004",zIndex:"2"}}
					margin="0"
					code=${`
            <!-- Render it everywhere infinite times -->
            <counter-component start="5"><counter-component>
            <counter-component start="22"><counter-component>
            <counter-component start="1"><counter-component>
            <counter-component><counter-component>
          `}
					language="html"
				/>
			</div>
		</div>
	</section>`}e.css=`
  .container {
    display: flex;
    gap: 5rem;
    margin-bottom: 50rem;
  }
  .container > * {
    width: 100%;
  }
  .counter {
    position: absolute;
  }
`,r(e,{name:"example-section"});
