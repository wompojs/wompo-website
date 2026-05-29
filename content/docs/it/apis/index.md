---
title: "API"
description: "Reference delle funzioni, costanti e tipi esposti da Wompo."
metaTitle: "API Wompo"
metaDescription: "Consulta le API disponibili in Wompo."
navTitle: "API"
order: 600
---
## Funzioni {#funzioni}

Wompo espone un set compatto di funzioni per renderizzare template, registrare componenti, condividere dati e integrarsi con il DOM:

- <a href="/docs/apis/attrs">attrs</a>: applica attributi, eventi e proprietà da un oggetto.
- <a href="/docs/apis/createContext">createContext</a>: crea context condivisi tra componenti discendenti.
- <a href="/docs/apis/createPortal">createPortal</a>: renderizza template in un altro nodo DOM.
- <a href="/docs/apis/defineWompo">defineWompo</a>: registra una funzione come Web Component.
- <a href="/docs/apis/dynamic-tags">Dynamic Tags</a>: sceglie un tag o un componente a runtime.
- <a href="/docs/apis/element">Element API</a>: controlla l'istanza DOM del componente.
- <a href="/docs/apis/html">html</a>: crea template ritornati dai componenti.
- <a href="/docs/apis/lazy">lazy</a>: carica componenti in modo asincrono.
- <a href="/docs/apis/unsafelyRenderString">unsafelyRenderString</a>: renderizza stringhe HTML fidate.

## Costanti {#costanti}

- <a href="/docs/apis/registeredComponents">registeredComponents</a>: mappa dei componenti registrati.
- <a href="/docs/apis/wompoDefaultOptions">wompoDefaultOptions</a>: opzioni predefinite di registrazione.

## Tipi principali {#tipi-principali}

`RenderHtml` e' il valore ritornato da `html`.

```ts
interface RenderHtml {
  parts: TemplateStringsArray;
  values: any[];
  _$wompHtml: true;
}
```

`WompoProps` contiene le props disponibili su ogni componente.

```ts
interface WompoProps {
  children?: WompoChildren;
  styles?: Record<string, string>;
  ['wc-perf']?: boolean;
  style?: string | Partial<CSSStyleDeclaration> | object;
  ref?: RefHook<any>;
  id?: string;
  class?: string;
}
```

`WompoComponentOptions` e' il secondo argomento di `defineWompo`.

```ts
interface WompoComponentOptions {
  name?: string;
  shadow?: boolean;
  cssModule?: boolean;
  island?: 'load' | 'idle' | 'visible';
}
```

`WompoComponent` e' il tipo funzione di un componente Wompo.

```ts
interface WompoComponent<Props extends WompoProps = WompoProps> {
  (props: Props): RenderHtml;
  css?: string;
  componentName?: string;
  _$wompF?: true;
  class?: WompoElementClass<Props>;
}
```

`WompoElement` rappresenta l'istanza custom element nel DOM. Usalo per ref tipate o metodi esposti con `useExposed`.

```ts
type WompoElement<Props extends WompoProps = WompoProps, Exposed = {}> =
  HTMLElement & {
    props: Props;
  } & Exposed;
```

`LazyCallbackResult` e `LazyResult` descrivono i valori usati da `lazy`.

```ts
type LazyCallbackResult = Promise<{ default: WompoComponent }>;

type LazyResult = {
  (): Promise<WompoComponent<WompoProps>>;
  _$wompLazy: boolean;
};
```
