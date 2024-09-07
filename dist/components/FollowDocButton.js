import { jsx as _jsx, jsxs as _jsxs } from "wompo/jsx-runtime";
import { defineWompo } from 'wompo';
import { Link } from 'wompo-router';
export default function FollowDocButton({ styles: s, to, title, description, next, }) {
    return (_jsx(Link, { to: to, class: s.button, children: _jsxs("div", { style: { display: 'flex', height: '100%' }, children: [!next && (_jsx("svg", { style: { marginRight: '15px', alignSelf: 'center' }, xmlns: 'http://www.w3.org/2000/svg', width: '26', height: '26', fill: 'currentColor', viewBox: '0 0 16 16', children: _jsx("path", { "fill-rule": 'evenodd', d: 'M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0' }) })), _jsxs("div", { style: { width: '100%' }, children: [_jsx("h3", { children: title }), _jsx("p", { children: description })] }), next && (_jsx("svg", { style: { marginLeft: '15px', alignSelf: 'center' }, xmlns: 'http://www.w3.org/2000/svg', width: '26', height: '26', fill: 'currentColor', viewBox: '0 0 16 16', children: _jsx("path", { "fill-rule": 'evenodd', d: 'M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708' }) }))] }) }));
}
FollowDocButton.css = `
  :host {
    display: block;
    width: 100%;
		cursor: pointer;
  }
  :host:hover .button {
    background-color: #E3DEFE;
  }
  .button {
    height: 100%;
    padding: 2rem;
    border: 1px solid #573EF6;
    color: #573EF6;
    border-radius: 10px;
    background-color: #fff;
  }
  .button * {
    margin: 0;
  }
  .button h3 {
    margin-bottom: 1rem;
		font-size: 1.5rem;
  }
	@media (width < 600px){
		.button p {
			text-overflow: ellipsis;
			overflow: hidden;
			display: -webkit-box;
			-webkit-line-clamp: 5;
			line-clamp: 2;
			-webkit-box-orient: vertical;
		}
	}
`;
defineWompo(FollowDocButton, { name: 'follow-doc-button' });
