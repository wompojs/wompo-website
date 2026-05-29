---
title: "useAsync hook"
description: "Gestisci operazioni asincrone e stati di caricamento."
metaTitle: "useAsync - Hooks Wompo"
metaDescription: "Esegui callback asincrone al render e al cambio delle dipendenze."
navTitle: "useAsync"
order: 40001
---
## Uso {#uso}

`useAsync` esegue una callback che ritorna una promise. Ritorna `null` mentre la promise e' in corso, poi ritorna il valore risolto e renderizza di nuovo il componente.

```js
const data = useAsync(promiseFn, dependencies, triggerSuspense);
```

- `promiseFn`: funzione senza parametri che ritorna una promise.
- `dependencies`: valori che decidono quando rieseguire il lavoro asincrono.
- `triggerSuspense`: booleano opzionale. Quando e' `true`, il `Suspense` piu vicino puo' mostrare il fallback mentre la promise e' in corso.

## Fetch dei dati {#fetch-dei-dati}

Gestisci lo stato `null` direttamente quando vuoi una UI di caricamento locale.

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
    : html`<span>Caricamento utente...</span>`;

  return html`
    <article>
      ${content}
    </article>
  `;
}

defineWompo(UserPanel);
```

Quando `userId` cambia, Wompo riporta il valore dell'hook a `null`, esegue di nuovo la callback e aggiorna il componente quando la nuova promise si risolve.

## Suspense {#suspense}

Usa `Suspense` quando un'intera sezione deve aspettare insieme.

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
    <${Suspense} fallback=${html`<p>Caricamento team...</p>`}>
      <${UserCard} userId="ada" />
      <${UserCard} userId="grace" />
    </${Suspense}>
  `;
}

defineWompo(TeamPanel);
```

Ogni figlio asincrono dentro il boundary puo' attivare lo stesso fallback. I figli vengono mostrati quando le promise pendenti sono risolte.

<async-profile-example></async-profile-example>

## Disattivare Suspense {#disattivare-suspense}

Passa `false` come terzo argomento quando il componente deve gestire da solo la UI pendente anche se si trova dentro un boundary `Suspense`.

```js
function SearchPreview({ query }) {
  const results = useAsync(
    () => fetchResults(query),
    [query],
    false,
  );

  return html`
    <section>
      ${results ? results.length : 'Ricerca...'}
    </section>
  `;
}
```

:::info
Sul server, `renderToString` aspetta `useAsync` prima di ritornare HTML. In streaming, il lavoro asincrono dentro `Suspense` puo' mostrare prima il fallback e risolversi dopo.
:::
