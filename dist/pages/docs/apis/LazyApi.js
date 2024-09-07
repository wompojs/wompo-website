import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "wompo/jsx-runtime";
import { defineWompo } from 'wompo';
import getPageLayout from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
import { Link } from 'wompo-router';
import Note from '../../../components/Note.js';
import LazyExample from '../../../examples/LazyExample.js';
import LazySuspenseExample from '../../../examples/LazySuspenseExample.js';
const content = {
    title: 'lazy API',
    description: (_jsxs(_Fragment, { children: ["How to use the ", _jsx("code", { children: "lazy" }), " function to asynchronously load a component only when it is used."] })),
    sections: [
        {
            title: 'Description',
            id: 'description',
            content: (_jsx(_Fragment, { children: _jsxs("p", { children: ["The ", _jsx("code", { children: "lazy" }), " function will dynamically import a component only if it is actually used and rendered. Using the lazy function can", ' ', _jsx("b", { children: "improve your site's performance" }), " and decrease the number of network requests, other then reducing the initial payload.", _jsx("br", {}), "You can also combine the ", _jsx("code", { children: "lazy" }), " function with the use of the", ' ', _jsx(Link, { to: '/docs/components/suspense', children: "Suspense" }), " component to display a rendering screen while the component is being loaded. Once the lazy component rendered for the first time, the result is cached so that multiple requests will not be performed if the lazy component is used multiple times.", _jsx("br", {}), "The imported file ", _jsx("b", { children: "must have a default export" }), ", and it is what will be taken to know which component to render."] }) })),
        },
        {
            title: 'Usage',
            id: 'usage',
            content: (_jsxs(_Fragment, { children: [_jsx(Code, { code: `
							const LazyComponent = lazy(() => import(componentPath));
						`, language: 'js' }), _jsxs("p", { children: ["The ", _jsx("code", { children: "lazy" }), " function accepts one single argument, which is the callback that will ask to import the component. Be careful:"] }), _jsx(Code, { code: `
              // ❌ This will immediately import the component (and will not work)!
              lazy(import(componentPath);

              // ❌ Will not work
              lazy(componentPath);

              // ✅ The correct way
							lazy(() => import(componentPath));
						`, language: 'js' }), _jsxs(Note, { severity: 'info', children: ["While the component is being imported, you will actually see nothing. That's why it is very common to combine a lazy component with a", ' ', _jsx(Link, { to: '/docs/components/suspense', children: "Suspense" }), " component."] })] })),
        },
        {
            title: 'Example: big component',
            id: 'big-component-example',
            content: (_jsxs(_Fragment, { children: [_jsx("p", { children: "When developing in a local environment, files are usually loaded instantly, so you cannot really test the functioning of the lazy component. But you can simulate the loading of a big file using a function that will delay the import of the component, like in the following example:" }), _jsx(Code, { code: `
              import { lazy, html, defineWompo } from 'wompo';

              function simulateBigComponent(promise) {
                return new Promise((resolve) => {
                  setTimeout(resolve, 5000);
                }).then(() => promise);
              }

              const LazyComponent = lazy(() => simulateBigComponent(import('./custom-component.js')));

              function App(){
                return html\`
                  <p>This content is static. Below me the lazy component will be rendered!</p>
                  <\${LazyComponent}>I should be blue...</\${LazyComponent}>
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
						`, language: 'js' }), _jsxs("p", { children: ["Result:", _jsx(LazyExample, {})] }), _jsxs(Note, { severity: 'warning', children: ["As you can see,", ' ', _jsx("b", { children: "the children of the component will still be visible while the component is being imported" }), ". That's why usually you always combine the lazy component with a ", _jsx("code", { children: "Suspense" }), ' ', "component."] })] })),
        },
        {
            title: 'Example: suspense',
            id: 'suspense-example',
            content: (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["It's time to use the ", _jsx(Link, { to: '/docs/components/suspense', children: "Suspense" }), " component to display a loading indicator while the lazy component is being imported. We will simply modify the previous example by wrapping the ", _jsx("code", { children: "LazyComponent" }), " between a", ' ', _jsx("code", { children: "Suspense" }), " component."] }), _jsx(Code, { code: `
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
						`, language: 'js' }), _jsxs("p", { children: ["Result:", _jsx(LazySuspenseExample, {})] })] })),
        },
    ],
};
export default function LazyApi() {
    return getPageLayout(content);
}
defineWompo(LazyApi, {
    name: 'lazy-api-apis-page',
});
