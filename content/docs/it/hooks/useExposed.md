---
title: "useExposed hook"
description: "Espone metodi e valori sull'istanza DOM del componente."
metaTitle: "useExposed - Hooks Wompo"
metaDescription: "Usa useExposed per pubblicare metodi controllati sul custom element."
navTitle: "useExposed"
order: 40005
---
## Esempio modal {#esempio-modal}

```js
function AppModal() {
  const [open, setOpen] = useState(false);

  useExposed({
    open: () => setOpen(true),
    close: () => setOpen(false)
  });

  return html`${open ? html`<dialog open>Modal</dialog>` : ''}`;
}
```

Ora puoi controllarla dal DOM.

```js
document.querySelector('app-modal').open();
```

:::info
Esporre pochi metodi chiari rende i componenti più facili da integrare in pagine non Wompo.
:::
