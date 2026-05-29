import { type RenderHtml, type WompoProps, defineWompo, html } from 'wompo';

interface MainContentProps extends WompoProps {
	title: string;
	description: RenderHtml | string;
}

export default function MainContent({ styles: s, title, description, children }: MainContentProps) {
	return html`
		<main class=${s.main}>
			<div class=${s.container}>
				<h1>${title}</h1>
				<p class=${s.subtitle}>${description}</p>
				${children}
			</div>
		</main>
	`;
}

MainContent.css = `
  :host {
    display: block;
    width: 100%;
    position: relative;
  }
  .main {
    padding: 75px 0;
    margin: 0 auto;
		color: var(--site-text);
  }

  .main p code,
	.main li code,
	.main h2 code,
	.main h3 code {
    display: inline-block;
    background-color: var(--site-inline-code-bg);
    color: var(--site-inline-code-text);
    padding: 0.1rem 0.45rem;
    border-radius: 6px;
    font-size: 0.92em;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  }
	.main pre code {
		display: block;
		overflow: auto;
		background-color: var(--site-code-bg);
		color: var(--site-code-text);
		padding: 1.8rem;
		border-radius: 8px;
		border: 1px solid var(--site-code-border);
		font-size: 1.42rem;
		line-height: 1.65;
	}

  .main a {
    color: var(--site-primary);
    text-decoration: none;
    border-bottom: 1px solid var(--site-primary-soft-strong);
    transition: color 0.12s ease-in-out, border-color 0.12s ease-in-out;
    cursor: pointer;
  }
  .main a:hover {
    border-color: var(--site-primary);
  }

  .main p,
	.main li {
		color: var(--site-text);
		font-size: 1.72rem;
		line-height: 1.78;
	}
  .main ul,
	.main ol {
    padding-left: 1.25em;
		margin: 1.4rem 0;
  }
	.main li + li {
		margin-top: 0.5rem;
	}
	.main strong,
	.main b {
		color: var(--site-text-strong);
	}
	.main blockquote {
		margin: 2rem 0;
		padding: 1rem 1.6rem;
		border-left: 3px solid var(--site-primary);
		background: var(--site-blockquote-bg);
		color: var(--site-blockquote-text);
		border-radius: 0 8px 8px 0;
  }

  .container {
    margin: 0 auto;
    max-width: 82rem;
		padding: 2.8rem 1rem 5.6rem;
  }
  .main hr {
    margin: 4.6rem 0 3rem;
    background-color: var(--site-border);
    border: 0;
    height: 1px;
  }
  .main h1 {
    font-size: 4.8rem;
    margin: 0 0 1.2rem;
		line-height: 1.05;
		color: var(--site-text-strong);
  }
  .main h2 {
    font-size: 2.7rem;
    margin: 0 0 1.2rem;
		line-height: 1.25;
		color: var(--site-text-strong);
  }
	.main h3 {
		font-size: 2rem;
		margin: 2.4rem 0 0.8rem;
		line-height: 1.35;
		color: var(--site-text-strong);
  }
  .main .subtitle {
    font-weight: normal;
    font-size: 1.95rem;
    margin: 0 0 1.6rem;
		color: var(--site-text-muted);
		line-height: 1.65;
  }

	@media (width < 1050px) {
		.main {
			padding: 25px 0;
		}
	}
	@media (width < 760px) {
		.container {
			padding: 2.8rem 1.6rem 3.2rem;
		}
		.main h1 {
			font-size: 3.6rem;
		}
		.main h2 {
			font-size: 2.35rem;
		}
		.main p,
		.main li {
			font-size: 1.65rem;
		}
	}
`;

defineWompo(MainContent, {
	name: 'main-content',
});
