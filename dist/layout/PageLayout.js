import { Fragment as _Fragment, jsx as _jsx } from "womp/jsx-runtime";
import { defineWomp } from 'womp';
export default function PageLayout({ children, styles: s }) {
    return _jsx(_Fragment, { children: children });
}
PageLayout.css = `
  :host {
    display: flex;
  }
  :host side-menu {
    display: none;
  }
	@media (width > 1300px){
    :host side-menu {
      display: block;
    }
  }
`;
defineWomp(PageLayout);
