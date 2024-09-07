import { defineWompo, html } from 'wompo';
export default function MoreWidget({ children, title, icon, styles: s }) {
    return html `
		<div class=${s.widget}>
			<h3>${title}</h3>
			<div>${icon}</div>
			<div>${children}</div>
		</div>
	`;
}
MoreWidget.css = `
  .widget {
    box-shadow: 0 3px 10px #0004;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem;
    text-align: center;
    height: 100%;
    transition: all .3s;
    background-color: #fff;
  }
  .widget:hover {
    transform: scale(1.15);
  }
  .widget svg {
    margin: 3rem 0;
    width: 5rem;
    height: 5rem;
    color: #ccc;
  }
  .widget h3 {
    font-size: 2.5rem;
    margin: 0;
  }
`;
defineWompo(MoreWidget, { name: 'more-widget' });
