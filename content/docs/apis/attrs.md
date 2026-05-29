---
title: 'attrs API'
description: 'How to use the attrs function to spread a bag of attributes, events, and properties on a single element.'
metaTitle: 'attrs - Wompo APIs'
metaDescription: 'The attrs function spreads a bag of attributes, events, and properties onto a single element inside an html template.'
navTitle: 'attrs'
order: 60001
---

## Description {#description}

<p>The <code>attrs</code> function returns an opaque bag that, when interpolated directly inside an opening tag, applies every key of the provided object to the element. Each entry is routed to the correct sink based on its name prefix:

<ul>
<li><code>name</code>→ set as a regular attribute (or removed when the value is <code>false</code>, <code>null</code> or <code>undefined</code>);</li>
<li><code>@name</code>→ bound as an event listener (<code>@click</code>, <code>@input</code>, ...);</li>
<li><code>.name</code>→ assigned as a JS property on the element (skipping HTML attribute reflection).</li>
</ul>

When the target is a custom element, <code>camelCase</code> attribute names are automatically converted to <code>kebab-case</code>, matching the behavior of plain interpolated attributes.</p>

<p>On re-renders, keys that disappeared from the new bag are removed from the element, so you can use <code>attrs</code> for conditional or computed attribute sets.</p>

## Usage {#usage}

```js
import { attrs, defineWompo, html, useState } from 'wompo';

export default function Field({ name, type = 'text' }) {
	const [value, setValue] = useState('');
	const inputAttrs = attrs({
		type,
		name,
		value,
		disabled: type === 'hidden',
		'@input': (e) => setValue(e.target.value),
		'.checked': type === 'checkbox' && value === 'on',
	});
	return html`<input ${inputAttrs} />`;
}

defineWompo(Field);
```

:::info
<b>Interpolation rules:</b> the <code>attrs</code> result must be placed directly inside an opening tag, not next to a single attribute. Use it once per element; spreading two bags on the same element is supported, but the order in which the keys are applied follows the order of the bags.
:::

## When to use it {#when}

<p>Reach for <code>attrs</code> when:

<ul>
<li>you want to forward an unknown set of props from the parent down to an internal element (a typical wrapper component);</li>
<li>the set of attributes is conditional or computed and you would otherwise have to branch the template;</li>
<li>you need to set a DOM property (<code>.value</code>, <code>.checked</code>, ...) together with attributes and events on the same element.</li>
</ul></p>
