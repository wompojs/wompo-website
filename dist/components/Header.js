import { jsx as _jsx } from "womp/jsx-runtime";
import { defineWomp } from 'womp';
const menu = [
    {
        title: 'Home',
        link: '/',
    },
    {
        title: 'Docs',
        link: '/docs',
    },
];
export default function Header({ styles: s }) {
    return (_jsx("header", { class: s.header, children: _jsx("ul", { children: menu.map((item) => (_jsx("li", { children: _jsx("a", { href: item.link, children: item.title }) }))) }) }));
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
