import { jsx, jsxs } from "womp/jsx-runtime";
import { defineWomp } from "womp";
import { NavLink } from "womp-router";
import SubMenu from "./SubMenu.js";
export default function SideMenu({ styles: s, menu, title }) {
  return /* @__PURE__ */ jsx("aside", { class: s.menu, children: /* @__PURE__ */ jsxs("nav", { children: [
    title,
    /* @__PURE__ */ jsx("ul", { class: s.ul, children: menu.map((item) => /* @__PURE__ */ jsx("li", { children: item.menu ? /* @__PURE__ */ jsx(SubMenu, { item, prefix: item.link }) : /* @__PURE__ */ jsx(NavLink, { class: "link", to: item.link, children: item.title }) })) })
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
	.ul [class*="link"] {
		width: 100%;
	}
  .ul a {
    text-decoration: none;
    color: #573ef6;
    padding: 10px 20px;
    display: flex;
    transition: all .1s;
    border-radius: 30px;
  }
  .ul a:hover, .ul a[class="active"] {
    background-color: #573ef640;
  }
`;
defineWomp(SideMenu);
