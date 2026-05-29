---
title: "Element API"
description: "Controlla l'istanza DOM di un componente Wompo."
metaTitle: "Element API - API Wompo"
metaDescription: "Scopri come esporre e richiamare metodi da un custom element Wompo."
navTitle: "Element API"
order: 60006
---
## Istanza DOM {#istanza-dom}

Ogni componente registrato diventa un custom element. Puoi selezionarlo e interagire con l'istanza DOM.

```js
const modal = document.querySelector('app-modal');
modal.open();
```

## Metodi esposti {#metodi-esposti}

Abbina questa API a <a href="/docs/hooks/useExposed">useExposed</a> quando vuoi pubblicare metodi controllati verso l'esterno.

```js
function Modal() {
  useExposed({
    open: () => setOpen(true),
    close: () => setOpen(false)
  });

  return html`...`;
}
```
