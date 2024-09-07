import { defineWompo, html, useRef } from 'wompo';
export default function PasswordRevealer() {
    const inputRef = useRef(null);
    const revealPassword = () => {
        alert(`Your password is: "${inputRef.current.value}" 😈`);
    };
    return html `<div>
		<label>
			Type your password here:
			<input ref=${inputRef} type="password" autocomplete="off" />
			<button @click=${revealPassword}>I'll show your password to everyone!</button>
		</label>
	</div>`;
}
defineWompo(PasswordRevealer, {
    name: 'password-revealer-example',
});
