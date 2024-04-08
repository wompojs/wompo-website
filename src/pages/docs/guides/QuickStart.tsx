import { defineWompo } from 'wompo';
import getPageLayout, { Contents } from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
import { Link } from 'wompo-router';
import Note from '../../../components/Note.js';

const content: Contents = {
	title: 'Quick Start',
	description: 'Learn the basics of Wompo in only 5 minutes.',
	sections: [
		{
			title: 'Creating a component',
			id: 'creating-a-component',
			content: (
				<>
					<p>
						Let's start immediately by creating your first component. All you will need to do is
						just create a function and "declare" the component with the helper function{' '}
						<code>defineWompo</code>. This function will have to return the result of the{' '}
						<code>html</code> function, which is a template function that will contain your HTML
						structure.
					</p>
					<Code
						code={`
              import { defineWompo, html } from 'wompo';

              export default function GreetingsComponent() {
                return html\`<div>Hello, World!</div>\`;
              }

              defineWompo(GreetingsComponent);
            `}
						language='js'
					/>
					<p>
						Nice, you created your first component! Now you just have to render it in the DOM.
						<br />
						But, if you know how <b>Web Components</b> work you are probably wondering where you can
						define the <u>name</u> of the component. In this case, Wompo will simply create a
						dash-cased string based on the name of the function. So, the component{' '}
						<code>GreetingsComponent</code> will have as a name <b>greetings-component</b>. If the
						component cannot be transformed into a dash-cased string, a "-wompo" suffix will be put
						in the end (e.g. <b>Counter -&gt; counter-wompo</b>). This is because all web components
						must have at least one dash ("-") in their name.
						<br />
						Of course, you can even define your own name by using the <u>name</u> option in the
						second parameter of the <code>defineWompo</code> function. See documentation about{' '}
						<Link to='/docs/apis/defineWompo'>defineWompo</Link> for more.
						<br />
						So, to go back in the example, you will have the following html structure:
					</p>
					<Code
						code={`
              <greetings-component></greetings-component>
              <!-- Will render: <div>Hello, World!</div> -->
            `}
						language='html'
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
						page using other sub-components. With wompo, rendering inner components is very easy.
						See the following example:
					</p>
					<Code
						code={`
              function App() {
                return html\`<\${GreetingsComponent} />\`;
              }
            `}
						language='js'
					/>
					<p>Wompo will automatically convert the dynamic tag into:</p>
					<Code
						code={`
              function App() {
                return html\`<greetings-component></greetings-component>\`;
              }
            `}
						language='js'
					/>
					<p>
						So going back to the initial question: "
						<i>Why did we decide to implement an automatic naming?</i>".
						<br /> When using this kind of approach, it's not even important what the component name
						is. You just know that you want to render a specific component in a specific place.
						Also, what if, for some reason, you change the name of some components? If you simply
						typed the names "statically", you'd have to change them in the whole application. Hell.
						That's what happens with the majority of Web-Component libraries out there. With Wompo,
						the app will continue to normally work ✅ (except for components written directly in the
						HTML file, of course).
						<br></br>
						When using this approach, you also <b>import</b> a component when needed, so you don't
						have to worry about manually putting script tags into your files so that they work.
						Developer friendly. Just like React.
					</p>
					<Note severity='warning'>
						<b>Note:</b> Be careful if you use a minifier! The function's name will be usually
						replaced with a simple letter, so your component's name will not be able to be processed
						correctly and multiple components with the same name can be generated, leading to
						unexpected behaviours and bugs. In this case, you want to manually set your component's
						name, just to be sure they are unique.
					</Note>
				</>
			),
		},
		{
			title: 'Props',
			id: 'props',
			content: (
				<>
					<p>
						What's the purpose of a component if you cannot add parameters so that the component
						renders dynamic content? You can add custom attributes in your component and modify your
						UI accordingly.
						<br />
						The component function receives one parameter:{' '}
						<b>
							<u>props</u>
						</b>
						. This parameter is an object that will contain the values of the custom attributes you
						added. Let's modify together the previous <code>GreetingsComponent</code> component.
						Suppose you want the component to accept a simple attribute called "<i>name</i>", and
						replace the old "Hello World" with "Hello &lt;name&gt;". Super easy:
					</p>
					<Code
						code={`
              export default function GreetingsComponent({name}) {
                return html\`<div>Hello, \${name}!</div>\`;
              }
            `}
						language='js'
					/>
					<Code
						code={`
							<greetings-component name="World"></greetings-component>
							<!-- Will render: <div>Hello, World!</div> -->

							<greetings-component name="Giovanni"></greetings-component>
							<!-- Will render: <div>Hello, Giovanni!</div> -->

							<greetings-component name="My beautiful love"></greetings-component>
							<!-- Will render: <div>Hello, My beautiful love!</div> -->
            `}
						language='html'
					/>
					<p>
						If you use your custom components in the HTML, you must know that HTML allows to only
						put strings in the attributes values, but if you are using it from a Javascript, you
						will <b>not</b> have this restriction: you can put everything.
					</p>
					<Code
						code={`
							function App() {
								const user = {
									name: 'Tongi',
									lastName: 'Patongi',
								};
                return html\`<\${GreetingsComponent} user=\${user} />\`;
              }

							function GreetingsComponent({user}) {
                return html\`<div>Hello, \${user.name} \${user.lastname}!</div>\`;
              }
            `}
						language='js'
					/>
					<Note severity='info'>
						If you use a variable as an attribute value, you must not add quotes around the value:
						the attribute name must only be followed by an equal ("=") and the value.
					</Note>
				</>
			),
		},
		{
			title: 'Events',
			id: 'events',
			content: (
				<>
					<p>
						Almost done. The next nice thing about Wompo is that you can define events as if they
						are attributes. The only difference is that you'll have to put a "@" as a prefix (e.g.
						the click event will be <code>@click</code>, change will be <code>@change</code>, ans so
						on).
						<br />
						You can attach an event on every element, even on your own custom elements, because they
						are part of the DOM!
					</p>
					<Code
						code={`
							function Counter() {
								const counter = 0;
								const onClick = () => alert('Increment value!');
                return html\`<button @click=\${onClick}>Current value: \${counter}</button>\`;
              }
            `}
						language='js'
					/>
				</>
			),
		},
		{
			title: 'State',
			id: 'state',
			content: (
				<>
					<p>
						The last thing to learn is how to make a component <b>stateful</b>. A stateful component
						is a component that listens for changes and re-renders whenever there is a change. The
						easier way to make a stateful component is by using the{' '}
						<Link to='/docs/hooks/useState'>useState</Link> hook. This hook is a function that will
						return an array with 2 elements: the current value, and a function to set the new value.
						The only parameter it accepts is the initial value.
						<br />
						So, to make the <code>Counter</code> component work, we just have to use this hook and
						increment the counter variable every time the user clicks on the button.
					</p>
					<Code
						code={`
							function Counter() {
								const [counter, setCounter] = useState(0);
								const onClick = () => setCounter(counter + 1);
                return html\`<button @click=\${onClick}>Current value: \${counter}</button>\`;
              }
            `}
						language='js'
					/>
					<p>
						That's it. You now know already the 80% of the Wompo library. Easy. Isn't it? <br />
						If you already know <b>React</b>, you can easily see how similar it is.
					</p>
				</>
			),
		},
		{
			title: 'Rules',
			id: 'rules',
			content: (
				<>
					<p>
						When you build your component's UI, you have some rules to keep in mind. First,{' '}
						<b>your components must always return the same static structure.</b> What it means is
						that, for example, you cannot, based on a condition, first return a "p" tag and then
						maybe a "div" tag. The reason is very simple: when a component is first rendered, its
						static structure is cached so that Wompo doesn't have to rebuild it every time the same
						component renders, so that the performance will be super good even when rendering
						thousands of components. This means that{' '}
						<b>only the first rendered static structure will be put in the DOM</b> and if there is a
						completely new static structure, the component will not be rebuilt.
						<br />
						This may sound like a big limitation, but there are some basic things you can do to get
						around the problem:
						<ul>
							<li>Create the structure that you want to render in a variable</li>
							<li>Create a variable holding the whole structure (only when strictly needed)</li>
						</ul>
						Examples:
						<Code
							code={`
							// ❌ Don't do this
							function Component({ userIsLoggedIn }) {
								if(userIsLoggedIn)
									return html\`<div>Logged in!</div>\`;
								else
									return html\`<div>Not logged in!</div>\`;
              }

							// ✅ Do this instead
							function Component({ userIsLoggedIn }) {
								const content = userIsLoggedIn ? 'Logged in!' : 'Not logged in!';
								return html\`<div>\${content}</div>\`;
              }
            `}
							language='js'
						/>
						<Code
							code={`
							// ❌ Don't do this
							function Component({ authorized }) {
								if(authorized) {
									return html\`<div>
										This User is authorized to perform this actions:
										<button>Delete Object</button> <button>Modify Object</button>
									</div>\`;
								} else {
									return html\`<h1>Not authorized</h1>\`;
								}
              }

							// ✅ Do this instead
							function Component({ userIsLoggedIn }) {
								let content;
								if(authorized) {
									content = html\`<div>
										This User is authorized to perform this actions:
										<button>Delete Object</button> <button>Modify Object</button>
									</div>\`;
								} else {
									content = html\`<h1>Not authorized</h1>\`;
								}
								// ❌ Don't return the content directly
								// return content;
								// ✅ Return a new html result
								return html\`\${content}\`;
              }
            `}
							language='js'
						/>
						<Note severity='warning'>
							<b>Note</b>: The last example will make the whole component dynamic. When possible,
							always avoid this kind of approach.
						</Note>
					</p>
					<p>
						<Note severity='info'>
							<b>Note</b>: If <b>you know and you are sure</b> that your component will only render
							once, you can avoid this runaround, although it's not recommended: always use the same
							logic across components.
						</Note>
					</p>
					<hr />
					<p>
						The second rule you must follow is about hooks. Wompo hooks have the following rules:
						<ol>
							<li>
								<b>Always use them in the first lines of the component.</b> You must think of hooks
								like if they were the <i>import statements</i> of your file.
							</li>
							<li>
								<b>Don't use hooks conditionally, or inside loops.</b>
							</li>
						</ol>
						If these criterias are not met, your components might not work as expected. If you want
						to know more about it, check the{' '}
						<Link to='/docs/hooks/useHook#deep-dive'>Deep Dive into Wompo hooks</Link> guide in the{' '}
						<code>useHook</code> hook documentation.
					</p>
				</>
			),
		},
	],
};

export default function QuickStart() {
	return getPageLayout(content);
}

defineWompo(QuickStart, {
	name: 'quick-start-page',
});
