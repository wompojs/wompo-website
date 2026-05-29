---
title: 'Quick Start'
description: 'Learn the basics of Wompo by creating real components with props, events, state, and dynamic rendering.'
metaTitle: 'Quick Start'
metaDescription: 'Create a Wompo component with props, events, useState, conditions, and lists.'
navTitle: 'Quick start'
order: 30001
---

## First component {#first-component}

A Wompo component is a function that returns the result of the template function `html`.
After declaring the component's function, register it with `defineWompo`, so that it will be usable
inside your HTML file.

```js
import { defineWompo, html } from 'wompo';

function GreetingCard() {
	return html`<p>Hello, World!</p>`;
}

defineWompo(GreetingCard);
```

The function name becomes a kebab-case HTML tag.

```html
<greeting-card></greeting-card>
```

You can also choose an explicit name.

```js
defineWompo(GreetingCard, { name: 'app-greeting' });
```

## Templates with `html` {#html-template}

`html` is a template tag. It lets you combine markup and JavaScript values without building strings manually.

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

When you render one Wompo component inside another template, use the dynamic component syntax.

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

Props arrive as the first function parameter. When a component is used from plain HTML, attributes are strings. When it is used inside a Wompo template, props can be objects, arrays, functions, or any other JavaScript value.

```js
function ProductPrice({ amount, currency = 'EUR' }) {
	const price = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
	}).format(amount);

	return html`<strong>${price}</strong>`;
}
```

```js
function ProductRow() {
	return html`<${ProductPrice} amount=${24.9} currency="EUR" />`;
}
```

## Events {#events}

Attach events with the `@` prefix. The value must be a function.

```js
function SaveButton({ onSave }) {
	return html` <button type="button" @click=${onSave}>Save</button> `;
}
```

The same system works on native elements and custom elements because Wompo works with the real DOM.

## State {#state}

`useState` makes a component reactive. When you call the setter, Wompo renders the component again and updates the UI.

```js
import { defineWompo, html, useState } from 'wompo';

function Counter() {
	const [count, setCount] = useState(0);

	return html` <button @click=${() => setCount(count + 1)}>Count: ${count}</button> `;
}

defineWompo(Counter);
```

<counter-example></counter-example>

## Lists {#lists}

Render lists by mapping data to `html` templates. Keep the main markup shape stable.

```js
function TodoList({ todos }) {
	const items = todos.map(
		(todo) => html`
			<li>
				<input type="checkbox" checked=${todo.done} />
				<span>${todo.title}</span>
			</li>
		`,
	);

	return html`
		<ul>
			${items}
		</ul>
	`;
}
```

## Conditions {#conditions}

Use normal JavaScript conditions, but avoid changing the whole component structure when a shared wrapper is enough.

```js
function SessionStatus({ user }) {
	const label = user ? `Hello ${user.name}` : 'Sign in';

	return html` <p>${label}</p> `;
}
```

Avoid alternating unrelated roots when you can preserve a common structure.

```js
// Less predictable.
function Status({ logged }) {
	if (logged) return html`<p>Logged in</p>`;
	return html`<section>Guest</section>`;
}

// More stable.
function Status({ logged }) {
	return html`<p>${logged ? 'Logged in' : 'Guest'}</p>`;
}
```

## Next step {#next-step}

Once components, props, events, and state are clear, continue with:

- <a href="/docs/installation">Installation</a> to choose your setup;
- <a href="/docs/guides/styling">Styling</a> to learn CSS modules and Shadow DOM;
- <a href="/docs/guides/complex-example">Complex example</a> for a small complete app.

:::warning
Hooks must always be called in the same order. Do not put them inside `if`, loops, or nested callbacks.
:::
