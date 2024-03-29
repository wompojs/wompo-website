import { Fragment, jsx, jsxs } from "womp/jsx-runtime";
import { defineWomp } from "womp";
import getPageLayout from "../../../utils/getPageLayout.js";
import Code from "../../../components/Code.js";
import Counter from "../../../tutorials/Counter.js";
import Timer from "../../../tutorials/Timer.js";
import Note from "../../../components/Note.js";
import UserForm from "../../../tutorials/UserForm.js";
import StateInitializerExample from "../../../tutorials/StateInitializer.js";
const content = {
  title: "useState hook",
  description: /* @__PURE__ */ jsxs(Fragment, { children: [
    "How to use the ",
    /* @__PURE__ */ jsx("code", { children: "useState" }),
    " hook to make your component stateful."
  ] }),
  sections: [
    {
      title: "Description",
      id: "description",
      content: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("p", { children: [
        "The ",
        /* @__PURE__ */ jsx("code", { children: "useState" }),
        " hook is a hook that adds a stateful variable into your component, causing automatic re-renders when this variable is updated.",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("i", { children: "Like every other hook, it should be used in the top of your component, like an import statement." })
      ] }) })
    },
    {
      title: "Usage",
      id: "usage",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
							const [state, setState] = useState(initialState);
						`,
            lang: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "The hook will return an array containing two values: ",
          /* @__PURE__ */ jsx("b", { children: "the current value" }),
          " of the state, and a ",
          /* @__PURE__ */ jsx("b", { children: "setter function" }),
          " to set the new value.",
          /* @__PURE__ */ jsx("br", {}),
          "The hook accepts a single parameter: the initial state. Primitive values are preferred, but you can also use objects and arrays. You can also optionally specify an initilizer function.",
          /* @__PURE__ */ jsx("br", {}),
          "The setter function accepts also a single parameter: the newly updated state or a callback that will return the new state, having the old state as a parameter."
        ] })
      ] })
    },
    {
      title: "Initialiazer function",
      id: "initializer-function",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("code", { children: "useState" }),
          " also allows to use a function as a parameter for the initial state. If so, the function will be executed and the initial state will be the result of this function. A common use case for this can be using an initial state that requires a computational operation."
        ] }),
        /* @__PURE__ */ jsxs(Note, { severity: "warning", children: [
          /* @__PURE__ */ jsx("b", { children: "Note:" }),
          " Keep in mind that a component should alway be pure! This means that the initializer function should also be pure."
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
							import { useState, defineWomp, html } from 'womp';

							function getInitialState(){
								const initialTodos = []
								for(let i = 1; i <= 10; i++){
									initialTodos.push({ title: \`Todo N.\${i}\`, id: i });
								}
								return initialTodos;
							}

							export default function UserForm() {
								const [todos, setTodos] = useState(getInitialState);

								return html\`<ul>
									\${todos.map(todo => html\`<li>\${todo.title}</li>\`)}
								</ul>\`;
							}

							defineWomp(UserForm);
						`,
            lang: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "Result:",
          /* @__PURE__ */ jsx(StateInitializerExample, {})
        ] })
      ] })
    },
    {
      title: "Example: Counter - Making a component stateful",
      id: "counter-example",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "This is the most basic example of the usafe of the ",
          /* @__PURE__ */ jsx("code", { children: "useState" }),
          " hook."
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
							import { useState, defineWomp, html } from 'womp';

							export default function Counter() {
								const [count, setCount] = useState(0);

								function incrementCounter() {
									setCount(count + 1);
								}

								return html\`
									<button @click=\${incrementCounter}>
										Pressed \${count} times
									</button>
								\`;
							}

							defineWomp(Counter);
						`,
            lang: "js"
          }
        ),
        /* @__PURE__ */ jsx("div", { style: { textAlign: "center" }, children: /* @__PURE__ */ jsx(Counter, {}) }),
        /* @__PURE__ */ jsx("p", { children: "In this example you simply use a primitive value as a state, and you update it according to some events. It's the most common use case, and, when possible, you should always solve your UI problems by solving first small parts of it, with a structure similar to this example. This is because it is more simple, and so more clear to understand also for other developers." })
      ] })
    },
    {
      title: "Example: Timer - Updating based on previous state",
      id: "timer-example",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("p", { children: "In this example we will cover a more advanced example: updating the state using a callback function." }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
							import { useState, defineWomp, html, useRef } from 'womp';
							
							export default function Timer() {
								const [timer, setTimer] = useState(0);
								const intervalId = useRef(null);

								const startTimer = () => {
									intervalId.current = setInterval(() => {
										setTimer((oldTimer) => oldTimer + 1);
									}, 10);
								}

								const stopTimer = () => {
									clearInterval(intervalId.current);
									intervalId.current = null;
								}

								const resetTimer = () =>  {
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
        /* @__PURE__ */ jsx("div", { style: { textAlign: "center" }, children: /* @__PURE__ */ jsx(Timer, {}) }),
        /* @__PURE__ */ jsxs("p", { children: [
          "But why a callback function is needed for this example?",
          /* @__PURE__ */ jsx("br", {}),
          "This is because the counter is being used inside a callback function. In this case, in the ",
          /* @__PURE__ */ jsx("code", { children: "setInterval" }),
          " callback function. If we did not use the the setter callback to set the new state, the timer would be stuck at 0.01, because the setInterval callback function is initialized only once, and will have the value of the",
          " ",
          /* @__PURE__ */ jsx("code", { children: "timer" }),
          " variable set to 0. So, we update it and it's set to 1. Then again it's called but it keeps being 0 so it'll be set to 1, and so on.",
          /* @__PURE__ */ jsx("br", {})
        ] }),
        /* @__PURE__ */ jsxs(Note, { severity: "info", children: [
          "In general, you want to use the ",
          /* @__PURE__ */ jsx("b", { children: "setState callback function" }),
          " whenever you need to updated the state inside a callback that is not re-initialized on every render."
        ] })
      ] })
    },
    {
      title: "Example: User - Updating complex objects",
      id: "user-example",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("p", { children: "In this example we will create a form to update the informations of a user, so we can see how to handle the state when dealing with complext objects and not simple primitive values." }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
							import { useState, defineWomp, html } from 'womp';

							export default function UserForm() {
								const [user, setUser] = useState({
									name: 'Tongi',
									lastname: 'Patongi',
									age: 22,
									contacts: {
										email: 'patongi@tongi.com',
										phone: '+393280000000',
									},
								});

								const alterUser = (key, value) => {
									setUser({
										...user,
										[key]: value,
									});
								};

								const alterUserContact = (key, value) => {
									setUser({
										...user,
										contacts: {
											...user.contacts,
											[key]: value,
										},
									});
								};

								const divStyles = {
									textAlign: 'left',
									border: '1px solid grey',
									borderRadius: '5px',
									padding: '20px',
								};

								return html\`<div style=\${divStyles}>
									<label>
										Name:
										<input value=\${user.name} @input=\${(ev) => alterUser('name', ev.target.value)} />
									</label>

									<label>
										Last Name:
										<input
											value=\${user.lastname}
											@input=\${(ev) => alterUser('lastname', ev.target.value)}
										/>
									</label>

									<label>
										Age:
										<input
											type="number"
											value=\${user.age}
											@input=\${(ev) => alterUser('age', ev.target.value)}
										/>
									</label>

									<label>
										Email:
										<input
											type="email"
											value=\${user.contacts.email}
											@input=\${(ev) => alterUserContact('email', ev.target.value)}
										/>
									</label>

									<label>
										Phone:
										<input
											type="tel"
											value=\${user.contacts.phone}
											@input=\${(ev) => alterUserContact('phone', ev.target.value)}
										/>
									</label>

									<p>
										Name: \${user.name} \${user.lastname}. Age: \${user.age}.
									</p>
									<p>
										Contacts:
										<ul>
											<li>Email: \${user.contacts.email}</li>
											<li>Phone: \${user.contacts.phone}</li>
										</ul>
									</p>
								</div>\`;
							}

							defineWomp(UserForm);
						`,
            lang: "js"
          }
        ),
        /* @__PURE__ */ jsx("div", { style: { textAlign: "center" }, children: /* @__PURE__ */ jsx(UserForm, {}) }),
        /* @__PURE__ */ jsxs("p", { children: [
          "In the form above you can see that when you update an input, the informations about the user are also updated.",
          /* @__PURE__ */ jsx("br", {}),
          "In the example the ",
          /* @__PURE__ */ jsx("b", { children: "spread operator" }),
          " has been used to update the state. This is because the state is ",
          /* @__PURE__ */ jsx("b", { children: "Immutable" }),
          ": you cannot manually set a new key on the object. Instead, you want to assign a completely new object to the state (using the spread operator, or a ",
          /* @__PURE__ */ jsx("code", { children: "structuredClone" }),
          " of the object).",
          /* @__PURE__ */ jsx("br", {}),
          "You can apply the same concepts with ",
          /* @__PURE__ */ jsx("b", { children: "Arrays" }),
          "."
        ] })
      ] })
    }
  ]
};
export default function UseState() {
  return getPageLayout(content);
}
defineWomp(UseState);
