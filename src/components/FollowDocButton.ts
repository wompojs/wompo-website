import { type WompoProps, defineWompo, html } from 'wompo';
import { Link } from 'seawomp/components';

interface FollowDocButtonProps extends WompoProps {
	to: string;
	title: string;
	description: string;
	next: boolean;
}

export default function FollowDocButton({
	styles: s,
	to,
	title,
	description,
	next,
}: FollowDocButtonProps) {
	return html`
		<${Link} href=${to} class=${s.button}>
			<div style=${{ display: 'flex', height: '100%' }}>
				${!next
					? html`
							<svg
								style=${{ marginRight: '15px', alignSelf: 'center' }}
								xmlns="http://www.w3.org/2000/svg"
								width="26"
								height="26"
								fill="currentColor"
								viewBox="0 0 16 16"
							>
								<path
									fill-rule="evenodd"
									d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
								/>
							</svg>
						`
					: ''}
				<div style=${{ width: '100%' }}>
					<h3>${title}</h3>
					<p>${description}</p>
				</div>
				${next
					? html`
							<svg
								style=${{ marginLeft: '15px', alignSelf: 'center' }}
								xmlns="http://www.w3.org/2000/svg"
								width="26"
								height="26"
								fill="currentColor"
								viewBox="0 0 16 16"
							>
								<path
									fill-rule="evenodd"
									d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
								/>
							</svg>
						`
					: ''}
			</div>
		</${Link}>
	`;
}

FollowDocButton.css = `
  :host {
    display: block;
    width: 100%;
		cursor: pointer;
  }
  :host:hover .button {
    background-color: var(--site-surface-soft);
		border-color: var(--site-primary);
		transform: translateY(-1px);
  }
  .button {
		display: block;
		text-decoration: none;
    height: 100%;
    padding: 1.8rem;
    border: 1px solid var(--site-border-strong);
    color: var(--site-blockquote-text);
    border-radius: 8px;
    background-color: var(--site-surface);
		transition: transform .15s, background-color .15s, border-color .15s;
  }
  .button * {
    margin: 0;
  }
	.button h3 {
    margin-bottom: 1rem;
		font-size: 1.55rem;
		color: var(--site-primary);
  }
	.button p {
		color: var(--site-text-muted);
		font-size: 1.35rem;
		line-height: 1.5;
	}
	@media (width < 600px){
		.button p {
			text-overflow: ellipsis;
			overflow: hidden;
			display: -webkit-box;
			-webkit-line-clamp: 5;
			line-clamp: 2;
			-webkit-box-orient: vertical;
		}
	}
`;

defineWompo(FollowDocButton, { name: 'follow-doc-button' });
