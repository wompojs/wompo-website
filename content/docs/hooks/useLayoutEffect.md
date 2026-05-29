---
title: 'useLayoutEffect hook'
description: 'How to use the useLayoutEffect hook to create layout effect.'
metaTitle: 'useLayoutEffect - Wompo hooks'
metaDescription: 'The useLayoutEffect hook allows to synchronously execute a callback on the first render or whenever one of its dependencies changes.'
navTitle: 'useLayoutEffect'
order: 40008
---

## Description {#description}

<p>The <code>useLayoutEffect</code> hook works exactly like the <a href="/docs/hooks/useEffect">useEffect</a> hook, with only one exception: unlike useEffect, it works <b>synchronously</b>, meaning that the effect will be executed immediately after the render operations, and not when the browser's call stack is empty. This is quite useful when you want to see instant changes in your UI when something happens in your component.</p>

:::info
<b>Note:</b> The fact that that the useLayoutEffect callback runs synchronously doesn't mean it will be executed "inline". The callback function will still be executed when the component already finished rendering a first time.
:::

:::warning
Using the useLayoutEffect hook will make your component take more time to render and will delay the moment where you can see visual changes in your component, especially with heavy operations. Use it only when strictly necessary and with caution.
:::

## Usage {#usage}

```js
useLayoutEffect(effectFn, dependencies);
```

<p>The <code>useLayoutEffect</code> hook accepts an effect callback function and a list of dependencies. The effect function will be executed after the first render and whenever one of the listed dependencies changes.</p>

<p>For more, check the <a href="/docs/hooks/useEffect">useEffect</a> hook documentation.</p>
