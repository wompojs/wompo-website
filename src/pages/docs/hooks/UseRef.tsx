import { defineWomp } from 'womp';
import getPageLayout, { Contents } from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
import Note from '../../../components/Note.js';
import { Link } from 'womp-router';
import Timer from '../../../examples/Timer.js';
import PasswordRevealer from '../../../examples/PasswordRevealer.js';

const content: Contents = {
	title: 'useRef hook',
	description: (
		<>
			How to use the <code>useRef</code> hook to keep a value of a variable stable across renders.
		</>
	),
	sections: [
		{
			title: 'Description',
			id: 'description',
			content: (
				<>
					<p>
						The <code>useRef</code> hook will save the value of a variable across renders. <br />
						Consider the following code:
					</p>
					<Code
						code={`
                function Component(){
                  const [changed, setChanged] = useState(false);
                  let isChanged = 'State did not change';
                  const performChange = () => {
                    isChanged = 'State changed!';
                    setChanged(true);
                  }
                  return html\`
                    \${isChanged}
                    <button @click=\${performChange}>Change me!</button>
                  \`;
                }
              `}
						lang='js'
					/>
					<p>
						The above code will not work. But why?
						<br />
						This will be the component's lifecycle:
						<ol>
							<li>
								The component is in the DOM, so it will try to perform its first render and the{' '}
								<code>Component()</code> function will be executed.
							</li>
							<li>
								<code>isChanged</code> is set to "State did not change"
							</li>
							<li>The component is fully rendered</li>
							<li>The user clicks the button</li>
							<li>
								<code>isChanged</code> is set to "State changed!" and the <code>changed</code>
								stateful variable is set to true.
							</li>
							<li>
								The new state differs from the previous state: the component is reloaded and the{' '}
								<code>Component()</code> function is executed.
							</li>
							<li>
								Again, <code>isChanged</code> is set to "State did not change"
							</li>
							<li>The component is fully rendered</li>
						</ol>
					</p>
					<p>
						Usually, you never want to make "normal" variable declarations inside of your component
						if you plan to change the variable's value at some point of the component's lifecycle.
						<br />
						You may think:{' '}
						<i>
							"What if I move the variable declaration <b>outside</b> of the component?".
						</i>
						<br />
						This approach would actually work, but you don't want to do it, for two reasons:
						<ol>
							<li>
								<b>Every instance</b> of the component will have the same value: they are not
								independent.
							</li>
							<li>
								The previous reason implies that the component is NOT <b>Pure</b>, and this can lead
								to <b>unexpected behaviors</b>.
							</li>
						</ol>
						If you plan to use the component only once though, feel free do to it (but it'll make us
						sad).
					</p>
					<p>
						The <code>useRef</code> hook will solve this problem.
					</p>
					<Note severity='warning'>
						<b>Warning</b>: Seeing a "<b>let</b>" variable inside of your component should always
						trigger some alarms. The only place you should use "<b>let</b>" variables instead of "
						<b>const</b>" variables is (maybe) inside other functions (events, etc.).
					</Note>
					<p>
						The <code>useRef</code> hook has also a second use (which is usually the most common):
						if you put the value returned by it in a "<b>ref</b>" attribute of <i>any</i> node, the
						value of the variable will become the actual node.
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
							const ref = useRef(initialValue);
						`}
						lang='js'
					/>
					<p>
						The <code>useRef</code> hook accepts a single parameter, the <b>initial value</b>, and
						will return an object having a "<b>current</b>" key, which will correspond to the
						current value of the variable.
						<br />
						To update the value of the variable, you have to update the value of the "current" key.
					</p>
					<Note severity='warning'>
						<b>Note</b>: unlike the <Link to='/docs/hooks/useState'>useState</Link> hook, updating
						the value will <b>not</b> cause a re-render of the component.
					</Note>
					<p>
						As said in the <Link to='#description'>Description chapter</Link>, you can also use the
						value returned by the hook as the value of a "ref" attribute of any node. The value will
						be assigned <b>after</b> the first render (not immediately).
						<br />
						Quick Example:
					</p>
					<Code
						code={`
              function Component(){
                const nodeRef = useRef();
                
                console.log(nodeRef.current) // ❌ On the first render it will be null!

                useEffect(() => {
                  console.log(nodeRef.current) // ✅ It will already be valorized at this point!
                  console.log(nodeRef.current.textContent) // "Hey!"
                }, []);

                return html\`
                  <div ref=\${nodeRef}>Hey!</div>
                \`;
              }
            `}
						lang='js'
					/>
				</>
			),
		},
		{
			title: 'Example: timer',
			id: 'timer-example',
			content: (
				<>
					<p>
						In this example we will create a simple timer using the <code>useRef</code> hook to save
						the value of the intervalId once we start the timer.
					</p>
					<Code
						code={`
							import { useState, defineWomp, html, useRef } from 'womp';

              export default function Timer() {
                const [timer, setTimer] = useState(0);
                const intervalId = useRef(null);

                function startTimer() {
                  intervalId.current = setInterval(() => {
                    setTimer((oldTimer) => oldTimer + 1);
                  }, 10);
                }

                function stopTimer() {
                  clearInterval(intervalId.current);
                  intervalId.current = null;
                }

                function resetTimer() {
                  setTimer(0);
                }

                return html\`<div>
                  <button @click=\${startTimer} disabled=\${intervalId.current !== null}>Start</button>
                  <button @click=\${stopTimer} disabled=\${intervalId.current === null}>Stop</button>
                  <button @click=\${resetTimer} disabled=\${timer === 0}>Reset</button>
                  <p>\${(timer / 100).toFixed(2)}</p>
                </div>\`;
              }

              defineWomp(Timer);
						`}
						lang='js'
					/>
					<p>
						Result:
						<Timer />
					</p>
				</>
			),
		},
		{
			title: 'Example: password revealer',
			id: 'password-revealer-example',
			content: (
				<>
					<p>
						In this example we will get the reference of an input node using the <code>useRef</code>{' '}
						hook and display an alert showing it's value.
					</p>
					<Code
						code={`
							import { defineWomp, html, useRef } from 'womp';

              export default function PasswordRevealer() {
                const inputRef = useRef(null);

                const revealPassword = () => {
                  alert(\`Your password is: "\${inputRef.current.value}" 😈\`);
                };

                return html\`<div>
                  <label>
                    Type your password here:
                    <input ref=\${inputRef} type="password" />
                    <button @click=\${revealPassword}>I'll show your password to everyone!</button>
                  </label>
                </div>\`;
              }

              defineWomp(PasswordRevealer);

						`}
						lang='js'
					/>
					<p>
						Result:
						<PasswordRevealer />
					</p>
				</>
			),
		},
	],
};

export default function UseRef() {
	return getPageLayout(content);
}

defineWomp(UseRef);
