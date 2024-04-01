import{Fragment as o,jsx as e,jsxs as t}from"womp/jsx-runtime";import{defineWomp as s}from"womp";import r from"../../../utils/getPageLayout.js";import n from"../../../components/Code.js";import{Link as a}from"womp-router";import l from"../../../examples/LoggedInUser.js";import c from"../../../components/Note.js";const h={title:"useContext hook",description:t(o,{children:["How to use the ",e("code",{children:"useContext"})," hook to let a component get a parent provided value and listen to its changes."]}),sections:[{title:"Description",id:"description",content:e(o,{children:t("p",{children:["This hook allows to get the value provided by a ",e("code",{children:"Context.Provider"}),". Using this hook will also make the component subscribe to the provider, so that it'll be automatically reloaded whenever the provided value changes."]})})},{title:"Usage",id:"usage",content:t(o,{children:[e(n,{code:`
							const context = useContext(Context);
						`,language:"js"}),t("p",{children:["The hook accepts only a parameter, which is the"," ",e(a,{to:"/docs/apis/createContext",children:"Context"})," on which the component should subscribe to. The hook will return the value provided by a parent"," ",e("code",{children:"Context.Provider"}),", or, if no matching providers are found above the component, the ",e("b",{children:"default value"})," of the given context."]}),t("p",{children:["Common use cases for this hook are:",t("ul",{children:[e("li",{children:"Listen to theme changes"}),e("li",{children:"Listen to the current logged-in user changes"}),e("li",{children:"Listen to changes in the state of the whole application"})]})]})]})},{title:"Example: logged in user",id:"example",content:t(o,{children:[e("p",{children:"Let's analyze a common case: sharing the data of the logged in user to the whole application."}),e(n,{code:`
							import { createContext, useContext, useState, defineWomp, html } from 'womp';

              const UserContext = createContext(null);

              function App(){
                const [loggedInUser, setLoggedInUser] = useState(null);
                const login = () => {
                  setLoggedInUser({
                    name: 'Tongi',
                    lastname: 'Patongi',
                  })
                }
                const logout = () => {
                  setLoggedInUser(null);
                }
                return html\`
                  <\${UserContext.Provider} value=\${loggedInUser}>
                    \${loggedInUser ?
                      html\`<button @click=\${logout}>Log out</button>\`
                      : html\`<button @click=\${login}>Log in!</button>\`
                    }
                    <\${UserInfo} />
                  </\${UserContext.Provider}>
                \`;
              }

							function UserInfo() {
								const loggedInUser = useContext(UserContext);
                let content;
                if(!loggedInUser){
                  content = html\`The user is not logged in!\`;
                } else {
                  content = html\`The user is \${loggedInUser.name} \${loggedInUser.lastname}\`;
                }
								return html\`<div>
                  \${content}
                </div>\`;
							}

              defineWomp(App);
              defineWomp(UserInfo);
						`,language:"js"}),t("p",{children:["Result:",e(l,{})]}),t("p",{children:["First, we created the ",e("code",{children:"UserContext"})," context, and then rendered a"," ",e("code",{children:"UserContext.Provider"})," in the App component. The provider will pass it's value to all its children components. In fact, then we used the ",e("code",{children:"useContext"}),"hook in the UserInfo component to obtain the informations about the current loggeed in user. This will make the component subscribe to the provider, and will be automatically reloaded if the informations about the logged in user changes. To test it, you can see that you can log the user in and out, and the UserInfo component will display a different message evert time.",e("br",{}),"Note that we obtained this result without passing any prop to the component.",e("br",{}),"Image having a more deeply nested structure and pass the current logged in user information to alle the children components. It'd be hell. Using contexts will drastically improve the state management of the whole application."]}),t(c,{severity:"info",children:[e("b",{children:"Note:"})," The useContext hook will get the value of the ",e("b",{children:"closest"})," matched provider. If multiple providers of the same context are above the component, they will be ignored."]})]})}]};export default function i(){return r(h)}s(i,{name:"usecontext-hook-page"});
