---
title: "useHook hook"
description: "Crea hook avanzati quando devi collegarti al meccanismo interno degli hook Wompo."
metaTitle: "useHook - Hooks Wompo"
metaDescription: "Usa useHook per costruire hook personalizzati avanzati, subscription e integrazioni con cleanup."
navTitle: "useHook"
order: 40006
---
## A cosa serve {#a-cosa-serve}

`useHook` è l'API di basso livello su cui sono costruiti gli hook. Nella maggior parte dei casi non ti serve: puoi creare custom hook componendo `useState`, `useEffect`, `useMemo` e gli altri hook pubblici.

Usalo quando devi controllare direttamente:

- lo slot dell'hook nel componente;
- un valore persistente non esposto da altri hook;
- cleanup collegato al ciclo di vita del componente;
- subscription condivise tra molti componenti.

:::warning
Se stai imparando Wompo, parti dalla guida <a href="/docs/guides/custom-hooks">Custom hooks</a>. `useHook` è pensato per casi avanzati.
:::

## Custom hook semplice {#custom-hook-semplice}

Per molti casi basta combinare hook esistenti.

```js
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue(!value);
  return [value, toggle];
}
```

```js
function Disclosure() {
  const [open, toggle] = useToggle(false);

  return html`
    <button @click=${toggle}>Toggle</button>
    ${open ? html`<p>Contenuto visibile</p>` : ''}
  `;
}
```

## Accesso allo slot dell'hook {#slot-hook}

`useHook` restituisce informazioni sul componente corrente e sull'indice dello slot. Puoi usarle per inizializzare una struttura una sola volta.

```js
function useStableValue(createValue) {
  const [component, hookIndex] = useHook();

  if (!component.hooks.hasOwnProperty(hookIndex)) {
    component.hooks[hookIndex] = {
      value: createValue(),
    };
  }

  return component.hooks[hookIndex].value;
}
```

Questo pattern è utile quando devi integrare oggetti esterni che non devono essere ricreati a ogni render.

## Subscription con cleanup {#subscription-cleanup}

Un hook avanzato spesso deve registrare una subscription e rimuoverla quando il componente viene disconnesso.

```js
const subscribers = new Set();

function useSharedClock() {
  const [component, hookIndex] = useHook();

  if (!component.hooks.hasOwnProperty(hookIndex)) {
    const update = () => component.update();
    subscribers.add(update);

    const oldDisconnectedCallback = component.onDisconnected;
    component.onDisconnected = () => {
      subscribers.delete(update);
      oldDisconnectedCallback();
    };

    component.hooks[hookIndex] = { value: new Date() };
  }

  return component.hooks[hookIndex].value;
}
```

## Hook interval {#hook-interval}

Esempio più concreto: un hook che avvia un interval una sola volta e lo pulisce quando il componente sparisce.

```js
function useInterval(callback, time) {
  const [component, hookIndex] = useHook();

  if (!component.hooks.hasOwnProperty(hookIndex)) {
    const intervalId = setInterval(callback, time);

    component.hooks[hookIndex] = {
      value: intervalId,
      cleanupFunction: () => clearInterval(intervalId),
    };
  }

  return component.hooks[hookIndex].value;
}
```

## Regole pratiche {#regole-pratiche}

- Mantieni `useHook` nascosto dentro hook riutilizzabili: non usarlo direttamente nei componenti applicativi.
- Non cambiare l'ordine degli hook tra render.
- Esegui cleanup per listener, interval e subscription.
- Documenta bene il comportamento: un hook basato su `useHook` è più potente, ma anche più facile da usare male.
