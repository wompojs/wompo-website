---
title: 'useEffect hook'
description: 'How to use the useEffect hook to make a component execute some operations on specific situations.'
metaTitle: 'useEffect - Wompo hooks'
metaDescription: 'The useEffect hook will execute a callback on the first render and whenever one of its dependencies changes.'
navTitle: 'useEffect'
order: 40004
---

## Description {#description}

<p>The <code>useEffect</code> hook is one of the main hooks you will use in your application. This hook lets you execute a callback (effect) function after the <b>first render</b> and whenever one of the dependecies changes. This can be quite ideal for:

<ul>
<li>Initializing the component</li>
<li>Subscribing to events (e.g. <code>window.addEventListener</code>)</li>
<li>Using timeouts and intervals</li>
<li>Performing animations</li>
<li>Controlling a non-wompo widget or node in conjuctions with the <code>useRef</code> hook</li>
</ul></p>

## Usage {#usage}

```js
useEffect(effectFn, dependencies);
```

<p>The hook accepts two parameters: the <b>effect function</b> and the <b>list of dependencies</b>. The effect function will be executed on first render and any time one of the dependecies changes. This function can be a void function or can return a second function (called cleaning function) that will be executed <b>before the execution of the next same effect</b> or if the component <b>unmount</b> (is removed from the DOM).</p>

<p>If an empty array is given as a list of dependecies, the effect will be executed <b>only</b> after the first render.</p>

<p>If no dependencies are specified, the effect will be executed on <b>every</b> render.</p>

:::info
<b>Note:</b> The effect will be executed <b>asynchronously</b> after the component has been rendered, not inline.
:::

## Example: timeout {#timeout-example}

<p>Using the <code>window.setTimeout</code> function is a common use case for the <code>useEffect</code> hook. Here's an example:</p>

```js
import { useEffect, defineWompo, html } from 'wompo';

function TimeoutComponent() {
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			alert('I was first rendered 5 seconds ago!');
		}, 5000);
		return () => {
			clearTimeout(timeoutId);
		};
	}, []);
	return html`Nothing to see here, boss.`;
}

defineWompo(TimeoutComponent);
```

:::warning
When using timeouts and intervals, remember to <b>always</b> cancel them using the <b>cleaning function</b>(like in the example). Not doing so can lead to unexpected behaviours, like the execution of code even if the element is no longer in the DOM.
:::

<p><i>Why the useEffect hook is needed for this case?</i><br />Because if you call the <code>setTimoeut</code> function directly inside the component, it will be executed <b>every time</b> the component renders. This usually causes unwanted loops when inside the timeout/interval callback a setState is called.</p>

## Example: fetching data {#fetching-data-example}

<p>The <code>useEffect</code> hook can also be used to fetch data when the component renders.</p>

:::info
<b>Note:</b> This example is only made to understand better how the hook works and how to do async operations inside of it. If you actually have to perform data fetching, use the <a href="/docs/hooks/useAsync">useAsync</a> hook instead.
:::

Code:

```js
import { useEffect, useState, defineWompo, html } from 'wompo';

function User({ userId }) {
	const [user, setUser] = useState(null);

	useEffect(() => {
		fetch(`/get/user/${userId}`)
			.then((res) => res.json())
			.then((data) => setUser(data));
	}, [userId]);

	return html`...`;
}

defineWompo(User);
```

:::warning
The effect callback <b>cannot return a promise</b>, so you cannot declare it as an async function and you cannot use the <b>await</b> keyword. Use <code>.then</code> functions or create an helper async function to call <b>inside</b> the effect.
:::

## Example: local storage {#localstorage-example}

<p>This example will show how you can use the <b>useEffect</b> hook to make operations into the <code>window.localStorage</code> to save and get data.</p>

```js
import { useEffect, useState, defineWompo, html } from 'wompo';

function Theme({ userId }) {
	const [theme, setTheme] = useState('light');

	// Get the user theme preference
	useEffect(() => {
		// Gets executed only on first render
		const savedThemePreference = localStorage.getItem('theme');
		if (savedThemePreference) setTheme(savedThemePreference);
	}, []);

	// Set the new user's theme preference
	useEffect(() => {
		// Gets executed on first render and every time that "theme" changes
		localStorage.setItem('theme', theme);
	}, [theme]);

	return html`...`;
}

defineWompo(Theme);
```

<p>In this example we used two effects: one to get the user's theme preference, executed only once, and one to save the user's theme preference whenever the theme preference changes.</p>

:::info
<b>Effects will be executed in the order they are declared</b>, so the order matters. In this example, if you execute the second effect before the other it will not work, because the theme in the localStorage will be always updated with the initial value of the state.
:::

## Example: Code highlighting {#code-highlighting-example}

<p>In this example we will combine the <a href="/docs/hooks/useRef">useRef</a> hook with the third party library <b>highlight.js</b> and the <code>useEffect</code> hook to create an highlighted code component.</p>

```js
import { useEffect, useRef, defineWompo, html } from 'wompo';

function Code({ code, lang }) {
	const codeRef = useRef();

	useEffect(() => {
		const highlighted = hljs.highlight(code, { language: lang });
		codeRef.current.innerHTML = highlighted.value;
	}, [code, lang]);

	return html`
		<pre>
      <code ref=${codeRef}></code>
    </pre>
	`;
}

defineWompo(Code);
```

<p>In the above example the <code>Code</code> component accepts a <b>code</b> prop and a <b>lang</b> prop that will be used to create the highligted HTML that will be injected in the HTML element thanks to the <code>useRef</code> hook.</p>
