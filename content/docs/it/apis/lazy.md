---
title: "lazy API"
description: "Carica componenti in modo asincrono solo quando vengono usati."
metaTitle: "lazy API - API Wompo"
metaDescription: "Usa lazy per import dinamici e code splitting dei componenti."
navTitle: "lazy"
order: 60008
---
## Import dinamico {#import-dinamico}

`lazy` carica un componente solo quando Wompo deve renderizzarlo.

```js
import { lazy } from 'wompo';

const UserChart = lazy(() => import('./UserChart.js'));
```

Il file importato deve esportare il componente come `default`.

```js
// UserChart.js
import { defineWompo, html } from 'wompo';

function UserChart() {
  return html`<section>Chart content</section>`;
}

defineWompo(UserChart);
export default UserChart;
```

Renderizza il componente lazy come qualunque altro componente dinamico Wompo.

```js
function Dashboard() {
  return html`
    <section>
      <${UserChart} />
    </section>
  `;
}
```

## Fallback con Suspense {#fallback-con-suspense}

Abbina `lazy` a `Suspense` quando vuoi mostrare una UI durante l'import del chunk.

```js
import { Suspense, html, lazy } from 'wompo';

const UserChart = lazy(() => import('./UserChart.js'));

function Dashboard() {
  return html`
    <${Suspense} fallback=${html`<p>Loading chart...</p>`}>
      <${UserChart} />
    </${Suspense}>
  `;
}
```

<lazy-suspense-example></lazy-suspense-example>

## Simulare un componente lento {#simulare-un-componente-lento}

In sviluppo locale i chunk spesso si caricano troppo in fretta per vedere il fallback. Per testarlo, puoi avvolgere l'import in un piccolo delay.

```js
function delayImport(promise) {
  return new Promise((resolve) => setTimeout(resolve, 800))
    .then(() => promise);
}

const LazySettings = lazy(() => delayImport(import('./SettingsPanel.js')));
```

## Errori comuni {#errori-comuni}

Non ritornare una named export se non la converti nella forma con `default`.

```js
// Sbagliato se il file non esporta default.
const Chart = lazy(() => import('./Chart.js'));
```

```js
// Corretto quando il componente e' esportato per nome.
const Chart = lazy(() =>
  import('./Chart.js').then((module) => ({
    default: module.Chart,
  })),
);
```
