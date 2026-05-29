---
title: 'wompoDefaultOptions'
description: 'How to customize the default options of Wompo components to satisfy your exigencies.'
metaTitle: 'wompDefaultOptions API - Wompo APIs'
metaDescription: "Learn how you can modify Wompo's default options for your custom components."
navTitle: 'wompDefaultOptions'
order: 60011
---

## Description {#description}

<p>Wompo exposes a <code>wompDefaultOptions</code> object that is used to get the default values to use as the second parameter of the <a href="/docs/apis/defineWompo">defineWompo</a> function. <br />The options you can modify are:

<ul>
<li><b><code>shadow</code></b> - Default "false".</li>
<li><b><code>cssModule</code></b> - Default "true".</li>
</ul>

To know more about these options see the documentation about the <a href="/docs/apis/defineWompo#usage">defineWompo</a> function.</p>

## Example {#example: default shadow}

<p>One common use case is to make your components use the Shadow DOM by default. To get this result, you should modify the default option <b>before you define any other component</b>. Components rendered <i>before</i> you actually modified the default options will still have the old options applied.</p>

```js
import { wompDefaultOptions } from 'wompo';

wompDefaultOptions.shadow = true;
```
