import {
	defineWompo,
	html,
	unsafelyRenderString,
	useEffect,
	useSelf,
	type WompoProps,
} from 'wompo';
import { createTranslator, seoI18nHead, type Messages } from 'seawomp/i18n';
import { Link } from 'seawomp/components';
import { i18nConfig } from '../src/i18n-config.js';
import '../src/components/Logo.js';
import '../src/components/Home/LikeDemo.js';
import { escapeHtml, highlightCodeBlock } from '../src/utils/codeHighlight.js';
import { setupHomeAnimations } from '../src/components/Home/animations.js';

const SITE_URL = 'https://wompo.dev';

interface Props extends WompoProps {
	data?: { locale: string; messages: Messages } | null;
}

const componentCode = `import { defineWompo, html, useState } from 'wompo';

function LikeButton({ initial = 0 }) {
  const [likes, setLikes] = useState(initial);

  return html\`
    <button @click=\${() => setLikes(likes + 1)}>
      Likes: \${likes}
    </button>
  \`;
}

defineWompo(LikeButton);`;

const htmlCode = `<like-button initial="12"></like-button>

<!-- Works as a native custom element. -->`;

function featureCard(eyebrow: string, title: string, body: string) {
	return html`
		<article class="homeFeature" data-gsap-reveal>
			<span>${eyebrow}</span>
			<h3>${title}</h3>
			<p>${body}</p>
		</article>
	`;
}

function HomePage({ data }: Props) {
	const t = createTranslator(data?.messages ?? {});
	const features = ['native', 'reactive', 'css', 'ssr', 'portable', 'typed'];
	const self = useSelf();
	useEffect(() => setupHomeAnimations(self), []);
	return html`
		<main class="homePage">
			<section class="hero homeHero">
				<div class="homeHero__background" aria-hidden="true">
					<div class="homeHero__codeLineHost lineOne" data-home-codeline-host>
						<div class="homeHero__codeLine">defineWompo(ProfileCard)</div>
					</div>
					<div class="homeHero__codeLineHost lineTwo" data-home-codeline-host>
						<div class="homeHero__codeLine">&lt;profile-card user="Ada"&gt;&lt;/profile-card&gt;</div>
					</div>
					<div class="homeHero__codeLineHost lineThree" data-home-codeline-host>
						<div class="homeHero__codeLine">client:visible + SSR + hooks</div>
					</div>
				</div>
				<div class="homeHero__content">
					<div class="homeHero__eyebrow"><wompo-logo size="2"></wompo-logo>${t('home.eyebrow')}</div>
					<h1>Wompo</h1>
					<p class="homeHero__lead">${t('home.tagline')}</p>
					<div class="homeInstallCommand" aria-label="npm install wompo">
						<span>$</span>
						<code>npm i wompo</code>
					</div>
					<div class="homeHero__actions">
						<${Link} href="/docs/introduction" class="homeButton homeButtonPrimary">${t('home.cta_docs')}</${Link}>
						<${Link} href="/docs/guides/quick-start" class="homeButton homeButtonSecondary">${t('home.cta_quickstart')}</${Link}>
					</div>
				</div>
			</section>

			<section class="homeSection homeIntro" data-gsap-reveal>
				<div>
					<p class="homeSection__kicker">${t('home.intro_kicker')}</p>
					<h2>${t('home.intro_title')}</h2>
				</div>
				<p>${t('home.intro_body')}</p>
			</section>

			<section class="homeDemo homeSection">
				<div class="homeDemo__copy" data-gsap-reveal>
					<p class="homeSection__kicker">${t('home.demo_kicker')}</p>
					<h2>${t('home.demo_title')}</h2>
					<p>${t('home.demo_body')}</p>
					<${Link} href="/docs/installation" class="homeTextLink">${t('home.demo_link')}</${Link}>
				</div>
				<div class="homeDemo__visual" data-gsap-reveal>
					<div class="homeCodeWindow">
						<div class="homeCodeWindow__bar">
							<span></span><span></span><span></span>
						</div>
						<pre><code class="hljs language-js" data-highlighted="server">${unsafelyRenderString(highlightCodeBlock(componentCode, 'js'))}</code></pre>
					</div>
					<div class="homeRenderWindow">
						<span>${t('home.render_label')}</span>
						<home-like-demo initial="12"></home-like-demo>
						<pre><code class="hljs language-html" data-highlighted="server">${unsafelyRenderString(highlightCodeBlock(htmlCode, 'html'))}</code></pre>
					</div>
				</div>
			</section>

			<section class="homeSection">
				<div class="homeSectionHeader" data-gsap-reveal>
					<p class="homeSection__kicker">${t('home.features_kicker')}</p>
					<h2>${t('home.features_title')}</h2>
					<p>${t('home.features_body')}</p>
				</div>
				<div class="homeFeatureGrid">
					${features.map((item) =>
						featureCard(
							t(`home.features.${item}.eyebrow`),
							t(`home.features.${item}.title`),
							t(`home.features.${item}.body`),
						),
					)}
				</div>
			</section>

			<section class="homeWorkflow homeSection" data-gsap-reveal>
				<div>
					<p class="homeSection__kicker">${t('home.workflow_kicker')}</p>
					<h2>${t('home.workflow_title')}</h2>
				</div>
				<ol>
					<li><span>01</span><strong>${t('home.workflow.install_title')}</strong>${t('home.workflow.install_body')}</li>
					<li><span>02</span><strong>${t('home.workflow.compose_title')}</strong>${t('home.workflow.compose_body')}</li>
					<li><span>03</span><strong>${t('home.workflow.ship_title')}</strong>${t('home.workflow.ship_body')}</li>
				</ol>
			</section>

			<section class="homeCta homeSection" data-gsap-reveal>
				<h2>${t('home.cta_title')}</h2>
				<p>${t('home.cta_body')}</p>
				<div class="homeHero__actions">
					<${Link} href="/docs/introduction" class="homeButton homeButtonPrimary">${t('home.cta_docs')}</${Link}>
					<a class="homeButton homeButtonSecondary" href="https://github.com/wompojs/wompo" target="_blank">GitHub</a>
				</div>
			</section>
		</main>
	`;
}

