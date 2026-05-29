---
title: "Stilare i componenti"
description: "Gestisci gli stili con CSS locale, CSS modules e Shadow DOM."
metaTitle: "Styling dei componenti"
metaDescription: "Scopri come usare CSS, CSS modules e Shadow DOM nei componenti Wompo."
navTitle: "Styling"
order: 30003
---
## CSS sul componente {#css-sul-componente}

Ogni componente può esporre una proprietà statica `css`.

```js
function Badge({ label }) {
  return html`<span class="badge">${label}</span>`;
}

Badge.css = `
  .badge {
    display: inline-flex;
    padding: 0.35rem 0.65rem;
    border-radius: 999px;
    background: #573ef6;
    color: white;
  }
`;
```

## CSS modules integrati {#css-modules-integrati}

Per default Wompo può rendere i nomi delle classi più specifici. Le classi generate arrivano in `styles`.

```js
function Card({ styles: s, title }) {
  return html`
    <article class=${s.card}>
      <h2>${title}</h2>
    </article>
  `;
}

Card.css = `
  .card {
    border: 1px solid #e7e4f3;
    border-radius: 8px;
    padding: 1rem;
  }
`;
```

## Shadow DOM {#shadow-dom}

Lo Shadow DOM non è obbligatorio. Usalo quando vuoi isolamento forte da CSS esterni o quando stai pubblicando widget da incorporare in pagine non controllate.

```js
defineWompo(UserWidget, {
  name: 'user-widget',
  shadow: true
});
```

:::info
Il default senza Shadow DOM rende più semplice integrare librerie terze, stili globali e query DOM. Attiva Shadow DOM quando l'isolamento è più importante della semplicità.
:::
