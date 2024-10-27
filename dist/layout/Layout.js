import{defineWompo as d,useState as a,html as n,useEffect as m}from"wompo";import l from"../components/Header.js";import f from"../components/SideMenu.js";import{ChildRoute as p}from"wompo-router";import u from"../components/Footer.js";import c from"../components/MenuIcon.js";import{useCurrentRoute as $}from"wompo-router";import{docsRoutes as y}from"../utils/routes.js";export default function i({styles:o}){const[e,t]=a(!1),r=$(),s=()=>{e?(document.body.style.overflow="auto",t(!1)):(document.body.style.overflow="hidden",t(!0))};return m(()=>{document.body.style.overflow="auto",t(!1)},[r]),n`
		<div>
			<${l}
				menuIcon=${n`<${c} class=${o.icon} open=${e} @click=${s} />`}
			/>
			<div class=${o.pageContent}>
				<${f}
					class=${`${o.menu} ${e&&o.open}`}
					menu=${y}
					title=${n`<div style=${{fontSize:14,color:"#585858",padding:"2rem"}}>
						wompo@1.2.2
					</div>`}
				/>
				<div style=${{width:"100%"}}>
					<${p} />
				</div>
			</div>
			<${u} class=${o.footer} />
		</div>
	`}i.css=`
	.pageContent {
		display: flex;
		height: 100%;
		background-color: #fff;
		z-index: 2;
		position: relative;
	}
	.footer {
		width: 100%;
	}
	.icon {
		display: none;
	}

	@media (width < 1300px){
		.pageContent [class="side-content"] {
			display: none;
		}
	}

	@media (width < 1050px){
		.icon {
			display: block;
		}
		.menu {
			box-shadow: 0 0 10px #0004;
			transition: transform .3s ease-in-out;
			background-color: #fff;
			position: fixed;
			left: 0;
			z-index: 1000;
			top: 60px;
			bottom: 0;
			width: 100vw;
			max-width: 50rem;
			transform: translateX(-105%);
			height: unset;
		}
		.menu.open {
			transform: translateX(0);
		}
	}
`,d(i,{name:"docs-layout"});
