import { defineWomp, html, useEffect, useRef, useState } from "womp";
const initialTodos = ["Complete this tutorial", "Buy groceries", "Wash the car"];
export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const inputRef = useRef();
  const addTodo = () => {
    const input = inputRef.current;
    const newTodo = input.value;
    if (newTodo.trim()) {
      setTodos([...todos, newTodo]);
      input.value = "";
    }
  };
  const removeTodo = (index) => {
    setTodos(todos.filter((todo, i) => i !== index));
  };
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos)
      setTodos(JSON.parse(savedTodos));
  }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return html`
		<div>
			<div>
				<input ref=${inputRef} />
				<button @click=${addTodo}>+</button>
			</div>
			<ul>
				${todos.map(
    (todo, i) => html`<li>
						<button @click=${() => removeTodo(i)}>X</button>
						<span>${todo}</span>
					</li>`
  )}
			</ul>
		</div>
	`;
}
defineWomp(TodoList);
