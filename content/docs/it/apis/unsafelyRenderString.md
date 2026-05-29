---
title: "unsafelyRenderString API"
description: "Renderizza una stringa HTML senza escaping automatico."
metaTitle: "unsafelyRenderString API - API Wompo"
metaDescription: "Usa unsafelyRenderString quando devi inserire HTML già sanitizzato."
navTitle: "unsafelyRenderString"
order: 60010
---
## Uso {#uso}

```js
import { html, unsafelyRenderString } from 'wompo';

function MarkdownPreview({ htmlString }) {
  return html`<article>${unsafelyRenderString(htmlString)}</article>`;
}
```

:::danger
Usala solo con HTML sanitizzato o generato da sorgenti fidate. Inserire input utente non filtrato può causare XSS.
:::
