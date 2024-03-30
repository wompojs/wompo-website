import { Fragment, jsx, jsxs } from "womp/jsx-runtime";
import { defineWomp } from "womp";
import getPageLayout from "../../../utils/getPageLayout.js";
import Code from "../../../components/Code.js";
import Note from "../../../components/Note.js";
import { Link } from "womp-router";
import Timer from "../../../examples/Timer.js";
import PasswordRevealer from "../../../examples/PasswordRevealer.js";
const content = {
  title: "useRef hook",
  description: /* @__PURE__ */ jsxs(Fragment, { children: [
    "How to use the ",
    /* @__PURE__ */ jsx("code", { children: "useRef" }),
    " hook to keep a value of a variable stable across renders."
  ] }),
  sections: [
    {
      title: "Description",
      id: "description",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "The ",
          /* @__PURE__ */ jsx("code", { children: "useRef" }),
          " hook will save the value of a variable across renders. ",
          /* @__PURE__ */ jsx("br", {}),
          "Consider the following code:"
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
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
            lang: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "The above code will not work. But why?",
          /* @__PURE__ */ jsx("br", {}),
          "This will be the component's lifecycle:",
          /* @__PURE__ */ jsxs("ol", { children: [
            /* @__PURE__ */ jsxs("li", { children: [
              "The component is in the DOM, so it will try to perform its first render and the",
              " ",
              /* @__PURE__ */ jsx("code", { children: "Component()" }),
              " function will be executed."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("code", { children: "isChanged" }),
              ' is set to "State did not change"'
            ] }),
            /* @__PURE__ */ jsx("li", { children: "The component is fully rendered" }),
            /* @__PURE__ */ jsx("li", { children: "The user clicks the button" }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("code", { children: "isChanged" }),
              ' is set to "State changed!" and the ',
              /* @__PURE__ */ jsx("code", { children: "changed" }),
              "stateful variable is set to true."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "The new state differs from the previous state: the component is reloaded and the",
              " ",
              /* @__PURE__ */ jsx("code", { children: "Component()" }),
              " function is executed."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "Again, ",
              /* @__PURE__ */ jsx("code", { children: "isChanged" }),
              ' is set to "State did not change"'
            ] }),
            /* @__PURE__ */ jsx("li", { children: "The component is fully rendered" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          `Usually, you never want to make "normal" variable declarations inside of your component if you plan to change the variable's value at some point of the component's lifecycle.`,
          /* @__PURE__ */ jsx("br", {}),
          "You may think:",
          " ",
          /* @__PURE__ */ jsxs("i", { children: [
            '"What if I move the variable declaration ',
            /* @__PURE__ */ jsx("b", { children: "outside" }),
            ' of the component?".'
          ] }),
          /* @__PURE__ */ jsx("br", {}),
          "This approach would actually work, but you don't want to do it, for two reasons:",
          /* @__PURE__ */ jsxs("ol", { children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("b", { children: "Every instance" }),
              " of the component will have the same value: they are not independent."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "The previous reason implies that the component is NOT ",
              /* @__PURE__ */ jsx("b", { children: "Pure" }),
              ", and this can lead to ",
              /* @__PURE__ */ jsx("b", { children: "unexpected behaviors" }),
              "."
            ] })
          ] }),
          "If you plan to use the component only once though, feel free do to it (but it'll make us sad)."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "The ",
          /* @__PURE__ */ jsx("code", { children: "useRef" }),
          " hook will solve this problem."
        ] }),
        /* @__PURE__ */ jsxs(Note, { severity: "warning", children: [
          /* @__PURE__ */ jsx("b", { children: "Warning" }),
          ': Seeing a "',
          /* @__PURE__ */ jsx("b", { children: "let" }),
          '" variable inside of your component should always trigger some alarms. The only place you should use "',
          /* @__PURE__ */ jsx("b", { children: "let" }),
          '" variables instead of "',
          /* @__PURE__ */ jsx("b", { children: "const" }),
          '" variables is (maybe) inside other functions (events, etc.).'
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "The ",
          /* @__PURE__ */ jsx("code", { children: "useRef" }),
          ' hook has also a second use (which is usually the most common): if you put the value returned by it in a "',
          /* @__PURE__ */ jsx("b", { children: "ref" }),
          '" attribute of ',
          /* @__PURE__ */ jsx("i", { children: "any" }),
          " node, the value of the variable will become the actual node."
        ] })
      ] })
    },
    {
      title: "Usage",
      id: "usage",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
							const ref = useRef(initialValue);
						`,
            lang: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "The ",
          /* @__PURE__ */ jsx("code", { children: "useRef" }),
          " hook accepts a single parameter, the ",
          /* @__PURE__ */ jsx("b", { children: "initial value" }),
          ', and will return an object having a "',
          /* @__PURE__ */ jsx("b", { children: "current" }),
          '" key, which will correspond to the current value of the variable.',
          /* @__PURE__ */ jsx("br", {}),
          'To update the value of the variable, you have to update the value of the "current" key.'
        ] }),
        /* @__PURE__ */ jsxs(Note, { severity: "warning", children: [
          /* @__PURE__ */ jsx("b", { children: "Note" }),
          ": unlike the ",
          /* @__PURE__ */ jsx(Link, { to: "/docs/hooks/useState", children: "useState" }),
          " hook, updating the value will ",
          /* @__PURE__ */ jsx("b", { children: "not" }),
          " cause a re-render of the component."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "As said in the ",
          /* @__PURE__ */ jsx(Link, { to: "#description", children: "Description chapter" }),
          ', you can also use the value returned by the hook as the value of a "ref" attribute of any node. The value will be assigned ',
          /* @__PURE__ */ jsx("b", { children: "after" }),
          " the first render (not immediately).",
          /* @__PURE__ */ jsx("br", {}),
          "Quick Example:"
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
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
            lang: "js"
          }
        )
      ] })
    },
    {
      title: "Example: timer",
      id: "timer-example",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "In this example we will create a simple timer using the ",
          /* @__PURE__ */ jsx("code", { children: "useRef" }),
          " hook to save the value of the intervalId once we start the timer."
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
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
						`,
            lang: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "Result:",
          /* @__PURE__ */ jsx(Timer, {})
        ] })
      ] })
    },
    {
      title: "Example: password revealer",
      id: "password-revealer-example",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "In this example we will get the reference of an input node using the ",
          /* @__PURE__ */ jsx("code", { children: "useRef" }),
          " ",
          "hook and display an alert showing it's value."
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
							import { defineWomp, html, useRef } from 'womp';

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

              defineWomp(PasswordRevealer);

						`,
            lang: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "Result:",
          /* @__PURE__ */ jsx(PasswordRevealer, {})
        ] })
      ] })
    }
  ]
};
export default function UseRef() {
  return getPageLayout(content);
}
defineWomp(UseRef);
