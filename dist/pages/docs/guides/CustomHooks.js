import{Fragment as o,jsx as e,jsxs as t}from"wompo/jsx-runtime";import{defineWompo as i}from"wompo";import l from"../../../utils/getPageLayout.js";import n from"../../../components/Code.js";import{Link as a}from"wompo-router";import r from"../../../components/Note.js";import c from"../../../examples/UseTime.js";const u={title:"Create your own hooks",description:"In this guide we will cover how to create your own hooks by combining the existing ones.",sections:[{title:"Introduction",id:"intro",content:e(o,{children:t("p",{children:["We know that the existing hooks will not satisfy ",e("b",{children:"every"})," single exigency that a developer can have while developing Wompo Components, but they are the ",e("b",{children:"base"})," that allows developers to satisfy those exigencies. You can create your own custom hooks that can then be used across all components."]})})},{title:"Combining hooks",id:"combining-hooks",content:t(o,{children:[t("p",{children:["We can't stress it enough:"," ",t("i",{children:["hooks are supposed to be used ",e("b",{children:"only"})," inside a component."]})]}),e("p",{children:"...or..."}),e("p",{children:e("i",{children:"inside other hooks!"})}),t("p",{children:["Exactly, you can create a custom function (hook) that executes other hooks on it. Of course, this function is supposed to only be called inside a component (or eventually another hook).",e("br",{}),"As said before, native hooks are the ",e("b",{children:"base"}),": they have the main functionalities and concepts that can be combined together to create more advanced and complex hooks."]})]})},{title:"Example: useLocalStorage",id:"use-local-storage-example",content:t(o,{children:[e("p",{children:"Let's dive into the first example: a hook that allows to use the local storage easily."}),e(n,{code:`
              import { useState, useCallback } from 'wompo';

              function useLocalStorage(key, defaultValue) {
                // Initialize state
                const [value, setValue] = useState(null);
                // Create a custom setter function to set the localStorage value
                const setter = useCallback((newValue) => {
                  localStorage.setItem(key, newValue);
                  setValue(newValue);
                });
                // We get the localStorage value only the first time
                if(value === null){
                  const storedItem = localStorage.getItem(key);
                  if(storedItem === null) {
                    // If no value is seved we initialize it with the default value.
                    setter(defaultValue); 
                  } else {
                    // Otherwise, we just set the current value with the one in the localStorage
                    setter(storedItem); 
                  }
                }
                return [value, setter];
              }
            `,language:"js"}),t("p",{children:["Easy, isn't it? We combined the ",e(a,{to:"/docs/hooks/useState",children:"useState"})," hook and the ",e(a,{to:"/docs/hooks/useCallback",children:"useCallback"})," hook to create the custom"," ",e("code",{children:"useLocalStorage"})," hook. This hook will accept a key and a default value, and will return the current value and a setter function to set a new value to the local storage. Thank to the ",e("b",{children:"useState"})," hook, the component will also be automatically re-rendered when you update the storage."]}),t(r,{severity:"info",children:["If you return a function in your custom hook, you should ",e("b",{children:"always"})," wrap it around the ",e("code",{children:"useCallback"})," hook so that, if used as a parameter for other components, it'll not cause a useless re-render."]})]})},{title:"Example: useTime",id:"use-time-example",content:t(o,{children:[e("p",{children:"Another example can be a hook that will start counting the number of seconds since the component was first rendered (we personally don't have a clear idea of why it should be useful, but we think it's cool). This hook will not update the component: it will only count."}),e(n,{code:`
              import { useRef, useEffect } from 'wompo';

              export default function useTime() {
                // Initialize the timer
                const timeRef = useRef(0);
                // Start the timer when the component is rendered for the first time
                useEffect(() => {
                  const intervalId = setInterval(() => {
                    // Update the timer by one every second.
                    timeRef.current += 1;
                  }, 1000);
                  // When the component is unmounted, stop the interval.
                  return () => {
                    clearInterval(intervalId);
                  };
                }, []);
                return timeRef;
              }
            `,language:"js"}),e("p",{children:"And then, in a component:"}),e(n,{code:`
              import { defineWompo, html } from 'wompo';
              import useTime from './useTime';

              function Component() {
                const timeSinceFirstRender = useTime();
                const showTime = () => {
                  alert(\`I was rendered \${timeSinceFirstRender.current} seconds ago\`)
                }
                return html\`
                  <button @click=\${showTime}>
                    If you click me I'll show you how many seconds ago I was rendered!
                  </button>
                \`;
              }
              defineWompo(Component);
            `,language:"js"}),t("p",{children:["Result:",e(c,{})]})]})},{title:"Advanced hooks",id:"advanced-hooks",content:t(o,{children:["You can create your own hooks from scratch without combining all the already existing hooks (you still need to use at least one). This is an advanced case, and should always be avoided when possible. If you want to know more, check the"," ",e(a,{to:"/docs/hooks/useHook",children:"useHook"})," hook reference."]})}]};export default function s(){return l(u)}i(s,{name:"custom-hooks-page"});
