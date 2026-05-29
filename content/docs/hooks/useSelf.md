---
title: 'useSelf hook'
description: 'How to use the useSelf hook to get the instance of the element itself.'
metaTitle: 'useSelf - Wompo hooks'
metaDescription: 'The useSelf hook will return the HTML instance of the custom component.'
navTitle: 'useSelf'
order: 40012
---

## Description {#description}

<p>Sometimes you want to modify a custom element itself inside of it's own render function. To get the instance element, you can actually use the <code>this</code> keyword, but a better option is to use the <code>useSelf</code> hook.</p>

<p>This hook will simply return the instance element, but it's typescript friendly and it's safer to use, becasue the <code>this</code> keyword can be altered.</p>

## Usage {#usage}

```js
const self = useSelf();
```

<p>The <code>useSelf</code> hook accepts no parameters.</p>

## Example: custom class {#modal-example}

<p>An example is to add a custom class to the element based on some conditions. To do that, you can use the <code>useSelf</code> hook to access the element's instance.</p>

```js
import { defineWompo, html, useSelf } from 'wompo';

export default function InputExample({ disabled, styles: s }) {
	const self = useSelf();

	useEffect(() => {
		if (disabled) self.classList.add(s.disabled);
	}, [disabled]);

	return html`<input disabled=${disabled} />`;
}

InputExample.css = `
  .disabled {
    opacity: .7;
    cursor: not-allowed;
  }
`;

defineWompo(InputExample);
```
