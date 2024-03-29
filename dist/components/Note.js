import { jsx } from "womp/jsx-runtime";
import { defineWomp } from "womp";
export default function Note({ children, styles: s, severity }) {
  return /* @__PURE__ */ jsx("div", { class: `${s.note} ${s[severity]}`, children });
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
defineWomp(Note);
