import{Fragment as o,jsx as e,jsxs as t}from"wompo/jsx-runtime";import{defineWompo as a}from"wompo";import i from"../../../utils/getPageLayout.js";import n from"../../../components/Code.js";import{Link as r}from"wompo-router";const c={title:"useAsync hook",description:t(o,{children:["How to use the ",e("code",{children:"useAsync"})," hook to make asynchronous requests and easily show a loading UI."]}),sections:[{title:"Description",id:"description",content:t(o,{children:[e("p",{children:"This hook allows to execute a function that returns a promise."}),t("p",{children:["It is very common to create a component that will fetch some data from a server and build the UI accordingly. You can do that in a ",e("code",{children:"useEffect"})," hook and manually handle the loading state of the component, or, you can use the ",e("code",{children:"useAsync"})," ","hook and handle everything automatically."]})]})},{title:"Usage",id:"usage",content:t(o,{children:[e(n,{code:`
							const data = useAsync(promiseFn, dependencies, triggerSuspense);
						`,language:"js"}),t("p",{children:["The hook accepts a callback and a list of dependencies as parameters. The callback must return a promise and should have no parameters. It will be executed on first render and whenever one of the dependencies changes. ",e("br",{}),"The hook will return ",e("code",{children:"null"})," if the promise is being resolved, otherwise the result of the promise. The component will be automatically re-rendered once the promise is resolved."]}),t("p",{children:["This hook can be used in conjunction with the ",e("code",{children:"Suspense"})," component to show a loading indicator while the promise is being resolved."]}),t("p",{children:["The third parameter of the function tells the hook wheather the hook should trigger the parent ",e("code",{children:"Suspense"})," component or not. By default, it is ",e("code",{children:"true"}),"."]})]})},{title:"Example: fetching initial data",id:"example",content:t(o,{children:[t("p",{children:["A common use case for the ",e("code",{children:"useAsync"})," callback is to make a fetch request to a server to get the initial data of the component. Let's do it:"]}),e(n,{code:`
							import { useAsync, defineWompo, html } from 'wompo';

							export default function User({ userId }) {
								const userData = useAsync(async () => {
                  try {
                    const res = await fetch(\`/get/user/\${userId}\`);
                    const userData = await res.json();
                    return html\`<div>
                      Name: \${user.name} \${user.lastname}
                    </div>\`;
                  } catch(err){
                    return html\`User not found!\`;
                  }
                }, [userId])

								return html\`<div>
                  \${userData == null ? html\`<i>Loading...</i>\` : userData}
                </div>\`;
							}

							defineWompo(Component);
						`,language:"js"}),t("p",{children:["In this example, when the component is initialized the async function will be executed and it will fetch the data to the server. Once it's done, it'll re-render the component with the result of the call.",e("br",{}),"In this example the loading state is handled manually, but you can also do that using the ",e("code",{children:"Suspense"})," component."]})]})},{title:"Example: using Suspense",id:"suspense-example",content:t(o,{children:[t("p",{children:["The ",e("code",{children:"Suspense"})," component can be used in conjunction with the"," ",e("code",{children:"useAsync"})," hook to handle automatically the loading state. The"," ",e(r,{to:"/docs/components/suspense",children:"Suspense"})," component will render it's children if everyone of them has completely rendered and fetched data, otherwise it will return a"," ",e("b",{children:"fallback"})," (usually a loading indicator)."]}),e(n,{code:`
							import { useAsync, defineWompo, html, Suspense } from 'wompo';

              function App(){
                return html\`<div>
                  <\${Suspense} fallback=\${html\`<i>Loading...</i>\`}>
                    <\${User} userId="0" />
                    <\${User} userId="1" />
                    <\${User} userId="2" />
                  </\${Suspense}>
                </div>\`;
              }

							function User({ userId }) {
								const userData = useAsync(async () => {
                  try {
                    const res = await fetch(\`/get/user/\${userId}\`);
                    const userData = await res.json();
                    return html\`<div>
                      Name: \${user.name} \${user.lastname}
                    </div>\`;
                  } catch(err){
                    return html\`User not found!\`;
                  }
                }, [userId])

								return html\`<div>
                  \${userData}
                </div>\`;
							}
						`,language:"js"}),t("p",{children:["In the above example, the ",e("code",{children:"App"})," component will render the"," ",e("b",{children:"Suspense's fallback"})," while the data of the ",e("code",{children:"User"})," components are being loaded, and ",e("b",{children:"only when every one of them will have finished loading,"})," it will render the children. This allows to show a global loading indicator while a part of the UI is loading, without seeing in the UI every component being loaded separately."]})]})}]};export default function s(){return i(c)}a(s,{name:"useasync-hook-page"});
