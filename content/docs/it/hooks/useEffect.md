---
title: "useEffect hook"
description: "Esegui side effect dopo il render e sincronizza il componente con sistemi esterni."
metaTitle: "useEffect - Hooks Wompo"
metaDescription: "Usa useEffect per listener, timer, fetch client-side e integrazioni con API browser."
navTitle: "useEffect"
order: 40004
---
## Quando usarlo {#quando-usarlo}

`useEffect` serve per sincronizzare un componente con qualcosa che vive fuori dal render: `document.title`, event listener, timer, storage, librerie esterne o API browser.

```js
function PageTitle({ title }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return html`<h1>${title}</h1>`;
}
```

L'effect viene eseguito dopo il render. Se passi un array di dipendenze, Wompo lo riesegue solo quando cambia uno di quei valori.

## Dipendenze {#dipendenze}

```js
function UserPreview({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((response) => response.json())
      .then(setUser);
  }, [userId]);

  if (!user) return html`<p>Caricamento...</p>`;
  return html`<strong>${user.name}</strong>`;
}
```

Se `userId` cambia, l'effect parte di nuovo. Se non cambia, il componente può renderizzare altre volte senza ripetere la fetch.

## Cleanup {#cleanup}

Ritorna una funzione per rimuovere listener, timer o risorse aperte.

```js
function WindowSize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return html`<span>${width}px</span>`;
}
```

Senza cleanup, il listener resterebbe attivo anche dopo la rimozione del componente.

## Timer {#timer}

Quando usi timer, conserva l'id e cancellalo nel cleanup.

```js
function Clock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return html`<time>${now.toLocaleTimeString()}</time>`;
}
```

## Integrazioni esterne {#integrazioni-esterne}

Per librerie che modificano direttamente il DOM, usa `useRef` per puntare al nodo e inizializza tutto in un effect.

```js
function ChartBox({ data }) {
  const root = useRef();

  useEffect(() => {
    const chart = createChart(root.current, data);
    return () => chart.destroy();
  }, [data]);

  return html`<div ref=${root}></div>`;
}
```

## Errori comuni {#errori-comuni}

- Non usare `useEffect` per calcoli derivabili durante il render: calcola direttamente o usa `useMemo`.
- Non lasciare array di dipendenze incompleti.
- Non leggere `window` durante SSR fuori da un effect o da un'isola client-side.
- Non dimenticare il cleanup per listener, interval, observer e subscription.
