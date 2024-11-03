import { defineWompo } from 'wompo';
import getPageLayout, { Contents } from '../../../utils/getPageLayout.js';
import { Link } from 'wompo-router';
import Code from '../../../components/Code.js';

const content: Contents = {
	title: 'APIs',
	description:
		'A collection of resources that Wompo exposes to add extra functionalities or simply to help the developer.',
	sections: [
		{
			title: 'Functions',
			id: 'functions',
			content: (
				<>
					<p>
						Wompo exposes a list of functions that you can use:
						<ul>
							<li>
								<Link to='createContext'>createContext</Link> - Lets you create a Context that you
								can use in your application.
							</li>
							<li>
								<Link to='createPortal'>createPortal</Link> - Lets you attach some html in another
								DOM object.
							</li>
							<li>
								<Link to='defineWompo'>defineWompo</Link> - The function that you will use to
								declare your components.
							</li>
							<li>
								<Link to='html'>html</Link> - The result of this function is what must be returned
								by every component.
							</li>
							<li>
								<Link to='lazy'>lazy</Link> - For dynamically imported components.
							</li>
							<li>
								<Link to='unsafelyRenderString'>unsafelyRenderString</Link> - Renders a string
								variable.
							</li>
						</ul>
					</p>
				</>
			),
		},
		{
			title: 'Constants',
			id: 'constants',
			content: (
				<>
					<p>
						Wompo exposes also some constant variables that you can use:
						<ul>
							<li>
								<Link to='wompoDefaultOptions'>wompDefaultOptions</Link> - The default options that
								Wompo will use when initializing a component for the first time. You are free to
								customize them.
							</li>
							<li>
								<Link to='registeredComponents'>registeredComponents</Link> - An object containing
								the list of registered components.
							</li>
						</ul>
					</p>
				</>
			),
		},
		{
			title: 'Element API',
			id: 'wompo-element',
			content: (
				<>
					<p>
						The <Link to='element'>Element API</Link> represents the type of a Wompo Component DOM
						instance. You can use it to call methods and further customize your components.
					</p>
				</>
			),
		},
		{
			title: 'Types',
			id: 'types',
			content: (
				<>
					<p>
						For TypeScript users, Wompo exposes the following types:
						<ul>
							<li>
								<code>RenderHtml</code> - The type that the <Link to='html'>html</Link> function
								will return.
								<Code
									code={`
                    interface RenderHtml {
                      parts: TemplateStringsArray;
                      values: any[];
                      _$wompHtml: true;
                    }
                  `}
									language='ts'
								/>
							</li>
							<li>
								<code>WompoProps</code> - The props that any component has and allows. If you use
								JSX they are also the attributes that the JSX element allows.
								<Code
									code={`
                    interface WompoProps {
                      /** The children of the component instance */
                      children?: WompoChildren;
                      /** The styles generated from the CSS provided */
                      styles?: { [key: string]: string };
                      /** In DEV_MODE, will write on the console performance informations. */
                      ['wc-perf']?: boolean;
                      /** The style of a component to customize it through the style attribute in the DOM. */
                      style?: string | Partial<CSSStyleDeclaration> | object;
                      /** A potential reference to the element. */
                      ref?: RefHook<any>;
                      /** The ID of the element */
                      id?: string;
                      /** The classes of the element */
                      class?: string;
                    }
                  `}
									language='ts'
								/>
							</li>
							<li>
								<code>WompoComponentOptions</code> - The options that you can put as a second
								parameter in the <Link to='defineWompo'>defineWompo</Link> function.
								<Code
									code={`
                    interface WompoComponentOptions {
                      /**
                       * Default value: \`null\`.
                       * The component name. If not defined, the component name will be the name of the function in
                       * hyphen-case. If the component doesn't have an hyphen, a "wompo" string will be placed as a
                       * suffix.
                       * E.g. TabPanel = tab-panel, Counter = counter-wompo
                       */
                      name?: string;
                      /**
                       * Default value: \`false\`. If true, the component will be rendered in a shadow DOM.
                       */
                      shadow?: boolean;
                      /**
                       * Default value: \`true\`. If true, the CSS of the component will be replaced with a more unique
                       * CSS. This is done by simply putting the component name as a prefix in every class.
                       * The generated class names will be put in the [styles] prop of the component.
                       * This is done to avoid styles collisions.
                       * E.g. CounterComponent.css = \`.button\` => .counter-component__button
                       */
                      cssModule?: boolean;
                    }
                  `}
									language='ts'
								/>
							</li>
							<li>
								<code>WompoComponent&lt;Props extends WompoProps = WompoProps&gt;</code> - It's the{' '}
								<b>functional</b> component's type.
								<Code
									code={`
                    interface WompoComponent<Props extends WompoProps = WompoProps> {
                      /** The props of the component */
                      (props: Props): RenderHtml;
                      /**
                       * The specific styles of the component.
                       */
                      css?: string;
                      /** The component name, elaborated in the defineWompo function */
                      componentName?: string;
                      /** Identifies the component */
                      _$wompF?: true;
                      /** The generated class of the component */
                      class?: WompoElementClass<Props>;
                      /** Options */
                      options?: {
                        generatedCSS: string;
                        styles: { [key: string]: string };
                        shadow: boolean;
                      };
                    }
                  `}
									language='ts'
								/>
							</li>
							<li>
								<code>WompoElement&lt;Props extends WompoProps = WompoProps, Exposed = {}&gt;</code>{' '}
								A Wompo Component <b>Instance</b>. A detailed description of it is present in the{' '}
								<Link to='element'>Element API</Link>.
							</li>
							<li>
								<code>LazyCallbackResult</code> - The result that the callback provided in the{' '}
								<Link to='lazy'>lazy</Link> function must return.
								<Code
									code={`type LazyCallbackResult = Promise<{ default: WompoComponent }>;`}
									language='ts'
								/>
							</li>
							<li>
								<code>LazyResult</code> - The result type of the <Link to='lazy'>lazy</Link>{' '}
								function.
								<Code
									code={`
                    type LazyResult = {
                      (): Promise<WompoComponent<WompoProps>>;
                      _$wompLazy: boolean;
                    };
                  `}
									language='ts'
								/>
							</li>
						</ul>
					</p>
				</>
			),
		},
	],
};

export default function Apis() {
	return getPageLayout(content);
}

defineWompo(Apis, {
	name: 'docs-apis-page',
});
