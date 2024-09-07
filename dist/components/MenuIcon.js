import { html, defineWompo } from 'wompo';
export default function MenuIcon({ styles: s, open }) {
    return html `<div class="${s.icon} ${open && s.open}">
		<span></span>
		<span></span>
		<span></span>
	</div>`;
}
MenuIcon.css = `
	/* Icon 1 */
	.icon {
		width: 28px;
		height: 19px;
		position: relative;
		transform: rotate(0deg);
		transition: .5s ease-in-out;
		cursor: pointer;
	}

	.icon span {
		display: block;
		position: absolute;
		height: 3px;
		width: 100%;
		background: #573ef6;
		border-radius: 9px;
		opacity: 1;
		left: 0;
		transform: rotate(0deg);
		transition: .25s ease-in-out;
	}
	.icon span:nth-child(1) {
		top: 0px;
		transform-origin: left center;
	}

	.icon span:nth-child(2) {
		top: 50%;
		transform: translateY(-50%) rotate(0deg);
		transform-origin: left center;
	}

	.icon span:nth-child(3) {
		bottom: 0;
		transform-origin: left center;
	}

	.icon.open span:nth-child(1) {
		transform: rotate(45deg);
    top: -4px;
	}
	.icon.open span:nth-child(2) {
		width: 0%;
		opacity: 0;
	}
	.icon.open span:nth-child(3) {
		transform: rotate(-45deg);
	}
`;
defineWompo(MenuIcon);
