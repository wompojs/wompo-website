import{Fragment as h,jsx as e,jsxs as t}from"wompo/jsx-runtime";import{defineWompo as i}from"wompo";import s from"../../utils/getPageLayout.js";import o from"../../components/Code.js";import{Link as n}from"wompo-router";import d from"../../components/Note.js";import r from"../../tutorials/TodoList.js";const l={title:"Complex Example",description:"Let's create a TODO list app and explore more concepts of the Wompo library.",sections:[{title:"Todo List app",id:"todo-list-app",content:t(h,{children:[t("p",{children:["In this project we will build a simple Todo List app. By doing that you'll get more comfortable using Wompo.",e("br",{}),"What we want is a component component that will render an input and a button to add a todo item, with a list of already added todos below. We then also want that the Todos that we added are saved in the local storage of the browser, so that they are not lost once we reload the page.",e("br",{}),"Let's start by creating the ",e("code",{children:"TodoList"})," component."]}),e(o,{code:`
              import { defineWompo, html } from 'wompo';

              export default function TodoList(){
                return html\`
                  <div>
                    <div>
                      <input />
                      <button>+</button>
                    </div>
                    <ul>
                      \${/* Here todos will be rendered */''}
                    </ul>
                  </div>
                \`;
              }
              defineWompo(TodoList);
            `,language:"js"}),t("p",{children:["The next step can be render a list of fixed todo items inside the ",e("code",{children:"ul"})," ","element. We can do that by creeating a fake todos array, and create an ",e("code",{children:"li"})," ","iten by iterating through it. To do that, you can simply use the ",e("code",{children:".map()"})," ","method of arrays, and return a new element. But, we already know that the ",e("b",{children:"todos"})," ","component will be stateful, so we can already start using the ",e("code",{children:"useState"})," ","hook, like this:"]}),e(o,{code:`
              const initialTodos = [
                'Complete this tutorial',
                'Buy groceries',
                'Wash the car'
              ]

              export default function TodoList(){
                const [todos, setTodos] = useState(initialTodos);
                return html\`
                  <div>
                    \${/*... */''}
                    <ul>
                      \${todos.map((todo) => html\`<li>
                        <button>X</button>
                        <span>\${todo}</span>
                      </li>\`)}
                    </ul>
                  </div>
                \`;
              }
              defineWompo(TodoList);
            `,language:"js"}),t("p",{children:["Now it's time to add some interactivity. We should be able to:",t("ol",{children:[e("li",{children:"Add a new todo when the user clicks the button."}),e("li",{children:"Remove a todo when the user clicks the X button."})]}),"To do the first step we have to use a new hook:"," ",e(n,{to:"/docs/hooks/useRef",children:"useRef"}),'. The useRef hook allows to the same value of a variable during re-render, without resetting it every time. You are probably wondering why it is relevant to the current case. The answer is that the useRef hook can also be used to "mark" a node and use it as a reference. To do that you simply have to add the "',e("b",{children:"ref"}),'" attribute in the target node, and put the value returned by the hook as the attribute value. The value returned by the useRef hook will always be an object having one single key: "current", that will contain the current value.',e("br",{}),'In our case, we need the reference to the input element, so that when we click the "+" button, we can access the value property of the input element, and add a new todo only if the value is not empty. After we add it, we should also ',e("i",{children:"empty"})," the input.",e("br",{}),"We can also already implement the todo removal functionality. Big step we ar going to do:"]}),e(o,{code:`
              // ...
              export default function TodoList(){
                const [todos, setTodos] = useState(initialTodos);
                const inputRef = useRef();
                const addTodo = () => {
                  const input = inputRef.current;
                  const newTodo = input.value;
                  if(newTodo.trim()){
                    setTodos([...todos, newTodo]);
                    input.value = '';
                  }
                }
                const removeTodo = (index) => {
                  setTodos(todos.filter((todo, i) => i !== index));
                }
                return html\`
                  <div>
                    <div>
                      <input ref=\${inputRef} />
                      <button @click=\${addTodo}>+</button>
                    </div>
                    <ul>
                      \${todos.map((todo, i) => html\`<li>
                        <button @click=\${() => removeTodo(i)}>X</button>
                        <span>\${todo}</span>
                      </li>\`)}
                    </ul>
                  </div>
                \`;
              }
              // ...
            `,language:"js"}),t("p",{children:["We are so close to finish!",e("br",{}),"The only thing that is left is saving the todos so that when the user comes back to the page they are not lost. To do that we have to somehow know when the component is first rendered, get the todos from the localStorage, and render them. When then also have to modify the saved todos whenever the user adds or deletes one of them. To implement this functionality the ",e(n,{to:"/docs/hooks/useEffect",children:"useEffect"})," hook comes to help us. This hook will accept 2 parameters: a callback function, and an array of dependencies. The callback function will be execeuted on the first render and whenever one of the dependencies changes. Isn't it the perfect case? We can use 2 useEffect hooks to accomplish our goals. If you give an empty array as list of dependencies, the effect will only be executed once (on first render). If you don't put a list of dependencies, the hook will be executed on every render."]}),e(o,{code:`
              export default function TodoList(){
                // ...

                // load initial todos
                useEffect(() => {
                  const savedTodos = localStorage.getItem('todos');
                  if(savedTodos)
                    setTodos(JSON.parse(savedTodos));
                }, []);

                // save todos
                useEffect(() => {
                  localStorage.setItem('todos', JSON.stringify(todos));
                }, [todos]);

                return html\`...\`;
              }
            `,language:"js"}),e(d,{severity:"info",children:"If you use this component multiple times, it'll always render the same items, because they are picked from the same localStorage key. You are free to further modify the component so that the items will be picked from a unique localStorage key."}),t("div",{children:[e("p",{children:"Here's the result:"}),e("div",{style:{display:"flex",justifyContent:"center",margin:"5rem 0"},children:e(r,{})})]}),e("p",{children:"Be proud of yourself!"})]})}]};export default function a(){return s(l)}i(a,{name:"complex-example-page"});
