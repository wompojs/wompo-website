// Local JSX runtime for the wompo-docs site.
// Wompo 2.0.0 no longer ships `wompo/jsx-runtime` from the published package, but the docs
// codebase itself is still authored in JSX. This file is a minimal, dependency-free shim that
// produces the same `RenderHtml` objects the `html` tagged template would, so the compiled
// `jsx(...)` calls keep working.
//
// Mirrors the logic of the legacy `jsx-runtime.ts` from the wompo source.

const wJsx = (Element, attributes) => {
	const template = {
		parts: [],
		values: [],
		_$wompoHtml: true,
	};
	let tagName = Element;

	if (Element._$wompoLazy) {
		tagName = '';
		template.parts.push('<');
		template.values.push(Element);
	} else if (Element._$wompoF) {
		tagName = Element.componentName;
	} else if (Element === Fragment) {
		tagName = '';
	}
	let staticHtml = tagName ? `<${tagName}` : '';
	const attrNames = Object.keys(attributes);
	for (const attrName of attrNames) {
		if (attrName === 'children') break;
		const isEvent = attrName.match(/^on([A-Z].*)/);
		if (isEvent) {
			staticHtml += ` @${isEvent[1].toLowerCase()}=`;
		} else {
			staticHtml += ` ${attrName}=`;
		}
		template.parts.push(staticHtml);
		template.values.push(attributes[attrName]);
		staticHtml = '';
	}
	if (['br', 'img'].includes(tagName)) {
		staticHtml += '/>';
		template.parts.push(staticHtml);
		return template;
	}
	staticHtml += tagName || Element._$wompoLazy ? '>' : '';
	template.parts.push(staticHtml);
	const children = attributes.children;
	if (children && children.parts) {
		if (attributes.children.parts) {
			template.values.push(false);
			template.parts.push(...attributes.children.parts);
			template.values.push(...attributes.children.values);
			template.values.push(false);
		} else if (Array.isArray(attributes.children)) {
			for (const part of attributes.children) {
				template.values.push(false);
				template.parts.push(...part.parts);
				template.values.push(...part.values);
				template.values.push(false);
			}
		}
	} else {
		template.values.push(children);
	}
	staticHtml = tagName ? `</${tagName}>` : '';
	if (Element._$wompoLazy) {
		staticHtml = `</wc-wc>`;
	}
	template.parts.push(staticHtml);
	return template;
};

export const Fragment = 'wc-fragment';
export const jsx = wJsx;
export const jsxs = jsx;
export const jsxDEV = jsx;
