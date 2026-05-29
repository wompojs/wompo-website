import { defineWompo, html, type WompoProps, useState } from 'wompo';

interface LikeDemoProps extends WompoProps {
	initial?: number | string;
}

function LikeDemo({ initial = 12, styles: s }: LikeDemoProps) {
	const initialValue = typeof initial === 'number' ? initial : Number(initial) || 0;
	const [likes, setLikes] = useState(initialValue);
	const liked = likes > initialValue;

	return html`
		<button class=${`${s.button} ${liked ? s.liked : ''}`} type="button" @click=${() => setLikes(likes + 1)}>
			<span>Like</span>
			<strong>${likes}</strong>
		</button>
	`;
}

LikeDemo.css = `
	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.9rem;
		min-width: 12rem;
		border: 1px solid var(--site-border-strong);
		background: var(--site-surface);
		color: var(--site-text-strong);
		border-radius: 8px;
		padding: 1rem 1.3rem;
		font-weight: 800;
		cursor: pointer;
		box-shadow: 0 1rem 2.6rem var(--site-shadow);
		transition: transform .16s ease, border-color .16s ease, color .16s ease, background-color .16s ease;
	}
	.button:hover {
		transform: translateY(-1px);
		border-color: var(--site-primary);
		color: var(--site-primary);
	}
	.button.liked {
		background: var(--site-primary);
		border-color: var(--site-primary);
		color: #fff;
	}
	.button strong {
		min-width: 2ch;
		text-align: right;
	}
`;

defineWompo(LikeDemo, { name: 'home-like-demo' });
export default LikeDemo;
