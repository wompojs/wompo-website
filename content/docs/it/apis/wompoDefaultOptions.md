---
title: "wompoDefaultOptions"
description: "Personalizza le opzioni predefinite usate dai componenti Wompo."
metaTitle: "wompoDefaultOptions API - API Wompo"
metaDescription: "Modifica le opzioni predefinite dei componenti Wompo."
navTitle: "wompoDefaultOptions"
order: 60011
---
## Opzioni globali {#opzioni-globali}

```js
import { wompoDefaultOptions } from 'wompo';

wompoDefaultOptions.cssModule = true;
wompoDefaultOptions.shadow = false;
```

Le opzioni globali influenzano i componenti registrati dopo la modifica. Per scelte locali, preferisci le opzioni di `defineWompo`.

```js
defineWompo(MyWidget, {
  name: 'my-widget',
  shadow: true
});
```
