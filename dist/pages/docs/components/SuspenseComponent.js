import{Fragment as n,jsx as e,jsxs as o}from"wompo/jsx-runtime";import{defineWompo as l}from"wompo";import p from"../../../utils/getPageLayout.js";import s from"../../../components/Code.js";import{Link as t}from"wompo-router";import a from"../../../examples/LazySuspenseExample.js";const m={title:"Suspense",description:o(n,{children:["How to use the ",e("code",{children:"Suspense"})," component to show a fallback UI while at least one of its children is still rendering its content."]}),sections:[{title:"Description",id:"description",content:e(n,{children:o("p",{children:["The ",e("code",{children:"Suspense"})," component is a special Wompo component that allows to show a"," ",e("b",{children:"fallback"})," UI while one or more of the children are loading. This can be used for:",o("ul",{children:[o("li",{children:["Components that use the ",e(t,{to:"/docs/hooks/useAsync",children:"useAsync"})," hook"]}),o("li",{children:["Components that are imported through the ",e(t,{to:"/docs/apis/lazy",children:"lazy"})," ","function"]})]})]})})},{title:"Usage",id:"usage",content:o(n,{children:[e(s,{code:`
							<Suspense fallback={html\`\`}>
								{children}
							</Suspense>
						`,language:"js"}),o("p",{children:["The ",e("code",{children:"Suspense"})," component accepts a single prop: ",e("b",{children:"fallback"}),". The fallback prop must be the result of the ",e(t,{to:"/docs/apis/html",children:"html"})," template function. This prop is ",e("b",{children:"required"}),"."]})]})},{title:"Example: lazy component",id:"lazy-component-example",content:o(n,{children:[o("p",{children:["This example is the same used in the ",e(t,{to:"/docs/apis/lazy",children:"lazy"})," ","documentation: thanks to the lazy function we will render a component dynamically imported and delayed to simulate a super big file that is requested from the server (or simply a slow network)."]}),e(s,{code:`
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
						`,language:"js"}),"The code of the component imported from the ",e("code",{children:"./custom-component.js"})," path will be the following:",e(s,{code:`
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
						`,language:"js"}),o("p",{children:["Result (you probably will have to reload the page and scroll here to see it):",e(a,{})]})]})}]};export default function i(){return p(m)}l(i,{name:"suspense-component-page"});
