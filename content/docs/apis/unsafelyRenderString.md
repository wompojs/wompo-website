---
title: 'unsafelyRenderString API'
description: 'How to use the unsafelyRenderString function to render a string variable that includes html code.'
metaTitle: 'unsafelyRenderString API - Wompo APIs'
metaDescription: "Learn how you can avoid Wompo's automatic HTML escaping."
navTitle: 'unsafelyRenderString'
order: 60010
---

## Description {#description}

<p>The <code>unsafelyRenderString</code> function is used to render a string variable that includes html code. This is needed because by default, for security reasons, Wompo escapes HTML code that is included in string variables included in a template. To avoid this automatic escaping, you should use the <code>unsafelyRenderString</code> function. <br /></p>

## Usage {#usage}

```js
const escaped = unsafelyRenderString(variable);
```

<p>The <code>unsafelyRenderString</code> function accepts one single argument, which is the string variable that will be escaped.</p>

:::warning
Only use this function when you are absolutely sure that the variable doesnt include dangerous code. Avoid this approach when your variable arrives from the final user's input.
:::