HomePage.css = `
	.homePage {
		--wompo-purple: var(--site-primary);
		--wompo-purple-dark: #21164f;
		--wompo-ink: var(--site-text-strong);
		--wompo-muted: var(--site-text-muted);
		--wompo-border: var(--site-border);
		--wompo-panel: var(--site-surface);
		--wompo-soft: var(--site-surface-soft);
		background: var(--site-bg-plain);
		color: var(--wompo-ink);
		overflow: hidden;
	}
	.homeHero {
		position: relative;
		min-height: clamp(56rem, 78vh, 76rem);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 9rem 2rem 8rem;
		background: linear-gradient(135deg, #573ef6 0%, #2d1f72 58%, #151024 100%);
		color: #fff;
		isolation: isolate;
	}
	.homeHero__background {
		position: absolute;
		inset: 0;
		z-index: -1;
		overflow: hidden;
	}
	.homeHero__background::before {
		content: '';
		position: absolute;
		inset: 12% 7%;
		border: 1px solid #ffffff22;
		background-image:
			linear-gradient(#ffffff10 1px, transparent 1px),
			linear-gradient(90deg, #ffffff10 1px, transparent 1px);
		background-size: 44px 44px;
		mask-image: linear-gradient(180deg, transparent, #000 18%, #000 78%, transparent);
	}
	.homeHero__codeLineHost {
		position: absolute;
		will-change: transform;
	}
	.homeHero__codeLineHost.lineOne { top: 18%; left: 8%; }
	.homeHero__codeLineHost.lineTwo { right: 7%; top: 34%; }
	.homeHero__codeLineHost.lineThree { bottom: 16%; left: 17%; }
	.homeHero__codeLine {
		width: max-content;
		max-width: calc(100vw - 4rem);
		padding: 1rem 1.4rem;
		border: 1px solid #ffffff24;
		border-radius: 8px;
		background: #ffffff12;
		color: #eeeaff;
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		font-size: 1.3rem;
		box-shadow: 0 2rem 6rem #00000026;
		backdrop-filter: blur(12px);
		will-change: transform;
	}
	.homeHero__content {
		width: min(96rem, 100%);
		text-align: center;
	}
	.homeHero__eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
		margin-bottom: 1.8rem;
		padding: 0.7rem 1rem;
		border: 1px solid #ffffff33;
		border-radius: 999px;
		background: #ffffff14;
		font-size: 1.35rem;
		font-weight: 700;
		color: #eeeaff;
	}
	.homeHero h1 {
		margin: 0;
		font-size: 8rem;
		line-height: 1;
	}
	.homeHero__lead {
		max-width: 78rem;
		margin: 2rem auto 0;
		color: #eeeaff;
		font-size: 2.2rem;
		line-height: 1.65;
	}
	.homeInstallCommand {
		display: inline-flex;
		align-items: center;
		gap: 1rem;
		margin: 3rem auto 0;
		padding: 1.1rem 1.5rem;
		border: 1px solid #ffffff33;
		border-radius: 8px;
		background: #120d25cc;
		box-shadow: 0 2rem 6rem #00000033;
	}
	.homeInstallCommand span,
	.homeInstallCommand code {
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		font-size: 1.75rem;
	}
	.homeInstallCommand span { color: #a7f3d0; }
	.homeInstallCommand code { color: #ffffff; }
	.homeHero__actions {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: 1.2rem;
		margin-top: 3rem;
	}
	.homeButton {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 4.6rem;
		padding: 1.1rem 1.8rem;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 800;
		font-size: 1.55rem;
		transition:
			transform 0.16s,
			background-color 0.16s,
			color 0.16s,
			border-color 0.16s;
	}
	.homeButton:hover { transform: translateY(-1px); }
	.homeButtonPrimary {
		background: #ffffff;
		color: var(--wompo-purple);
	}
	.homeButtonSecondary {
		border: 1px solid #ffffff55;
		color: #ffffff;
		background: #ffffff10;
	}
	.homeSection {
		width: min(112rem, calc(100% - 4rem));
		margin: 0 auto;
		padding: 10rem 0;
	}
	.homeSection__kicker {
		margin: 0 0 1rem;
		color: var(--wompo-purple);
		font-size: 1.35rem;
		font-weight: 850;
		text-transform: uppercase;
	}
	.homeSection h2 {
		max-width: 82rem;
		margin: 0;
		font-size: 4.2rem;
		line-height: 1.12;
		color: var(--wompo-ink);
	}
	.homeSection p {
		color: var(--wompo-muted);
		font-size: 1.8rem;
		line-height: 1.72;
	}
	.homeIntro {
		display: grid;
		grid-template-columns: minmax(0, 0.95fr) minmax(28rem, 0.75fr);
		gap: 6rem;
		align-items: start;
		border-bottom: 1px solid var(--wompo-border);
	}
	.homeIntro > p { margin: 0; }
	.homeDemo {
		display: grid;
		grid-template-columns: minmax(28rem, 0.72fr) minmax(0, 1fr);
		gap: 5rem;
		align-items: center;
	}
	.homeDemo__copy p { max-width: 46rem; }
	.homeTextLink {
		display: inline-flex;
		color: var(--wompo-purple);
		font-weight: 800;
		text-decoration: none;
		border-bottom: 1px solid var(--site-primary-soft-strong);
	}
	.homeDemo__visual { position: relative; min-width: 0; }
	.homeCodeWindow,
	.homeRenderWindow {
		border: 1px solid var(--wompo-border);
		border-radius: 8px;
		background: var(--wompo-panel);
		box-shadow: 0 2rem 6rem var(--site-shadow);
		overflow: hidden;
	}
	.homeCodeWindow {
		background: var(--site-code-bg);
		color: var(--site-code-text);
	}
	.homeCodeWindow__bar {
		position: relative;
		display: flex;
		align-items: center;
		gap: 0.7rem;
		padding: 1.2rem;
		border-bottom: 1px solid #ffffff14;
	}
	.homeCodeWindow__bar span {
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		background: #ff6b6b;
	}
	.homeCodeWindow__bar span:nth-child(2) { background: #facc15; }
	.homeCodeWindow__bar span:nth-child(3) { background: #34d399; }
	.homeCodeWindow pre,
	.homeRenderWindow pre { margin: 0; }
	.homeCodeWindow code,
	.homeRenderWindow code {
		display: block;
		overflow: auto;
		padding: 2rem;
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		font-size: 1.34rem;
		line-height: 1.65;
		white-space: pre;
	}
	.homeRenderWindow {
		position: absolute;
		right: -2rem;
		bottom: -5rem;
		width: min(34rem, 70%);
		padding: 1.8rem;
	}
	.homeRenderWindow > span {
		display: block;
		margin-bottom: 1rem;
		color: var(--wompo-muted);
		font-size: 1.2rem;
		font-weight: 800;
		text-transform: uppercase;
	}
	.homeRenderWindow home-like-demo { display: block; }
	.homeRenderWindow > button {
		width: 100%;
		padding: 1.2rem;
		border: 0;
		border-radius: 8px;
		background: var(--wompo-purple);
		color: #fff;
		font-size: 1.6rem;
		font-weight: 800;
	}
	.homeRenderWindow pre {
		margin-top: 1.4rem;
		border-radius: 8px;
		background: var(--wompo-soft);
		color: var(--wompo-ink);
	}
	.homeSectionHeader {
		display: grid;
		grid-template-columns: minmax(0, 0.9fr) minmax(28rem, 0.7fr);
		gap: 5rem;
		align-items: end;
		margin-bottom: 3rem;
	}
	.homeSectionHeader p:last-child { margin: 0; }
	.homeFeatureGrid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1.6rem;
	}
	.homeFeature {
		padding: 2.2rem;
		border: 1px solid var(--wompo-border);
		border-radius: 8px;
		background: var(--wompo-panel);
		box-shadow: 0 1rem 3rem var(--site-shadow);
	}
	.homeFeature span {
		display: inline-flex;
		margin-bottom: 1.2rem;
		color: var(--wompo-purple);
		font-size: 1.2rem;
		font-weight: 850;
		text-transform: uppercase;
	}
	.homeFeature h3 {
		margin: 0;
		color: var(--wompo-ink);
		font-size: 2rem;
		line-height: 1.25;
	}
	.homeFeature p {
		margin-bottom: 0;
		font-size: 1.55rem;
	}
	.homeWorkflow {
		display: grid;
		grid-template-columns: minmax(26rem, 0.7fr) minmax(0, 1fr);
		gap: 5rem;
		padding: 6rem;
		border-radius: 8px;
		background: linear-gradient(135deg, #21164f, #573ef6);
		color: #fff;
	}
	.homeWorkflow h2,
	.homeCta h2 { color: inherit; }
	.homeWorkflow .homeSection__kicker { color: #a7f3d0; }
	.homeWorkflow ol {
		display: grid;
		gap: 1rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.homeWorkflow li {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 0.3rem 1.2rem;
		padding: 1.6rem;
		border: 1px solid #ffffff24;
		border-radius: 8px;
		background: #ffffff12;
		color: #eeeaff;
	}
	.homeWorkflow li span {
		grid-row: span 2;
		color: #a7f3d0;
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		font-weight: 800;
	}
	.homeWorkflow li strong { color: #ffffff; }
	.homeCta { text-align: center; }
	.homeCta h2,
	.homeCta p {
		margin-left: auto;
		margin-right: auto;
	}
	.homeCta .homeButtonSecondary {
		border-color: var(--wompo-border);
		color: var(--wompo-purple);
		background: var(--wompo-panel);
	}
	@media (width < 960px) {
		.homeHero h1 { font-size: 6rem; }
		.homeIntro,
		.homeDemo,
		.homeSectionHeader,
		.homeWorkflow { grid-template-columns: 1fr; }
		.homeFeatureGrid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
		.homeRenderWindow {
			position: relative;
			right: auto;
			bottom: auto;
			width: 100%;
			margin-top: 1.6rem;
		}
	}
	@media (width < 680px) {
		.homeHero {
			min-height: 66rem;
			padding: 8rem 1.4rem 6rem;
		}
		.homeHero h1 { font-size: 4.8rem; }
		.homeHero__lead { font-size: 1.8rem; }
		.homeHero__codeLineHost { display: none; }
		.homeSection {
			width: min(100% - 2rem, 112rem);
			padding: 7rem 0;
		}
		.homeSection h2 { font-size: 3.2rem; }
		.homeFeatureGrid { grid-template-columns: 1fr; }
		.homeWorkflow { padding: 3rem 1.6rem; }
	}
`;

