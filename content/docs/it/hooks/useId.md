---
title: "useId hook"
description: "Genera ID stabili per collegare label, input e contenuti accessibili."
metaTitle: "useId - Hooks Wompo"
metaDescription: "Usa useId per generare identificatori unici nei componenti."
navTitle: "useId"
order: 40007
---
## Esempio {#esempio}

```js
function TextField({ label }) {
  const id = useId();

  return html`
    <label for=${id}>${label}</label>
    <input id=${id} />
  `;
}
```

## Casi d'uso {#casi-d-uso}

Usalo per form, descrizioni ARIA, tab panel, accordion e componenti che possono essere renderizzati più volte nella stessa pagina.
