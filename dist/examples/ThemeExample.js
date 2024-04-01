import {
	createContext as l,
	html as i,
	useState as m,
	useContext as p,
	defineWompo as r,
} from 'wompo';
const n = l('light');
export default function a() {
	const [o, e] = m('light'),
		h = () => {
			e(o === 'light' ? 'dark' : 'light');
		};
	return i`
    <${n.Provider} value=${o}>
      <${t}>
        <p>
          This cool application uses 2 custom themes: light and dark, and you can switch
          between them! Try it here:
        </p>
        <button @click=${h}>Toggle theme</button>
      </${t}>

      <${t}>
        <p>
          And the cool thing is that I have no props! I can be everywhere, and I will
          always get the current theme. The important thing is that I must be a child
          of the <code>ThemeContext.Provider</code>!
        </p>
      </${t}>
    </${n.Provider}>
  `;
}
r(a, { name: 'theme-example' });
function t({ children: o }) {
	const e = p(n);
	return i`<div style=${{
		backgroundColor: e === 'light' ? '#eee' : '#333',
		color: e === 'light' ? '#333' : '#eee',
		padding: '20px',
		marginTop: '10px',
	}}>${o}</div>`;
}
r(t, { name: 'theme-app-example' });
