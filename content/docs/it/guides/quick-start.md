---
title: "Quick Start"
description: "Impara le basi di Wompo creando componenti reali con props, eventi, stato e rendering dinamico."
metaTitle: "Quick Start"
metaDescription: "Crea un componente Wompo con props, eventi, useState, condizioni e liste."
navTitle: "Quick start"
order: 30001
---
## Primo componente {#primo-componente}

Un componente Wompo è una funzione che ritorna `html`. Dopo averlo definito, lo registri con `defineWompo`.

```js
import { defineWompo, html } from 'wompo';

function GreetingCard() {
  return html`<p>Hello, World!</p>`;
}

defineWompo(GreetingCard);
```

Il nome della funzione diventa un tag HTML in kebab-case.

```html
<greeting-card></greeting-card>
```

Puoi anche scegliere un nome esplicito.

```js
defineWompo(GreetingCard, { name: 'app-greeting' });
```

## Template con `html` {#template-html}

`html` è una template tag. Ti permette di mescolare markup e valori JavaScript senza costruire stringhe a mano.

```js
function UserCard({ user }) {
  return html`
    <article>
      <strong>${user.name}</strong>
      <span>${user.role}</span>
    </article>
  `;
}
```

Se passi un componente Wompo dentro un altro template, usa la sintassi componente.

```js
function App() {
  const user = { name: 'Ada', role: 'Admin' };

  return html`
    <main>
      <${UserCard} user=${user} />
    </main>
  `;
}
```

## Props {#props}

Le props arrivano come primo parametro. Se usi il componente da HTML, gli attributi sono stringhe; se lo usi dentro un template Wompo puoi passare anche oggetti, array e funzioni.

```js
function ProductPrice({ amount, currency = 'EUR' }) {
  return html`
    <strong>
      ${new Intl.NumberFormat('it-IT', { style: 'currency', currency }).format(amount)}
    </strong>
  `;
}
```

```js
function ProductRow() {
  return html`<${ProductPrice} amount=${24.9} currency="EUR" />`;
}
```

## Eventi {#eventi}

Gli eventi si collegano con il prefisso `@`. Il valore deve essere una funzione.

```js
function SaveButton({ onSave }) {
  return html`
    <button type="button" @click=${onSave}>
      Salva
    </button>
  `;
}
```

Lo stesso sistema funziona su elementi nativi e custom elements, perché Wompo lavora con il DOM reale.

## Stato {#stato}

`useState` rende un componente reattivo. Quando chiami `setCount`, Wompo renderizza di nuovo il componente e aggiorna la UI.

```js
import { defineWompo, html, useState } from 'wompo';

function Counter() {
  const [count, setCount] = useState(0);

  return html`
    <button @click=${() => setCount(count + 1)}>
      Count: ${count}
    </button>
  `;
}

defineWompo(Counter);
```

<counter-example></counter-example>

## Liste {#liste}

Per renderizzare liste, mappa i dati in template `html`. Mantieni sempre stabile la struttura del markup.

```js
function TodoList({ todos }) {
  return html`
    <ul>
      ${todos.map((todo) => html`
        <li>
          <input type="checkbox" checked=${todo.done} />
          <span>${todo.title}</span>
        </li>
      `)}
    </ul>
  `;
}
```

## Condizioni {#condizioni}

Puoi usare normali condizioni JavaScript, ma evita di cambiare completamente la forma del componente a ogni render.

```js
function SessionStatus({ user }) {
  const label = user ? `Ciao ${user.name}` : 'Accedi';

  return html`
    <p>${label}</p>
  `;
}
```

Evita invece di alternare radici molto diverse quando puoi mantenere una struttura comune.

```js
// Meno prevedibile.
function Status({ logged }) {
  if (logged) return html`<p>Logged in</p>`;
  return html`<section>Guest</section>`;
}

// Più stabile.
function Status({ logged }) {
  return html`<p>${logged ? 'Logged in' : 'Guest'}</p>`;
}
```

## Prossimo passo {#prossimo-passo}

Quando hai capito componenti, props, eventi e stato, continua con:

- <a href="/docs/installation">Installazione</a> per scegliere setup e tool;
- <a href="/docs/guides/styling">Styling</a> per CSS modules e Shadow DOM;
- <a href="/docs/guides/complex-example">Esempio complesso</a> per una piccola app completa.

:::warning
Gli hook devono essere chiamati sempre nello stesso ordine. Non metterli dentro `if`, loop o callback.
:::
