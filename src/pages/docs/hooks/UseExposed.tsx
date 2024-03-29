import { defineWomp } from 'womp';
import getPageLayout, { Contents } from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
import { Link } from 'womp-router';
import Note from '../../../components/Note.js';

const content: Contents = {
	title: 'useExposed hook',
	description: (
		<>
			How to use the <code>useExposed</code> hook to expose some data in the DOM.
		</>
	),
	sections: [
		{
			title: 'Description',
			id: 'description',
			content: (
				<>
					<p>
						The <code>useExposed</code> hook will let you expose some data into the DOM so that it
						can be accessed from other scripts or by selecting the HTML node through{' '}
						<code>document.querySelector</code> or through the{' '}
						<Link to="/docs/hooks/useRef">useRef</Link> hook.
					</p>
					<p>
						Unlike <b>React</b>, in Womp components are meant to be <u>completely</u> isolated,
						meaning that their state should't dependend on props and
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
							UseExposed(effectFn, dependencies);
						`}
						lang="js"
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
					<Note severity="info">
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
						<code>UseExposed</code> hook. Here's an example:
					</p>
					<Code
						code={`
							import { UseExposed, defineWomp, html } from 'womp';

              function TimeoutComponent(){
                UseExposed(() => {
                  const timeoutId = setTimeout(() => {
                    alert('I was first rendered 5 seconds ago!');
                  }, 5000);
                  return () => {
                    clearTimeout(timeoutId);
                  }
                }, [])
                return html\`Nothing to see here, boss.\`;
              }

              defineWomp(TimeoutComponent);
						`}
						lang="js"
					/>
					<Note severity="warning">
						When using timeouts and intervals, remember to <b>always</b> cancel them using the{' '}
						<b>cleaning function</b> (like in the example). Not doing so can lead to unexpected
						behaviours.
					</Note>
					<p>
						<i>Why the UseExposed hook is needed for this case?</i>
						<br />
						Because if you call the <code>setTimoeut</code> function directly inside the component,
						it will be executed <b>every time</b> the component renders. This usually causes
						unwanted loops when inside the timeout/interval callback a setState is called.
					</p>
				</>
			),
		},
	],
};

export default function UseExposed() {
	return getPageLayout(content);
}

defineWomp(UseExposed);
