---
title: "useMemo hook"
description: "Memorizza un valore derivato finché non cambiano le dipendenze."
metaTitle: "useMemo - Hooks Wompo"
metaDescription: "Usa useMemo per calcoli derivati costosi o ordinamenti."
navTitle: "useMemo"
order: 40009
---
## Esempio {#esempio}

```js
function UserList({ users, query }) {
  const filtered = useMemo(() => {
    return users
      .filter((user) => user.name.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [users, query]);

  return html`${filtered.map((user) => html`<p>${user.name}</p>`)}`;
}
```

## Quando usarlo {#quando-usarlo}

Usalo per calcoli costosi, ordinamenti, trasformazioni di array e oggetti che passi a componenti figli.
