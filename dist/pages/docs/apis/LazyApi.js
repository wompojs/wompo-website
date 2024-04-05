import{Fragment as n,jsx as e,jsxs as o}from"wompo/jsx-runtime";import{defineWompo as a}from"wompo";import s from"../../../utils/getPageLayout.js";import t from"../../../components/Code.js";import{Link as i}from"wompo-router";import l from"../../../components/Note.js";import m from"../../../examples/LazyExample.js";import c from"../../../examples/LazySuspenseExample.js";const r={title:"lazy API",description:o(n,{children:["How to use the ",e("code",{children:"lazy"})," function to asynchronously load a component only when it is used."]}),sections:[{title:"Description",id:"description",content:e(n,{children:o("p",{children:["The ",e("code",{children:"lazy"})," function will dynamically import a component only if it is actually used and rendered. Using the lazy function can"," ",e("b",{children:"improve your site's performance"})," and decrease the number of network requests, other then reducing the initial payload.",e("br",{}),"You can also combine the ",e("code",{children:"lazy"})," function with the use of the"," ",e(i,{to:"/docs/components/suspense",children:"Suspense"})," component to display a rendering screen while the component is being loaded. Once the lazy component rendered for the first time, the result is cached so that multiple requests will not be performed if the lazy component is used multiple times.",e("br",{}),"The imported file ",e("b",{children:"must have a default export"}),", and it is what will be taken to know which component to render."]})})},{title:"Usage",id:"usage",content:o(n,{children:[e(t,{code:`
							const LazyComponent = lazy(() => import(componentPath));
						`,language:"js"}),o("p",{children:["The ",e("code",{children:"lazy"})," function accepts one single argument, which is the callback that will ask to import the component. Be careful:"]}),e(t,{code:`
              // \u274C This will immediately import the component (and will not work)!
              lazy(import(componentPath);

              // \u274C Will not work
              lazy(componentPath);

              // \u2705 The correct way
							lazy(() => import(componentPath));
						`,language:"js"}),o(l,{severity:"info",children:["While the component is being imported, you will actually see nothing. That's why it is very common to combine a lazy component with a"," ",e(i,{to:"/docs/components/suspense",children:"Suspense"})," component."]})]})},{title:"Example: big component",id:"big-component-example",content:o(n,{children:[e("p",{children:"When developing in a local environment, files are usually loaded instantly, so you cannot really test the functioning of the lazy component. But you can simulate the loading of a big file using a function that will delay the import of the component, like in the following example:"}),e(t,{code:`
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
						`,language:"js"}),"The code of the component imported from the ",e("code",{children:"./custom-component.js"})," path will be the following:",e(t,{code:`
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
						`,language:"js"}),o("p",{children:["Result:",e(m,{})]}),o(l,{severity:"warning",children:["As you can see,"," ",e("b",{children:"the children of the component will still be visible while the component is being imported"}),". That's why usually you always combine the lazy component with a ",e("code",{children:"Suspense"})," ","component."]})]})},{title:"Example: suspense",id:"suspense-example",content:o(n,{children:[o("p",{children:["It's time to use the ",e(i,{to:"/docs/components/suspense",children:"Suspense"})," component to display a loading indicator while the lazy component is being imported. We will simply modify the previous example by wrapping the ",e("code",{children:"LazyComponent"})," between a"," ",e("code",{children:"Suspense"})," component."]}),e(t,{code:`
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
						`,language:"js"}),o("p",{children:["Result:",e(c,{})]})]})}]};export default function p(){return s(r)}a(p,{name:"lazy-api-apis-page"});
