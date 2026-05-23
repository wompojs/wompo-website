import { defineWompo } from 'wompo';
import getPageLayout, { Contents } from '../../utils/getPageLayout.js';
import Code from '../../components/Code.js';

const content: Contents = {
	title: 'Introduction',
	description:
		'Wompo is a fast and lightweight React-like Web-Component library that runs in the browser and on the server, with built-in islands hydration and Server Actions.',
	sections: [
		{
			title: 'Why?',
			id: 'why',
			content: (
				<>
					<p>
						The reason why Wompo is born is to make Web development easier: by taking advantage of
						native Javascript functionalities, Wompo allows to create{' '}
						<b>reusable, shareable, and fast Web-Components</b>.
						<br />
						Wompo was created by "merging" two main libraries: <b>React</b> and <b>Lit</b>. More
						specifically, the <b>Core concepts</b> of React, and the <b>Blazing fast</b> rendering
						speed of Lit. This allowed to create an easy-to-use and beginner-friendly library like
						React, while still keeping an eye on performances.
					</p>
					<p>
						But there are already tons of libraries that serve the same purpose and use
						Web-Components, like <b>Stencil</b>, <b>Atomico</b>, and, of course, <b>Lit</b> (plus
						others), so why Wompo?
						<br />
						The reason is simple: we don't like to overcomplicate things. Wompo is super-fast and
						has a super-common way of building components (the React way), so is it worth to learn
						completely new concepts and libraries to just save a couple of milliseconds and write
						more code to achieve the same result? Are months of studying and experimenting worth to
						get the same result? We think not. There is no need to learn Javascript classes,
						understaning the <b>this</b> keyword, learn <b>Typescript</b> (althought it is natively
						supported, because Wompo is built with it): the only thing you must know is basic HTML,
						basic CSS, and basic JS. That's it. Wompo is accessible by <b>completely begginers</b>{' '}
						but also by <b>experts</b>.
					</p>
				</>
			),
		},
		{
			title: 'Benefits',
			id: 'benefits',
			content: (
				<>
					<p>
						Using Wompo has the following benefits:
						<ul>
							<li>
								<b>React-like</b> - no need to learn a completely new library. If you know React,
								you already know also Wompo. Or at least the 90% of it. If you don't, Wompo has a
								super fast learning curve. By simply reading the "Quick start" section, you will
								already know how to build the 80% of your components.
							</li>
							<li>
								<b>Performant</b> - Faster than React and Preact, and only slightly slower than Lit.
							</li>
							<li>
								<b>Built-in CSS modules</b> - With Wompo there is no need to worry about style
								collisions: your class names will be automatically replaced with a unique class
								name.
							</li>
							<li>
								<b>Automatic component naming</b> - Wompo components will generate an automatic name
								for your DOM elements. Your <code>TodoList</code> will simply become a "todo-list",
								right?
							</li>
							<li>
								<b>Re-Usable</b> - Unlike other libraries, you don't need a compiler or anything,
								because Wompo it's built with native Javascript functionalities. This means you can
								use your components <b>everywhere</b>. Wheter you already use React, Angular, Vue,
								or any other library (or none), you will not have to worry about anything, and your
								Wompo components will always work.
							</li>
							<li>
								<b>Server-Side Rendering</b> - Wompo ships a string and a streaming SSR renderer,
								an islands-first hydration runtime, and Server Actions. Same components, server
								and client.
							</li>
							<li>
								<b>Bundle free</b> - With most compiled libraries, you have to create a bundle with
								all your components in order to make it work. With Wompo you can even share a single
								component, and it will run <b>everywhere</b> without problems.
							</li>
						</ul>
					</p>
				</>
			),
		},
		{
			title: 'Web Components',
			id: 'web-components',
			content: (
				<>
					<p>
						The only new concept you'll have to learn is:{' '}
						<i>
							what the hell is a Web-Component, and what is the difference between a React component
							and a Web-Component?
						</i>
					</p>
					<p>
						A <b>Web Component</b> is a native feature of browsers that allows to create a custom
						HTML element that can be re-used and "isolated" using <b>Shadow DOM</b>, so that it'll
						not be able to alter and be altered by other elements in the page. Because it is native,
						if you want to use a third party component you'll just have to include the component's
						JS (and the Wompo library if you didn't already import it, which only weights 6KB) and
						you're ready to go. No need to compile. This means that you can use third party
						components even if you're not using a compiler or bundler, so{' '}
						<b>
							even websites that are not up-to-date with the latest technologies can easily
							integrate Wompo
						</b>
						. You can even use Wompo while still using other libraries like React, Angular, and so
						on, without needing to worry about conflicts.
					</p>
					<p>
						The main difference between <i>React components</i> and <i>Wompo components</i> is that
						Wompo components are actually elements that you can see in the DOM: they are not
						virtual. If you inspect this page, you can see elements like "content-section",
						"side-menu", and so on. These are Wompo components that are rendered in the DOM.
						<br />
						This means that when you write your application, you have to keep in mind that your
						component will actually be an element with a <code>display: block</code> style. Consider
						the following example:
					</p>
					<Code
						code={`
							function App() {
								return html\`
									<div style="display: flex;">
										<p>I'm inline</p>
										<p>I'm inline</p>
										<\${CustomComponent} />
									</div>
								\`;
							}

							function CustomComponent() {
								return html\`
									<p>I'm not inline</p>
									<p>I'm not inline</p>
								\`;
							}
						`}
						language="js"
					/>
					<p>In React this will give a different result compared to Wompo, more specifically:</p>
					<Code
						code={`
							<!-- React will render this: -->
							<div style="display: flex;">
								<p>I'm inline</p>
								<p>I'm inline</p>
								<p>I'm not inline</p> <!--It will actually be inline here -->
								<p>I'm not inline</p> <!--It will actually be inline here -->
							</div>

							<!-- Wompo will render this: -->
							<div style="display: flex;">
								<p>I'm inline</p>
								<p>I'm inline</p>
								<custom-component>
									<p>I'm not inline</p>
									<p>I'm not inline</p>
								</custom-component>
							</div>
						`}
						language="html"
					/>
					<p>
						That's the only main difference and the only thing you have to keep in mind while
						developing your UI. For more about Web Components, you can find everything in details on
						the{' '}
						<a
							target="_blank"
							href="https://developer.mozilla.org/en-US/docs/Web/API/Web_components"
						>
							MDN Documentation
						</a>
						.
					</p>
				</>
			),
		},
	],
};

export default function Introduction() {
	return getPageLayout(content);
}

defineWompo(Introduction, {
	name: 'introduction-page',
});
