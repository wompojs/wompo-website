---
title: "Esempio completo"
description: "Costruiamo una piccola Todo app con componenti, props, stato e liste."
metaTitle: "Esempio completo"
metaDescription: "Crea una Todo app con Wompo e applica props, eventi, stato e rendering di liste."
navTitle: "Esempio completo"
order: 30002
---
## Obiettivo {#obiettivo}

Creiamo una Todo app composta da un form e una lista. L'esempio mostra come passare funzioni ai figli e aggiornare lo stato nel componente padre.

## Il componente principale {#il-componente-principale}

```js
import { defineWompo, html, useState } from 'wompo';

function TodoApp() {
  const [todos, setTodos] = useState([]);

  const addTodo = (title) => {
    setTodos([...todos, { id: crypto.randomUUID(), title, done: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  return html`
    <${TodoForm} onSubmit=${addTodo} />
    <${TodoList} todos=${todos} onToggle=${toggleTodo} />
  `;
}

defineWompo(TodoApp);
```

## Form controllato {#form-controllato}

```js
function TodoForm({ onSubmit }) {
  const [title, setTitle] = useState('');

  const submit = (event) => {
    event.preventDefault();
    if (!title.trim()) return;
    onSubmit(title.trim());
    setTitle('');
  };

  return html`
    <form @submit=${submit}>
      <input value=${title} @input=${(event) => setTitle(event.target.value)} />
      <button>Add</button>
    </form>
  `;
}
```

## Lista {#lista}

```js
function TodoList({ todos, onToggle }) {
  const items = todos.map((todo) => html`
    <li>
      <label>
        <input
          type="checkbox"
          checked=${todo.done}
          @change=${() => onToggle(todo.id)}
        />
        ${todo.title}
      </label>
    </li>
  `);

  return html`
    <ul>
      ${items}
    </ul>
  `;
}
```

## Pattern da ricordare {#pattern-da-ricordare}

- Tieni lo stato condiviso nel padre più vicino.
- Passa callback ai figli quando devono notificare un cambiamento.
- Per liste dinamiche, costruisci l'HTML con `map`.
- Mantieni stabile la forma del template principale.
