import { defineWomp } from 'womp';
import getPageLayout, { Contents } from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
import { Link } from 'womp-router';
import LoggedInUser from '../../../examples/LoggedInUser.js';
import Note from '../../../components/Note.js';

const content: Contents = {
	title: 'useContext hook',
	description: (
		<>
			How to use the <code>useContext</code> hook to let a component get a parent provided value and
			listen to its changes.
		</>
	),
	sections: [
		{
			title: 'Description',
			id: 'description',
			content: (
				<>
					<p>
						This hook allows to get the value provided by a <code>Context.Provider</code>. Using
						this hook will also make the component subscribe to the provider, so that it'll be
						automatically reloaded whenever the provided value changes.
					</p>
				</>
			),
		},
		{
			title: 'Usage',
			id: 'usage',
			content: (
				<>
					<Code
						code={`
							const context = useContext(Context);
						`}
						lang='js'
					/>
					<p>
						The hook accepts only a parameter, which is the{' '}
						<Link to='/docs/functions/createContext'>Context</Link> on which the component should
						subscribe to. The hook will return the value provided by a parent{' '}
						<code>Context.Provider</code>, or, if no matching providers are found above the
						component, the <b>default value</b> of the given context.
					</p>
					<p>
						Common use cases for this hook are:
						<ul>
							<li>Listen to theme changes</li>
							<li>Listen to the current logged-in user changes</li>
							<li>Listen to changes in the state of the whole application</li>
						</ul>
					</p>
				</>
			),
		},
		{
			title: 'Example: logged in user',
			id: 'example',
			content: (
				<>
					<p>
						Let's analyze a common case: sharing the data of the logged in user to the whole
						application.
					</p>
					<Code
						code={`
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
						`}
						lang='js'
					/>
					<p>
						Result:
						<LoggedInUser />
					</p>
					<p>
						First, we created the <code>UserContext</code> context, and then rendered a{' '}
						<code>UserContext.Provider</code> in the App component. The provider will pass it's
						value to all its children components. In fact, then we used the <code>useContext</code>
						hook in the UserInfo component to obtain the informations about the current loggeed in
						user. This will make the component subscribe to the provider, and will be automatically
						reloaded if the informations about the logged in user changes. To test it, you can see
						that you can log the user in and out, and the UserInfo component will display a
						different message evert time.
						<br />
						Note that we obtained this result without passing any prop to the component.
						<br />
						Image having a more deeply nested structure and pass the current logged in user
						information to alle the children components. It'd be hell. Using contexts will
						drastically improve the state management of the whole application.
					</p>
					<Note severity='info'>
						<b>Note:</b> The useContext hook will get the value of the <b>closest</b> matched
						provider. If multiple providers of the same context are above the component, they will
						be ignored.
					</Note>
				</>
			),
		},
	],
};

export default function UseContext() {
	return getPageLayout(content);
}

defineWomp(UseContext);
