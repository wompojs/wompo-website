import { defineWompo, html, unsafelyRenderString, type WompoProps } from 'wompo';
import { type Messages } from 'seawomp/i18n';
import Header from '../src/components/Header.js';
import Footer from '../src/components/Footer.js';

interface Props extends WompoProps {
	data?: { locale?: string; messages?: Messages } | null;
	url?: URL;
}

const NONCE = 'WMPnf03nceIJfn22wc3e9h3wwfg3';

const SERVICE_WORKER_CLEANUP = `
(function () {
	if (!('serviceWorker' in navigator)) return;
	navigator.serviceWorker
		.getRegistrations()
		.then(function (regs) {
			if (!regs.length) return false;
			return Promise.all(regs.map(function (r) { return r.unregister(); }))
				.then(function () { return true; });
		})
		.then(function (hadRegistrations) {
			if (!hadRegistrations) return;
			var clearCaches = window.caches
				? caches.keys().then(function (keys) {
					return Promise.all(keys.map(function (k) { return caches.delete(k); }));
				  })
				: Promise.resolve();
			return clearCaches.then(function () {
				try {
					if (!sessionStorage.getItem('wompoSwCleanupDone')) {
						sessionStorage.setItem('wompoSwCleanupDone', '1');
						location.reload();
					}
				} catch (_) {}
			});
		})
		.catch(function () {});
})();
`;

const LANGUAGE_SYNC = `
document.documentElement.lang = location.pathname.split('/').filter(Boolean)[0] === 'it' ? 'it' : 'en';
`;

const THEME_BOOTSTRAP = `
(function () {
	var key = 'wompo-theme';
	var darkColor = '#080511';
	var lightColor = '#ffffff';
	function isValidTheme(theme) {
		return theme === 'dark' || theme === 'light';
	}
	function getStoredTheme() {
		try {
			var stored = localStorage.getItem(key);
			return isValidTheme(stored) ? stored : null;
		} catch (_) {
			return null;
		}
	}
	function setStoredTheme(theme) {
		try {
			localStorage.setItem(key, theme);
		} catch (_) {}
	}
	function getPreferredTheme() {
		var stored = getStoredTheme();
		if (stored) return stored;
		return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light';
	}
	function updateToggleButtons(theme) {
		var buttons = document.querySelectorAll('[data-theme-toggle]');
		for (var i = 0; i < buttons.length; i += 1) {
			var button = buttons[i];
			var label = theme === 'dark'
				? button.getAttribute('data-label-light')
				: button.getAttribute('data-label-dark');
			if (label) {
				button.setAttribute('aria-label', label);
				button.setAttribute('title', label);
			}
			button.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
			button.setAttribute('data-theme-state', theme);
		}
	}
	function applyTheme(theme) {
		if (!isValidTheme(theme)) theme = getPreferredTheme();
		document.documentElement.dataset.theme = theme;
		document.documentElement.style.colorScheme = theme;
		var meta = document.querySelector('meta[name="theme-color"]');
		if (meta) meta.setAttribute('content', theme === 'dark' ? darkColor : lightColor);
		updateToggleButtons(theme);
	}
	window.__wompoApplyTheme = applyTheme;
	applyTheme(getPreferredTheme());
	document.addEventListener('click', function (event) {
		var target = event.target;
		var button = target && target.closest ? target.closest('[data-theme-toggle]') : null;
		if (!button) return;
		event.preventDefault();
		var nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
		setStoredTheme(nextTheme);
		applyTheme(nextTheme);
	});
	document.addEventListener('DOMContentLoaded', function () {
		applyTheme(document.documentElement.dataset.theme);
	});
	window.addEventListener('seawomp:navigated', function () {
		applyTheme(document.documentElement.dataset.theme);
	});
})();
`;

const CODE_COPY_RUNTIME = `
(function () {
	if (window.__wompoCopyRuntime) return;
	window.__wompoCopyRuntime = true;
	function findCode(btn) {
		var root = btn.closest('.code-block, .homeCodeWindow, .homeRenderWindow') || btn.parentElement;
		return root && root.querySelector('pre code, code');
	}
	function copyText(text) {
		if (navigator.clipboard && navigator.clipboard.writeText) {
			return navigator.clipboard.writeText(text);
		}
		return new Promise(function (resolve, reject) {
			try {
				var area = document.createElement('textarea');
				area.value = text;
				area.style.position = 'fixed';
				area.style.opacity = '0';
				document.body.appendChild(area);
				area.select();
				document.execCommand('copy');
				document.body.removeChild(area);
				resolve();
			} catch (e) { reject(e); }
		});
	}
	document.addEventListener('click', function (event) {
		var btn = event.target && event.target.closest ? event.target.closest('.code-copy-btn') : null;
		if (!btn) return;
		event.preventDefault();
		var code = findCode(btn);
		if (!code) return;
		copyText(code.textContent || '').then(function () {
			btn.classList.add('copied');
			var label = btn.querySelector('.code-copy-label');
			var original = label ? label.textContent : null;
			if (label) label.textContent = btn.getAttribute('data-copied-label') || 'Copied';
			window.clearTimeout(btn.__copyTimer);
			btn.__copyTimer = window.setTimeout(function () {
				btn.classList.remove('copied');
				if (label && original !== null) label.textContent = original;
			}, 1600);
		}).catch(function () {});
	});
})();
`;

