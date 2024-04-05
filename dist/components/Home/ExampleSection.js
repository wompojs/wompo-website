import { defineWompo, html } from "wompo";
import Code from "../Code.js";
import CounterComponent from "./CounterComponent.js";
export default function ExampleSection({ styles: s }) {
  return html`<section class="section">
		<div class=${s.container}>
			<div style="position: relative;">
				<${CounterComponent}
					initialCount=${5}
					class=${s.counter}
					style=${{ transform: "rotate(45deg)", top: 20, left: 30 }}
				/>
				<${CounterComponent}
					initialCount=${22}
					class=${s.counter}
					style=${{ transform: "rotate(-20deg)", top: 50, right: 30 }}
				/>
				<${CounterComponent}
					initialCount=${1}
					class=${s.counter}
					style=${{ transform: "rotate(10deg)", bottom: 10, right: 30 }}
				/>
				<${CounterComponent}
					class=${s.counter}
					style=${{ transform: "translate(-50%, -50%)", top: "50%", left: "50%" }}
				/>
			</div>
			<div style="position: relative;">
				<${Code}
					style=${{ boxShadow: "0 5px 5px #0004" }}
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
				<${Code}
					class=${s.codeAbove}
					style=${{
    position: "absolute",
    boxShadow: "0 5px 5px #0004",
    zIndex: "2"
  }}
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
	</section>`;
}
ExampleSection.css = `
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
`;
defineWompo(ExampleSection, { name: "example-section" });
