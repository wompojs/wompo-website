---
title: "Dynamic Tags"
description: "Usa un valore runtime come tag dentro un template Wompo."
metaTitle: "Dynamic Tags - API Wompo"
metaDescription: "Renderizza componenti o tag HTML dinamici nei template Wompo."
navTitle: "Dynamic Tags"
order: 60005
---
## Componenti dinamici {#componenti-dinamici}

```js
function SlotRenderer({ component, props }) {
  const Component = component;
  return html`<${Component} ...${props} />`;
}
```

## Tag nativi dinamici {#tag-nativi-dinamici}

```js
function Text({ as = 'p', children }) {
  return html`<${as}>${children}</${as}>`;
}
```

## Quando usarli {#quando-usarli}

Sono utili per layout componibili, component registry, CMS e design system con componenti configurabili.
