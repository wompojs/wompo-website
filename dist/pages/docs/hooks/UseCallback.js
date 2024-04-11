import{Fragment as o,jsx as e,jsxs as t}from"wompo/jsx-runtime";import{defineWompo as i}from"wompo";import s from"../../../utils/getPageLayout.js";import a from"../../../components/Code.js";import c from"../../../components/Note.js";const r={title:"useCallback hook",description:t(o,{children:["How to use the ",e("code",{children:"useCallback"})," hook to cache functions and improve performance."]}),sections:[{title:"Description",id:"description",content:t(o,{children:[t("p",{children:["The ",e("code",{children:"useCallback"})," hook is a hook that lets you save a function definition across re-renders, so that it'll always keep the same reference to it.",e("br",{}),"Why is it useful? Because in javascript two function declarations are not considered equal:",e(a,{language:"js",code:`
                function(){} === function(){} // false
                
                const a = () => {}
                a === a // true
              `}),"So, for example, a useful case whre you can use it, is when a callback function is passed through the props of another component: if you don't use the `useCallback` hook, the child component will re-render every time the parent component changes, because the two functions will be considered different."]}),t(c,{severity:"info",children:[e("b",{children:"Note:"})," This consideration doesn't apply to events, because events are stored in a simple variable and will not cause an add/removal of event listeners, so it's not computationally expensive: it's more expensive to store the callback and get it back every time."]})]})},{title:"Usage",id:"usage",content:t(o,{children:[e(a,{code:`
							const callback = useCallback(callbackDefinition, dependencies);
						`,language:"js"}),t("p",{children:["The hook will cache the ",e("code",{children:"callbackDefinition"})," function and alway return the same value on every render, without re-initializing the function every time.",e("br",{}),"The hook accepts two parameters: a callback that can be any function declaration, and a list of dependencies. The dependecies are optional, but if they are set, the hook will check if any of them changed, and if it happened, it will re-build the function and return the new value."]})]})},{title:"Example",id:"counter-example",content:t(o,{children:[t("p",{children:["A basic example is using the ",e("code",{children:"useCallback"})," hook to pass it to another component as a parement, so that useless re-renderings are avoided."]}),e(a,{code:`
							import { useCallback, defineWompo, html } from 'wompo';
              import UserForm from './UserForm';

							export default function User({ userId }) {
								const submitData = useCallback((data) => {
                  fetch(\`/udpate/user/\${userId}\`, { method: 'POST', body: data })
                }, [userId])

								return html\`<\${UserForm} onSubmit=\${submitData} />\`;
							}

							defineWompo(Component);
						`,language:"js"}),t("p",{children:["In this example, the ",e("code",{children:"UserForm"})," component will not re-render every time that the ",e("code",{children:"User"})," component renders."]})]})}]};export default function n(){return s(r)}i(n,{name:"usecallback-hook-page"});
