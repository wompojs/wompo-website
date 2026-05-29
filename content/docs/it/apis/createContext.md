---
title: "createContext API"
description: "Crea un context per condividere dati tra componenti discendenti."
metaTitle: "createContext - API Wompo"
metaDescription: "Crea context condivisi e leggili con useContext."
navTitle: "createContext"
order: 60002
---
## Creazione {#creazione}

`createContext` crea un valore leggibile dai componenti discendenti senza passare props attraverso ogni livello intermedio.

```js
import { createContext } from 'wompo';

export const SessionContext = createContext({
  user: 'Guest',
  plan: 'Free',
});
```

L'argomento e' il valore predefinito. Wompo lo usa solo quando un componente chiama `useContext(SessionContext)` senza un provider sopra di lui.

## Provider {#provider}

Renderizza `Context.Provider` sopra i componenti che devono leggere il valore. Il provider riceve una prop obbligatoria: `value`.

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

Quando il valore del provider cambia, i discendenti che chiamano `useContext` vengono renderizzati di nuovo con il nuovo valore.

## Consumer {#consumer}

Leggi il valore con `useContext`.

```js
import { html, useContext } from 'wompo';
import { SessionContext } from './session-context.js';

function AccountBadge() {
  const session = useContext(SessionContext);

  return html`
    <p>
      ${session.user} usa il piano ${session.plan}.
    </p>
  `;
}
```

## Esempio: session provider {#session-provider}

Questo esempio mantiene lo stato della sessione in un componente e permette ai figli annidati di leggerlo senza ricevere props esplicite.

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
      <span>Piano ${session.plan}</span>
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
