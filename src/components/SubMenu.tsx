import { WompProps, defineWomp, useEffect, useLayoutEffect, useRef, useState } from 'womp';
import { MenuItem } from './SideMenu.js';
import { NavLink, useCurrentRoute } from 'womp-router';

interface SubMenuProps extends WompProps {
	item: MenuItem;
	prefix: string;
}

export default function SubMenu({ item, prefix, styles: s }: SubMenuProps) {
	const currentRoute = useCurrentRoute();
	const active = currentRoute.startsWith(prefix);
	const maxHeight = useRef<number>(null);
	const subMenuRef = useRef<HTMLElement>();

	useLayoutEffect(() => {
		if (!maxHeight.current) maxHeight.current = subMenuRef.current.clientHeight;
		if (active) subMenuRef.current.style.maxHeight = `${maxHeight.current}px`;
		else subMenuRef.current.style.maxHeight = `0px`;
	}, [currentRoute]);

	return (
		<>
			<NavLink to={item.link} class={`link ${s.hasMenu} ${active && s.active}`}>
				<span>{item.title}</span>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='16'
					height='16'
					fill='currentColor'
					viewBox='0 0 16 16'
				>
					<path
						fill-rule='evenodd'
						d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708'
					/>
				</svg>
			</NavLink>
			<ul ref={subMenuRef} class={s.subMenu}>
				{item.menu.map((subMenuItem) => (
					<li>
						<NavLink class='link' to={subMenuItem.link}>
							{subMenuItem.title}
						</NavLink>
					</li>
				))}
			</ul>
		</>
	);
}
SubMenu.css = `
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
`;

defineWomp(SubMenu, {
	name: 'sub-menu',
});
