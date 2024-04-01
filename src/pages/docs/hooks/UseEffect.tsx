import { defineWompo } from 'wompo';
import getPageLayout, { Contents } from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
import { Link } from 'wompo-router';
import Note from '../../../components/Note.js';

const content: Contents = {
	title: 'useEffect hook',
	description: (
		<>
			How to use the <code>useEffect</code> hook to make a component execute some operations on
			specific situations.
		</>
	),
	sections: [
		{
			title: 'Description',
			id: 'description',
			content: (
				<>
					<p>
						The <code>useEffect</code> hook is one of the main hooks you will use in your
						application. This hook lets you execute a callback (effect) function after the{' '}
						<b>first render</b> and whenever one of the dependecies changes. This can be quite ideal
						for:
						<ul>
							<li>Initializing the component</li>
							<li>
								Subscribing to events (e.g. <code>window.addEventListener</code>)
							</li>
							<li>Using timeouts and intervals</li>
							<li>Performing animations</li>
							<li>
								Controlling a non-wompo widget or node in conjuctions with the <code>useRef</code>{' '}
								hook
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
							useEffect(effectFn, dependencies);
						`}
						language='js'
					/>
					<p>
						The hook accepts two parameters: the <b>effect function</b> and the{' '}
						<b>list of dependencies</b>. The effect function will be executed on first render and
						any time one of the dependecies changes. This function can be a void function or can
						return a second function (called cleaning function) that will be executed{' '}
						<b>before the execution of the next same effect</b> or if the component <b>unmount</b>{' '}
						(is removed from the DOM).
					</p>
					<p>
						If an empty array is given as a list of dependecies, the effect will be executed{' '}
						<b>only</b> after the first render.
					</p>
					<p>If no dependencies are specified, the effect will be executed on every render.</p>
					<Note severity='info'>
						<b>Note:</b> The effect will be executed <b>asynchronously</b> after the component has
						been rendered.
					</Note>
				</>
			),
		},
		{
			title: 'Example: timeout',
			id: 'timeout-example',
			content: (
				<>
					<p>
						Using the <code>window.setTimeout</code> function is a common use case for the{' '}
						<code>useEffect</code> hook. Here's an example:
					</p>
					<Code
						code={`
							import { useEffect, defineWompo, html } from 'wompo';

              function TimeoutComponent(){
                useEffect(() => {
                  const timeoutId = setTimeout(() => {
                    alert('I was first rendered 5 seconds ago!');
                  }, 5000);
                  return () => {
                    clearTimeout(timeoutId);
                  }
                }, [])
                return html\`Nothing to see here, boss.\`;
              }

              defineWompo(TimeoutComponent);
						`}
						language='js'
					/>
					<Note severity='warning'>
						When using timeouts and intervals, remember to <b>always</b> cancel them using the{' '}
						<b>cleaning function</b> (like in the example). Not doing so can lead to unexpected
						behaviours.
					</Note>
					<p>
						<i>Why the useEffect hook is needed for this case?</i>
						<br />
						Because if you call the <code>setTimoeut</code> function directly inside the component,
						it will be executed <b>every time</b> the component renders. This usually causes
						unwanted loops when inside the timeout/interval callback a setState is called.
					</p>
				</>
			),
		},
		{
			title: 'Example: fetching data',
			id: 'fetching-data-example',
			content: (
				<>
					<p>
						The <code>useEffect</code> hook can also be used to fetch data when the component
						renders.
					</p>
					<Note severity='info'>
						<b>Note:</b> This example is only made to understand better how the hook works and how
						to do async operations inside of it. If you actually have to perform data fetching, use
						the <Link to='/docs/hooks/useAsync'>useAsync</Link> hook instead.
					</Note>
					<Code
						code={`
							import { useEffect, useState, defineWompo, html } from 'wompo';

              function User({ userId }){
                const [user, setUser] = useState(null);

                useEffect(() => {
                  fetch(\`/get/user/\${userId}\`)
                    .then((res) => res.json())
                    .then((data) => setUser(data));
                }, [userId])

                return html\`...\`;
              }

              defineWompo(User);
						`}
						language='js'
					/>
					<Note severity='warning'>
						The effect callback <b>cannot return a promise</b>, so you cannot declare it as an async
						function and you cannot use the <b>await</b> keyword. Use <code>.then</code> functions
						or create an helper async function to call <b>inside</b> the effect.
					</Note>
				</>
			),
		},
		{
			title: 'Example: local storage',
			id: 'localstorage-example',
			content: (
				<>
					<p>
						This example will show how you can use the <b>useEffect</b> hook to make operations into
						the <code>window.localStorage</code> to save and get data.
					</p>
					<Code
						code={`
							import { useEffect, useState, defineWompo, html } from 'wompo';

              function Theme({ userId }){
                const [theme, setTheme] = useState('light');

                // Get the user theme preference
                useEffect(() => {
                  // Gets executed only on first render
                  const savedThemePreference = localStorage.getItem('theme');
                  if(savedThemePreference)
                    setTheme(savedThemePreference);
                }, [])

                // Set the new user's theme preference
                useEffect(() => {
                  // Gets executed on first render and every time that "theme" changes
                  localStorage.setItem('theme', theme);
                }, [theme]);

                return html\`...\`;
              }

              defineWompo(Theme);
						`}
						language='js'
					/>
					<p>
						In this example we used two effects: one to get the user's theme preference, executed
						only once, and one to save the user's theme preference whenever the theme preference
						changes.
					</p>
					<Note severity='info'>
						<b>Effects will be executed in the order they are declared</b>, so the order matters. In
						this example, if you execute the second effect before the other it will not work,
						because the theme in the localStorage will be always updated with the initial value of
						the state.
					</Note>
				</>
			),
		},
		{
			title: 'Example: Code highlighting',
			id: 'code-highlighting-example',
			content: (
				<>
					<p>
						In this example we will combine the <Link to='/docs/hooks/useRef'>useRef</Link> hook
						with the third party library <b>highlight.js</b> and the <code>useEffect</code> hook to
						create an highlighted code component.
					</p>
					<Code
						code={`
							import { useEffect, useRef, defineWompo, html } from 'wompo';

              function Code({ code, lang }){
                const codeRef = useRef();

                useEffect(() => {
                  const highlighted = hljs.highlight(code, { language: lang });
                  codeRef.current.innerHTML = highlighted.value;
                }, []);

                return html\`
                  <pre class=\${s.pre}>
                    <code ref=\${codeRef}></code>
                  </pre>
                \`;
              }

              defineWompo(Code);
						`}
						language='js'
					/>
					<p>
						In the above example the <code>Code</code> component accepts a <b>code</b> prop and a{' '}
						<b>lang</b> prop that will be used to create the highligted HTML that will be injected
						in the <b>code</b> HTML element thanks to the <code>useRef</code> hook.
					</p>
				</>
			),
		},
	],
};

export default function UseEffect() {
	return getPageLayout(content);
}

defineWompo(UseEffect, {
	name: 'useeffect-hook-page',
});
