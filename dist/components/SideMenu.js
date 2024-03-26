import { jsx, jsxs } from "womp/jsx-runtime";
import { defineWomp } from "womp";
import { Link } from "womp-router";
export default function SideMenu({ styles: s, menu, title }) {
  return /* @__PURE__ */ jsx("aside", { class: s.menu, children: /* @__PURE__ */ jsxs("nav", { children: [
    title,
    /* @__PURE__ */ jsx("ul", { class: s.ul, children: menu.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: item.link, children: item.title }) })) })
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
	.ul womp-link {
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
  .ul a:hover {
    background-color: #573ef640;
  }
`;
defineWomp(SideMenu);
