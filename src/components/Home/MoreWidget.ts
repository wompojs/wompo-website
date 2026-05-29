import { type RenderHtml, type WompoProps, defineWompo, html } from 'wompo';

interface MoreWidgetProps extends WompoProps {
	title: RenderHtml;
	icon: RenderHtml;
}

export default function MoreWidget({ children, title, icon, styles: s }: MoreWidgetProps) {
	return html`
		<div class=${s.widget}>
			<h3>${title}</h3>
			<div>${icon}</div>
			<div>${children}</div>
		</div>
	`;
}

MoreWidget.css = `
  .widget {
    box-shadow: 0 3px 10px var(--site-shadow);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem;
    text-align: center;
    height: 100%;
    transition: all .3s;
    background-color: var(--site-surface);
		color: var(--site-text);
  }
  .widget:hover {
    transform: scale(1.15);
  }
  .widget svg {
    margin: 3rem 0;
    width: 5rem;
    height: 5rem;
    color: var(--site-text-soft);
  }
  .widget h3 {
    font-size: 2.5rem;
    margin: 0;
  }
`;

defineWompo(MoreWidget, { name: 'more-widget' });
