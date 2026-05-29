---
title: "html API"
description: "Crea il template che un componente Wompo deve renderizzare."
metaTitle: "html API - API Wompo"
metaDescription: "Usa la funzione html per scrivere template con parti statiche e dinamiche."
navTitle: "html"
order: 60007
---
## Template {#template}

`html` è una tagged template function. Le parti statiche vengono analizzate e le espressioni dinamiche aggiornano il DOM.

```js
function Alert({ tone, children }) {
  return html`<div class=${tone}>${children}</div>`;
}
```

## Espressioni {#espressioni}

Puoi passare stringhe, numeri, altri template, array di template, componenti e funzioni evento.

```js
function List({ items }) {
  return html`
    <ul>
      ${items.map((item) => html`<li>${item.label}</li>`)}
    </ul>
  `;
}
```
