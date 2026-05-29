---
title: "createPortal API"
description: "Renderizza contenuto Wompo in un nodo DOM esterno al componente."
metaTitle: "createPortal - API Wompo"
metaDescription: "Usa createPortal per modal, tooltip e layer globali."
navTitle: "createPortal"
order: 60003
---
## Esempio {#esempio}

```js
import { createPortal, html } from 'wompo';

function Modal({ open, children }) {
  if (!open) return html``;

  return createPortal(
    html`<div class="modal">${children}</div>`,
    document.body
  );
}
```

## Casi d'uso {#casi-d-uso}

Portal è utile per modal, menu flottanti, tooltip, notifiche e UI che deve uscire dal normale contenitore del componente.
