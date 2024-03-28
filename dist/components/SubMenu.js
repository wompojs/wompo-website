import { Fragment, jsx, jsxs } from "womp/jsx-runtime";
import { defineWomp, useLayoutEffect, useRef } from "womp";
import { NavLink, useCurrentRoute } from "womp-router";
export default function SubMenu({ item, styles: s }) {
  const currentRoute = useCurrentRoute();
  const active = currentRoute.startsWith("/docs/hooks");
  const maxHeight = useRef(null);
  const subMenuRef = useRef();
  useLayoutEffect(() => {
    if (!maxHeight.current)
      maxHeight.current = subMenuRef.current.clientHeight;
    if (active)
      subMenuRef.current.style.maxHeight = `${maxHeight.current}px`;
    else
      subMenuRef.current.style.maxHeight = `0px`;
  }, [currentRoute]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(NavLink, { to: item.link, class: `link ${s.hasMenu}`, children: [
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
    /* @__PURE__ */ jsx("ul", { ref: subMenuRef, class: s.subMenu, children: item.menu.map((subMenuItem) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(NavLink, { class: "link", to: subMenuItem.link, children: subMenuItem.title }) })) })
  ] });
}
SubMenu.css = `
  .subMenu {
		transition: all .3s ease-in-out;
		overflow: hidden;
		list-style: none;
		padding: 0;
	}
  .hasMenu a {
		align-items: center;
		justify-content: space-between;
	}
  .hasMenu svg {
    transition: all .3s ease-in-out;
  }
  .hasMenu a[class="active"] svg {
    transform: rotate(90deg);
  }
`;
defineWomp(SubMenu);
