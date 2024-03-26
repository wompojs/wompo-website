import { jsx } from "womp/jsx-runtime";
import { defineWomp } from "womp";
const menu = [
  {
    title: "Home",
    link: "/"
  },
  {
    title: "Docs",
    link: "/docs"
  }
];
export default function Header({ styles: s }) {
  return /* @__PURE__ */ jsx("header", { class: s.header, children: /* @__PURE__ */ jsx("ul", { children: menu.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: item.link, children: item.title }) })) }) });
}
Header.css = `
	:host {
		display: block;
		position: sticky;
		top: 0;
		left: 0;
		width: 100vw;
		background-color: #fff;
		z-index: 100;
		box-shadow: 1px 1px 4px #00000040;
	}
  .header {
    padding: 20px;
  }
  .header ul {
    display: flex;
    gap: 20px;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .header ul li a {
    color: #333;
    text-decoration: none;
  }
`;
defineWomp(Header);
