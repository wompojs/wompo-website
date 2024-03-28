import { defineWomp } from 'womp';
import getPageLayout, { Contents } from '../../../utils/getPageLayout.js';
import { Link } from 'womp-router';

const content: Contents = {
	title: 'Hooks',
	description: 'What are hooks: how and when to use them.',
	sections: [
		{
			title: 'What are hooks?',
			id: 'what-are-hooks',
			content: (
				<>
					<p>
						Hooks are helper functions that let you add specific functionalities in your Womp
						components. This functions will "hook" into the component so that they have access to
						the whole HTML instance and operate adding functionalities to it. More specifically,
						they allow to:
						<ul>
							<li>Make your component dynamic</li>
							<li>Create callbacks that will be executed on specific cases</li>
							<li>Keep a variable's value stable across renders</li>
							<li>
								Get a specific <b>Context</b>
							</li>
							<li>Optimize performances by avoiding useless re-renderings</li>
						</ul>
						Hooks work like <b>import statements</b> inside a component. This implies that:
						<ol>
							<li>
								Like import statements, they <b>must</b> be declared on top of the component, in the
								first lines, before any operation is performed.
							</li>
							<li>They cannot be conditional or executed inside loops.</li>
						</ol>
						If these conditions are not respected, the component might have unexpected behaviors.
					</p>
					<p>
						Womp offers a good variety of hooks, but you are also completely free to create your own
						very easily.
						<br />
					</p>
				</>
			),
		},
		{
			title: 'State hooks',
			id: 'state-hooks',
			content: (
				<>
					<p>
						State hooks are what allow to make a component dynamic and cause a re-render of it, so
						that you can see visual updates in your component. To do that, Womp offers the following
						hooks:
						<ul>
							<li>
								<Link to='useState'>useState</Link> - Probably the most common hook you will use:
								creates a stateful variable and a setter function that will cause a re-render of the
								component when called (if the new value differs from the old one).
							</li>
							<li>
								<Link to='useReducer'>useReducer</Link> - For <b>Redux</b> fans. This hook allows to
								elegantly handle the state of a component using a <b>reducer</b> to handle all the
								operations to alter the state and a <b>dispatch</b> function to set the new state.
							</li>
						</ul>
					</p>
				</>
			),
		},
		{
			title: 'Effect hooks',
			id: 'effect-hooks',
			content: (
				<>
					<p>
						Effect hooks are what allows to execute a specific <b>callback</b> when one of your
						<b>dependencies</b> changes, or simply on the first (or on every) render. This
						dependencies are simply an array of values. The effect hooks are:
						<ul>
							<li>
								<Link to='useEffect'>useEffect</Link> - After <b>useState</b>, the probably second
								most common hook you will use: will execute the callback after a render if any of
								its dependencies changed. The callback will be executed <b>Asynchronously</b>.
							</li>
							<li>
								<Link to='useLayoutEffect'>useLayoutEffect</Link> - It's the same as the{' '}
								<b>useEffect</b> hook. The only difference is that the callback is executed{' '}
								<b>Synchronously</b> immediately after a render, before you can see visual changes.
								The <i>useEffect</i> hook is preferred, because it'll not saturate the stack.
							</li>
						</ul>
					</p>
				</>
			),
		},
		{
			title: 'Performance hooks',
			id: 'performance-hooks',
			content: (
				<>
					<p>
						Performance hooks let you skip useless operations across renders, or keep a value stable
						between renders so it's not re-initialized every time, allowing to optimize the
						component by avoiding unnecessary re-renderings.
						<br />
						Performance hooks are:
						<ul>
							<li>
								<Link to='useRef'>useRef</Link> - It'll keep a value stable across renders, by
								always returning the last saved value. It can optionally also be used to reference a
								node in the DOM.
							</li>
							<li>
								<Link to='useCallback'>useCallback</Link> - The useCallback hook will take a
								function and save it so that it's not re-created on every render. This is useful if
								you're using a function as an attribute value of some other components, because the
								attribute will always have the same value (remember that in Javascript two functions
								are never equal, unless a function is compared to itself).
							</li>
							<li>
								<Link to='useMemo'>useMemo</Link> - This hook will let you execute a callback
								function and return its result only when a dependency changes, instead of on every
								render.
							</li>
						</ul>
					</p>
				</>
			),
		},
		{
			title: 'Context hooks',
			id: 'context-hooks',
			content: (
				<>
					<p>
						A Context hook will let you <b>obtain a value provided by another element</b>, more
						specifically, a<code>Context.Provider</code> element. There is only one context hook:
						<ul>
							<li>
								<Link to='useContext'>useContext</Link> - Will return the value provided by the
								closest parent context provider of the specified context. If there is not one, the
								default value of the context will be returned. The component that uses this hook
								will automatically re-render whenever the value provided by the provider changes.
							</li>
						</ul>
					</p>
				</>
			),
		},
		{
			title: 'Helper hooks',
			id: 'helper-hooks',
			content: (
				<>
					<p>
						Helper hooks are simple hooks that solve common problems. The currently available helper
						hooks are:
						<ul>
							<li>
								<Link to='useId'>useId</Link> - Will return a unique string in the format{' '}
								<code>:w&lt;number&gt;:</code>. The ID will not change on every re-render. This is
								useful when you want to use IDs for node elements inside of a component. Common use
								cases are for inputs, labels, and accessibility.
							</li>
							<li>
								<Link to='useExposed'>useExposed</Link> - The useExposed hook will let you expose
								some values and/or functions in the comonent's instance of the DOM. This allows, for
								example, to select a DOM node and call a method on it. Can be useful to{' '}
								<b>Expose state</b>. Commonly used in combination with the <i>useRef</i> hook.
							</li>
							<li>
								<Link to='useAsync'>useAsync</Link> - This hook will take care of asynchronous
								operations in the component by executing a callback on first render and when one of
								its dependencies changes. This hooks integrates with the{' '}
								<b>
									<i>Suspense</i>
								</b>{' '}
								component, allowing to easily handle the loading state of the component.
							</li>
						</ul>
					</p>
				</>
			),
		},
	],
};

export default function Hooks() {
	return getPageLayout(content);
}

defineWomp(Hooks);
