import { defineWompo } from 'wompo';
import getPageLayout, { Contents } from '../../utils/getPageLayout.js';
import Code from '../../components/Code.js';
import Note from '../../components/Note.js';

const content: Contents = {
	title: 'How to use JSX',
	description: 'Use JSX to make the editor help you while building your components.',
	sections: [
		{
			title: 'What is JSX',
			id: 'what-is-jsx',
			content: (
				<>
					<p>
						<b>JSX</b> is an extension of JavaScript that allows to write Markup code into your JS
						files. This makes creating your layouts easier, because the editor can help you by
						suggesting code and reporting errors in the markup. It will also check your component's
						props to find mistakes and type incompatibilites if you also use Typescript. An example
						of a JSX component is the following:
					</p>
					<Code
						code={`
              import { defineWompo } from 'wompo';

              export default function Section({ title, children }) {
                return (
                  <section>
                    <h2>{title}</h2>
                    <div>
                      {children}
                    </div>
                  </section>
                )
              }

              defineWompo(Section);
            `}
						language='js'
					/>
					<p>
						As you can see, the <code>html</code> function is not used to build the layout. Instead,
						you directly write your HTML into your component.
					</p>
					<Note severity='warning'>
						<b>Note:</b> JSX files need a compiler. JSX is not natively supported by browsers.
					</Note>
					<p>The code in the example will be transformed by the compiler into the following:</p>
					<Code
						code={`
              import { jsx } from "wompo/jsx-runtime";
              import { defineWompo } from "wompo";
              export default function Section({ title, children }) {
                return jsx("section", { children: [
                  jsx("h2", { children: title }),
                  jsx("div", { children: children }),
                ]});
              }
            `}
						language='js'
					/>
					<p>
						The <code>jsx</code> function will transform the content into the same type of result
						that the <code>html</code> function returns. This means one thing:{' '}
						<b>
							using JSX is actually less performant than using the <code>html</code> function.
						</b>{' '}
						<br />
						<i>Why?</i> For these reasons:
						<ol>
							<li>
								In the end, the <code>jsx</code> function is only a wrapper that will return the
								result of the <code>html</code> function, so you do an extra step to get the same
								result.
							</li>
							<li>
								By using this approach you cannot really know which parts are the dynamic ones:
								basically everything is dynamic, and Wompo will re-render parts of your component
								that normally are not necessary to be updated.
							</li>
						</ol>
					</p>
				</>
			),
		},
		{
			title: 'Configuration',
			id: 'configuration',
			content: (
				<>
					<p>
						To make JSX work, you have to write the following lines in the{' '}
						<code>jsconfig.json</code>
						or <code>tsconfig.json</code> files:
					</p>
					<Code
						code={`
              { 
                "compilerOptions": {
                  // ...
                  "jsx": "react-jsx",
                  "jsxImportSource": "wompo",
                  // ...
                } 
              }
            `}
						language='js'
					/>
				</>
			),
		},
		{
			title: 'Example: Counter',
			id: 'counter-example',
			content: (
				<>
					<p>In this example you'll be able to create a simple counter using JSX with Wompo:</p>
					<Code
						code={`
              export default function Counter() {
                const [counter, setCounter] = useState(0);
                const increment = () => setCounter(counter + 1);
                return (
                  <button onClick={increment}>Current value: {counter}</button>
                );
              }
            `}
						language='js'
					/>
					<Note severity='info'>
						The main differences between the JSX approach and the <code>html</code> approach are:
						<ul>
							<li>Events are not prefixed by a "@" but by "on"</li>
							<li>Dynamic values don't need a dollor sign ("$") before brackets</li>
							<li>
								You don't need to wrap a custom component into braces: you can simply type it in the
								markup (e.g. <code>&lt;CustomComponent /&gt;</code>)
							</li>
						</ul>
					</Note>
				</>
			),
		},
	],
};

export default function JsxPage() {
	return getPageLayout(content);
}

defineWompo(JsxPage, {
	name: 'jsx-page',
});
