---
title: "useAsync hook"
description: "How to use the useAsync hook to make asynchronous requests and easily show a loading UI."
metaTitle: "useAsync - Wompo hooks"
metaDescription: "The useAsync hook will take care of asynchronous operations in the component by executing a callback on first render and when one of its dependencies changes."
navTitle: "useAsync"
order: 40001
---
## Usage {#usage}

`useAsync` runs a callback that returns a promise. It returns `null` while the promise is pending, then returns the resolved value and re-renders the component.

```js
const data = useAsync(promiseFn, dependencies, triggerSuspense);
```

- `promiseFn`: a function with no parameters that returns a promise.
- `dependencies`: values that decide when the async work must run again.
- `triggerSuspense`: optional boolean. When `true`, the nearest `Suspense` boundary can show its fallback while the promise is pending.

## Fetching data {#fetching-data}

Handle the `null` state directly when you want a local loading UI.

```js
import { defineWompo, html, useAsync } from 'wompo';

function UserPanel({ userId }) {
  const user = useAsync(async () => {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) return null;
    return response.json();
  }, [userId]);

  const content = user
    ? html`
        <strong>${user.name}</strong>
        <span>${user.role}</span>
      `
    : html`<span>Loading user...</span>`;

  return html`
    <article>
      ${content}
    </article>
  `;
}

defineWompo(UserPanel);
```

When `userId` changes, Wompo resets the hook value to `null`, runs the callback again, and updates the component when the new promise resolves.

## Suspense {#suspense}

Wrap async children in `Suspense` when a whole section should wait together.

```js
import { Suspense, defineWompo, html, useAsync } from 'wompo';

function UserCard({ userId }) {
  const user = useAsync(() => fetchUser(userId), [userId]);

  return html`
    <article>
      ${user ? user.name : 'Loading...'}
    </article>
  `;
}

function TeamPanel() {
  return html`
    <${Suspense} fallback=${html`<p>Loading team...</p>`}>
      <${UserCard} userId="ada" />
      <${UserCard} userId="grace" />
    </${Suspense}>
  `;
}

defineWompo(TeamPanel);
```

Every async child inside the boundary can trigger the same fallback. The children render when the pending promises have resolved.

<async-profile-example></async-profile-example>

## Opting out of Suspense {#opting-out}

Pass `false` as the third argument when the component should manage its own pending UI even if it is inside a `Suspense` boundary.

```js
function SearchPreview({ query }) {
  const results = useAsync(
    () => fetchResults(query),
    [query],
    false,
  );

  return html`
    <section>
      ${results ? results.length : 'Searching...'}
    </section>
  `;
}
```

:::info
On the server, `renderToString` awaits `useAsync` before returning HTML. In streaming mode, async work inside `Suspense` can flush the fallback first and resolve later.
:::
