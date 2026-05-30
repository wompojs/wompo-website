---
title: 'Installazione'
description: 'Installa Wompo con npm, pnpm, yarn, bun, CDN, import map o file locale.'
metaTitle: 'Wompo - Installazione'
metaDescription: 'Scopri come installare Wompo in una applicazione web moderna, con o senza bundler.'
navTitle: 'Installazione'
order: 200
---

## Scegli il metodo {#scegli-il-metodo}

Il modo migliore dipende dallo stack:

- usa un package manager se lavori con Vite, Seawomp, Next, Astro o un bundler;
- usa una import map se vuoi una pagina HTML senza build step;
- usa un CDN per prototipi, demo e sandbox;
- usa un file locale se devi controllare completamente versione e caching.

In tutti i casi l'entry point principale esporta le API più comuni:

```js
import { defineWompo, html, useState } from 'wompo';
```

## Package manager {#package-manager}

Con npm:

```sh
npm i wompo
```

Con pnpm:

```sh
pnpm add wompo
```

Con yarn:

```sh
yarn add wompo
```

Con bun:

```sh
bun add wompo
```

Dopo l'installazione puoi creare un componente e registrarlo come custom element.

```js
import { defineWompo, html, useState } from 'wompo';

function LikeButton({ initial = 0 }) {
	const [likes, setLikes] = useState(initial);

	return html` <button @click=${() => setLikes(likes + 1)}>Like: ${likes}</button> `;
}

defineWompo(LikeButton);
```

```html
<like-button initial="12"></like-button>
```

## Entry point disponibili {#entry-point}

Per un'app client-side importa da `wompo`.

```js
import { defineWompo, html } from 'wompo';
```

Per SSR importa dal sotto-percorso `wompo/ssr`.

```js
import { renderToString, renderToStream } from 'wompo/ssr';
```

Per hydration lato browser importa il runtime dedicato.

```js
import { hydrate } from 'wompo/hydrate';
```

## Import map {#import-map}

Se non vuoi usare un bundler, puoi far risolvere il pacchetto direttamente al browser.

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

Da quel momento puoi usare import standard.

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

Per demo e prototipi puoi usare jsDelivr con una versione fissata.

```html
<script type="module">
	import { defineWompo, html } from 'https://cdn.jsdelivr.net/npm/wompo@2.0.2';

	function DemoBadge() {
		return html`<span>Powered by Wompo</span>`;
	}

	defineWompo(DemoBadge);
</script>
```

Puoi anche mappare il CDN a `wompo` con import map.

```html
<script type="importmap">
	{
		"imports": {
			"wompo": "https://cdn.jsdelivr.net/npm/wompo@2.0.2"
		}
	}
</script>
```

## File locale {#file-locale}

Se scarichi la build e la servi dal tuo progetto, punta ai file nella cartella `dist`.

```html
<script type="module">
	import * as wompo from '/vendor/wompo/dist/wompo.js';

	window.wompo = wompo;
</script>
```

:::warning
In produzione evita URL CDN senza versione. Fissa sempre la versione o servi Wompo dal tuo dominio, così deployment, cache e rollback restano prevedibili.
:::
