---
title: "createContext API"
description: "How to use the createContext function to create a new Context and share some data to all its children."
metaTitle: "createContext - Wompo APIs"
metaDescription: "The createContext function allows to create a Context to share between a portion of your application."
navTitle: "createContext"
order: 60002
---
## Creating a context {#creating-a-context}

`createContext` creates a value that descendant components can read without threading props through every intermediate component.

```js
import { createContext } from 'wompo';

export const SessionContext = createContext({
  user: 'Guest',
  plan: 'Free',
});
```

The argument is the default value. Wompo uses it only when a component calls `useContext(SessionContext)` without a matching provider above it.

## Provider {#provider}

Render `Context.Provider` above the components that need the value. The provider receives a required `value` prop.

```js
function App() {
  const session = {
    user: 'Ada',
    plan: 'Pro',
  };

  return html`
    <${SessionContext.Provider} value=${session}>
      <${Dashboard} />
    </${SessionContext.Provider}>
  `;
}
```

Whenever the provider value changes, descendants that call `useContext` re-render with the new value.

## Consumer {#consumer}

Read the value with `useContext`.

```js
import { html, useContext } from 'wompo';
import { SessionContext } from './session-context.js';

function AccountBadge() {
  const session = useContext(SessionContext);

  return html`
    <p>
      ${session.user} is using the ${session.plan} plan.
    </p>
  `;
}
```

## Example: session provider {#session-provider}

This example keeps session state in one component and lets nested children read it without receiving explicit props.

```js
import { createContext, defineWompo, html, useContext, useState } from 'wompo';

const SessionContext = createContext({
  user: 'Guest',
  plan: 'Free',
});

function SessionCard() {
  const session = useContext(SessionContext);

  return html`
    <article>
      <strong>${session.user}</strong>
      <span>${session.plan} plan</span>
    </article>
  `;
}

function AccountArea() {
  const [session, setSession] = useState({
    user: 'Ada',
    plan: 'Free',
  });

  const upgrade = () => {
    setSession({
      ...session,
      plan: 'Pro',
    });
  };

  return html`
    <${SessionContext.Provider} value=${session}>
      <${SessionCard} />
      <button @click=${upgrade}>Upgrade</button>
    </${SessionContext.Provider}>
  `;
}

defineWompo(AccountArea);
```

<context-session-example></context-session-example>
