---
title: 'Installation'
description: 'Install Wompo with npm, pnpm, yarn, bun, CDN, import maps, or local files.'
metaTitle: 'Wompo - Installation'
metaDescription: 'Learn how to install Wompo in a modern web application, with or without a bundler.'
navTitle: 'Installation'
order: 200
---

## Choose a method {#choose-a-method}

The right setup depends on your stack:

- use a package manager when you work with Vite, Seawomp, Next, Astro, or any bundler;
- use an import map when you want a plain HTML page without a build step;
- use a CDN for prototypes, demos, and sandboxes;
- use a local file when versioning and caching must be fully controlled by your app.

Every setup exposes the same core APIs from the main entry point:

```js
import { defineWompo, html, useState } from 'wompo';
```

## Package managers {#package-managers}

With npm:

```sh
npm i wompo
```

With pnpm:

```sh
pnpm add wompo
```

With yarn:

```sh
yarn add wompo
```

With bun:

```sh
bun add wompo
```

After installing, define a component and register it as a custom element.

```js
import { defineWompo, html, useState } from 'wompo';

function LikeButton({ initial = 0 }) {
	const [likes, setLikes] = useState(initial);

	return html` <button @click=${() => setLikes(likes + 1)}>Likes: ${likes}</button> `;
}

defineWompo(LikeButton);
```

```html
<like-button initial="12"></like-button>
```

## Entry points {#entry-points}

For client-side components, import from `wompo`.

```js
import { defineWompo, html } from 'wompo';
```

For SSR, import from the `wompo/ssr` subpath.

```js
import { renderToString, renderToStream } from 'wompo/ssr';
```

For browser hydration, import the dedicated runtime.

```js
import { hydrate } from 'wompo/hydrate';
```

## Import map {#import-map}

If you do not want a bundler, map the package directly in the browser.

```html
<script type="importmap">
	{
		"imports": {
			"wompo": "/node_modules/wompo/dist/wompo.js",
			"wompo/ssr": "/node_modules/wompo/dist/ssr/index.js",
			"wompo/hydrate": "/node_modules/wompo/dist/wompo/hydrate.js"
		}
	}
</script>
```

Then use normal module imports.

```html
<script type="module">
	import { defineWompo, html } from 'wompo';

	function HelloBox() {
		return html`<strong>Hello from Wompo</strong>`;
	}

	defineWompo(HelloBox);
</script>
```

## CDN {#cdn}

For prototypes and demos, use jsDelivr with a pinned version.

```html
<script type="module">
	import { defineWompo, html } from 'https://cdn.jsdelivr.net/npm/wompo@2.0.4';

	function DemoBadge() {
		return html`<span>Powered by Wompo</span>`;
	}

	defineWompo(DemoBadge);
</script>
```

You can also map the CDN URL to `wompo`.

```html
<script type="importmap">
	{
		"imports": {
			"wompo": "https://cdn.jsdelivr.net/npm/wompo@2.0.4"
		}
	}
</script>
```

## Local file {#local-file}

If you download the build and serve it from your project, point to the files in `dist`.

```html
<script type="module">
	import * as wompo from '/vendor/wompo/dist/wompo.js';

	window.wompo = wompo;
</script>
```

:::warning
For production, avoid unpinned CDN URLs. Pin a version or serve Wompo from your own domain so deployment, caching, and rollback stay predictable.
:::
