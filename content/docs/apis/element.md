---
title: 'Element API'
description: 'How to use the Element API to manually control a component and call methods on it.'
metaTitle: 'Element API - Wompo APIs'
metaDescription: 'Check which functions and data you can access in your custom component DOM element.'
navTitle: 'Element API'
order: 60006
---

## Description {#description}

<p>Every Wompo Component will be rendered in the DOM as a Web Component, so it'll be accessible by your scripts. In this guide we will explore what methods you can call and which properties you can access.</p>

## Methods {#methods}

<p>Every element exposes the followig methods:

<ul>
<li><code>&lt;b&gt;requestRender()&lt;/b&gt;</code> - If called, it will start the rendering process of the component.</li>
<li><code>&lt;b&gt;onDisconnected()&lt;/b&gt;</code> - Should not be called directly: it's a callback function that you can override, and will be executed whenever the component is disconnected from the DOM.</li>
<li><code>&lt;b&gt;updateProp(propName, newValue)&lt;/b&gt;</code> - It will update a <b>prop</b> of the component and automatically ask to re-render it if the new value differs from the previous one. The first parameter is the name of the prop you want to update, and the second is the new value you want to set on it.</li>
</ul></p>

:::info
If you used the <a href="/docs/hooks/useExposed">useExposed</a> hook inside of your component, the component will also have the methods you exposed.
:::

## Properties {#properties}

<p>Every element exposes the followig properties:

<ul>
<li><code>&lt;b&gt;props&lt;/b&gt;</code> - The object containing all the props of the component.</li>
<li><code>&lt;b&gt;hooks&lt;/b&gt;</code> - The list of hooks that the component has. You can access this property but we strongly recommend to <b>not modify</b> any of them. It is exposed only so that you can <b>add</b> your own hooks. See the <a href="/docs/hooks/useHook">useHook</a> hook to know more.</li>
</ul></p>

:::info
If you used the <a href="/docs/hooks/useExposed">useExposed</a> hook inside of your component, the component will also have the properties you exposed.
:::
