---
title: "useState hook"
description: "Aggiungi stato locale a un componente Wompo e aggiorna la UI in modo reattivo."
metaTitle: "useState - Hooks Wompo"
metaDescription: "Usa useState per salvare valori tra render, aggiornare la UI e gestire oggetti complessi."
navTitle: "useState"
order: 40013
---
## Descrizione {#descrizione}

`useState` aggiunge una variabile di stato al componente. Quando chiami il setter, Wompo renderizza di nuovo quel componente e aggiorna il DOM.

```js
const [state, setState] = useState(initialState);
```

Il primo valore è lo stato corrente. Il secondo è la funzione che imposta il nuovo stato. Come per tutti gli hook, chiamalo sempre nelle prime righe del componente e sempre nello stesso ordine.

:::info
Preferisci stati piccoli e descrittivi. Se una UI diventa difficile da aggiornare con `useState`, valuta `useReducer`.
:::

## Valore iniziale {#valore-iniziale}

Puoi passare un valore primitivo, un array, un oggetto o una funzione inizializzatrice. La funzione è utile quando preparare il valore costa tempo.

```js
import { defineWompo, html, useState } from 'wompo';

function createTodos() {
  const todos = [];

  for (let i = 1; i <= 10; i++) {
    todos.push({ title: `Todo N.${i}`, id: i });
  }

  return todos;
}

function TodoPreview() {
  const [todos] = useState(createTodos);

  return html`
    <ul>
      ${todos.map((todo) => html`<li>${todo.title}</li>`)}
    </ul>
  `;
}

defineWompo(TodoPreview);
```

<state-initializer-example></state-initializer-example>

## Esempio: counter {#counter}

Questo è il caso più comune: un evento utente aggiorna un valore.

```js
import { defineWompo, html, useState } from 'wompo';

function Counter() {
  const [count, setCount] = useState(0);

  function incrementCounter() {
    setCount(count + 1);
  }

  return html`
    <button @click=${incrementCounter}>
      Premuto ${count} volte
    </button>
  `;
}

defineWompo(Counter);
```

<counter-example></counter-example>

## Setter con callback {#setter-con-callback}

Quando aggiorni lo stato dentro una callback che resta viva tra più render, usa la forma funzionale del setter. Il caso classico è `setInterval`: la callback potrebbe ricordare un valore vecchio.

```js
import { defineWompo, html, useRef, useState } from 'wompo';

function Timer() {
  const [timer, setTimer] = useState(0);
  const intervalId = useRef(null);

  const startTimer = () => {
    intervalId.current = setInterval(() => {
      setTimer((oldTimer) => oldTimer + 1);
    }, 10);
  };

  const stopTimer = () => {
    clearInterval(intervalId.current);
    intervalId.current = null;
  };

  const resetTimer = () => setTimer(0);

  return html`
    <div>
      <button @click=${startTimer} disabled=${intervalId.current !== null}>Start</button>
      <button @click=${stopTimer} disabled=${intervalId.current === null}>Stop</button>
      <button @click=${resetTimer} disabled=${timer === 0}>Reset</button>
      <p>${(timer / 100).toFixed(2)}</p>
    </div>
  `;
}

defineWompo(Timer);
```

<timer-example></timer-example>

## Oggetti e array {#oggetti-e-array}

Tratta lo stato come immutabile: non modificare direttamente oggetti o array già salvati. Crea una nuova copia e passala al setter.

```js
import { defineWompo, html, useState } from 'wompo';

function UserForm() {
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

  return html`
    <div>
      <input value=${user.name} @input=${(ev) => alterUser('name', ev.target.value)} />
      <input value=${user.lastname} @input=${(ev) => alterUser('lastname', ev.target.value)} />
      <input type="email" value=${user.contacts.email} @input=${(ev) => alterUserContact('email', ev.target.value)} />

      <p>${user.name} ${user.lastname}</p>
      <p>${user.contacts.email}</p>
    </div>
  `;
}

defineWompo(UserForm);
```

<user-form-example></user-form-example>

## Errori comuni {#errori-comuni}

- Non chiamare `setState` durante il render: fallo in eventi, effect o callback controllate.
- Non mutare oggetti esistenti con `user.name = 'Ada'`: crea una nuova copia.
- Non chiamare hook dentro `if`, `for` o funzioni annidate.
- Non salvare nello stato valori derivabili da props o da altri stati, a meno che non serva davvero.
