import { defineWompo } from 'wompo';
import getPageLayout, { Contents } from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
import Note from '../../../components/Note.js';

const content: Contents = {
	title: 'useCallback hook',
	description: (
		<>
			How to use the <code>useCallback</code> hook to cache functions and improve performance.
		</>
	),
	sections: [
		{
			title: 'Description',
			id: 'description',
			content: (
				<>
					<p>
						The <code>useCallback</code> hook is a hook that lets you save a function definition
						across re-renders, so that it'll always keep the same reference to it.
						<br />
						Why is it useful? Because in javascript two function declarations are not considered
						equal:
						<Code
							language='js'
							code={`
                function(){} === function(){} // false
                
                const a = () => {}
                a === a // true
              `}
						/>
						So, for example, a useful case whre you can use it, is when a callback function is
						passed through the props of another component: if you don't use the `useCallback` hook,
						the child component will re-render every time the parent component changes, because the
						two functions will be considered different.
					</p>
					<Note severity='info'>
						<b>Note:</b> This consideration doesn't apply to events, because events are stored in a
						simple variable and will not cause an add/removal of event listeners, so it's not
						computationally expensive: it's more expensive to store the callback and get it back
						every time.
					</Note>
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
							const callback = useCallback(callbackDefinition, dependencies);
						`}
						language='js'
					/>
					<p>
						The hook will cache the <code>callbackDefinition</code> function and alway return the
						same value on every render, without re-initializing the function every time.
						<br />
						The hook accepts two parameters: a callback that can be any function declaration, and a
						list of dependencies. The dependecies are optional, but if they are set, the hook will
						check if any of them changed, and if it happened, it will re-build the function and
						return the new value.
					</p>
				</>
			),
		},
		{
			title: 'Example',
			id: 'counter-example',
			content: (
				<>
					<p>
						A basic example is using the <code>useCallback</code> hook to pass it to another
						component as a parement, so that useless re-renderings are avoided.
					</p>
					<Code
						code={`
							import { useCallback, defineWompo, html } from 'wompo';
              import UserForm from './UserForm';

							export default function User({ userId }) {
								const submitData = useCallback((data) => {
                  fetch(\`/udpate/user/\${userId}\`, { method: 'POST', body: data })
                }, [userId])

								return html\`<\${UserForm} onSubmit=\${submitData} />\`;
							}

							defineWompo(Component);
						`}
						language='js'
					/>
					<p>
						In this example, the <code>UserForm</code> component will not re-render every time that
						the <code>User</code> component renders.
					</p>
				</>
			),
		},
	],
};

export default function UseCallback() {
	return getPageLayout(content);
}

defineWompo(UseCallback, {
	name: 'usecallback-hook-page',
});