const ANALYTICS_AND_COOKIE = `
(function () {
	if (location.hostname !== 'wompo.dev') return;
	var runWhenIdle = window.requestIdleCallback || function (cb) { window.setTimeout(cb, 1600); };
	var appendScript = function (src, async) {
		var script = document.createElement('script');
		script.src = src;
		script.async = async !== false;
		document.head.appendChild(script);
	};

	runWhenIdle(function () {
		window.dataLayer = window.dataLayer || [];
		window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
		window.gtag('js', new Date());
		window.gtag('config', 'G-W9N2P2NZQG');
		appendScript('https://www.googletagmanager.com/gtag/js?id=G-W9N2P2NZQG');

		window._iub = window._iub || [];
		window._iub.csConfiguration = {
			askConsentAtCookiePolicyUpdate: true,
			enableFadp: true,
			enableLgpd: true,
			enableUspr: true,
			fadpApplies: true,
			floatingPreferencesButtonColor: '#205E4900',
			floatingPreferencesButtonDisplay: 'anchored-bottom-left',
			lang: document.documentElement.lang || 'en',
			perPurposeConsent: true,
			siteId: 3581877,
			usprApplies: true,
			whitelabel: false,
			cookiePolicyId: 24984791,
			banner: {
				acceptButtonCaptionColor: '#FFFFFF',
				acceptButtonColor: '#573EF6',
				acceptButtonDisplay: true,
				backgroundColor: '#FFFFFF',
				closeButtonRejects: true,
				customizeButtonCaptionColor: '#4D4D4D',
				customizeButtonColor: '#DADADA',
				customizeButtonDisplay: true,
				explicitWithdrawal: true,
				listPurposes: true,
				position: 'float-bottom-left',
				rejectButtonCaptionColor: '#FFFFFF',
				rejectButtonColor: '#573EF6',
				rejectButtonDisplay: true,
				showPurposesToggles: true,
				showTitle: false,
				textColor: '#000000',
			},
		};
		appendScript('https://cs.iubenda.com/autoblocking/3581877.js');
		appendScript('https://cdn.iubenda.com/cs/gpp/stub.js');
		appendScript('https://cdn.iubenda.com/cs/iubenda_cs.js');
	});
})();
`;

const CSP = `
	default-src 'self';
	script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://cs.iubenda.com https://cdn.iubenda.com https://*.iubenda.com;
	script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com https://cs.iubenda.com https://cdn.iubenda.com https://*.iubenda.com;
	connect-src 'self' https://*.googletagmanager.com https://*.iubenda.com https://*.google-analytics.com;
	style-src 'self' 'unsafe-inline' https://cdn.iubenda.com https://*.iubenda.com;
	style-src-elem 'self' 'unsafe-inline' https://cdn.iubenda.com https://*.iubenda.com;
	font-src 'self' data:;
	img-src 'self' data: https://*.googletagmanager.com https://*.iubenda.com;
	frame-src 'self' https://*.iubenda.com;
`;

function RootLayout({ children, data, url }: Props) {
	return html`
		<${Header} locale=${data?.locale} pathname=${url?.pathname} />
		${children}
		<${Footer} messages=${data?.messages} />
	`;
}

RootLayout.css = `
	:host {
		display: block;
		min-height: 100vh;
	}
	wompo-header {
		position: fixed;
	}
	seawomp-route-view {
		display: block;
	}
`;

defineWompo(RootLayout, { name: 'wompo-root-layout' });
export default RootLayout;

export function head() {
	return html`
		<meta name="theme-color" content="#ffffff" />
		${script(THEME_BOOTSTRAP)}
		<link rel="stylesheet" href="/global.css" />
		<link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
		<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
		<link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
		<link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#573EF6" />
		<meta name="msapplication-TileColor" content="#573EF6" />
		<link rel="icon" type="image/x-icon" href="/icons/favicon.ico" />
		<link rel="manifest" href="/manifest.json" />
		<meta property="og:site_name" content="Wompo" />
		<meta property="og:image" itemprop="image" content="https://wompo.dev/wompo-preview.jpg" />
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="author" content="Lorenzo Lannino" />
		<meta http-equiv="Content-Security-Policy" content="${CSP}" />
		${script(LANGUAGE_SYNC)} ${script(CODE_COPY_RUNTIME)} ${script(SERVICE_WORKER_CLEANUP)}
		${script(ANALYTICS_AND_COOKIE)}
	`;
}

function script(body: string) {
	return unsafelyRenderString(`<script nonce="${NONCE}">${safeScript(body)}</script>`);
}

function safeScript(body: string): string {
	return body.replace(/<\/script/gi, '<\\/script');
}
