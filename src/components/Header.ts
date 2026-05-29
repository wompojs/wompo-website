import { type WompoProps, defineWompo, html, type RenderHtml, useEffect, useState } from 'wompo';
import { Link } from 'seawomp/components';
import Logo from './Logo.js';
import MenuIcon from './MenuIcon.js';

interface HeaderProps extends WompoProps {
	menuIcon?: RenderHtml;
	/** "transparent": header starts see-through over hero. Default opaque. */
	mode?: 'transparent' | 'opaque';
	locale?: string;
	pathname?: string;
	toggleMenu?: () => void;
	menuOpen?: boolean;
}

const SUPPORTED_LOCALES = ['en', 'it'] as const;
const DEFAULT_LOCALE = 'en';
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

function normalizeLocale(locale?: string): SupportedLocale {
	return SUPPORTED_LOCALES.includes(locale as SupportedLocale)
		? (locale as SupportedLocale)
		: DEFAULT_LOCALE;
}

function getInitialPathname(pathname?: string): string {
	if (pathname) return pathname;
	if (typeof window === 'undefined') return '/';
	return window.location.pathname;
}

function getInitialLocale(locale?: string): SupportedLocale {
	if (locale) return normalizeLocale(locale);
	if (typeof document === 'undefined') return DEFAULT_LOCALE;
	return normalizeLocale(document.documentElement.lang);
}

function stripLocalePrefix(pathname: string): string {
	const first = pathname.split('/').filter(Boolean)[0];
	if (!first || !SUPPORTED_LOCALES.includes(first as SupportedLocale)) return pathname;
	const prefix = '/' + first;
	if (pathname === prefix) return '/';
	if (pathname.startsWith(prefix + '/')) return pathname.slice(prefix.length);
	return pathname;
}

function isHomePath(pathname: string): boolean {
	return pathname === '/' || pathname === '/it' || pathname === '/it/';
}

const sunIcon = html`
	<svg
		aria-hidden="true"
		viewBox="0 0 24 24"
		width="18"
		height="18"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<circle cx="12" cy="12" r="4"></circle>
		<path d="M12 2v2"></path>
		<path d="M12 20v2"></path>
		<path d="m4.93 4.93 1.41 1.41"></path>
		<path d="m17.66 17.66 1.41 1.41"></path>
		<path d="M2 12h2"></path>
		<path d="M20 12h2"></path>
		<path d="m6.34 17.66-1.41 1.41"></path>
		<path d="m19.07 4.93-1.41 1.41"></path>
	</svg>
`;

const moonIcon = html`
	<svg
		aria-hidden="true"
		viewBox="0 0 24 24"
		width="18"
		height="18"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<path d="M20.99 12.54A8.5 8.5 0 1 1 11.46 3.01 6.5 6.5 0 0 0 20.99 12.54Z"></path>
	</svg>
`;

