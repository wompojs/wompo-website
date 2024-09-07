import { jsx as _jsx } from "wompo/jsx-runtime";
import { defineWompo } from 'wompo';
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
  .note.warning {
    background-color: #ffd57f;
    border-left: 4px solid #ee9b13;
;
  }
`;
defineWompo(Note, {
    name: 'note-alert',
});
