import { defineWompo, html, useRef } from "wompo";
import ModalExample from "./ModalExample.js";
import Code from "../components/Code.js";
export default function InteractiveExposedExample() {
  const modalRef = useRef();
  const openModal = () => {
    modalRef.current.open();
  };
  return html`
		<ol>
			<li>
				Very cool option 😎
				<br>
				Write this in the console and open it yourself!
				<${Code} code="document.querySelector('modal-example').open()" language="js" />
				<${ModalExample} ref=${modalRef}>
					Yoo good job!! Now i guess you can even close it by writing this in the console:
					<${Code} code="document.querySelector('modal-example').close()" language="js" />
					Or simply click the "X" button... But we are sad if you do it.
				</${ModalExample}>
			</li>
			<li>
				Boring option 😴
				<br />
				Just press this <button @click=${openModal}>button</button>. We will do it for you.
			</li>
		</ol>
	`;
}
defineWompo(InteractiveExposedExample, {
  name: "interactive-exposed-example"
});
