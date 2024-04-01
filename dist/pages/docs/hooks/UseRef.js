import { Fragment as n, jsx as e, jsxs as t } from 'wompo/jsx-runtime';
import { defineWompo as l } from 'wompo';
import s from '../../../utils/getPageLayout.js';
import o from '../../../components/Code.js';
import i from '../../../components/Note.js';
import { Link as a } from 'wompo-router';
import d from '../../../examples/Timer.js';
import u from '../../../examples/PasswordRevealer.js';
const c = {
	title: 'useRef hook',
	description: t(n, {
		children: [
			'How to use the ',
			e('code', { children: 'useRef' }),
			' hook to keep a value of a variable stable across renders.',
		],
	}),
	sections: [
		{
			title: 'Description',
			id: 'description',
			content: t(n, {
				children: [
					t('p', {
						children: [
							'The ',
							e('code', { children: 'useRef' }),
							' hook will save the value of a variable across renders. ',
							e('br', {}),
							'Consider the following code:',
						],
					}),
					e(o, {
						code: `
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
              `,
						language: 'js',
					}),
					t('p', {
						children: [
							'The above code will not work. But why?',
							e('br', {}),
							"This will be the component's lifecycle:",
							t('ol', {
								children: [
									t('li', {
										children: [
											'The component is in the DOM, so it will try to perform its first render and the',
											' ',
											e('code', { children: 'Component()' }),
											' function will be executed.',
										],
									}),
									t('li', {
										children: [
											e('code', { children: 'isChanged' }),
											' is set to "State did not change"',
										],
									}),
									e('li', { children: 'The component is fully rendered' }),
									e('li', { children: 'The user clicks the button' }),
									t('li', {
										children: [
											e('code', { children: 'isChanged' }),
											' is set to "State changed!" and the ',
											e('code', { children: 'changed' }),
											'stateful variable is set to true.',
										],
									}),
									t('li', {
										children: [
											'The new state differs from the previous state: the component is reloaded and the',
											' ',
											e('code', { children: 'Component()' }),
											' function is executed.',
										],
									}),
									t('li', {
										children: [
											'Again, ',
											e('code', { children: 'isChanged' }),
											' is set to "State did not change"',
										],
									}),
									e('li', { children: 'The component is fully rendered' }),
								],
							}),
						],
					}),
					t('p', {
						children: [
							`Usually, you never want to make "normal" variable declarations inside of your component if you plan to change the variable's value at some point of the component's lifecycle.`,
							e('br', {}),
							'You may think:',
							' ',
							t('i', {
								children: [
									'"What if I move the variable declaration ',
									e('b', { children: 'outside' }),
									' of the component?".',
								],
							}),
							e('br', {}),
							"This approach would actually work, but you don't want to do it, for two reasons:",
							t('ol', {
								children: [
									t('li', {
										children: [
											e('b', { children: 'Every instance' }),
											' of the component will have the same value: they are not independent.',
										],
									}),
									t('li', {
										children: [
											'The previous reason implies that the component is NOT ',
											e('b', { children: 'Pure' }),
											', and this can lead to ',
											e('b', { children: 'unexpected behaviors' }),
											'.',
										],
									}),
								],
							}),
							"If you plan to use the component only once though, feel free do to it (but it'll make us sad).",
						],
					}),
					t('p', {
						children: ['The ', e('code', { children: 'useRef' }), ' hook will solve this problem.'],
					}),
					t(i, {
						severity: 'warning',
						children: [
							e('b', { children: 'Warning' }),
							': Seeing a "',
							e('b', { children: 'let' }),
							'" variable inside of your component should always trigger some alarms. The only place you should use "',
							e('b', { children: 'let' }),
							'" variables instead of "',
							e('b', { children: 'const' }),
							'" variables is (maybe) inside other functions (events, etc.).',
						],
					}),
					t('p', {
						children: [
							'The ',
							e('code', { children: 'useRef' }),
							' hook has also a second use (which is usually the most common): if you put the value returned by it in a "',
							e('b', { children: 'ref' }),
							'" attribute of ',
							e('i', { children: 'any' }),
							' node, the value of the variable will become the actual node.',
						],
					}),
				],
			}),
		},
		{
			title: 'Usage',
			id: 'usage',
			content: t(n, {
				children: [
					e(o, {
						code: `
							const ref = useRef(initialValue);
						`,
						language: 'js',
					}),
					t('p', {
						children: [
							'The ',
							e('code', { children: 'useRef' }),
							' hook accepts a single parameter, the ',
							e('b', { children: 'initial value' }),
							', and will return an object having a "',
							e('b', { children: 'current' }),
							'" key, which will correspond to the current value of the variable.',
							e('br', {}),
							'To update the value of the variable, you have to update the value of the "current" key.',
						],
					}),
					t(i, {
						severity: 'warning',
						children: [
							e('b', { children: 'Note' }),
							': unlike the ',
							e(a, { to: '/docs/hooks/useState', children: 'useState' }),
							' hook, updating the value will ',
							e('b', { children: 'not' }),
							' cause a re-render of the component.',
						],
					}),
					t('p', {
						children: [
							'As said in the ',
							e(a, { to: '#description', children: 'Description chapter' }),
							', you can also use the value returned by the hook as the value of a "ref" attribute of any node. The value will be assigned ',
							e('b', { children: 'after' }),
							' the first render (not immediately).',
							e('br', {}),
							'Quick Example:',
						],
					}),
					e(o, {
						code: `
              function Component(){
                const nodeRef = useRef();
                
                console.log(nodeRef.current) // \u274C On the first render it will be null!

                useEffect(() => {
                  console.log(nodeRef.current) // \u2705 It will already be valorized at this point!
                  console.log(nodeRef.current.textContent) // "Hey!"
                }, []);

                return html\`
                  <div ref=\${nodeRef}>Hey!</div>
                \`;
              }
            `,
						language: 'js',
					}),
				],
			}),
		},
		{
			title: 'Example: timer',
			id: 'timer-example',
			content: t(n, {
				children: [
					t('p', {
						children: [
							'In this example we will create a simple timer using the ',
							e('code', { children: 'useRef' }),
							' hook to save the value of the intervalId once we start the timer.',
						],
					}),
					e(o, {
						code: `
							import { useState, defineWompo, html, useRef } from 'wompo';

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

              defineWompo(Timer);
						`,
						language: 'js',
					}),
					t('p', { children: ['Result:', e(d, {})] }),
				],
			}),
		},
		{
			title: 'Example: password revealer',
			id: 'password-revealer-example',
			content: t(n, {
				children: [
					t('p', {
						children: [
							'In this example we will get the reference of an input node using the ',
							e('code', { children: 'useRef' }),
							' ',
							"hook and display an alert showing it's value.",
						],
					}),
					e(o, {
						code: `
							import { defineWompo, html, useRef } from 'wompo';

              export default function PasswordRevealer() {
                const inputRef = useRef(null);

                const revealPassword = () => {
                  alert(\`Your password is: "\${inputRef.current.value}" \u{1F608}\`);
                };

                return html\`<div>
                  <label>
                    Type your password here:
                    <input ref=\${inputRef} type="password" />
                    <button @click=\${revealPassword}>I'll show your password to everyone!</button>
                  </label>
                </div>\`;
              }

              defineWompo(PasswordRevealer);

						`,
						language: 'js',
					}),
					t('p', { children: ['Result:', e(u, {})] }),
				],
			}),
		},
	],
};
export default function r() {
	return s(c);
}
l(r, { name: 'useref-hook-page' });
