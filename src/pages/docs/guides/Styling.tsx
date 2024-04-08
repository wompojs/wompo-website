import { defineWompo } from 'wompo';
import getPageLayout, { Contents } from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
import Note from '../../../components/Note.js';

const content: Contents = {
	title: 'Style your components',
	description: 'Learn how you can style your components in different ways',
	sections: [
		{
			title: 'Introduction',
			id: 'introduction',
			content: (
				<>
					<p>
						By definition components are reusable pieces of code. Most of times, when you create a
						component you also have a CSS code to specifically style that component. With Wompo, you
						have the following different ways to style your components:
						<ol>
							<li>Classic CSS file</li>
							<li>Built-in CSS "modules"</li>
							<li>Mix of the two above (usually for Shadowed Elements)</li>
							<li>Inline styles</li>
						</ol>
					</p>
				</>
			),
		},
		{
			title: 'CSS file',
			id: 'css-file',
			content: (
				<>
					<p>
						Using a CSS file to style your components is the classic and easier way to add some
						creativity in your page. By default, Wompo components are <b>not</b> inside a Shadow
						DOM, so you don't have to worry about how to make your CSS go through the unbreakable
						wall of Shadow DOM. With this approach, you simply create a CSS file and add the
						respective classes in your component.
					</p>
					<Code
						code={`
              .container {
								background-color: #333;
								color: #fff;
								padding: 10px;
							}
            `}
						language='css'
					/>
					<Code
						code={`
              function Component(){
								return html\`<div class="container"></div>\`;
							}
            `}
						language='js'
					/>
				</>
			),
		},
		{
			title: 'CSS Modules',
			id: 'css-modules',
			content: (
				<>
					<p>
						The second option, which is actually the best choice, is to use the built-in{' '}
						<b>CSS Modules</b>. By default every Component has the <code>cssModule</code> option
						enabled, so what you will have to do is simply add your CSS inside the <code>.css</code>{' '}
						property of the functional Component. This property is a simple string containing your
						CSS structure, and will generate a <code>style</code> element will be generated (only
						once) and attached for every component instance.
						<br />
						Wompo will automatically replace all the found class names with a more specific one
						(based on the name of the component, which is unique) and will put the generated class
						names in the <b>styles</b> prop of the component. This prop is an object having as keys
						the original class names found in the CSS, and as values the corresponding unique
						generated class names.
						<br />
						This option can be ideal for both "normal" and "shadow" components.
					</p>
					<Code
						code={`
							function Component({ styles: s }){
								// s.container will have "component-womp__container" as a value.
								return html\`<div class=\${s.container}> ... </div>\`;
							}
							Component.css = \`
								/* This class will be replaced with "component-womp__container" */
								.container {
									background-color: #333;
									color: #fff;
									padding: 10px;
								}
							\`;
            `}
						language='js'
					/>
					<p>
						As said, the generated class names are <b>not random</b>. This allows you to still
						easily override a component's styles with a global CSS. If you use the class "button"
						inside a component whose name is "simple-counter", the generated class name will simply
						be:
					</p>
					<Code
						code={`
							// [component_name]__[class_name]
							"simple-counter__button"
            `}
						language='js'
					/>
					<Note severity='info'>
						To customize the component itself you can use the <b>:host</b> selector even if the
						element has not the shadow option enabled: it will automatically replaced with the
						component's name.
					</Note>
				</>
			),
		},
		{
			title: 'Shadow elements',
			id: 'component-css',
			content: (
				<>
					<p>
						Another option is to use the <code>.css</code> property in your functional component to
						generate it's specific CSS, but without generating unique class names. This is the ideal
						option if you enable the <b>shadow</b> property on the component. To allow this you have
						to first disable the <b>cssModule</b> option.
					</p>
					<Code
						code={`
              function App() {
                return html\`<\${GreetingsComponent} />\`;
              }
							App.css = \`
								.container {
									background-color: #333;
									color: #fff;
									padding: 10px;
								}
							\`;
							defineWompo(App, { cssModule: false, shadow: true });
            `}
						language='js'
					/>
				</>
			),
		},

		{
			title: 'Inline styles',
			id: 'inline-styles',
			content: (
				<>
					<p>
						Last but not least, you can style your elements with inline styles. You can do that in
						two ways:
						<ol>
							<li>Using a string with the styles (default)</li>
							<li>Using an object to describe the CSS Properties</li>
						</ol>
						If you choose the second option, the object will be a <code>CSSStyleDeclaration</code>{' '}
						object, so you should replace the name of the property you want to style in camelCase
						(e.g. z-index = zIndex; background-color = backgroundColor). <br />
						Example:
					</p>
					<Code
						code={`
							function Component({ styles: s }){
								return html\`<div style="position:relative">
									<span style=\${{
										position: 'absolute',
										top: -10,
										left: -10,
										width: 100,
										height: 100,
										backgroundColor: '#573EF6'
									}}></span>
								</div>\`;
							}
            `}
						language='js'
					/>
				</>
			),
		},
	],
};

export default function Styles() {
	return getPageLayout(content);
}

defineWompo(Styles, {
	name: 'styling-page',
});
