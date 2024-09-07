import { defineWompo, html, useExposed, useState } from 'wompo';
export default function Modal({ children, styles: s }) {
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
    return html `
		<div class=${`${s.backdrop} ${open && s.open}`} @click=${closeModal}>
			<div class=${s.modal} @click=${(ev) => ev.stopPropagation()}>${children}</div>
		</div>
	`;
}
Modal.css = `
  :host {
    display: inline;
  }
  .backdrop.open {
    display: block;
  }
  .backdrop {
    cursor: pointer;
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
    height: 80vh;
    max-height: 1000px;
    max-width: 90vw;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    background-color: #fff;
    padding: 30px;
  }
`;
defineWompo(Modal, {
    name: 'wompo-modal',
});