export default function Header({
	styles: s,
	menuIcon,
	mode,
	locale: localeProp,
	pathname: pathnameProp,
	toggleMenu,
	menuOpen,
}: HeaderProps) {
	const [locale, setLocale] = useState(getInitialLocale(localeProp));
	const [pathname, setPathname] = useState(getInitialPathname(pathnameProp));
	const transparent = mode === 'transparent' || isHomePath(pathname);

	useEffect(() => {
		if (!localeProp) return;
		setLocale(normalizeLocale(localeProp));
	}, [localeProp]);

	useEffect(() => {
		if (!pathnameProp) return;
		setPathname(pathnameProp);
	}, [pathnameProp]);

	useEffect(() => {
		const sync = () => {
			setLocale(normalizeLocale(document.documentElement.lang));
			setPathname(window.location.pathname);
		};
		sync();
		window.addEventListener('seawomp:navigated', sync);
		return () => window.removeEventListener('seawomp:navigated', sync);
	}, []);

	const headerClasses = [
		s.header,
		transparent ? s.transparentHeader : '',
		!transparent ? s.solid : '',
		!transparent ? s.opaque : '',
	]
		.filter(Boolean)
		.join(' ');

	const langSwitchHref = stripLocalePrefix(pathname) || '/';
	const labels =
		locale === 'it'
			? {
					docs: 'Docs',
					donate: 'Sostieni',
					homepage: 'Homepage',
					language: 'Lingua',
					themeDark: 'Attiva modalita scura',
					themeLight: 'Attiva modalita chiara',
				}
			: {
					docs: 'Docs',
					donate: 'Donate',
					homepage: 'Homepage',
					language: 'Language',
					themeDark: 'Enable dark mode',
					themeLight: 'Enable light mode',
				};

	return html`
		<header class=${headerClasses}>
			<div class=${s.brandCluster}>
				${
					!transparent &&
					html`
						<button
							class=${s.menuButton}
							aria-label="Toggle documentation menu"
							aria-expanded=${menuOpen ? 'true' : 'false'}
							@click=${toggleMenu}
						>
							<${MenuIcon} open=${menuOpen} />
						</button>
					`
				}
				<div class=${s.logo}>
					${menuIcon && menuIcon}
					<${Link} href="/" title=${labels.homepage}>
						<${Logo} />
					</${Link}>
				</div>
			</div>

			<ul>
				<li>
					<${Link} href="/docs/introduction" class=${s.link}>${labels.docs}</${Link}>
				</li>
				<li>
					<a class=${s.link} href="https://ko-fi.com/wompo" target="_blank">
						${labels.donate}
					</a>
				</li>
				<li>
					<a class="${s.link}" href="https://github.com/wompojs/wompo" target="_blank">
						Github
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							viewBox="0 0 16 16"
						>
							<path
								d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
							/>
						</svg>
					</a>
				</li>
				<li class=${s.langSwitcher} aria-label=${labels.language}>
					<${Link}
						href=${langSwitchHref}
						locale="en"
						follow="path"
						class=${`${s.langLink} ${locale === 'en' ? s.langLinkActive : ''}`}
						ariaCurrent=${locale === 'en' ? 'true' : 'false'}
					>EN</${Link}>
					<span class=${s.langSep} aria-hidden="true">/</span>
					<${Link}
						href=${langSwitchHref}
						locale="it"
						follow="path"
						class=${`${s.langLink} ${locale === 'it' ? s.langLinkActive : ''}`}
						ariaCurrent=${locale === 'it' ? 'true' : 'false'}
					>IT</${Link}>
				</li>
				<li>
					<button
						class=${s.themeToggle}
						type="button"
						data-theme-toggle="true"
						data-theme-state="light"
						data-label-dark=${labels.themeDark}
						data-label-light=${labels.themeLight}
						aria-label=${labels.themeDark}
						aria-pressed="false"
						title=${labels.themeDark}
					>
						<span class=${s.themeIconDark}>${moonIcon}</span>
						<span class=${s.themeIconLight}>${sunIcon}</span>
					</button>
				</li>
			</ul>
		</header>
	`;
}
Header.css = `
	wompo-header {
		display: block;
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		z-index: 100;
		color: var(--site-text-strong);
	}
  .header {
		position: relative;
    padding: 10px 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: var(--site-header-bg);
		box-shadow: 0 1px 0 var(--site-border);
		color: inherit;
		transition: color .28s ease, background-color .28s ease, box-shadow .28s ease, backdrop-filter .28s ease;
  }
	.opaque {
		background-color: var(--site-header-bg);
		box-shadow: 0 1px 0 var(--site-border);
		color: var(--site-text-strong);
	}
	.transparentHeader {
		background-color: transparent;
		box-shadow: none;
		color: #fff;
		backdrop-filter: blur(8px);
		box-shadow: 0px 0px 9px 0px #00000040;
	}
	.transparentHeader.solid {
		background-color: var(--site-header-glass);
		backdrop-filter: blur(14px);
		box-shadow: 0 1rem 3rem var(--site-shadow-strong);
		color: var(--site-text-strong);
	}
  .header ul, .logo {
    display: flex;
		gap: 5px;
    list-style: none;
		align-items: center;
    padding: 0;
    margin: 0;
  }
	.brandCluster {
		display: flex;
		align-items: center;
		gap: 1.2rem;
	}
	.header ul li {
		list-style: none;
	}
	.header .link {
    padding: 10px;
		border-radius: 8px;
  }
	.header ul li .link:hover {
		background-color: var(--site-primary-soft);
	}
	.header ul svg {
		width: 2rem;
		height: 2rem;
	}
  .header a {
    color: currentColor;
    text-decoration: none;
  }
	.link {
		display: flex;
		align-items: center;
		gap: 10px;
		cursor: pointer;
	}
	.langSwitcher {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		margin-left: 0.4rem;
	}
	.langSwitcher .langLink {
		padding: 0.4rem 0.6rem;
		font-size: 1.35rem;
		font-weight: 500;
		opacity: 0.7;
		letter-spacing: 0.04em;
		border-radius: 6px;
		transition: opacity .15s, color .15s;
	}
	.langSwitcher .langLink:hover {
		opacity: 1;
		background: transparent;
	}
	.langSwitcher .langLinkActive {
		font-weight: 800;
		opacity: 1;
	}
	.langSep {
		opacity: 0.45;
		font-weight: 500;
		font-size: 1.35rem;
		user-select: none;
	}
	.themeToggle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 4rem;
		height: 4rem;
		padding: 0;
		border: 1px solid transparent;
		border-radius: 8px;
		background: transparent;
		color: currentColor;
		cursor: pointer;
		transition: background-color .16s, border-color .16s, color .16s, transform .16s;
	}
	.themeToggle:hover {
		background: var(--site-primary-soft);
		border-color: var(--site-border);
		transform: translateY(-1px);
	}
	.themeToggle:focus-visible {
		outline: 2px solid var(--site-primary);
		outline-offset: 2px;
	}
	.themeToggle svg {
		width: 1.8rem;
		height: 1.8rem;
	}
	.themeIconDark,
	.themeIconLight {
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}
	.themeIconLight,
	.themeToggle[data-theme-state="dark"] .themeIconDark {
		display: none;
	}
	.themeToggle[data-theme-state="dark"] .themeIconLight {
		display: inline-flex;
	}
	.menuButton {
		display: none;
		color: var(--site-primary);
		cursor: pointer;
		padding: 0.8rem;
		border-radius: 8px;
		background: transparent;
		border: 1px solid var(--docs-border);
	}
	@media (width < 700px){
		.link {
			gap: 4px;
		}
		.link svg, .link img {
			display: none;
		}
	}
	@media (width < 1050px){
		.menuButton {
			display: flex;
			align-items: center;
		}
	}
`;

defineWompo(Header, {
	name: 'wompo-header',
	island: 'load',
});
