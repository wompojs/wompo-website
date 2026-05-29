---
title: "Hooks"
description: "Gli hook di Wompo permettono di gestire stato, effetti, ref, context e logica riutilizzabile."
metaTitle: "Hooks Wompo"
metaDescription: "Scopri gli hook integrati di Wompo."
navTitle: "Hooks"
order: 400
---
## Regole degli hook {#regole-degli-hook}

Gli hook vanno chiamati sempre nello stesso ordine e nelle prime righe del componente.

```js
function Profile({ userId }) {
  const [user, setUser] = useState(null);
  const self = useSelf();

  // Logica del componente dopo gli hook.
  return html`...`;
}
```

Non chiamarli dentro `if`, loop o callback.

## Hook disponibili {#hook-disponibili}

- <a href="/docs/hooks/useState">useState</a>: stato locale.
- <a href="/docs/hooks/useEffect">useEffect</a>: effetti asincroni o side effect.
- <a href="/docs/hooks/useRef">useRef</a>: valore stabile o riferimento DOM.
- <a href="/docs/hooks/useMemo">useMemo</a>: valore derivato memorizzato.
- <a href="/docs/hooks/useCallback">useCallback</a>: funzione stabile.
- <a href="/docs/hooks/useContext">useContext</a>: lettura di context.
- <a href="/docs/hooks/useAsync">useAsync</a>: operazioni asincrone.
- <a href="/docs/hooks/useExposed">useExposed</a>: metodi pubblici sull'elemento.
