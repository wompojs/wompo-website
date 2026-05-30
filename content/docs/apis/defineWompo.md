---
title: 'defineWompo API'
description: 'How to use the defineWompo function to register your custom component in your application.'
metaTitle: 'defineWompo - Wompo APIs'
metaDescription: 'The defineWompo function will transform your functional Component into a Web Component, so that it can be used in your HTML.'
navTitle: 'defineWompo'
order: 60004
---

## Basic registration {#basic-registration}

`defineWompo` registers a function component in the browser `CustomElementRegistry`. Call it once after declaring the component.

```js
import { defineWompo, html } from 'wompo';

function UserCard({ name }) {
	return html`<article>${name}</article>`;
}

defineWompo(UserCard);
```

By default, Wompo turns the function name into a kebab-case custom element name. `UserCard` becomes `user-card`. If the generated name would not contain a dash, Wompo appends `-wompo`.

## Options {#options}

The second argument lets you control the generated element.

```js
defineWompo(UserCard, {
	name: 'app-user-card',
	shadow: false,
	cssModule: true,
	island: 'visible',
});
```

- `name`: explicit custom element name. Use this in minified builds or public component libraries.
- `shadow`: renders the component inside a Shadow Root.
- `cssModule`: scopes classes from `Component.css` and exposes them through `props.styles`.
- `island`: marks the component as an SSR island hydrated on `load`, `idle`, or `visible`.

:::warning
When a minifier renames functions, automatic names can become unstable. Set `name` manually for components that are referenced from HTML or published as reusable elements.
:::

## CSS modules {#css-modules}

When `cssModule` is enabled, classes declared in `Component.css` are renamed and exposed through `styles`.

```js
function Badge({ styles: s, label }) {
	return html`<span class=${s.badge}>${label}</span>`;
}

Badge.css = `
  .badge {
    display: inline-flex;
    align-items: center;
    border-radius: 999px;
    background: #573ef6;
    color: white;
    padding: 0.35rem 0.65rem;
  }
`;

defineWompo(Badge, {
	name: 'app-badge',
});
```

## Shadow DOM {#shadow-dom}

Use `shadow: true` when a component must be isolated from the page CSS.

```js
import { defineWompo, html } from 'wompo';

function IsolatedComponent() {
	return html` <p>My styles are generic, but they stay inside this component.</p> `;
}

IsolatedComponent.css = `
  :host {
    display: block;
  }

  p {
    margin: 0;
    border-radius: 6px;
    background: #3489a6;
    color: #fff;
    padding: 0.8rem;
  }
`;

defineWompo(IsolatedComponent, {
	name: 'super-cool-isolated-component',
	shadow: true,
	cssModule: false,
});
```

<super-cool-isolated-component></super-cool-isolated-component>

## SSR islands {#ssr-islands}

With SSR, `island` defines the default hydration strategy for every instance of the component.

```js
defineWompo(ProductFilters, {
	name: 'product-filters',
	island: 'visible',
});
```

You can override the strategy at the call site.

```js
function Page() {
	return html`
		<${ProductFilters} client:load />
		<${ProductFilters} client:none />
	`;
}
```
