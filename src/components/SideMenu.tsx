import { type WompProps, defineWomp, useLayoutEffect, useRef, useState } from 'womp';
import { Link, NavLink } from 'womp-router';

export interface MenuItem {
	title: string;
	link: string;
	menu?: MenuItem[];
}

interface SideMenuProps extends WompProps {
	menu: MenuItem[];
	title?: string;
}

export default function SideMenu({ styles: s, menu, title }: SideMenuProps) {
	const [active, setActive] = useState(true);
	const maxHeight = useRef<number>(null);
	const subMenuRef = useRef<HTMLElement>();
	useLayoutEffect(() => {
		if (subMenuRef.current) {
			maxHeight.current = subMenuRef.current.clientHeight;
			setActive(false);
		}
	}, []);
	const subMenusStyle: Partial<CSSStyleDeclaration> = {
		maxHeight: active ? `${maxHeight.current}px` : '0px',
	};
	if (maxHeight.current == null) delete subMenusStyle.maxHeight;
	return (
		<aside class={s.menu}>
			<nav>
				{title}
				<ul class={s.ul}>
					{menu.map((item) => (
						<li>
							{item.menu ? (
								<>
									<NavLink to={item.link} class={`${s.link} ${s.hasMenu}`}>
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
									<ul ref={subMenuRef} class={s.subMenu} style={subMenusStyle}>
										{item.menu.map((subMenuItem) => (
											<li>
												<NavLink class={s.link} to={subMenuItem.link}>
													{subMenuItem.title}
												</NavLink>
											</li>
										))}
									</ul>
								</>
							) : (
								<NavLink class={s.link} to={item.link}>
									{item.title}
								</NavLink>
							)}
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
}

SideMenu.css = `
	:host {
		padding-top: 70px;
		margin-top: -70px;
		display: block;
		position: sticky;
		top: 0;
		left: 0;
		height: 100vh;
		width: 20%;
		max-width: 30rem;
		overflow: auto;
	}
	.menu h3 {
		text-transform: uppercase;
		font-size: 2rem;
		font-weight: bold;
		color: #555;
	}
	.ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
  }
	.ul .link {
		width: 100%;
	}
  .ul a {
    text-decoration: none;
    color: #573ef6;
    padding: 10px 20px;
    display: block;
    transition: all .1s;
    border-radius: 30px;
  }
  .ul a:hover, .ul a[class="active"] {
    background-color: #573ef640;
  }
	.hasMenu a {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.subMenu {
		transition: all .3s ease-in-out;
		overflow: hidden;
	}
`;

defineWomp(SideMenu);
