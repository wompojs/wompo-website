import { defineWomp } from 'womp';
import getPageLayout, { Contents } from '../utils/getPage';
import Code from '../components/Code';
import { Link } from 'womp-router';

const content: Contents = {
	title: 'Quick Start',
	description: 'Learn the basics of Womp in only 5 minutes.',
	sections: [
		{
			title: 'Creating a component',
			id: 'creating-a-component',
			content: (
				<>
					<p>
						Let's start immediately by creating your first component. All you will need to do is
						just create a function and "declare" the component with the function{' '}
						<code>defineWomp</code>. This function will have to return the result of the{' '}
						<code>html</code> function, which is a template function that will contain your HTML
						structure.
					</p>
					<Code
						code={`
              import { defineWomp, html } from 'womp';

              export default function GreetingsComponent() {
                return html\`<div>Hello, World!</div>\`;
              }

              defineWomp(GreetingsComponent);
            `}
						lang="jsx"
					/>
					<p>
						Nice, you created your first component! Now you just have to render it in the DOM.
						<br />
						<br />
						But, if you know how <b>Web Components</b> work you are probably wondering where you can
						define the <u>name</u> of the component. In this case, Womp will simply create a
						dash-cased string based on the name of the function. So, the component{' '}
						<code>GreetingsComponent</code> will have as a name <b>greetings-component</b>. If the
						component cannot be transformed into a dash-cased string, a "-womp" suffix will be put
						in the end (e.g. <b>Counter -&gt; counter-womp</b>). This is because all web components
						must have at least one dash ("-") in their name.
						<br />
						Of course, you can even define your own name by using the <u>name</u> option in the
						second parameter of the <code>defineWomp</code> function. See documentation about{' '}
						<Link to="/docs/functions/define-womp">
							<code>defineWomp</code>
						</Link>{' '}
						for more.
						<br />
						So, to go back in the example, you will have the following html structure:
					</p>
					<Code
						code={`
              <greetings-component></greetings-component>
              <!-- Will render: <div>Hello, World!</div> -->
            `}
						lang="html"
					/>
				</>
			),
		},
		{
			title: 'Automatic naming',
			id: 'automatic-naming',
			content: (
				<>
					<p>Why did we decide to implement an automatic naming system?</p>
					<p>
						We know that when building an application based on Web-Components, it's common to have
						in the HTML file very few components, and the rest of them is rendered inside other
						components. You can even have only one <b>App</b> component which will render the whole
						page using other sub-components. With womp, rendering inner components is very easy. See
						the following example:
					</p>
					<Code
						code={`
              function App() {
                return html\`<\${GreetingsComponent} />\`;
              }
            `}
						lang="jsx"
					/>
					<p>Womp will automatically convert the dynamic tag into:</p>
					<Code
						code={`
              function App() {
                return html\`<greetings-component></greetings-component>\`;
              }
            `}
						lang="jsx"
					/>
					<p>
						So to answer the initial question: "
						<i>Why did we decide to implement an automatic naming?</i>".
						<br /> When using this kind of approach, it's not even important what the component name
						is. You just know that you want to render a specific component in a specific place.
						Also, what if, for some reason, you change the name of some components? If you simply
						typed the names "statically", you'd have to change them in the whole application. Hell.
						That's what happens with the majority of Web-Component libraries out there. With Womp,
						the app will continue to normally work ✅ (except for components written directly in the
						HTML file, of course).
						<br></br>
						When using this approach, you also <b>import</b> a component when needed, so you don't
						have to worry about manually putting script tags into your files so that they work.
						Developer friendly. Just like React.
					</p>
				</>
			),
		},
	],
};

export default function QuickStart() {
	return getPageLayout(content);
}

defineWomp(QuickStart);
