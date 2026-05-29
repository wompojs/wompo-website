---
title: 'createPortal API'
description: 'How to use the createPortal function to attach some HTML to another DOM element that is not inside of the component.'
metaTitle: 'createPortal - Wompo APIs'
metaDescription: 'The createPortal function allows to render custom HTML in another area of the DOM.'
navTitle: 'createPortal'
order: 60003
---

## Description {#description}

<p>The <code>createPortal</code> function allows to attach a portion of your HTML that should be rendered inside of the component in another part of the DOM (for example, in the body). This part of the HTML will still listen to changes in your component and will be removed when the parent component is also removed.</p>

## Usage {#usage}

```js
const toRender = createPortal(yourHtml, yourDomNode);
```

<p>The function accepts two parameters: the first is your html to be rendered, while the second is the HTML DOM node on where you want your custom html to be attached. <br />Simple example:</p>

```js
import { createPortal } from 'wompo';

function App() {
	return html`
		<input class="custom-select" />
		${createPortal(
			html`
				<ul class="menu">
					<li>Option 1</li>
					<li>Option 2</li>
					<li>Option 3</li>
				</ul>
			`,
			document.body,
		)}
	`;
}
```

<p>In the above example, we want to create a custom select element, but we want to attach the custom menu with the select's options in the body, so that wherever the custom select is used, the menu will always be displayed in the correct position (which will be fixed in the screen). For this reason, we used the `createPortal` function.</p>
