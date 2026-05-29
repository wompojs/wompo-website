---
title: 'useCallback hook'
description: 'How to use the useCallback hook to cache functions and improve performance.'
metaTitle: 'useCallback - Wompo hooks'
metaDescription: "The useCallback hook will take a function and save it so that it's not re-created on every render."
navTitle: 'useCallback'
order: 40002
---

## Description {#description}

<p>The <code>useCallback</code> hook is a hook that lets you save a function definition across re-renders, so that it'll always keep the same reference to it. <br />Why is it useful? Because in javascript two function declarations are not considered equal:

```js
function() { } === function() { } // false

const a = () => { }
a === a // true
```

So, for example, a useful case whre you can use it, is when a callback function is passed through the props of another component: if you don't use the `useCallback` hook, the child component will re-render every time the parent component changes, because the two functions will be considered different.</p>

:::info
<b>Note:</b> This consideration doesn't apply to events, because events are stored in a simple variable and will not cause an add/removal of event listeners, so it's not computationally expensive: it's more expensive to store the callback and get it back every time.
:::

## Usage {#usage}

```js
const callback = useCallback(callbackDefinition, dependencies);
```

<p>The hook will cache the <code>callbackDefinition</code> function and alway return the same value on every render, without re-initializing the function every time. <br />The hook accepts two parameters: a callback that can be any function declaration, and a list of dependencies. The dependecies are optional, but if they are set, the hook will check if any of them changed, and if it happened, it will re-build the function and return the new value.</p>

## Example {#counter-example}

<p>A basic example is using the <code>useCallback</code> hook to pass it to another component as a parement, so that useless re-renderings are avoided.</p>

```js
import { useCallback, defineWompo, html } from 'wompo';
import UserForm from './UserForm';

export default function User({ userId }) {
	const submitData = useCallback(
		(data) => {
			fetch(`/udpate/user/${userId}`, { method: 'POST', body: data });
		},
		[userId],
	);

	return html`<${UserForm} onSubmit=${submitData} />`;
}

defineWompo(Component);
```

<p>In this example, the <code>UserForm</code> component will not re-render every time that the <code>User</code> component renders.</p>
