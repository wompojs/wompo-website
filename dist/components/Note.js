import{jsx as f}from"womp/jsx-runtime";import{defineWomp as t}from"womp";export default function e({children:r,styles:o,severity:n}){return f("div",{class:`${o.note} ${o[n]}`,children:r})}e.css=`
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
`,t(e,{name:"note-alert"});
