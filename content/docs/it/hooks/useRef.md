---
title: "useRef hook"
description: "Conserva valori mutabili tra render e accedi a nodi DOM reali."
metaTitle: "useRef - Hooks Wompo"
metaDescription: "Usa useRef per riferimenti DOM, timer, integrazioni esterne e valori non reattivi."
navTitle: "useRef"
order: 40011
---
## Cos'è una ref {#cos-e-una-ref}

`useRef` restituisce un oggetto stabile con una proprietà `current`. Puoi modificarla senza provocare un nuovo render.

```js
const inputRef = useRef();
```

È utile quando devi:

- leggere o chiamare metodi su un nodo DOM;
- salvare un id di `setInterval`;
- conservare una cache o un valore mutabile;
- integrare una libreria esterna che ha il proprio ciclo di vita.

## Ref DOM {#ref-dom}

Passa la ref all'attributo `ref`. Dopo il render, `current` contiene il nodo.

```js
function FocusInput() {
  const inputRef = useRef();

  return html`
    <input ref=${inputRef} />
    <button @click=${() => inputRef.current.focus()}>
      Focus
    </button>
  `;
}
```

## Timer {#timer}

Una ref è perfetta per salvare dati che non devono apparire nella UI.

```js
function Timer() {
  const [time, setTime] = useState(0);
  const intervalId = useRef(null);

  const start = () => {
    intervalId.current = setInterval(() => {
      setTime((value) => value + 1);
    }, 10);
  };

  const stop = () => {
    clearInterval(intervalId.current);
    intervalId.current = null;
  };

  return html`
    <button @click=${start} disabled=${intervalId.current !== null}>Start</button>
    <button @click=${stop} disabled=${intervalId.current === null}>Stop</button>
    <span>${(time / 100).toFixed(2)}</span>
  `;
}
```

<timer-example></timer-example>

## Valori non reattivi {#valori-non-reattivi}

Modificare `ref.current` non aggiorna il DOM. Se un valore deve comparire nella UI, usa `useState`. Se invece serve solo come supporto interno, usa `useRef`.

```js
function SubmitButton() {
  const lastSubmitAt = useRef(0);

  const submit = () => {
    const now = Date.now();
    if (now - lastSubmitAt.current < 1000) return;
    lastSubmitAt.current = now;
    save();
  };

  return html`<button @click=${submit}>Salva</button>`;
}
```

## Esempio: input password {#password}

Questo esempio usa una ref per leggere e modificare un input reale.

<password-revealer-example></password-revealer-example>

## Regole pratiche {#regole-pratiche}

- Usa `useRef` quando cambiare il valore non deve causare un render.
- Non leggere `ref.current` prima che il nodo sia montato.
- Pulisci timer e listener con `useEffect` quando il componente viene rimosso.
