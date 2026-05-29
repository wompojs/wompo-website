---
title: "useCallback hook"
description: "Mantieni stabile una funzione tra render."
metaTitle: "useCallback - Hooks Wompo"
metaDescription: "Memorizza una callback e ricreala solo quando cambiano le dipendenze."
navTitle: "useCallback"
order: 40002
---
## Esempio {#esempio}

```js
function SearchForm({ onSearch }) {
  const [query, setQuery] = useState('');

  const submit = useCallback((event) => {
    event.preventDefault();
    onSearch(query);
  }, [query, onSearch]);

  return html`<form @submit=${submit}>...</form>`;
}
```

## Perché usarlo {#perche-usarlo}

È utile quando passi callback a componenti figli, effect o hook personalizzati che dipendono dall'identità della funzione.
