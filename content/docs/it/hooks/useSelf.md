---
title: "useSelf hook"
description: "Ottieni l'istanza del custom element corrente."
metaTitle: "useSelf - Hooks Wompo"
metaDescription: "Usa useSelf per leggere o modificare l'elemento host del componente."
navTitle: "useSelf"
order: 40012
---
## Uso {#uso}

```js
function ResizeAware() {
  const self = useSelf();

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      self.dataset.width = String(entry.contentRect.width);
    });
    observer.observe(self);
    return () => observer.disconnect();
  }, []);

  return html`<slot></slot>`;
}
```

`useSelf` è utile quando devi interagire con l'host element, leggere attributi, impostare dataset o collegare API browser all'elemento.
