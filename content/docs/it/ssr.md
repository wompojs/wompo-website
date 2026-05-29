---
title: "Server-Side Rendering"
description: "Renderizza componenti Wompo sul server, usa streaming, hydration a isole e Server Actions."
metaTitle: "SSR"
metaDescription: "Scopri come renderizzare componenti Wompo lato server, idratarli nel browser e usare Server Actions."
navTitle: "SSR"
order: 800
---
## Panoramica {#panoramica}

Wompo include un motore SSR a stringa, un renderer streaming, un runtime di hydration a isole e una API per Server Actions. Gli stessi componenti creati con `defineWompo` possono essere renderizzati sul server e poi idratati selettivamente nel browser.

Gli entry point principali sono:

- `wompo/ssr`: `renderToString`, `renderToStream`, `defineAction` e runtime per boundary streaming.
- `wompo/hydrate`: `hydrate`, la funzione client-side che aggiorna le isole.
- `wompo/devalue`: serializzatore per props complesse, inclusi `Date`, `Map`, `Set`, `BigInt`, `undefined`, `NaN` e riferimenti ciclici.

## renderToString {#render-to-string}

`renderToString` produce una stringa HTML completa. Aspetta anche `useAsync` e componenti `lazy` presenti nell'albero prima di risolvere.

```js
import { renderToString } from 'wompo/ssr';
import Page from './Page.js';

const { html, headTags, css, islands } = await renderToString(Page, { user });

// html      -> markup del componente
// headTags  -> style inline deduplicati
// css       -> Map<componentName, css>
// islands   -> metadata per hydration selettiva
```

Il secondo argomento sono le props root. Il terzo argomento può configurare:

- `hydration`: `'islands'` per marker di hydration o `'none'` per HTML statico.
- `css`: `'inline'`, `'extract'` o `'none'`.
- `nonce`: nonce CSP per script inline.
- `base`: prefisso URL per chunk emessi.
- `signal`: `AbortSignal` opzionale.

## renderToStream e Suspense {#render-to-stream}

`renderToStream` restituisce un `ReadableStream<Uint8Array>`. La shell iniziale arriva subito, mentre le boundary lente vengono risolte appena pronte.

```js
import { renderToStream } from 'wompo/ssr';
import Page from './Page.js';

const stream = renderToStream(Page, props);
```

Usa `Suspense` per isolare parti lente della pagina.

```js
import { defineWompo, html, Suspense, useAsync } from 'wompo';

function SlowList() {
  const items = useAsync(() => fetch('/api/items').then((r) => r.json()), []);
  return html`
    <ul>
      ${items.map((item) => html`<li>${item.name}</li>`)}
    </ul>
  `;
}

defineWompo(SlowList);

function Page() {
  return html`
    <main>
      <h1>Catalogo</h1>
      <${Suspense} fallback=${html`<p>Caricamento...</p>`}>
        <${SlowList} />
      </${Suspense}>
    </main>
  `;
}

defineWompo(Page);
```

## Isole e hydration {#isole-e-hydration}

Un componente diventa un'isola in due modi:

1. dichiari un default in `defineWompo`, con `island: 'load' | 'idle' | 'visible'`;
2. sovrascrivi nel punto di utilizzo con `client:load`, `client:idle`, `client:visible` o `client:none`.

```js
import { defineWompo, html, useState } from 'wompo';

function Counter({ start = 0 }) {
  const [count, setCount] = useState(start);
  return html`<button @click=${() => setCount(count + 1)}>${count}</button>`;
}

defineWompo(Counter, { name: 'my-counter', island: 'visible' });

function Page() {
  return html`
    <main>
      <${Counter} start=${5} />
      <${Counter} start=${0} client:load />
      <${Counter} start=${10} client:none />
    </main>
  `;
}

defineWompo(Page);
```

Nel browser importa i componenti e chiama `hydrate(document)`.

```js
import { hydrate } from 'wompo/hydrate';
import './Counter.js';

hydrate(document);
```

Le modalità disponibili sono:

- `load`: idrata subito.
- `idle`: aspetta `requestIdleCallback`, con fallback a `setTimeout`.
- `visible`: usa `IntersectionObserver` e idrata quando l'isola entra vicino al viewport.

:::warning
Se il DOM SSR non corrisponde al template client, Wompo può fare un re-render distruttivo e scrivere un warning in console. Correggi il mismatch nel template invece di ignorarlo.
:::

## Server Actions {#server-actions}

`defineAction` crea una funzione che può essere passata a un'isola. Sul server resta una funzione normale; sul client diventa un proxy che esegue una richiesta all'endpoint action.

```js
// actions.js
import { defineAction } from 'wompo/ssr';

export const addItem = defineAction(async (name) => {
  return { id: crypto.randomUUID(), name };
});
```

```js
// ItemForm.js
import { defineWompo, html, useState } from 'wompo';

function ItemForm({ onAdd }) {
  const [name, setName] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    await onAdd(name);
    setName('');
  };

  return html`
    <form @submit=${submit}>
      <input value=${name} @input=${(event) => setName(event.target.value)} />
      <button>Aggiungi</button>
    </form>
  `;
}

defineWompo(ItemForm, { name: 'item-form', island: 'load' });
```

```js
// Page.js
import { defineWompo, html } from 'wompo';
import ItemForm from './ItemForm.js';
import { addItem } from './actions.js';

function Page() {
  return html`<${ItemForm} onAdd=${addItem} />`;
}

defineWompo(Page);
```

:::info
Il framework server deve collegare l'endpoint `/_action/:id`. In uno stack custom puoi usare `getRegisteredAction(id)` da `wompo/ssr` per recuperare la funzione registrata.
:::

## Context sul server {#context-sul-server}

I <a href="/docs/apis/createContext">context</a> funzionano sul server come sul client: renderizzi un provider sopra il sottoalbero e leggi il valore con <a href="/docs/hooks/useContext">useContext</a>.

```js
import { createContext, defineWompo, html, useContext } from 'wompo';

const LocaleContext = createContext('en');

function Greeting() {
  const locale = useContext(LocaleContext);
  return html`<p>${locale === 'it' ? 'Ciao' : 'Hello'}</p>`;
}

function Page({ locale }) {
  return html`
    <${LocaleContext.Provider} value=${locale}>
      <${Greeting} />
    </${LocaleContext.Provider}>
  `;
}

defineWompo(Greeting);
defineWompo(Page);
```

Il runtime SSR mantiene uno stack per ogni context, quindi un provider annidato sovrascrive solo i consumer sotto di lui.

## Quando usarlo {#quando-usarlo}

SSR è utile per documentazione, pagine marketing, dashboard con contenuto iniziale importante e app che vogliono ridurre il JavaScript idratato nel browser.

Se una parte usa `window`, `document`, storage o API browser-only, spostala in un effect oppure rendila un'isola client-side.
