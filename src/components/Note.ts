import { type WompoProps, defineWompo, html } from 'wompo';

interface NoteProps extends WompoProps {
	severity: 'info' | 'success' | 'warning' | 'danger';
}

export default function Note({ children, styles: s, severity }: NoteProps) {
	return html`<div class=${`${s.note} ${s[severity]}`}>${children}</div>`;
}
Note.css = `
  .note {
    padding: 2rem;
		color: var(--site-callout-text);
  }
  .note.info {
    background-color: var(--site-callout-info-bg);
    border-left: 4px solid #5ee3ff;
  }
  .note.warning {
    background-color: var(--site-callout-warning-bg);
    border-left: 4px solid #ee9b13;
;
  }
`;
defineWompo(Note, {
	name: 'note-alert',
});
