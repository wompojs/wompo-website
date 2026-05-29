---
title: "Introduzione"
description: "Wompo è una libreria leggera per creare Web Components reattivi, portabili, riutilizzabili e pronti per SSR e hydration a isole."
metaTitle: "Wompo - Introduzione"
metaDescription: "Scopri perché usare Wompo: API simile a React, Web Components nativi, CSS modules integrati, SSR, isole e componenti riutilizzabili."
navTitle: "Introduzione"
order: 100
---
## Cos'è Wompo {#cos-e-wompo}

Wompo è una libreria JavaScript per costruire interfacce con **Web Components reali** usando un modello a funzioni e hook. Scrivi una funzione, ritorni un template `html`, registri il componente con `defineWompo` e lo usi come un tag HTML.

```js
import { defineWompo, html, useState } from 'wompo';

function CounterButton() {
  const [count, setCount] = useState(0);
  return html`<button @click=${() => setCount(count + 1)}>Count: ${count}</button>`;
}

defineWompo(CounterButton);
```

```html
<counter-button></counter-button>
```

Lo stesso modello, in piccolo, è quello che vedi qui sotto: un custom element reale che mantiene stato locale e reagisce al click.

<counter-example></counter-example>

## Perché usarlo {#perche-usarlo}

- **Portabilità**: il risultato è un custom element nativo, quindi può vivere in HTML statico, app Wompo, React, Vue, Angular o JavaScript vanilla.
- **API familiare**: state, effect, memo, ref e context seguono un approccio simile a React.
- **CSS modules integrati**: puoi evitare collisioni di classi senza attivare Shadow DOM per forza.
- **SSR e isole**: puoi renderizzare lato server e idratare solo i componenti interattivi.
- **Bundler opzionale**: puoi installare da npm, usare import map, CDN o un file locale.

## Web Components senza attrito {#web-components-senza-attrito}

Un componente Wompo non è virtuale: quando lo ispezioni nel DOM trovi un elemento reale, per esempio `<user-card>` o `<todo-list>`. Questo rende i componenti condivisibili e integrabili, ma significa anche che il componente ha una propria presenza nel layout.

```js
function App() {
  return html`
    <div class="row">
      <span>Prima</span>
      <${UserCard} user=${user} />
    </div>
  `;
}
```

Il browser vedrà un elemento custom dentro `.row`, non solo i nodi figli del componente. Se ti serve un comportamento inline, dichiaralo nel CSS del componente.

```js
UserCard.css = `
  :host {
    display: inline-flex;
  }
`;
```

## Quando conviene {#quando-conviene}

Wompo è utile quando vuoi componenti piccoli, riusabili e facili da distribuire tra progetti diversi. Funziona bene per design system, widget embeddabili, interfacce progressive su siti esistenti e applicazioni che vogliono SSR senza idratare tutto il documento.

:::info
Se conosci già React, la curva di apprendimento è breve. La differenza da ricordare è che stai pubblicando veri elementi HTML personalizzati.
:::
