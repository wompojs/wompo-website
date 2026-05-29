import { defineWompo, html, type WompoProps } from 'wompo';
import { Link } from 'seawomp/components';

function NotFoundPage({ styles: s }: WompoProps) {
	const goBack = () => history.back();
	return html`
		<main class=${s.main}>
			<section>
				<h1>Not Found</h1>
				<h2>404</h2>
				<p>We did not find the page you were looking for.</p>
				<div class=${s.actions}>
					<button @click=${goBack}>Go Back</button>
					<${Link} href="/" class=${s.homeLink}>Home</${Link}>
				</div>
			</section>
		</main>
	`;
}

NotFoundPage.css = `
	.main section {
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		font-size: 3rem;
		padding: 10rem 3rem;
	}
	.main h1 {
		text-transform: uppercase;
		font-size: 6rem;
		margin: 0;
	}
	.main h2 {
		font-size: 15rem;
		margin: 0;
		letter-spacing: 1rem;
		line-height: 1;
	}
	.actions {
		display: flex;
		gap: 1.6rem;
		align-items: center;
		margin-top: 2rem;
	}
	.main button {
		background-color: var(--site-primary);
		color: #fff;
		padding: 1rem 2rem;
		border: none;
		cursor: pointer;
		border-radius: 10px;
		font-size: 2.4rem;
	}
	.main button:hover {
		text-decoration: underline;
	}
	.homeLink {
		color: var(--site-primary);
		font-size: 2.4rem;
		text-decoration: underline;
	}
`;

defineWompo(NotFoundPage, { name: 'not-found-page' });
export default NotFoundPage;
