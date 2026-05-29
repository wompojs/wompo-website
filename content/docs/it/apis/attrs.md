---
title: "attrs API"
description: "Applica un insieme di attributi, eventi e proprietà su un elemento."
metaTitle: "attrs - API Wompo"
metaDescription: "Usa attrs per distribuire attributi ed eventi su un elemento in un template."
navTitle: "attrs"
order: 60001
---
## Uso base {#uso-base}

`attrs` è utile quando vuoi costruire un set di attributi in modo programmatico.

```js
import { attrs, html } from 'wompo';

function ActionButton({ disabled, onClick }) {
  const buttonAttrs = attrs({
    disabled,
    '@click': onClick,
    'aria-disabled': disabled ? 'true' : 'false'
  });

  return html`<button ...${buttonAttrs}>Save</button>`;
}
```

## Quando usarla {#quando-usarla}

Usala per componenti wrapper, design system e adapter che devono inoltrare attributi senza duplicare markup.
