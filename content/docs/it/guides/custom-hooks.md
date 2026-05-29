---
title: "Creare hook personalizzati"
description: "Combina gli hook di Wompo per creare logica riutilizzabile."
metaTitle: "Custom hooks"
metaDescription: "Impara a creare hook personalizzati con Wompo."
navTitle: "Custom hooks"
order: 30004
---
## Quando creare un hook {#quando-creare-un-hook}

Crea un hook personalizzato quando più componenti condividono la stessa logica di stato, effetto o derivazione dati. Un hook deve restare una funzione pura dal punto di vista della chiamata: gli hook interni vanno eseguiti sempre nello stesso ordine.

## Esempio: local storage {#local-storage}

```js
import { useEffect, useState } from 'wompo';

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
```

## Uso nel componente {#uso-nel-componente}

```js
function PreferencesPanel() {
  const [theme, setTheme] = useLocalStorage('theme', 'system');

  return html`
    <select value=${theme} @change=${(event) => setTheme(event.target.value)}>
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  `;
}
```

## Regole {#regole}

- Chiama gli hook personalizzati solo da componenti o altri hook.
- Non chiamarli condizionatamente.
- Restituisci una API piccola: valore, setter, stato di caricamento o funzioni esposte.
