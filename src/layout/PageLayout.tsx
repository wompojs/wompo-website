import { WompProps, defineWomp } from 'womp';

export default function PageLayout({ children, styles: s }: WompProps) {
	return <>{children}</>;
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
