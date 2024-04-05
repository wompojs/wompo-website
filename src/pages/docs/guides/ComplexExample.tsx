import { defineWompo } from 'wompo';
import getPageLayout, { Contents } from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
import { Link } from 'wompo-router';
import Note from '../../../components/Note.js';
import TodoList from '../../../tutorials/TodoList.js';

const content: Contents = {
	title: 'Complex Example',
	description: "Let's create a TODO list app and explore more concepts of the Wompo library.",
	sections: [
		{
			title: 'Todo List app',
			id: 'todo-list-app',
			content: (
				<>
					<p>
						In this project we will build a simple Todo List app. By doing that you'll get more
						comfortable using Wompo.
						<br />
						What we want is a component component that will render an input and a button to add a
						todo item, with a list of already added todos below. We then also want that the Todos
						that we added are saved in the local storage of the browser, so that they are not lost
						once we reload the page.
						<br />
						Let's start by creating the <code>TodoList</code> component.
					</p>
					<Code
						code={`
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
            `}
						language='js'
					/>
					<p>
						The next step can be render a list of fixed todo items inside the <code>ul</code>{' '}
						element. We can do that by creeating a fake todos array, and create an <code>li</code>{' '}
						iten by iterating through it. To do that, you can simply use the <code>.map()</code>{' '}
						method of arrays, and return a new element. But, we already know that the <b>todos</b>{' '}
						component will be stateful, so we can already start using the <code>useState</code>{' '}
						hook, like this:
					</p>
					<Code
						code={`
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
            `}
						language='js'
					/>
					<p>
						Now it's time to add some interactivity. We should be able to:
						<ol>
							<li>Add a new todo when the user clicks the button.</li>
							<li>Remove a todo when the user clicks the X button.</li>
						</ol>
						To do the first step we have to use a new hook:{' '}
						<Link to='/docs/hooks/useRef'>useRef</Link>. The useRef hook allows to the same value of
						a variable during re-render, without resetting it every time. You are probably wondering
						why it is relevant to the current case. The answer is that the useRef hook can also be
						used to "mark" a node and use it as a reference. To do that you simply have to add the "
						<b>ref</b>" attribute in the target node, and put the value returned by the hook as the
						attribute value. The value returned by the useRef hook will always be an object having
						one single key: "current", that will contain the current value.
						<br />
						In our case, we need the reference to the input element, so that when we click the "+"
						button, we can access the value property of the input element, and add a new todo only
						if the value is not empty. After we add it, we should also <i>empty</i> the input.
						<br />
						We can also already implement the todo removal functionality. Big step we ar going to
						do:
					</p>
					<Code
						code={`
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
            `}
						language='js'
					/>
					<p>
						We are so close to finish!
						<br />
						The only thing that is left is saving the todos so that when the user comes back to the
						page they are not lost. To do that we have to somehow know when the component is first
						rendered, get the todos from the localStorage, and render them. When then also have to
						modify the saved todos whenever the user adds or deletes one of them. To implement this
						functionality the <Link to='/docs/hooks/useEffect'>useEffect</Link> hook comes to help
						us. This hook will accept 2 parameters: a callback function, and an array of
						dependencies. The callback function will be execeuted on the first render and whenever
						one of the dependencies changes. Isn't it the perfect case? We can use 2 useEffect hooks
						to accomplish our goals. If you give an empty array as list of dependencies, the effect
						will only be executed once (on first render). If you don't put a list of dependencies,
						the hook will be executed on every render.
					</p>
					<Code
						code={`
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
            `}
						language='js'
					/>
					<Note severity='info'>
						If you use this component multiple times, it'll always render the same items, because
						they are picked from the same localStorage key. You are free to further modify the
						component so that the items will be picked from a unique localStorage key.
					</Note>
					<div>
						<p>Here's the result:</p>
						<div style={{ display: 'flex', justifyContent: 'center', margin: '5rem 0' }}>
							<TodoList />
						</div>
					</div>
					<p>Be proud of yourself!</p>
				</>
			),
		},
	],
};

export default function ComplexExample() {
	return getPageLayout(content);
}

defineWompo(ComplexExample, {
	name: 'complex-example-page',
});
