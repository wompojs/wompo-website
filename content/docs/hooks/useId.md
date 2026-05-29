---
title: 'useId hook'
description: 'How to use the useId hook to generate a unique ID for your components.'
metaTitle: 'useId - Wompo hooks'
metaDescription: 'The useId hook allows to create a pseudo-random unique ID to use inside your components.'
navTitle: 'useId'
order: 40007
---

## Description {#description}

<p>Hard-coding IDs in components is very often a bad idea. The <code>useId</code> hook will solve this problem.</p>

<p>This hook will generate a unique string ID for your component in the following format: <code>:w&lt;number&gt;:</code>. The number in between will simply be a counter that will be incremented every time the hook is called for the first time in a component. This ensures that the ID will be unique, but the ID will probably NOT be the same every time you reload the application.</p>

## Usage {#usage}

```js
const id = useId();
```

<p>The <code>useId</code> hook accepts no parameters and will return always the same value across re-renders.</p>

## Example: Accessibility {#modal-example}

<p>A common use case for the <code>useId</code> is to solve accessibility problems or simply setting a "for" attribute to a label element.</p>

```js
import { defineWompo, html, useId } from 'wompo';

export default function InputExample() {
	const hintId = useId(); // :w0:
	const inputId = useId(); // :w1:

	return html`
		<label for=${inputId}>Password:</label>
		<input id=${inputId} aria-describedby=${hintId} />
		<p id=${hintId}>The password should contain at least 8 characters</p>
	`;
}

defineWompo(InputExample);
```

<p>Even if the <code>InputExample</code> is rendered multiple times, it'll always keep working without having IDs clashes.</p>
