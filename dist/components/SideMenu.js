import { Fragment, jsx, jsxs } from "womp/jsx-runtime";
import { defineWomp, useLayoutEffect, useRef, useState } from "womp";
import { NavLink } from "womp-router";
export default function SideMenu({ styles: s, menu, title }) {
  const [active, setActive] = useState(true);
  const maxHeight = useRef(null);
  const subMenuRef = useRef();
  useLayoutEffect(() => {
    if (subMenuRef.current) {
      maxHeight.current = subMenuRef.current.clientHeight;
      setActive(false);
    }
  }, []);
  const subMenusStyle = {
    maxHeight: active ? `${maxHeight.current}px` : "0px"
  };
  if (maxHeight.current == null)
    delete subMenusStyle.maxHeight;
  return /* @__PURE__ */ jsx("aside", { class: s.menu, children: /* @__PURE__ */ jsxs("nav", { children: [
    title,
    /* @__PURE__ */ jsx("ul", { class: s.ul, children: menu.map((item) => /* @__PURE__ */ jsx("li", { children: item.menu ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(NavLink, { to: item.link, class: `${s.link} ${s.hasMenu}`, children: [
        /* @__PURE__ */ jsx("span", { children: item.title }),
        /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "16",
            height: "16",
            fill: "currentColor",
            viewBox: "0 0 16 16",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                "fill-rule": "evenodd",
                d: "M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsx("ul", { ref: subMenuRef, class: s.subMenu, style: subMenusStyle, children: item.menu.map((subMenuItem) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(NavLink, { class: s.link, to: subMenuItem.link, children: subMenuItem.title }) })) })
    ] }) : /* @__PURE__ */ jsx(NavLink, { class: s.link, to: item.link, children: item.title }) })) })
  ] }) });
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
