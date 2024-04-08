import { defineWompo } from 'wompo';
import getPageLayout, { Contents } from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
import { Link } from 'wompo-router';
import Note from '../../../components/Note.js';
import UseTime from '../../../examples/UseTime.js';

const content: Contents = {
	title: 'Create your own hooks',
	description:
		'In this guide we will cover how to create your own hooks by combining the existing ones.',
	sections: [
		{
			title: 'Introduction',
			id: 'intro',
			content: (
				<>
					<p>
						We know that the existing hooks will not satisfy <b>every</b> single exigency that a
						developer can have while developing Wompo Components, but they are the <b>base</b> that
						allows developers to satisfy those needs. You can create your own custom hooks that can
						then be used across all components.
					</p>
				</>
			),
		},
		{
			title: 'Combining hooks',
			id: 'combining-hooks',
			content: (
				<>
					<p>
						We can't stress it enough:{' '}
						<i>
							hooks are supposed to be used <b>only</b> inside a component.
						</i>
					</p>
					<p>...or...</p>
					<p>
						<i>inside other hooks!</i>
					</p>
					<p>
						Exactly, you can create a custom function (hook) that executes other hooks on it. Of
						course, this function is supposed to only be called inside a component (or eventually
						another hook).
						<br />
						As said before, native hooks are the <b>base</b>: they have the main functionalities and
						concepts that can be combined together to create more advanced and complex hooks. Let's
						see how.
					</p>
				</>
			),
		},
		{
			title: 'Example: useLocalStorage',
			id: 'use-local-storage-example',
			content: (
				<>
					<p>
						Let's dive into the first example: a hook that allows to use the local storage easily.
					</p>
					<Code
						code={`
              import { useState, useCallback } from 'wompo';

              function useLocalStorage(key, defaultValue) {
                // Initialize state
                const [value, setValue] = useState(null);
                // Create a custom setter function to set the localStorage value
                const setter = useCallback((newValue) => {
                  localStorage.setItem(key, newValue);
                  setValue(newValue);
                });
                // We get the localStorage value only the first time
                if(value === null){
                  const storedItem = localStorage.getItem(key);
                  if(storedItem === null) {
                    // If no value is seved we initialize it with the default value.
                    setter(defaultValue); 
                  } else {
                    // Otherwise, we just set the current value with the one in the localStorage
                    setter(storedItem); 
                  }
                }
                return [value, setter];
              }
            `}
						language='js'
					/>
					<p>
						Easy, isn't it? We combined the <Link to='/docs/hooks/useState'>useState</Link> hook and
						the <Link to='/docs/hooks/useCallback'>useCallback</Link> hook to create the custom{' '}
						<code>useLocalStorage</code> hook. This hook will accept a key and a default value, and
						will return the current value and a setter function to set a new value to the local
						storage. Thank to the <b>useState</b> hook, the component will also be automatically
						re-rendered when you update the storage.
					</p>
					<Note severity='info'>
						If you return a function in your custom hook, you should <b>always</b> wrap it around
						the <code>useCallback</code> hook so that, if used as a parameter for other components,
						it'll not cause a useless re-render.
					</Note>
				</>
			),
		},
		{
			title: 'Example: useTime',
			id: 'use-time-example',
			content: (
				<>
					<p>
						Another example can be a hook that will start counting the number of seconds since the
						component was first rendered (we personally don't have a clear idea of why it should be
						useful, but we think it's cool). This hook will not update the component: it will only
						count.
					</p>
					<Code
						code={`
              import { useRef, useEffect } from 'wompo';

              export default function useTime() {
                // Initialize the timer
                const timeRef = useRef(0);
                // Start the timer when the component is rendered for the first time
                useEffect(() => {
                  const intervalId = setInterval(() => {
                    // Update the timer by one every second.
                    timeRef.current += 1;
                  }, 1000);
                  // When the component is unmounted, stop the interval.
                  return () => {
                    clearInterval(intervalId);
                  };
                }, []);
                return timeRef;
              }
            `}
						language='js'
					/>
					<p>And then, in a component:</p>
					<Code
						code={`
              import { defineWompo, html } from 'wompo';
              import useTime from './useTime';

              function Component() {
                const timeSinceFirstRender = useTime();
                const showTime = () => {
                  alert(\`I was rendered \${timeSinceFirstRender.current} seconds ago\`)
                }
                return html\`
                  <button @click=\${showTime}>
                    If you click me I'll show you how many seconds ago I was rendered!
                  </button>
                \`;
              }
              defineWompo(Component);
            `}
						language='js'
					/>
					<p>
						Result:
						<UseTime />
					</p>
				</>
			),
		},
		{
			title: 'Advanced hooks',
			id: 'advanced-hooks',
			content: (
				<>
					You can create your own hooks from scratch without combining all the already existing
					hooks (you still need to use at least one). This is an advanced case, and should always be
					avoided when possible. If you want to know more, check the{' '}
					<Link to='/docs/hooks/useHook'>useHook</Link> hook reference.
				</>
			),
		},
	],
};

export default function CustomHooks() {
	return getPageLayout(content);
}

defineWompo(CustomHooks, {
	name: 'custom-hooks-page',
});
