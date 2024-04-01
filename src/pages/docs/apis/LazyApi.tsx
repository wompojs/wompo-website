import { defineWomp } from 'womp';
import getPageLayout, { Contents } from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
import { Link } from 'womp-router';
import Note from '../../../components/Note.js';
import LazyExample from '../../../examples/LazyExample.js';
import LazySuspenseExample from '../../../examples/LazySuspenseExample.js';

const content: Contents = {
	title: 'lazy API',
	description: (
		<>
			How to use the <code>lazy</code> function to asynchronously load a component only when it is
			used.
		</>
	),
	sections: [
		{
			title: 'Description',
			id: 'description',
			content: (
				<>
					<p>
						The <code>lazy</code> function will dynamically import a component only if it is
						actually used and rendered. Using the lazy function can{' '}
						<b>improve your site's performance</b> and decrease the number of network requests,
						other then reducing the initial payload.
						<br />
						You can also combine the <code>lazy</code> function with the use of the{' '}
						<Link to='/docs/components/suspense'>Suspense</Link> component to display a rendering
						screen while the component is being loaded. Once the lazy component rendered for the
						first time, the result is cached so that multiple requests will not be performed if the
						lazy component is used multiple times.
						<br />
						The imported file <b>must have a default export</b>, and it is what will be taken to
						know which component to render.
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
							const LazyComponent = lazy(() => import(componentPath));
						`}
						language='js'
					/>
					<p>
						The <code>lazy</code> function accepts one single argument, which is the callback that
						will ask to import the component. Be careful:
					</p>
					<Code
						code={`
              // ❌ This will immediately import the component (and will not work)!
              lazy(import(componentPath);

              // ❌ Will not work
              lazy(componentPath);

              // ✅ The correct way
							lazy(() => import(componentPath));
						`}
						language='js'
					/>
					<Note severity='info'>
						While the component is being imported, you will actually see nothing. That's why it is
						very common to combine a lazy component with a{' '}
						<Link to='/docs/components/suspense'>Suspense</Link> component.
					</Note>
				</>
			),
		},
		{
			title: 'Example: big component',
			id: 'big-component-example',
			content: (
				<>
					<p>
						When developing in a local environment, files are usually loaded instantly, so you
						cannot really test the functioning of the lazy component. But you can simulate the
						loading of a big file using a function that will delay the import of the component, like
						in the following example:
					</p>
					<Code
						code={`
              import { lazy, html, defineWomp } from 'womp';

              function simulateBigComponent(promise) {
                return new Promise((resolve) => {
                  setTimeout(resolve, 5000);
                }).then(() => promise);
              }

              const LazyComponent = lazy(() => simulateBigComponent(import('./custom-component.js')));

              function App(){
                return html\`
                  <p>This content is static. Below me the lazy component will be rendered!</p>
                  <\${LazyComponent}>I should be blue...</\${LazyComponent}>
                \`;
              }

              defineWomp(App);
						`}
						language='js'
					/>
					The code of the component imported from the <code>./custom-component.js</code> path will
					be the following:
					<Code
						code={`
              import { html, defineWomp } from 'womp';

              export default function LazyComponent({ children }){
                return html\`
                  <div style="font-size: 20px; color: blue;">
                    \${children}<br />
                    I was lazy loaded!
                  </div>
                \`;
              }

              defineWomp(LazyComponent);
						`}
						language='js'
					/>
					<p>
						Result:
						<LazyExample />
					</p>
					<Note severity='warning'>
						As you can see,{' '}
						<b>
							the children of the component will still be visible while the component is being
							imported
						</b>
						. That's why usually you always combine the lazy component with a <code>Suspense</code>{' '}
						component.
					</Note>
				</>
			),
		},
		{
			title: 'Example: suspense',
			id: 'suspense-example',
			content: (
				<>
					<p>
						It's time to use the <Link to='/docs/components/suspense'>Suspense</Link> component to
						display a loading indicator while the lazy component is being imported. We will simply
						modify the previous example by wrapping the <code>LazyComponent</code> between a{' '}
						<code>Suspense</code> component.
					</p>
					<Code
						code={`
              import { lazy, html, defineWomp, Suspense } from 'womp';

              function simulateBigComponent(promise) {
                return new Promise((resolve) => {
                  setTimeout(resolve, 5000);
                }).then(() => promise);
              }

              const LazyComponent = lazy(() => simulateBigComponent(import('./custom-component.js')));

              function App(){
                return html\`
                  <p>This content is static. Below me the lazy component will be rendered!</p>
                  <\${Suspense} fallback=\${html\`<i>Loading...</i>\`}>
                    <\${LazyComponent}>I should be blue...</\${LazyComponent}>
                  </\${Suspense}>
                \`;
              }

              defineWomp(App);
						`}
						language='js'
					/>
					<p>
						Result:
						<LazySuspenseExample />
					</p>
				</>
			),
		},
	],
};

export default function LazyApi() {
	return getPageLayout(content);
}

defineWomp(LazyApi, {
	name: 'lazy-api-apis-page',
});
