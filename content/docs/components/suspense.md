---
title: "Suspense component"
description: "How to show fallback UI while async components are loading."
metaTitle: "Suspense - Wompo components"
metaDescription: "Use Suspense with useAsync and lazy to show loading states for a whole subtree."
navTitle: "Suspense"
order: 50001
---
## Purpose {#purpose}

`Suspense` renders a fallback while one or more children are waiting for async work. Use it with:

- components that call <a href="/docs/hooks/useAsync">useAsync</a>;
- components loaded with <a href="/docs/apis/lazy">lazy</a>;
- streaming SSR boundaries that should flush a fallback before the async content resolves.

## Usage {#usage}

The component receives a required `fallback` prop. The fallback must be an `html` template.

```js
import { Suspense, html } from 'wompo';

function Page() {
  return html`
    <${Suspense} fallback=${html`<p>Loading...</p>`}>
      <${AsyncPanel} />
    </${Suspense}>
  `;
}
```

## With useAsync {#with-useasync}

Every child inside the boundary can trigger the same fallback.

```js
function UserCard({ userId }) {
  const user = useAsync(() => fetchUser(userId), [userId]);

  return html`
    <article>
      ${user ? user.name : 'Loading...'}
    </article>
  `;
}

function TeamPage() {
  return html`
    <${Suspense} fallback=${html`<p>Loading team...</p>`}>
      <${UserCard} userId="ada" />
      <${UserCard} userId="grace" />
    </${Suspense}>
  `;
}
```

<async-profile-example></async-profile-example>

## With lazy {#with-lazy}

`Suspense` also works while a lazy component is being imported.

```js
import { Suspense, html, lazy } from 'wompo';

const LazyComponent = lazy(() => import('./LazyComponent.js'));

function App() {
  return html`
    <p>This content is static.</p>
    <${Suspense} fallback=${html`<i>Loading...</i>`}>
      <${LazyComponent}>I should be blue...</${LazyComponent}>
    </${Suspense}>
  `;
}
```

<lazy-suspense-example></lazy-suspense-example>

:::info
In streaming SSR, a pending `Suspense` boundary flushes the fallback first. When the async work resolves, Wompo streams the resolved content and swaps it into the boundary.
:::
