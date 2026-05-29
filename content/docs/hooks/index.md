---
title: 'Hooks'
description: 'What are hooks: how and when to use them.'
metaTitle: 'Wompo Hooks'
metaDescription: 'Wompo has different built-in hooks that you can use to add specific functionalities in your components.'
navTitle: 'Hooks'
order: 400
---

## What are hooks? {#what-are-hooks}

<p>Hooks are helper functions that let you add specific functionalities in your Wompo components. This functions will "hook" into the component so that they have access to the whole HTML instance and operate adding functionalities to it. More specifically, they allow to:

<ul>
<li>Make your component dynamic</li>
<li>Create callbacks that will be executed on specific cases</li>
<li>Keep a variable's value stable across renders</li>
<li>Get a specific <b>Context</b></li>
<li>Optimize performances by avoiding useless re-renderings</li>
</ul>

Hooks work like <b>import statements</b> inside a component. This implies that:

<ol>
<li>Like import statements, they <b>must</b> be declared on top of the component, in the first lines, before any operation is performed.</li>
<li>They cannot be conditional or executed inside loops.</li>
</ol>

If these conditions are not respected, the component might have unexpected behaviors.</p>

<p>Wompo offers a good variety of hooks, but you are also completely free to create your own very easily. <br /></p>

## State hooks {#state-hooks}

<p>State hooks are what allow to make a component dynamic and cause a re-render of it, so that you can see visual updates in your component. To do that, Wompo offers the following hooks:

<ul>
<li><a href="/docs/hooks/useState">useState</a> - Probably the most common hook you will use: creates a stateful variable and a setter function that will cause a re-render of the component when called (if the new value differs from the old one).</li>
<li><a href="/docs/hooks/useReducer">useReducer</a> - For <b>Redux</b> fans. This hook allows to elegantly handle the state of a component using a <b>reducer</b> to handle all the operations to alter the state and a <b>dispatch</b> function to set the new state.</li>
</ul></p>

## Effect hooks {#effect-hooks}

<p>Effect hooks are what allow to execute a specific <b>callback</b> when one of your <b>dependencies</b> changes, or simply on the first (or on every) render. This dependencies are simply an array of values. The effect hooks are:

<ul>
<li><a href="/docs/hooks/useEffect">useEffect</a> - After <b>useState</b>, the probably second most common hook you will use: will execute the callback after a render if any of its dependencies changed. The callback will be executed <b>Asynchronously</b>.</li>
<li><a href="/docs/hooks/useLayoutEffect">useLayoutEffect</a> - It's the same as the <b>useEffect</b> hook. The only difference is that the callback is executed <b>Synchronously</b> immediately after a render, before you can see visual changes. The <i>useEffect</i> hook is preferred, because it'll not saturate the JS call stack.</li>
</ul></p>

## Performance hooks {#performance-hooks}

<p>Performance hooks let you skip useless operations across renders, or keep a value stable between renders so it's not re-initialized every time, allowing to optimize the component by avoiding unnecessary re-renderings. <br />Performance hooks are:

<ul>
<li><a href="/docs/hooks/useRef">useRef</a> - It'll keep a value stable across renders, by always returning the last saved value. It can optionally also be used to reference a node in the DOM.</li>
<li><a href="/docs/hooks/useCallback">useCallback</a> - The useCallback hook will take a function and save it so that it's not re-created on every render. This is useful if you're using a function as an attribute value of some other components, because the attribute will always have the same value (remember that in Javascript two functions are never equal, unless a function is compared to itself).</li>
<li><a href="/docs/hooks/useMemo">useMemo</a> - This hook will let you execute a callback function and elaborate its result only when a dependency changes, rather than on every render.</li>
</ul></p>

## Context hooks {#context-hooks}

<p>A Context hook will let you <b>obtain a value provided by another parent element</b>, more specifically, a <code>Context.Provider</code> element. There is only one context hook:

<ul>
<li><a href="/docs/hooks/useContext">useContext</a> - Will return the value provided by the closest parent <code>Context.Provider</code> of the specified context. If there is not one, the default value of the context will be returned instead. The component that uses this hook will automatically re-render whenever the value provided by the provider changes.</li>
</ul></p>

## Helper hooks {#helper-hooks}

<p>Helper hooks are simple hooks that solve common problems. The currently available helper hooks are:

<ul>
<li><a href="/docs/hooks/useSelf">useSelf</a> - Will return the HTML instance of the custom component.</li>
<li><a href="/docs/hooks/useId">useId</a> - Will return a unique string in the format <code>:w&lt;number&gt;:</code>. The ID will not change on every re-render. This is useful when you want to use IDs for node elements inside of a component. Common use cases are for inputs, labels, and accessibility.</li>
<li><a href="/docs/hooks/useExposed">useExposed</a> - The useExposed hook will let you expose some values and/or functions in the comonent's instance of the DOM. This allows, for example, to select a DOM node and call a method on it. Can be useful to <b>Expose the state</b>. Commonly used in combination with the <i>useRef</i> hook.</li>
<li><a href="/docs/hooks/useAsync">useAsync</a> - This hook will take care of asynchronous operations in the component by executing a callback on first render and when one of its dependencies changes. This hooks integrates with the <a href="/docs/components/suspense">Suspense</a> component, allowing to easily handle the loading state of the component.</li>
<li><a href="/docs/hooks/useHook">useHook</a> - The useHook is a special hook used to create your own advanced hooks. Should only be used if the current hooks are not enough to satisfy your needs.</li>
</ul></p>
