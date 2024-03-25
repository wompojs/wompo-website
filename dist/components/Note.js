import { jsx as _jsx } from "womp/jsx-runtime";
import { defineWomp } from 'womp';
export default function Note({ children, styles: s, severity }) {
    return _jsx("div", { class: `${s.note} ${s[severity]}`, children: children });
}
Note.css = `
  .note {
    padding: 2rem;
  }
  .note.info {
    background-color: #d1f7ff;
    border-left: 4px solid #5ee3ff;
  }
`;
defineWomp(Note);
