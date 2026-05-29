---
title: "useReducer hook"
description: "Gestisci stato complesso con reducer puri e azioni esplicite."
metaTitle: "useReducer - Hooks Wompo"
metaDescription: "Usa useReducer per stato con molte transizioni, logica testabile e aggiornamenti prevedibili."
navTitle: "useReducer"
order: 40010
---
## Quando preferirlo a useState {#quando-preferirlo}

`useReducer` è utile quando lo stato ha molte transizioni o quando vuoi separare la logica dal template. Invece di chiamare molti setter, mandi azioni a una funzione reducer.

```js
const [state, dispatch] = useReducer(reducer, initialState);
```

Il reducer riceve `state` e `action`, poi ritorna il nuovo stato.

## Reducer base {#reducer-base}

```js
function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
}
```

Il reducer deve essere puro: non deve mutare `state`, fare fetch, leggere DOM o generare side effect.

## Uso nel componente {#uso-nel-componente}

```js
import { defineWompo, html, useReducer } from 'wompo';

function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return html`
    <button @click=${() => dispatch({ type: 'increment' })}>
      ${state.count}
    </button>
    <button @click=${() => dispatch({ type: 'reset' })}>
      Reset
    </button>
  `;
}

defineWompo(Counter);
```

## Azioni con payload {#azioni-con-payload}

Un'azione può trasportare dati aggiuntivi.

```js
function todosReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [
        ...state,
        { id: crypto.randomUUID(), title: action.title, done: false },
      ];
    case 'toggle':
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case 'remove':
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
}
```

```js
dispatch({ type: 'add', title: 'Leggere la documentazione' });
dispatch({ type: 'toggle', id: todo.id });
```

## Esempio interattivo {#esempio-interattivo}

L'esempio seguente usa un reducer per gestire più azioni su uno stato condiviso.

<zoo-example></zoo-example>

## Regole pratiche {#regole-pratiche}

- Mantieni i reducer piccoli e puri.
- Usa nomi di azione espliciti, come `add`, `remove`, `toggle`.
- Non mutare array e oggetti: ritorna nuove copie.
- Sposta side effect in `useEffect` o negli event handler, non nel reducer.
