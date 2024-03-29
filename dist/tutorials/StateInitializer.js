import { useState, defineWomp, html } from "womp";
function getInitialState() {
  const initialTodos = [];
  for (let i = 1; i <= 10; i++) {
    initialTodos.push({ title: `Todo N.${i}`, id: i });
  }
  return initialTodos;
}
export default function StateInitializerExample() {
  const [todos, setTodos] = useState(getInitialState);
  return html`<ul>
		${todos.map((todo) => html`<li>${todo.title}</li>`)}
	</ul>`;
}
defineWomp(StateInitializerExample);
