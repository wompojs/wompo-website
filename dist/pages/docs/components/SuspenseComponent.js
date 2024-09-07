import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "wompo/jsx-runtime";
import { defineWompo } from 'wompo';
import getPageLayout from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
import { Link } from 'wompo-router';
import LazySuspenseExample from '../../../examples/LazySuspenseExample.js';
const content = {
    title: 'Suspense',
    description: (_jsxs(_Fragment, { children: ["How to use the ", _jsx("code", { children: "Suspense" }), " component to show a fallback UI while at least one of its children is still rendering its content."] })),
    sections: [
        {
            title: 'Description',
            id: 'description',
            content: (_jsx(_Fragment, { children: _jsxs("p", { children: ["The ", _jsx("code", { children: "Suspense" }), " component is a special Wompo component that allows to show a", ' ', _jsx("b", { children: "fallback" }), " UI while one or more of the children are loading. This can be used for:", _jsxs("ul", { children: [_jsxs("li", { children: ["Components that use the ", _jsx(Link, { to: '/docs/hooks/useAsync', children: "useAsync" }), " hook"] }), _jsxs("li", { children: ["Components that are imported through the ", _jsx(Link, { to: '/docs/apis/lazy', children: "lazy" }), ' ', "function"] })] })] }) })),
        },
        {
            title: 'Usage',
            id: 'usage',
            content: (_jsxs(_Fragment, { children: [_jsx(Code, { code: `
							<Suspense fallback={html\`\`}>
								{children}
							</Suspense>
						`, language: 'js' }), _jsxs("p", { children: ["The ", _jsx("code", { children: "Suspense" }), " component accepts a single prop: ", _jsx("b", { children: "fallback" }), ". The fallback prop must be the result of the ", _jsx(Link, { to: '/docs/apis/html', children: "html" }), " template function. This prop is ", _jsx("b", { children: "required" }), "."] })] })),
        },
        {
            title: 'Example: lazy component',
            id: 'lazy-component-example',
            content: (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["This example is the same used in the ", _jsx(Link, { to: '/docs/apis/lazy', children: "lazy" }), ' ', "documentation: thanks to the lazy function we will render a component dynamically imported and delayed to simulate a super big file that is requested from the server (or simply a slow network)."] }), _jsx(Code, { code: `
              import { lazy, html, defineWompo, Suspense } from 'wompo';

              function simulateBigComponent(promise) {
                return new Promise((resolve) => {
                  setTimeout(resolve, 5000);
                }).then(() => promise);
              }

              const LazyComponent = lazy(() => simulateBigComponent(import('./custom-component.js')));

              function App(){
                return html\`
                  <p>This content is static. Below me the lazy component will be rendered!</p>
                  <\${Suspense} fallback=\${html\`<i>Loading...</i>\`}>
                    <\${LazyComponent}>I should be blue...</\${LazyComponent}>
                  </\${Suspense}>
                \`;
              }

              defineWompo(App);
						`, language: 'js' }), "The code of the component imported from the ", _jsx("code", { children: "./custom-component.js" }), " path will be the following:", _jsx(Code, { code: `
              import { html, defineWompo } from 'wompo';

              export default function LazyComponent({ children }){
                return html\`
                  <div style="font-size: 20px; color: blue;">
                    \${children}<br />
                    I was lazy loaded!
                  </div>
                \`;
              }

              defineWompo(LazyComponent);
						`, language: 'js' }), _jsxs("p", { children: ["Result (you probably will have to reload the page and scroll here to see it):", _jsx(LazySuspenseExample, {})] })] })),
        },
    ],
};
export default function SuspenseComponent() {
    return getPageLayout(content);
}
defineWompo(SuspenseComponent, {
    name: 'suspense-component-page',
});
