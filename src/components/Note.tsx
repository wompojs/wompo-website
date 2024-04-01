import { WompProps, defineWomp } from 'womp';

interface NoteProps extends WompProps {
	severity: 'info' | 'success' | 'warning' | 'danger';
}

export default function Note({ children, styles: s, severity }: NoteProps) {
	return <div class={`${s.note} ${s[severity]}`}>{children}</div>;
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
defineWomp(Note, {
	name: 'note-alert',
});
