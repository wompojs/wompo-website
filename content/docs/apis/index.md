---
title: "APIs"
description: "A collection of resources that Wompo exposes to add extra functionalities or simply to help the developer."
metaTitle: "Wompo APIs"
metaDescription: "Check which APIs are available when using Wompo."
navTitle: "APIs"
order: 600
---
## Functions {#functions}

Wompo exposes a small set of functions for rendering, registering components, sharing data, and integrating with the DOM:

- <a href="/docs/apis/attrs">attrs</a>: spread attributes, events, and properties from an object.
- <a href="/docs/apis/createContext">createContext</a>: create context values shared with descendant components.
- <a href="/docs/apis/createPortal">createPortal</a>: render a template into another DOM node.
- <a href="/docs/apis/defineWompo">defineWompo</a>: register a function as a Web Component.
- <a href="/docs/apis/dynamic-tags">Dynamic Tags</a>: choose an element or component tag at runtime.
- <a href="/docs/apis/element">Element API</a>: interact with the DOM instance of a Wompo component.
- <a href="/docs/apis/html">html</a>: build templates returned by components.
- <a href="/docs/apis/lazy">lazy</a>: load a component asynchronously.
- <a href="/docs/apis/unsafelyRenderString">unsafelyRenderString</a>: intentionally render trusted HTML strings.

## Constants {#constants}

- <a href="/docs/apis/registeredComponents">registeredComponents</a>: map of registered component names.
- <a href="/docs/apis/wompoDefaultOptions">wompoDefaultOptions</a>: default component registration options.

## Core types {#types}

`RenderHtml` is the value returned by `html`.

```ts
interface RenderHtml {
  parts: TemplateStringsArray;
  values: any[];
  _$wompHtml: true;
}
```

`WompoProps` contains the props that every component can receive.

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

`WompoComponentOptions` is the second argument accepted by `defineWompo`.

```ts
interface WompoComponentOptions {
  name?: string;
  shadow?: boolean;
  cssModule?: boolean;
  island?: 'load' | 'idle' | 'visible';
}
```

`WompoComponent` is the function type for a Wompo component.

```ts
interface WompoComponent<Props extends WompoProps = WompoProps> {
  (props: Props): RenderHtml;
  css?: string;
  componentName?: string;
  _$wompF?: true;
  class?: WompoElementClass<Props>;
}
```

`WompoElement` represents the custom element instance created in the DOM. Use it when you need typed refs or methods exposed with `useExposed`.

```ts
type WompoElement<Props extends WompoProps = WompoProps, Exposed = {}> =
  HTMLElement & {
    props: Props;
  } & Exposed;
```

`LazyCallbackResult` and `LazyResult` describe the values used by `lazy`.

```ts
type LazyCallbackResult = Promise<{ default: WompoComponent }>;

type LazyResult = {
  (): Promise<WompoComponent<WompoProps>>;
  _$wompLazy: boolean;
};
```
