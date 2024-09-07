import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "wompo/jsx-runtime";
import { defineWompo } from 'wompo';
import getPageLayout from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
import { Link } from 'wompo-router';
import LoggedInUser from '../../../examples/LoggedInUser.js';
import Note from '../../../components/Note.js';
const content = {
    title: 'useContext hook',
    description: (_jsxs(_Fragment, { children: ["How to use the ", _jsx("code", { children: "useContext" }), " hook to get a specific value shared across a whole portion of your application."] })),
    sections: [
        {
            title: 'Description',
            id: 'description',
            content: (_jsx(_Fragment, { children: _jsxs("p", { children: ["This hook allows to get the value provided by a ", _jsx("code", { children: "Context.Provider" }), ". Using this hook will also make the component subscribe to the provider, so that it'll be automatically reloaded whenever the provided value changes."] }) })),
        },
        {
            title: 'Usage',
            id: 'usage',
            content: (_jsxs(_Fragment, { children: [_jsx(Code, { code: `
							const context = useContext(Context);
						`, language: 'js' }), _jsxs("p", { children: ["The hook accepts only a parameter, which is the", ' ', _jsx(Link, { to: '/docs/apis/createContext', children: "Context" }), " on which the component should subscribe to. The hook will return the value provided by a parent", ' ', _jsx("code", { children: "Context.Provider" }), ", or, if no matching providers are found above the component, the ", _jsx("b", { children: "default value" }), " of the given context."] }), _jsxs("p", { children: ["Common use cases for this hook are:", _jsxs("ul", { children: [_jsx("li", { children: "Listening to theme changes" }), _jsx("li", { children: "Listening to the current logged-in user changes" }), _jsx("li", { children: "Listening to changes in the state of the whole application" })] })] })] })),
        },
        {
            title: 'Example: logged in user',
            id: 'example',
            content: (_jsxs(_Fragment, { children: [_jsx("p", { children: "Let's analyze a common case: sharing the data of the logged in user to the whole application." }), _jsx(Code, { code: `
							import { createContext, useContext, useState, defineWompo, html } from 'wompo';

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

              defineWompo(App);
              defineWompo(UserInfo);
						`, language: 'js' }), _jsxs("p", { children: ["Result:", _jsx(LoggedInUser, {})] }), _jsxs("p", { children: ["First, we created the ", _jsx("code", { children: "UserContext" }), " context, and then rendered a", ' ', _jsx("code", { children: "UserContext.Provider" }), " in the App component. The provider will pass it's value to all its children components. In fact, then we used the ", _jsx("code", { children: "useContext" }), "hook in the UserInfo component to obtain the informations about the current loggeed in user. This will make the component subscribe to the provider, so that it can be automatically reloaded if the informations about the logged in user changes. To test it, you can see that you can log the user in and out and the UserInfo component will display a different message evert time, even thoug the component doesn't use a ", _jsx("b", { children: "state hook" }), ".", _jsx("br", {}), "Note that we obtained this result without passing any prop to the component.", _jsx("br", {}), "Image having a more deeply nested structure and pass the current logged in user information to all the children components. It'd be hell. Using contexts will drastically improve the state management of the whole application."] }), _jsxs(Note, { severity: 'info', children: [_jsx("b", { children: "Note:" }), " The useContext hook will get the value of the ", _jsx("b", { children: "closest" }), " matched provider. If multiple providers of the same context are above the component, they will be ignored."] })] })),
        },
    ],
};
export default function UseContext() {
    return getPageLayout(content);
}
defineWompo(UseContext, {
    name: 'usecontext-hook-page',
});
