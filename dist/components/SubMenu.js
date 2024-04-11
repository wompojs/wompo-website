import{defineWompo as f,html as l,useLayoutEffect as m,useRef as c}from"wompo";import{NavLink as t,useCurrentRoute as g}from"wompo-router";export default function r({item:n,prefix:p,styles:s}){const u=g(),i=u.startsWith(p),o=c(null),e=c();return m(()=>{o.current||(o.current=e.current.clientHeight),i?e.current.style.maxHeight=`${o.current}px`:e.current.style.maxHeight="0px"},[u]),l`
			<${t} to=${n.link} class=${`link ${s.hasMenu} ${i&&s.active}`}>
				<span>${n.title}</span>
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
			</${t}>
			<ul ref=${e} class=${s.subMenu}>
				${n.subRoutes.map(a=>l`
					<li>
						<${t} class='link' to=${a.link}>
							${a.title}
						</${t}>
					</li>
				`)}
			</ul>
	`}r.css=`
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
`,f(r,{name:"sub-menu"});
