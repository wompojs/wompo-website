---
title: "html API"
description: "How to use the html function to define what a component should render and create custom templates."
metaTitle: "html API - Wompo APIs"
metaDescription: "The html function lets you build your component's HTML as a string, and get the dynamic parts of it."
navTitle: "html"
order: 60007
---
## Description {#description}

`html` is Wompo's template tag. Components return it to describe their DOM structure.

```js
const template = html`<p>Hello</p>`;
```

Because it is a tagged template, use backticks instead of calling it like a normal function.

## Dynamic values {#dynamic-values}

You can interpolate text, numbers, arrays, other templates, attributes, event handlers, refs, styles, and dynamic tags.

```js
const staticTemplate = html`<i>I am static</i>`;

const dynamicTemplate = html`
  <div>
    <p>Static template: ${staticTemplate}</p>
    <p>Number: ${0}</p>
    <p>String: ${'ciao!'}</p>
    <p>Array: ${[0, 1, 2, 'three', html`four`]}</p>
    <p>Nested template: ${html`Look!`}</p>
    <p>${true && 'I am visible!'}</p>
    <p>${null} ${undefined} ${false}</p>
  </div>
`;
```

Falsy values are ignored, except for numbers and strings.

```js
function Component() {
  return dynamicTemplate;
}
```

<html-example></html-example>

## Interpolation cheatsheet {#interpolation}

- `name=${value}` sets or removes an attribute. On custom elements, camelCase names become kebab-case.
- `@event=${handler}` attaches an event listener.
- `.prop=${value}` assigns a DOM property instead of an attribute.
- `ref=${aRef}` stores the DOM element in `aRef.current`.
- `style=${styleObject}` accepts camelCase CSS properties; numeric values receive `px`.
- `<${tag}>...</${tag}>` renders a dynamic tag.
- `<el ${attrs({ ... })}>` spreads attributes, events, and properties from an `attrs` bag.
