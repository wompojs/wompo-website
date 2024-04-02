import { WompoProps, defineWompo, html } from 'wompo';
import { Link } from 'wompo-router';
import Code from '../components/Code.js';

export default function HomePage({ styles: s }: WompoProps) {
	return html`
		<main class=${s.main}>
			<section class=${s.hero}>
				<h1>Wompo</h1>
				<p>The fast, lightweight, React-like, web-components library.</p>
				<div class=${s.buttons}>
					<a
						href="https://www.npmjs.com/package/wompo"
						target="_blank"
						style=${{ fontFamily: 'monospace' }}
						class="${s.btn} ${s.btnPrimary}"
					>
						&gt; npm i wompo
					</a>
					<${Link} to="/docs/overview" class="${s.btn} ${s.btnSecondary}">Documentation</${Link}>
				</div>
			</section>
      
      <section class=${s.section}>
        <div class=${s.whySection}>
          <h2 class=${s.sticky}>Why wompo?</h2>
          <div>
            <p class=${s.whyParagraph}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z"/>
              </svg>
              Wompo is built with native Javascript functionalities and Web-components, meaning that
              it can <b>run everywhere</b>, wether you use a compiler or not. This also means that
              you can use wompo and other libraries like React, Angular, Vue, etc. at the same time,
              without having to worry about conflicts.
            </p>
            <p class=${s.whyParagraph}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z"/>
              </svg>
              Wompo is <b>super fast</b>, because there is no virtual DOM: only the dynamic parts of
              your components are updated, and cache is used heavily to ensure better performances
              when rendering the same component multiple times.
            </p>
            <p class=${s.whyParagraph}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
              </svg>
              No need to learn advanced Javascript features, classes, the <i>this</i> keyword, or
              TypeScript (although it is natively supported, because Wompo is built with it): to use
              the library you only need to know <u>basic Javascript, basic HTML, and basic CSS</u>.
              Wompo is <b>usable for both beginners and experts</b>.
            </p>
            <p class=${s.whyParagraph}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M15.807.531c-.174-.177-.41-.289-.64-.363a3.8 3.8 0 0 0-.833-.15c-.62-.049-1.394 0-2.252.175C10.365.545 8.264 1.415 6.315 3.1S3.147 6.824 2.557 8.523c-.294.847-.44 1.634-.429 2.268.005.316.05.62.154.88q.025.061.056.122A68 68 0 0 0 .08 15.198a.53.53 0 0 0 .157.72.504.504 0 0 0 .705-.16 68 68 0 0 1 2.158-3.26c.285.141.616.195.958.182.513-.02 1.098-.188 1.723-.49 1.25-.605 2.744-1.787 4.303-3.642l1.518-1.55a.53.53 0 0 0 0-.739l-.729-.744 1.311.209a.5.5 0 0 0 .443-.15l.663-.684c.663-.68 1.292-1.325 1.763-1.892.314-.378.585-.752.754-1.107.163-.345.278-.773.112-1.188a.5.5 0 0 0-.112-.172M3.733 11.62C5.385 9.374 7.24 7.215 9.309 5.394l1.21 1.234-1.171 1.196-.027.03c-1.5 1.789-2.891 2.867-3.977 3.393-.544.263-.99.378-1.324.39a1.3 1.3 0 0 1-.287-.018Zm6.769-7.22c1.31-1.028 2.7-1.914 4.172-2.6a7 7 0 0 1-.4.523c-.442.533-1.028 1.134-1.681 1.804l-.51.524zm3.346-3.357C9.594 3.147 6.045 6.8 3.149 10.678c.007-.464.121-1.086.37-1.806.533-1.535 1.65-3.415 3.455-4.976 1.807-1.561 3.746-2.36 5.31-2.68a8 8 0 0 1 1.564-.173"/>
              </svg>
              Wompo is <b>super ligth</b>: less then 6kb minfied and gzipped. It will probably be
              the lighter part of your application, while still providing a lot of functionalities.
              <br/>
              This will help keeping your loading time short if you care about your site's
              performance. 
            </p>
          </div>
        </div>
      </section>

      <section class="${s.section} ${s.shadowSection}">
        <h2>Shadow DOM?</h2>
        <h3>Yes, but <span class=${s.coloredSpan}>NO</span></h3>
        <p style="max-width: 60rem;">
          Unlike other Web-components libraries, <u>Shadow DOM is not enabled by default</u>
          when building your components. Why?<br/>
          Shadow DOM is great, but it can make your life harder: no global CSSs, no possibility to
          select elements through <code class=${s.code}>document.querySelector</code>, and, first
          of all, the need to learn what <b>Shadow DOM</b> is and what it does.<br/>
          Not really beginner friendly, huh?
        </p>
        <p>
          Instead...
        </p>
      </section>
		</main>
	`;
}
HomePage.css = `
  .hero {
    height: 100vh;
    max-height: 500px;
    background-color: #573ef6;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .hero h1 {
    margin: 0;
    font-size: 10rem;
  }
  .hero p {
    margin: 0;
    font-size: 2rem;
  }
  .section {
    margin: 30vh auto;
    max-width: 1080px;
    font-size: 1.8rem;
    position: relative;
    display: block;
  }

  .sticky {
    position: sticky;
    top: 40vh;
    height: fit-content;
    font-size: 5rem;
  }

  .whyParagraph {
    font-size: 2rem;
    position: relative;
  }
  .whyParagraph:not(:first-of-type) {
    margin-top: 80vh;
  }
  .whyParagraph svg {
    width: 20rem;
    height: 20rem;
    position: absolute;
    right: -6rem;
    top: 3rem;
    color: #573ef630;
    z-index: -1;
  }
  .whySection {
    display: flex;
    gap: 5rem;
  }
  .whySection > * {
    width: 50%;
  }

  .shadowSection {
    text-align: center;
    margin: 50vh auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .shadowSection h2 {
    font-size: 6rem;
    margin: 0;
  }
  .shadowSection h3 {
    font-size: 4rem;
    margin: 0;
  }
  
  .flex {
    display: flex;
    gap: 5rem;
    align-items: center;
  }
  
  .buttons {
    margin-top: 5rem;
    display: flex;
    gap: 2rem;
  }
  .btn, .btn:active {
    border: none;
    padding: 1rem 2rem;
    border-radius: 10px;
    outline: none;
    text-decoration: none;
    cursor: pointer;
    font-size: 2rem;
  }
  .btnPrimary {
    background-color: #8a78ff;
    color: #fff;
  }
  .btnPrimary:hover {
    background-color: #fff;
    color: #8a78ff;
  }
  .btnSecondary a {
    color: #fff;
    text-decoration: none;
  }
  .btnSecondary {
    background-color: #000;
  }
  .btnSecondary:hover a {
    color: #000;
  }
  .btnSecondary:hover {
    background-color: #fff;
    color: #000;
  }

  .code {
    background-color: #e2e2e2;
    padding: 3px 5px;
    font-family: monospace;
    border-radius: 10px;
  }

  .coloredSpan {
    color: #573ef6;
  }
`;

defineWompo(HomePage, { name: 'home-page' });
