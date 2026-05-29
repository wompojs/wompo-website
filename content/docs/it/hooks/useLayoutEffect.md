---
title: "useLayoutEffect hook"
description: "Esegui effetti sincroni legati a misure e layout."
metaTitle: "useLayoutEffect - Hooks Wompo"
metaDescription: "Usa useLayoutEffect quando devi leggere o scrivere layout prima del paint."
navTitle: "useLayoutEffect"
order: 40008
---
## Differenza da useEffect {#differenza-da-useeffect}

`useLayoutEffect` è pensato per misurazioni o aggiornamenti che devono avvenire prima che l'utente veda il frame finale.

```js
function AutoHeightPanel({ open }) {
  const ref = useRef();
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    setHeight(open ? ref.current.scrollHeight : 0);
  }, [open]);

  return html`<div ref=${ref} style=${{ maxHeight: `${height}px` }}>...</div>`;
}
```

:::warning
Usalo solo quando serve davvero. Per fetch, listener e side effect comuni preferisci `useEffect`.
:::
