import { defineWompo } from 'wompo';
import getPageLayout, { Contents } from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
import { Link } from 'wompo-router';
import LazySuspenseExample from '../../../examples/LazySuspenseExample.js';

const content: Contents = {
	title: 'Suspense',
	description: (
		<>
			How to use the <code>Suspense</code> component to show a fallback UI while at least one of its
			children is still rendering its content.
		</>
	),
	sections: [
		{
			title: 'Description',
			id: 'description',
			content: (
				<>
					<p>
						The <code>Suspense</code> component is a special Wompo component that allows to show a{' '}
						<b>fallback</b> UI while one or more of the children are loading. This can be used for:
						<ul>
							<li>
								Components that use the <Link to='/docs/hooks/useAsync'>useAsync</Link> hook
							</li>
							<li>
								Components that are imported through the <Link to='/docs/apis/lazy'>lazy</Link>{' '}
								function
							</li>
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
							<Suspense fallback={html\`\`}>
								{children}
							</Suspense>
						`}
						language='js'
					/>
					<p>
						The <code>Suspense</code> component accepts a single prop: <b>fallback</b>. The fallback
						prop must be the result of the <Link to='/docs/apis/html'>html</Link> template function.
						This prop is <b>required</b>.
					</p>
				</>
			),
		},
		{
			title: 'Example: lazy component',
			id: 'lazy-component-example',
			content: (
				<>
					<p>
						This example is the same used in the <Link to='/docs/apis/lazy'>lazy</Link>{' '}
						documentation: thanks to the lazy function we will render a component dynamically
						imported and delayed to simulate a super big file that is requested from the server (or
						simply a slow network).
					</p>
					<Code
						code={`
              import { lazy, html, defineWompo, Suspense } from 'wompo';

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

              defineWompo(App);
						`}
						language='js'
					/>
					The code of the component imported from the <code>./custom-component.js</code> path will
					be the following:
					<Code
						code={`
              import { html, defineWompo } from 'wompo';

              export default function LazyComponent({ children }){
                return html\`
                  <div style="font-size: 20px; color: blue;">
                    \${children}<br />
                    I was lazy loaded!
                  </div>
                \`;
              }

              defineWompo(LazyComponent);
						`}
						language='js'
					/>
					<p>
						Result (you probably will have to reload the page and scroll here to see it):
						<LazySuspenseExample />
					</p>
				</>
			),
		},
	],
};

export default function SuspenseComponent() {
	return getPageLayout(content);
}

defineWompo(SuspenseComponent, {
	name: 'suspense-component-page',
});
