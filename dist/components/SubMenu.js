import { Fragment as d, jsx as e, jsxs as f } from 'wompo/jsx-runtime';
import { defineWompo as m, useLayoutEffect as g, useRef as o } from 'wompo';
import { NavLink as c, useCurrentRoute as h } from 'wompo-router';
export default function r({ item: n, prefix: p, styles: s }) {
	const u = h(),
		a = u.startsWith(p),
		i = o(null),
		t = o();
	return (
		g(() => {
			i.current || (i.current = t.current.clientHeight),
				a ? (t.current.style.maxHeight = `${i.current}px`) : (t.current.style.maxHeight = '0px');
		}, [u]),
		f(d, {
			children: [
				f(c, {
					to: n.link,
					class: `link ${s.hasMenu} ${a && s.active}`,
					children: [
						e('span', { children: n.title }),
						e('svg', {
							xmlns: 'http://www.w3.org/2000/svg',
							width: '16',
							height: '16',
							fill: 'currentColor',
							viewBox: '0 0 16 16',
							children: e('path', {
								'fill-rule': 'evenodd',
								d: 'M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708',
							}),
						}),
					],
				}),
				e('ul', {
					ref: t,
					class: s.subMenu,
					children: n.menu.map((l) =>
						e('li', { children: e(c, { class: 'link', to: l.link, children: l.title }) })
					),
				}),
			],
		})
	);
}
(r.css = `
  .subMenu {
		transition: all .3s ease-in-out;
		overflow: hidden;
		list-style: none;
		padding: 0;
	}
	.subMenu a {
		font-size: 16px;
		padding-left: 4rem !important;
	}
  .hasMenu a {
		align-items: center;
		justify-content: space-between;
	}
  .hasMenu svg {
    transition: all .3s ease-in-out;
  }
  .hasMenu.active svg {
    transform: rotate(90deg);
  }
`),
	m(r, { name: 'sub-menu' });
