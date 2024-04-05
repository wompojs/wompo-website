import { defineWompo, useState, html, useEffect } from "wompo";
import Header from "../components/Header.js";
import SideMenu from "../components/SideMenu.js";
import { ChildRoute } from "wompo-router";
import Footer from "../components/Footer.js";
import MenuIcon from "../components/MenuIcon.js";
import { useCurrentRoute } from "wompo-router";
const mainMenu = [
  {
    title: "Overview",
    link: "overview"
  },
  {
    title: "Quick start",
    link: "quick-start"
  },
  {
    title: "Complex Example",
    link: "complex-example"
  },
  {
    title: "Styling",
    link: "/docs/styling"
  },
  {
    title: "Hooks",
    link: "/docs/hooks",
    menu: [
      {
        title: "useAsync",
        link: "/docs/hooks/useAsync"
      },
      {
        title: "useCallback",
        link: "/docs/hooks/useCallback"
      },
      {
        title: "useContext",
        link: "/docs/hooks/useContext"
      },
      {
        title: "useEffect",
        link: "/docs/hooks/useEffect"
      },
      {
        title: "useExposed",
        link: "/docs/hooks/useExposed"
      },
      {
        title: "useHook",
        link: "/docs/hooks/useHook"
      },
      {
        title: "useId",
        link: "/docs/hooks/useId"
      },
      {
        title: "useLayoutEffect",
        link: "/docs/hooks/useLayoutEffect"
      },
      {
        title: "useMemo",
        link: "/docs/hooks/useMemo"
      },
      {
        title: "useReducer",
        link: "/docs/hooks/useReducer"
      },
      {
        title: "useRef",
        link: "/docs/hooks/useRef"
      },
      {
        title: "useState",
        link: "/docs/hooks/useState"
      }
    ]
  },
  {
    title: "Custom hooks",
    link: "/docs/custom-hooks"
  },
  {
    title: "Components",
    link: "/docs/components",
    menu: [
      {
        title: "Suspense",
        link: "/docs/components/suspense"
      }
    ]
  },
  {
    title: "APIs",
    link: "/docs/apis",
    menu: [
      {
        title: "createContext",
        link: "/docs/apis/createContext"
      },
      {
        title: "defineWompo",
        link: "/docs/apis/defineWompo"
      },
      {
        title: "Element API",
        link: "/docs/apis/element"
      },
      {
        title: "html",
        link: "/docs/apis/html"
      },
      {
        title: "lazy",
        link: "/docs/apis/lazy"
      },
      {
        title: "registeredComponents",
        link: "/docs/apis/registeredComponents"
      },
      {
        title: "wompDefaultOptions",
        link: "/docs/apis/wompDefaultOptions"
      }
    ]
  },
  {
    title: "JSX",
    link: "/docs/jsx"
  },
  {
    title: "Typescript",
    link: "/docs/typescript"
  }
];
export default function Layout({ styles: s }) {
  const [open, setOpen] = useState(false);
  const currentRoute = useCurrentRoute();
  const toggleMenu = () => {
    if (open) {
      document.body.style.overflow = "auto";
      setOpen(false);
    } else {
      document.body.style.overflow = "hidden";
      setOpen(true);
    }
  };
  useEffect(() => {
    document.body.style.overflow = "auto";
    setOpen(false);
  }, [currentRoute]);
  return html`
		<div>
			<${Header}
				menuIcon=${html`<${MenuIcon} class=${s.icon} open=${open} @click=${toggleMenu} />`}
			/>
			<div class=${s.pageContent}>
				<${SideMenu}
					class=${`${s.menu} ${open && s.open}`}
					menu=${mainMenu}
					title=${html`<div style=${{ fontSize: 14, color: "#585858", padding: "2rem" }}>
						wompo@1.0.1
					</div>`}
				/>
				<div style=${{ width: "100%" }}>
					<${ChildRoute} />
				</div>
			</div>
			<${Footer} class=${s.footer} />
		</div>
	`;
}
Layout.css = `
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
			bottom: 0;
			z-index: 1000;
			top: unset;
			width: 100vw;
			max-width: 50rem;
			transform: translateX(-105%);
		}
		.menu.open {
			transform: translateX(0);
		}
	}
`;
defineWompo(Layout, {
  name: "docs-layout"
});
