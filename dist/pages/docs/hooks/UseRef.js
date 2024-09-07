import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "wompo/jsx-runtime";
import { defineWompo } from 'wompo';
import getPageLayout from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
import Note from '../../../components/Note.js';
import { Link } from 'wompo-router';
import Timer from '../../../examples/Timer.js';
import PasswordRevealer from '../../../examples/PasswordRevealer.js';
const content = {
    title: 'useRef hook',
    description: (_jsxs(_Fragment, { children: ["How to use the ", _jsx("code", { children: "useRef" }), " hook to keep a value of a variable stable across renders."] })),
    sections: [
        {
            title: 'Description',
            id: 'description',
            content: (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["The ", _jsx("code", { children: "useRef" }), " hook will save the value of a variable across renders. ", _jsx("br", {}), "Consider the following code:"] }), _jsx(Code, { code: `
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
              `, language: 'js' }), _jsxs("p", { children: ["The above code will not work. But why?", _jsx("br", {}), "This will be the component's lifecycle:", _jsxs("ol", { children: [_jsxs("li", { children: ["The component is in the DOM, so it will try to perform its first render and the", ' ', _jsx("code", { children: "Component()" }), " function will be executed."] }), _jsxs("li", { children: [_jsx("code", { children: "isChanged" }), " is set to \"State did not change\""] }), _jsx("li", { children: "The component is fully rendered" }), _jsx("li", { children: "The user clicks the button" }), _jsxs("li", { children: [_jsx("code", { children: "isChanged" }), " is set to \"State changed!\" and the ", _jsx("code", { children: "changed" }), "stateful variable is set to true."] }), _jsxs("li", { children: ["The new state differs from the previous state: the component is reloaded and the", ' ', _jsx("code", { children: "Component()" }), " function is executed."] }), _jsxs("li", { children: ["Again, ", _jsx("code", { children: "isChanged" }), " is set to \"State did not change\""] }), _jsx("li", { children: "The component is fully rendered" })] })] }), _jsxs("p", { children: ["Usually, you never want to make \"normal\" variable declarations inside of your component if you plan to change the variable's value at some point of the component's lifecycle.", _jsx("br", {}), "You may think:", ' ', _jsxs("i", { children: ["\"What if I move the variable declaration ", _jsx("b", { children: "outside" }), " of the component?\"."] }), _jsx("br", {}), "This approach would actually work, but you don't want to do it, for two reasons:", _jsxs("ol", { children: [_jsxs("li", { children: [_jsx("b", { children: "Every instance" }), " of the component will have the same value: they are not independent."] }), _jsxs("li", { children: ["The previous reason implies that the component is NOT ", _jsx("b", { children: "Pure" }), ", and this can lead to ", _jsx("b", { children: "unexpected behaviors" }), "."] })] }), "If you plan to use the component only once though, feel free do to it (but it'll make us sad)."] }), _jsxs("p", { children: ["The ", _jsx("code", { children: "useRef" }), " hook will solve this problem."] }), _jsxs(Note, { severity: 'warning', children: [_jsx("b", { children: "Warning" }), ": Seeing a \"", _jsx("b", { children: "let" }), "\" or \"", _jsx("b", { children: "var" }), "\" variable declaration inside of your component should always trigger some alarms. The only place you should use \"", _jsx("b", { children: "let" }), "\" or \"", _jsx("b", { children: "var" }), "\" variables instead of \"", _jsx("b", { children: "const" }), "\" variables is (maybe) inside other functions (events, etc.)."] }), _jsxs("p", { children: ["The ", _jsx("code", { children: "useRef" }), " hook has also a second use (which is usually the most common): if you put the value returned by it in a \"", _jsx("b", { children: "ref" }), "\" attribute of ", _jsx("i", { children: "any" }), " node, the value of the variable will become the actual node."] })] })),
        },
        {
            title: 'Usage',
            id: 'usage',
            content: (_jsxs(_Fragment, { children: [_jsx(Code, { code: `
							const ref = useRef(initialValue);
						`, language: 'js' }), _jsxs("p", { children: ["The ", _jsx("code", { children: "useRef" }), " hook accepts a single parameter, the ", _jsx("b", { children: "initial value" }), ", and will return an object having a \"", _jsx("b", { children: "current" }), "\" key, which will correspond to the current value of the variable.", _jsx("br", {}), "To update the value of the variable, you have to update the value of the \"current\" key."] }), _jsxs(Note, { severity: 'warning', children: [_jsx("b", { children: "Note" }), ": unlike the ", _jsx(Link, { to: '/docs/hooks/useState', children: "useState" }), " hook, updating the value will ", _jsx("b", { children: "not" }), " cause a re-render of the component."] }), _jsxs("p", { children: ["As said in the ", _jsx(Link, { to: '#description', children: "Description chapter" }), ", you can also use the value returned by the hook as the value of a \"ref\" attribute of any node. The value will be assigned ", _jsx("b", { children: "after" }), " the first render (not immediately).", _jsx("br", {}), "Quick Example:"] }), _jsx(Code, { code: `
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
            `, language: 'js' })] })),
        },
        {
            title: 'Example: timer',
            id: 'timer-example',
            content: (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["In this example we will create a simple timer using the ", _jsx("code", { children: "useRef" }), " hook to save the value of the intervalId once we start the timer."] }), _jsx(Code, { code: `
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
						`, language: 'js' }), _jsxs("p", { children: ["Result:", _jsx(Timer, {})] })] })),
        },
        {
            title: 'Example: password revealer',
            id: 'password-revealer-example',
            content: (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["In this example we will get the reference of an input node using the ", _jsx("code", { children: "useRef" }), ' ', "hook and display an alert showing it's value."] }), _jsx(Code, { code: `
							import { defineWompo, html, useRef } from 'wompo';

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

              defineWompo(PasswordRevealer);

						`, language: 'js' }), _jsxs("p", { children: ["Result:", _jsx(PasswordRevealer, {})] })] })),
        },
    ],
};
export default function UseRef() {
    return getPageLayout(content);
}
defineWompo(UseRef, {
    name: 'useref-hook-page',
});
