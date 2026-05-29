---
title: "Componente Suspense"
description: "Mostra una UI fallback mentre componenti asincroni stanno caricando."
metaTitle: "Suspense - Componenti Wompo"
metaDescription: "Usa Suspense con useAsync e lazy per gestire stati di caricamento."
navTitle: "Suspense"
order: 50001
---
## Scopo {#scopo}

`Suspense` renderizza un fallback mentre uno o piu figli aspettano lavoro asincrono. Usalo con:

- componenti che chiamano <a href="/docs/hooks/useAsync">useAsync</a>;
- componenti caricati con <a href="/docs/apis/lazy">lazy</a>;
- boundary SSR streaming che devono mostrare un fallback prima del contenuto risolto.

## Uso {#uso}

Il componente riceve una prop obbligatoria: `fallback`. Il fallback deve essere un template `html`.

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

## Con useAsync {#con-useasync}

Ogni figlio dentro il boundary puo' attivare lo stesso fallback.

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
    <${Suspense} fallback=${html`<p>Caricamento team...</p>`}>
      <${UserCard} userId="ada" />
      <${UserCard} userId="grace" />
    </${Suspense}>
  `;
}
```

<async-profile-example></async-profile-example>

## Con lazy {#con-lazy}

`Suspense` funziona anche mentre un componente lazy viene importato.

```js
import { Suspense, html, lazy } from 'wompo';

const LazyComponent = lazy(() => import('./LazyComponent.js'));

function App() {
  return html`
    <p>Questo contenuto e' statico.</p>
    <${Suspense} fallback=${html`<i>Loading...</i>`}>
      <${LazyComponent}>I should be blue...</${LazyComponent}>
    </${Suspense}>
  `;
}
```

<lazy-suspense-example></lazy-suspense-example>

:::info
In streaming SSR, un boundary `Suspense` pendente invia prima il fallback. Quando il lavoro asincrono termina, Wompo invia il contenuto risolto e lo sostituisce nel boundary.
:::