defineWompo(HomePage, { name: 'home-page', cssModule: false, island: 'load' });
export default HomePage;

export const prerender = true;

export function head({ data }: { data?: { locale: string; messages: Messages } | null }) {
	const locale = data?.locale ?? 'en';
	const title =
		locale === 'it'
			? 'Wompo - Web Components reattivi per sviluppatori'
			: 'Wompo - Reactive Web Components for developers';
	const desc =
		locale === 'it'
			? 'Wompo è una libreria JavaScript leggera per creare Web Components reattivi, riutilizzabili, SSR-ready e facili da integrare in qualsiasi stack.'
			: 'Wompo is a lightweight JavaScript library for reactive, reusable, SSR-ready Web Components that fit into any stack.';
	const canonicalPath = locale === 'it' ? '/it' : '/';
	const canonicalUrl = absoluteUrl(canonicalPath);
	const inLanguage = locale === 'it' ? 'it-IT' : 'en-US';
	const structuredData = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebSite',
				name: 'Wompo',
				url: SITE_URL,
				inLanguage,
				description: desc,
				potentialAction: {
					'@type': 'ReadAction',
					target: [absoluteUrl('/docs/introduction'), absoluteUrl('/it/docs/introduction')],
				},
			},
			{
				'@type': 'SoftwareSourceCode',
				name: 'Wompo',
				codeRepository: 'https://github.com/wompojs/wompo',
				programmingLanguage: ['JavaScript', 'TypeScript'],
				runtimePlatform: 'Web browser',
				url: canonicalUrl,
				description: desc,
				license: 'https://opensource.org/license/mit/',
			},
		],
	};
	return html`
		${unsafelyRenderString(`<title>${escapeHtml(title)}</title>`)}
		<meta name="description" content="${desc}" />
		<meta property="og:title" content="${title}" />
		<meta property="og:description" content="${desc}" />
		<meta property="og:type" content="website" />
		<meta property="og:image" content="${absoluteUrl('/wompo-preview.jpg')}" />
		<meta name="twitter:title" content="${title}" />
		<meta name="twitter:description" content="${desc}" />
		<meta name="twitter:image" content="${absoluteUrl('/wompo-preview.jpg')}" />
		${seoI18nHead({
			siteUrl: SITE_URL,
			pathname: canonicalPath,
			i18n: i18nConfig,
			locale,
			ogLocale: { en: 'en_US', it: 'it_IT' },
		})}
		${unsafelyRenderString(`<script type="application/ld+json">${jsonLd(structuredData)}</script>`)}
	`;
}

function absoluteUrl(path: string): string {
	return new URL(path, SITE_URL).toString();
}

function jsonLd(data: unknown): string {
	return JSON.stringify(data).replace(/</g, '\\u003c');
}
