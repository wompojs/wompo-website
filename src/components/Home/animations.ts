/* GSAP-driven motion for the homepage.
 *
 * - Hero entrance: stagger fade + slide-up on eyebrow / h1 / lead / install / actions
 * - Hero h1 text-reveal: split into chars and stagger them in from below
 * - Floating code lines: gentle infinite drift, gated by reduced-motion
 * - Pointer parallax: code-line boxes drift toward the cursor
 * - ScrollTrigger reveals: any [data-gsap-reveal] fades+slides as it enters the viewport
 * - Click ripple: a subtle scale-bump on .homeButton when clicked
 *
 * Returns a teardown callback so the host component can disconnect listeners + kill timelines
 * on unmount or SPA navigation away.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Teardown = () => void;

export function setupHomeAnimations(root: HTMLElement | null): Teardown {
	if (!root) return () => {};
	const page = root.querySelector<HTMLElement>('.homePage');
	if (!page) return () => {};
	if (page.dataset.homeMotionBooted === 'true') return () => {};
	page.dataset.homeMotionBooted = 'true';

	const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
	const teardowns: Teardown[] = [];

	if (!reducedMotion) {
		teardowns.push(splitAndRevealHeroTitle(page));
		teardowns.push(animateHeroEntrance(page));
		teardowns.push(floatCodeLines(page));
		teardowns.push(pointerParallax(page));
	}
	teardowns.push(scrollReveals(page));
	teardowns.push(buttonClickBump(page));

	return () => {
		teardowns.forEach((fn) => fn());
		delete page.dataset.homeMotionBooted;
	};
}

function splitAndRevealHeroTitle(page: HTMLElement): Teardown {
	const h1 = page.querySelector<HTMLElement>('.homeHero h1');
	if (!h1) return () => {};
	const text = (h1.textContent ?? '').trim();
	if (!text) return () => {};
	// Replace text with span-wrapped chars (non-destructive: we restore on teardown).
	// The h1 stays block-level so it doesn't share a line with the eyebrow above it;
	// overflow:hidden clips the chars while they slide in from below.
	const original = h1.innerHTML;
	h1.innerHTML = text
		.split('')
		.map((ch) => `<span class="charReveal" aria-hidden="true">${ch === ' ' ? '&nbsp;' : ch}</span>`)
		.join('');
	h1.setAttribute('aria-label', text);
	const chars = h1.querySelectorAll<HTMLElement>('.charReveal');
	gsap.set(chars, { yPercent: 110, opacity: 0 });
	const tween = gsap.to(chars, {
		yPercent: 0,
		opacity: 1,
		duration: 0.7,
		ease: 'expo.out',
		stagger: 0.04,
		delay: 0.15,
	});
	h1.style.overflow = 'hidden';
	chars.forEach((c) => {
		c.style.display = 'inline-block';
		c.style.willChange = 'transform, opacity';
	});
	return () => {
		tween.kill();
		h1.innerHTML = original;
		h1.style.overflow = '';
		h1.removeAttribute('aria-label');
	};
}

function animateHeroEntrance(page: HTMLElement): Teardown {
	const targets = page.querySelectorAll<HTMLElement>(
		'.homeHero__eyebrow, .homeHero__lead, .homeInstallCommand, .homeHero__actions',
	);
	if (!targets.length) return () => {};
	gsap.set(targets, { y: 24, opacity: 0 });
	const tween = gsap.to(targets, {
		y: 0,
		opacity: 1,
		duration: 0.85,
		ease: 'power3.out',
		stagger: 0.12,
		delay: 0.2,
	});
	return () => tween.kill();
}

/* Two transform layers per code line to keep the autonomous drift and the pointer parallax
 * from fighting over the same transform matrix (root cause of the visible "snap-back" jumps
 * the user saw). The wrapper [data-home-codeline-host] receives the pointer parallax; the
 * inner .homeHero__codeLine receives the looping drift tween. They compose cleanly. */
function floatCodeLines(page: HTMLElement): Teardown {
	const tweens: gsap.core.Tween[] = [];
	const drift = [
		{ selector: '.homeHero__codeLineHost.lineOne .homeHero__codeLine', x: 18, y: -10, duration: 4 },
		{ selector: '.homeHero__codeLineHost.lineTwo .homeHero__codeLine', x: -16, y: 12, duration: 4.8 },
		{ selector: '.homeHero__codeLineHost.lineThree .homeHero__codeLine', x: 12, y: 14, duration: 4.4 },
	];
	for (const d of drift) {
		const el = page.querySelector<HTMLElement>(d.selector);
		if (!el) continue;
		tweens.push(
			gsap.to(el, {
				x: d.x,
				y: d.y,
				duration: d.duration,
				ease: 'sine.inOut',
				yoyo: true,
				repeat: -1,
			}),
		);
	}
	return () => tweens.forEach((t) => t.kill());
}

function pointerParallax(page: HTMLElement): Teardown {
	const hosts = Array.from(page.querySelectorAll<HTMLElement>('[data-home-codeline-host]'));
	const hero = page.querySelector<HTMLElement>('.homeHero');
	if (!hosts.length || !hero) return () => {};
	const quickX = hosts.map((el) => gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power2.out' }));
	const quickY = hosts.map((el) => gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power2.out' }));
	const handler = (event: PointerEvent) => {
		const rect = hero.getBoundingClientRect();
		const cx = (event.clientX - rect.left) / rect.width - 0.5;
		const cy = (event.clientY - rect.top) / rect.height - 0.5;
		hosts.forEach((_, i) => {
			const depth = (i + 1) * 14;
			quickX[i](cx * depth);
			quickY[i](cy * depth);
		});
	};
	hero.addEventListener('pointermove', handler);
	return () => hero.removeEventListener('pointermove', handler);
}

function scrollReveals(page: HTMLElement): Teardown {
	const elements = Array.from(page.querySelectorAll<HTMLElement>('[data-gsap-reveal]'));
	if (!elements.length) return () => {};
	const triggers: ScrollTrigger[] = [];
	for (const el of elements) {
		gsap.set(el, { y: 30, opacity: 0 });
		const tween = gsap.to(el, {
			y: 0,
			opacity: 1,
			duration: 0.8,
			ease: 'power3.out',
		});
		tween.pause();
		const trigger = ScrollTrigger.create({
			trigger: el,
			start: 'top 88%',
			once: true,
			onEnter: () => tween.play(),
		});
		triggers.push(trigger);
	}
	return () => triggers.forEach((t) => t.kill());
}

function buttonClickBump(page: HTMLElement): Teardown {
	const handler = (event: MouseEvent) => {
		const target = event.target as HTMLElement | null;
		if (!target) return;
		const link = target.closest<HTMLElement>('.homeButton, .homeTextLink');
		if (!link) return;
		gsap.fromTo(
			link,
			{ scale: 0.96 },
			{ scale: 1, duration: 0.35, ease: 'back.out(2)' },
		);
	};
	page.addEventListener('click', handler);
	return () => page.removeEventListener('click', handler);
}
