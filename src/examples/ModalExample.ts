import { type WompoElement, type WompoProps, defineWompo, html, useExposed, useState } from 'wompo';

export interface ModalExampleElement extends WompoElement {
	open: () => void;
	close: () => void;
}

export default function ModalExample({ children, styles: s }: WompoProps) {
	const [open, setOpen] = useState(false);

	const openModal = () => {
		// Block scroll
		document.body.style.overflow = 'hidden';
		setOpen(true);
	};

	const closeModal = () => {
		// Enable scroll
		document.body.style.overflow = 'auto';
		setOpen(false);
	};

	useExposed({
		open: openModal,
		close: closeModal,
	});

	return html`
		<div class=${`${s.backdrop} ${open && s.open}`}>
			<div class=${s.modal}>
				${children}
				<button @click=${closeModal}>X</button>
			</div>
		</div>
	`;
}
ModalExample.css = `
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
`;

defineWompo(ModalExample, {
	name: 'modal-example',
});
