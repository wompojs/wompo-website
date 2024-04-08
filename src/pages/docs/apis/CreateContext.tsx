import { defineWompo } from 'wompo';
import getPageLayout, { Contents } from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
import { Link } from 'wompo-router';
import ThemeExample from '../../../examples/ThemeExample.js';

const content: Contents = {
	title: 'createContext API',
	description: (
		<>
			How to use the <code>createContext</code> function to create a new Context and share some data
			to all its children.
		</>
	),
	sections: [
		{
			title: 'Description',
			id: 'description',
			content: (
				<>
					<p>
						The <code>createContext</code> function allows to create a new <b>Context</b>. A context
						is a piece of data that is shared across all the children. This can be quite useful if:
						<ul>
							<li>You want to pass a prop deeply in the component's tree</li>
							<li>You want to manage a portion of the app from a centralized place</li>
						</ul>
					</p>
				</>
			),
		},
		{
			title: 'Usage',
			id: 'usage',
			content: (
				<>
					<Code
						code={`
							const Context = createContext(defaultValue);
						`}
						language='js'
					/>
					<p>
						The function accepts a single parameter which is the default value that the context will
						have. This default value is only used if a Component uses the{' '}
						<Link to='/docs/hooks/useContext'>useContext</Link> hook to get a Context that is not
						provided by a parent <code>Context.Provider</code>. The value returned by the{' '}
						<code>createContext</code> function is an object that has the <b>Provider</b> key. The
						Provider will be the component that you want to use to share the data to all its
						children. It accepts one single prop: <b>value</b>, which is <b>mandatory</b>.
						<br />
						Simple example:
					</p>
					<Code
						code={`
							const ThemeContext = createContext('light');

              function App(){
                const [theme, setTheme] = useState('light');
                return html\`
                  <\${ThemeContext.Provider} value=\${theme}>
                    ...
                  </\${ThemeContext.Provider}>
                \`;
              }
						`}
						language='js'
					/>
					<p>
						In the above example, a <code>ThemeContext</code> is created and a{' '}
						<code>ThemeContext.Provider</code> instance is rendered so that the current theme is
						shared across the whole application (assuming the <code>App</code> component is your
						root). A custom theme state is used as a value for the provider. When the theme changes,
						the provider will be re-rendered, and so all the children of it that use that context.
						To make a component listen to the provider's changes, you have to use the{' '}
						<Link to='/docs/hooks/useContext'>useContext</Link> hook and pass as the first argument
						the <code>ThemeContext</code> (in this case). If a component doesn't use the{' '}
						<code>useContext</code> hook, it will not be automatically re-rendered when the parent
						provider changes.
					</p>
				</>
			),
		},
		{
			title: 'Example: theme',
			id: 'theme-example',
			content: (
				<>
					<p>We can go further with the theme example and actually implement a small app:</p>
					<Code
						code={`
							import { createContext, html, useState, useContext, defineWompo } from 'wompo';
							
							const ThemeContext = createContext('light');

              function App(){
                const [theme, setTheme] = useState('light');
								const toggleTheme = () => {
									theme === 'light' ? setTheme('dark') : setTheme('light');
								}
                return html\`
                  <\${ThemeContext.Provider} value=\${theme}>
										<\${AppContent}>
											<p>
												This cool application uses 2 custom themes: light and dark, and you can switch
												between them! Try it here:
											</p>
											<button @click=\${toggleTheme}>Toggle theme</button>
										</\${AppContent}>

										<\${AppContent}>
											<p>
												And the cool thing is that I have no props! I can be everywhere, and I will
												always get the current theme. The important thing is that I must be a child
												of the <code>ThemeContext.Provider</code>!
											</p>
										</\${AppContent}>
                  </\${ThemeContext.Provider}>
                \`;
              }
							defineWompo(App);

							function AppContent({ children }){
								const theme = useContext(ThemeContext);
								const styles = {
									backgroundColor: theme === 'light' ? '#eee' : '#333',
									color: theme === 'light' ? '#333' : '#eee',
									padding: '20px',
									marginTop: '10px',
								}
								return html\`
									<div style=\${styles}>
										\${children}
									</div>
								\`;
							}
							defineWompo(AppContent);
						`}
						language='js'
					/>
					<p>
						Result:
						<ThemeExample />
					</p>
				</>
			),
		},
	],
};

export default function CreateContext() {
	return getPageLayout(content);
}

defineWompo(CreateContext, {
	name: 'create-context-apis-page',
});
