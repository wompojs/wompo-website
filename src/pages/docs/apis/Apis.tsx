import { defineWomp } from 'womp';
import getPageLayout, { Contents } from '../../../utils/getPageLayout.js';
import { Link } from 'womp-router';
import Code from '../../../components/Code.js';

const content: Contents = {
	title: 'APIs',
	description:
		'A collection of resources that Womp exposes to add extra functionalities or simply to help the developer.',
	sections: [
		{
			title: 'Functions',
			id: 'functions',
			content: (
				<>
					<p>
						Womp exposes a list of functions that you can use:
						<ul>
							<li>
								<Link to='createContext'>createContext</Link> - Lets you create a Context that you
								can use in your application.
							</li>
							<li>
								<Link to='defineWomp'>defineWomp</Link> - The function that you will use to declare
								your components.
							</li>
							<li>
								<Link to='html'>html</Link> - The result of this function is what must be returned
								by every component.
							</li>
							<li>
								<Link to='lazy'>lazy</Link> - For dynamically imported components.
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
						Womp exposes also some constant variabled that you can use:
						<ul>
							<li>
								<Link to='wompDefaultOptions'>wompDefaultOptions</Link> - The default options that
								Womp will use when initializing a component for the first time. You are free to
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
			id: 'womp-element',
			content: (
				<>
					<p>
						The <Link to='element'>Element API</Link> represents the type of a Womp Component DOM
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
						For TypeScript users, Womp exposes the following types:
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
									lang='ts'
								/>
							</li>
							<li>
								<code>WompProps</code> - The props that any component has and allows. If you use JSX
								they are also the attributes that the JSX element allows.
								<Code
									code={`
                    interface WompProps {
                      /** The children of the component instance */
                      children?: WompChildren;
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
									lang='ts'
								/>
							</li>
							<li>
								<code>WompComponentOptions</code> - The options that you can put as a second
								parameter in the <Link to='defineWomp'>defineWomp</Link> function.
								<Code
									code={`
                    interface WompComponentOptions {
                      /**
                       * Default value: \`null\`.
                       * The component name. If not defined, the component name will be the name of the function in
                       * hyphen-case. If the component doesn't have an hyphen, a "womp" string will be placed as a
                       * suffix.
                       * E.g. TabPanel = tab-panel, Counter = counter-womp
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
									lang='ts'
								/>
							</li>
							<li>
								<code>WompComponent&lt;Props extends WompProps = WompProps&gt;</code> - It's the{' '}
								<b>functional</b> component's type.
								<Code
									code={`
                    interface WompComponent<Props extends WompProps = WompProps> {
                      /** The props of the component */
                      (props: Props): RenderHtml;
                      /**
                       * The specific styles of the component.
                       */
                      css?: string;
                      /** The component name, elaborated in the defineWomp function */
                      componentName?: string;
                      /** Identifies the component */
                      _$wompF?: true;
                      /** The generated class of the component */
                      class?: WompElementClass<Props>;
                      /** Options */
                      options?: {
                        generatedCSS: string;
                        styles: { [key: string]: string };
                        shadow: boolean;
                      };
                    }
                  `}
									lang='ts'
								/>
							</li>
							<li>
								<code>WompElement&lt;Props extends WompProps = WompProps, Exposed = {}&gt;</code> A
								Womp Component <b>Instance</b>. A detailed description of it is present in the{' '}
								<Link to='element'>Element API</Link>.
							</li>
							<li>
								<code>LazyCallbackResult</code> - The result that the callback provided in the{' '}
								<Link to='lazy'>lazy</Link> function must return.
								<Code
									code={`type LazyCallbackResult = Promise<{ default: WompComponent }>;`}
									lang='ts'
								/>
							</li>
							<li>
								<code>LazyResult</code> - The result type of the <Link to='lazy'>lazy</Link>{' '}
								function.
								<Code
									code={`
                    type LazyResult = {
                      (): Promise<WompComponent<WompProps>>;
                      _$wompLazy: boolean;
                    };
                  `}
									lang='ts'
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

defineWomp(Apis);
