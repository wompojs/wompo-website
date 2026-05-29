import { createContext, html, useState, useContext, defineWompo, type WompoProps } from 'wompo';

const ThemeContext = createContext('light');

export default function ThemeExample() {
	const [theme, setTheme] = useState('light');
	const toggleTheme = () => {
		theme === 'light' ? setTheme('dark') : setTheme('light');
	};
	return html`
    <${ThemeContext.Provider} value=${theme}>
      <${AppContent}>
        <p>
          This cool application uses 2 custom themes: light and dark, and you can switch
          between them! Try it here:
        </p>
        <button @click=${toggleTheme}>Toggle theme</button>
      </${AppContent}>

      <${AppContent}>
        <p>
          And the cool thing is that I have no props! I can be everywhere, and I will
          always get the current theme. The important thing is that I must be a child
          of the <code>ThemeContext.Provider</code>!
        </p>
      </${AppContent}>
    </${ThemeContext.Provider}>
  `;
}
defineWompo(ThemeExample, {
	name: 'theme-example',
});

function AppContent({ children }: WompoProps) {
	const theme = useContext(ThemeContext);
	const styles = {
		backgroundColor: theme === 'light' ? '#eee' : '#333',
		color: theme === 'light' ? '#333' : '#eee',
		padding: '20px',
		marginTop: '10px',
	};
	return html`<div style=${styles}>${children}</div>`;
}
defineWompo(AppContent, {
	name: 'theme-app-example',
});
