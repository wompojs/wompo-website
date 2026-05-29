import { defineWompo, html } from 'wompo';

export default function LoadingPlaceholder() {
	return html`
		<section>
			<div class="skeleton title"></div>
			<div class="skeleton desc"></div>
			<hr />
			<div class="skeleton content"></div>
		</section>
		<nav class="skeleton"></nav>
	`;
}
LoadingPlaceholder.css = `
  :host {
    display: flex;
    box-sizing: border-box;
  }
  * {
    box-sizing: border-box;
  }
  section, nav {
    height: 100rem;
    width: 100%;
    margin: 2rem;
    display: flex;
    flex-direction: column;
  }
  nav {
    width: 20%;
    max-width: 30rem;
  }
  hr {
    margin: 50px 0;
    background-color: var(--site-primary-soft-strong);
    border: 0;
    height: 1px;
  }
  .title {
    height: 5rem;
  }
  .desc {
    height: 2rem;
    margin-top: 2rem;
  }
  .content {
    height: 100%;
  }
  .skeleton {
    border-radius: 10px;
    animation: skeleton-loading 1s linear infinite alternate;
  }

  @media (width < 1300px){
		nav {
			display: none;
		}
	}

  @keyframes skeleton-loading {
    0% {
      background-color: var(--site-surface-soft);
    }
    100% {
      background-color: var(--site-border);
    }
  }
`;
defineWompo(LoadingPlaceholder, { name: 'loading-placeholder', shadow: true, cssModule: false });
