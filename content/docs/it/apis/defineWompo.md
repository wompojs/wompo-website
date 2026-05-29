---
title: "defineWompo API"
description: "Registra una funzione componente come Web Component."
metaTitle: "defineWompo - API Wompo"
metaDescription: "Usa defineWompo per trasformare funzioni in custom elements."
navTitle: "defineWompo"
order: 60004
---
## Registrazione base {#registrazione-base}

`defineWompo` registra una funzione componente nel `CustomElementRegistry` del browser. Chiamalo una volta dopo aver dichiarato il componente.

```js
import { defineWompo, html } from 'wompo';

function UserCard({ name }) {
  return html`<article>${name}</article>`;
}

defineWompo(UserCard);
```

Di default Wompo trasforma il nome della funzione in kebab-case. `UserCard` diventa `user-card`. Se il nome generato non contiene un trattino, Wompo aggiunge `-wompo`.

## Opzioni {#opzioni}

Il secondo argomento controlla l'elemento generato.

```js
defineWompo(UserCard, {
  name: 'app-user-card',
  shadow: false,
  cssModule: true,
  island: 'visible',
});
```

- `name`: nome esplicito del custom element. Usalo in build minificate o librerie pubbliche.
- `shadow`: renderizza il componente dentro uno Shadow Root.
- `cssModule`: isola le classi definite in `Component.css` e le espone in `props.styles`.
- `island`: rende il componente un'isola SSR idratata su `load`, `idle` o `visible`.

:::warning
Quando un minifier rinomina le funzioni, i nomi automatici possono diventare instabili. Imposta `name` manualmente per i componenti usati da HTML o pubblicati come elementi riusabili.
:::

## CSS modules {#css-modules}

Quando `cssModule` e' attivo, le classi definite in `Component.css` vengono rinominate ed esposte tramite `styles`.

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

Usa `shadow: true` quando un componente deve essere isolato dal CSS della pagina.

```js
import { defineWompo, html } from 'wompo';

function IsolatedComponent() {
  return html`
    <p>
      I miei stili sono generici, ma restano dentro questo componente.
    </p>
  `;
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

## Isole SSR {#isole-ssr}

Con SSR, `island` definisce la strategia di hydration predefinita per ogni istanza del componente.

```js
defineWompo(ProductFilters, {
  name: 'product-filters',
  island: 'visible',
});
```

Puoi sovrascrivere la strategia nel punto in cui renderizzi il componente.

```js
function Page() {
  return html`
    <${ProductFilters} client:load />
    <${ProductFilters} client:none />
  `;
}
```
