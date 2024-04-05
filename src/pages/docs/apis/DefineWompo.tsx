import { defineWompo } from 'wompo';
import getPageLayout, { Contents } from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
import { Link } from 'wompo-router';
import Note from '../../../components/Note.js';
import IsolatedComponent from '../../../examples/IsolatedComponent.js';

const content: Contents = {
	title: 'defineWompo API',
	description: (
		<>
			How to use the <code>defineWompo</code> function to register your custom component in your
			application.
		</>
	),
	sections: [
		{
			title: 'Description',
			id: 'description',
			content: (
				<>
					<p>
						The <code>defineWompo</code> function is the function that will register your component
						in the browser's <code>CustomElementRegistry</code>. You always have to use this
						function after writing your components. If you don't see your component in the screen,
						don't panic: is probably because you only forgot to call this function.
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
							defineWompo(Component, options?);
						`}
						language='js'
					/>
					<p>
						The function accepts two parameters: your functional Component and the options for it.
						The first parameter must be a function that returns an{' '}
						<Link to='/docs/apis/html'>html</Link> result or <code>null</code>. The second parameter
						is <b>optional</b>, but if defined it must be an object with the following optional
						keys:
						<ul>
							<li>
								<code>name</code> (string) - The name of the Web Component that will be registered.
								If not defined, the component name will be the name of the function in hyphen-case.
								If the component doesn't have an hyphen, a "wompo" string will be placed as a
								suffix.
								<br />
								E.g. TabPanel = tab-panel, Counter = counter-wompo
							</li>
							<li>
								<code>shadow</code> (boolean) - By default is false, but if true, the component's
								content will be rendered inside a Shadow Root. You want to set it to true when
								developing libraries and components that you want to be sure they won't affect or be
								affected by external CSSs or Scripts.
							</li>
							<li>
								<code>cssModule</code> (boolean) - By default is true, meaning that a CSS module
								logic will be applied if you write your <code>component's CSS</code> inside the
								Component.css key. The classes that are found in there will be replaced with a more
								unique identifier and put in the <b>styles</b> prop of the component, which will be
								an object having the found classes as keys and the more unique generated classes as
								values. This is done to avoid style collisions.
								<br />
								Example:
								<Code
									code={`
                    function Component({ styles: s }){
                      // s.component will have "component-womp__container" as a value
                      return html\`
                        <div class=\${s.container}>...</div>
                      \`;
                    }
                    Component.css = \`
                      .container {
                        height: 30px;
                        width: 30px;
                        background-color: green;
                      }
                    \`;
                  `}
									language='js'
								/>
							</li>
						</ul>
					</p>
					<Note severity='info'>
						You can customize the default values of the <b>options</b> object by overriding the
						values present in the{' '}
						<Link to='/docs/apis/wompoDefaultOptions'>wompDefaultOptions</Link> object.
					</Note>
				</>
			),
		},
		{
			title: 'Example: isoalted element',
			id: 'isolated-element-example',
			content: (
				<>
					<p>
						We can use the <code>defineWompo</code> function to define a component that is
						"isolated" from the CSS and JS in your application.
					</p>
					<Code
						code={`
							import { html, defineWompo } from 'wompo';

              function IsolatedComponent(){
                return html\`
                  <p>
                    Even though my styles are super generic, I will not affect external elements
                    and I will not be affected by external styles!
                  </p>
                \`;
              }
              IsolatedComponent.css = \`
                :host {
                  display: block;
                }
                p {
                  padding: 5px;
                  border-radius: 5px;
                  background-color: #3489a6;
                  color: #fff;
                }
              \`;

							defineWompo(IsolatedComponent, {
                // Using a custom name will let you have more control over the application
                name: 'super-cool-isolated-component',
                // The content will be placed inside a Shadow Root
                shadow: true,
                // Since it's already "isolated", it's not necessary to have the CSS Module
                cssModule: false
              });
						`}
						language='js'
					/>
					<p>
						Result:
						<IsolatedComponent />
					</p>
					<Note severity='warning'>
						<b>Note</b>: Other than generating more specific class names, what the cssModule option
						will do is also provide a display block style for the element.
						<Code code={`:host { display: block; }`} language='js' />
						This is because custom elements have NO default styles, and usually the first thing you
						will do is set the display property. If you disabled the cssModule option, this will not
						happen. Also, if in your CSS you write an <code>:host</code> style, the display block
						property will not be automatically generated.
						<br />
						That's why in the above example we had to manually set it.
					</Note>
				</>
			),
		},
	],
};

export default function DefineWompo() {
	return getPageLayout(content);
}

defineWompo(DefineWompo, {
	name: 'definewomp-apis-page',
});
