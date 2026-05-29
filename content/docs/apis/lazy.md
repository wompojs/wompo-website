---
title: "lazy API"
description: "How to use the lazy function to dynamically import a component only when it is rendered."
metaTitle: "lazy API - Wompo APIs"
metaDescription: "Use lazy to split component code and render dynamically imported components with Suspense."
navTitle: "lazy"
order: 60008
---
## Dynamic import {#dynamic-import}

`lazy` loads a component only when Wompo needs to render it.

```js
import { lazy } from 'wompo';

const UserChart = lazy(() => import('./UserChart.js'));
```

The imported file must export the component as `default`.

```js
// UserChart.js
import { defineWompo, html } from 'wompo';

function UserChart() {
  return html`<section>Chart content</section>`;
}

defineWompo(UserChart);
export default UserChart;
```

Render the lazy component like any other dynamic Wompo component.

```js
function Dashboard() {
  return html`
    <section>
      <${UserChart} />
    </section>
  `;
}
```

## Suspense fallback {#suspense-fallback}

Pair `lazy` with `Suspense` when you want a loading UI while the chunk is being imported.

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

## Simulating a slow component {#simulating-a-slow-component}

Local development often loads chunks too quickly to see the fallback. You can wrap the import in a small delay while testing.

```js
function delayImport(promise) {
  return new Promise((resolve) => setTimeout(resolve, 800))
    .then(() => promise);
}

const LazySettings = lazy(() => delayImport(import('./SettingsPanel.js')));
```

## Common mistakes {#common-mistakes}

Do not return a named export unless you convert it to a default export shape.

```js
// Wrong if the file does not export default.
const Chart = lazy(() => import('./Chart.js'));
```

```js
// Correct when the component is exported by name.
const Chart = lazy(() =>
  import('./Chart.js').then((module) => ({
    default: module.Chart,
  })),
);
```
