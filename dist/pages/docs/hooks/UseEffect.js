import{Fragment as o,jsx as e,jsxs as t}from"womp/jsx-runtime";import{defineWomp as a}from"womp";import r from"../../../utils/getPageLayout.js";import n from"../../../components/Code.js";import{Link as c}from"womp-router";import i from"../../../components/Note.js";const h={title:"useEffect hook",description:t(o,{children:["How to use the ",e("code",{children:"useEffect"})," hook to make a component execute some operations on specific situations."]}),sections:[{title:"Description",id:"description",content:e(o,{children:t("p",{children:["The ",e("code",{children:"useEffect"})," hook is one of the main hooks you will use in your application. This hook lets you execute a callback (effect) function after the"," ",e("b",{children:"first render"})," and whenever one of the dependecies changes. This can be quite ideal for:",t("ul",{children:[e("li",{children:"Initializing the component"}),t("li",{children:["Subscribing to events (e.g. ",e("code",{children:"window.addEventListener"}),")"]}),e("li",{children:"Using timeouts and intervals"}),e("li",{children:"Performing animations"}),t("li",{children:["Controlling a non-womp widget or node in conjuctions with the ",e("code",{children:"useRef"})," ","hook"]})]})]})})},{title:"Usage",id:"usage",content:t(o,{children:[e(n,{code:`
							useEffect(effectFn, dependencies);
						`,language:"js"}),t("p",{children:["The hook accepts two parameters: the ",e("b",{children:"effect function"})," and the"," ",e("b",{children:"list of dependencies"}),". The effect function will be executed on first render and any time one of the dependecies changes. This function can be a void function or can return a second function (called cleaning function) that will be executed"," ",e("b",{children:"before the execution of the next same effect"})," or if the component ",e("b",{children:"unmount"})," ","(is removed from the DOM)."]}),t("p",{children:["If an empty array is given as a list of dependecies, the effect will be executed"," ",e("b",{children:"only"})," after the first render."]}),e("p",{children:"If no dependencies are specified, the effect will be executed on every render."}),t(i,{severity:"info",children:[e("b",{children:"Note:"})," The effect will be executed ",e("b",{children:"asynchronously"})," after the component has been rendered."]})]})},{title:"Example: timeout",id:"timeout-example",content:t(o,{children:[t("p",{children:["Using the ",e("code",{children:"window.setTimeout"})," function is a common use case for the"," ",e("code",{children:"useEffect"})," hook. Here's an example:"]}),e(n,{code:`
							import { useEffect, defineWomp, html } from 'womp';

              function TimeoutComponent(){
                useEffect(() => {
                  const timeoutId = setTimeout(() => {
                    alert('I was first rendered 5 seconds ago!');
                  }, 5000);
                  return () => {
                    clearTimeout(timeoutId);
                  }
                }, [])
                return html\`Nothing to see here, boss.\`;
              }

              defineWomp(TimeoutComponent);
						`,language:"js"}),t(i,{severity:"warning",children:["When using timeouts and intervals, remember to ",e("b",{children:"always"})," cancel them using the"," ",e("b",{children:"cleaning function"})," (like in the example). Not doing so can lead to unexpected behaviours."]}),t("p",{children:[e("i",{children:"Why the useEffect hook is needed for this case?"}),e("br",{}),"Because if you call the ",e("code",{children:"setTimoeut"})," function directly inside the component, it will be executed ",e("b",{children:"every time"})," the component renders. This usually causes unwanted loops when inside the timeout/interval callback a setState is called."]})]})},{title:"Example: fetching data",id:"fetching-data-example",content:t(o,{children:[t("p",{children:["The ",e("code",{children:"useEffect"})," hook can also be used to fetch data when the component renders."]}),t(i,{severity:"info",children:[e("b",{children:"Note:"})," This example is only made to understand better how the hook works and how to do async operations inside of it. If you actually have to perform data fetching, use the ",e(c,{to:"/docs/hooks/useAsync",children:"useAsync"})," hook instead."]}),e(n,{code:`
							import { useEffect, useState, defineWomp, html } from 'womp';

              function User({ userId }){
                const [user, setUser] = useState(null);

                useEffect(() => {
                  fetch(\`/get/user/\${userId}\`)
                    .then((res) => res.json())
                    .then((data) => setUser(data));
                }, [userId])

                return html\`...\`;
              }

              defineWomp(User);
						`,language:"js"}),t(i,{severity:"warning",children:["The effect callback ",e("b",{children:"cannot return a promise"}),", so you cannot declare it as an async function and you cannot use the ",e("b",{children:"await"})," keyword. Use ",e("code",{children:".then"})," functions or create an helper async function to call ",e("b",{children:"inside"})," the effect."]})]})},{title:"Example: local storage",id:"localstorage-example",content:t(o,{children:[t("p",{children:["This example will show how you can use the ",e("b",{children:"useEffect"})," hook to make operations into the ",e("code",{children:"window.localStorage"})," to save and get data."]}),e(n,{code:`
							import { useEffect, useState, defineWomp, html } from 'womp';

              function Theme({ userId }){
                const [theme, setTheme] = useState('light');

                // Get the user theme preference
                useEffect(() => {
                  // Gets executed only on first render
                  const savedThemePreference = localStorage.getItem('theme');
                  if(savedThemePreference)
                    setTheme(savedThemePreference);
                }, [])

                // Set the new user's theme preference
                useEffect(() => {
                  // Gets executed on first render and every time that "theme" changes
                  localStorage.setItem('theme', theme);
                }, [theme]);

                return html\`...\`;
              }

              defineWomp(Theme);
						`,language:"js"}),e("p",{children:"In this example we used two effects: one to get the user's theme preference, executed only once, and one to save the user's theme preference whenever the theme preference changes."}),t(i,{severity:"info",children:[e("b",{children:"Effects will be executed in the order they are declared"}),", so the order matters. In this example, if you execute the second effect before the other it will not work, because the theme in the localStorage will be always updated with the initial value of the state."]})]})},{title:"Example: Code highlighting",id:"code-highlighting-example",content:t(o,{children:[t("p",{children:["In this example we will combine the ",e(c,{to:"/docs/hooks/useRef",children:"useRef"})," hook with the third party library ",e("b",{children:"highlight.js"})," and the ",e("code",{children:"useEffect"})," hook to create an highlighted code component."]}),e(n,{code:`
							import { useEffect, useRef, defineWomp, html } from 'womp';

              function Code({ code, lang }){
                const codeRef = useRef();

                useEffect(() => {
                  const highlighted = hljs.highlight(code, { language: lang });
                  codeRef.current.innerHTML = highlighted.value;
                }, []);

                return html\`
                  <pre class=\${s.pre}>
                    <code ref=\${codeRef}></code>
                  </pre>
                \`;
              }

              defineWomp(Code);
						`,language:"js"}),t("p",{children:["In the above example the ",e("code",{children:"Code"})," component accepts a ",e("b",{children:"code"})," prop and a"," ",e("b",{children:"lang"})," prop that will be used to create the highligted HTML that will be injected in the ",e("b",{children:"code"})," HTML element thanks to the ",e("code",{children:"useRef"})," hook."]})]})}]};export default function s(){return r(h)}a(s,{name:"useeffect-hook-page"});
