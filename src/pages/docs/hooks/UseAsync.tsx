import { defineWompo } from 'wompo';
import getPageLayout, { Contents } from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
import { Link } from 'wompo-router';

const content: Contents = {
	title: 'useAsync hook',
	description: (
		<>
			How to use the <code>useAsync</code> hook to make asynchronous requests and easily show a
			loading UI.
		</>
	),
	sections: [
		{
			title: 'Description',
			id: 'description',
			content: (
				<>
					<p>This hook allows to execute a function that returns a promise.</p>
					<p>
						It is very common to create a component that will fetch some data from a server and
						build the UI accordingly. You can do that in a <code>useEffect</code> hook and manually
						handle the loading state of the component, or, you can use the <code>useAsync</code>{' '}
						hook and handle everything automatically.
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
							const data = useAsync(promiseFn, dependencies);
						`}
						language='js'
					/>
					<p>
						The hook accepts a callback and a list of dependencies as parameters. The callback must
						return a promise and should have no parameters. It will be executed on first render and
						whenever one of the dependencies changes. <br />
						The hook will return <code>null</code> if the promise is being resolved, otherwise the
						result of the promise. The component will be automatically re-rendered once the promise
						is resolved.
					</p>
					<p>
						This hook can be used in conjunction with the <code>Suspense</code> component to show a
						loading indicator while the promise is being resolved.
					</p>
				</>
			),
		},
		{
			title: 'Example: fetching initial data',
			id: 'example',
			content: (
				<>
					<p>
						A common use case for the <code>useAsync</code> callback is to make a fetch request to a
						server to get the initial data of the component. Let's do it:
					</p>
					<Code
						code={`
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
						`}
						language='js'
					/>
					<p>
						In this example, when the component is initialized the async function will be executed
						and it will fetch the data to the server. Once it's done, it'll re-render the component
						with the result of the call.
						<br />
						In this example the loading state is handled manually, but you can also do that using
						the <code>Suspense</code> component.
					</p>
				</>
			),
		},
		{
			title: 'Example: using Suspense',
			id: 'suspense-example',
			content: (
				<>
					<p>
						The <code>Suspense</code> component can be used in conjunction with the{' '}
						<code>useAsync</code> hook to handle automatically the loading state. The{' '}
						<Link to='/docs/components/suspense'>Suspense</Link> component will render it's children
						if everyone of them has completely rendered and fetched data, otherwise it will return a{' '}
						<b>fallback</b> (usually a loading indicator).
					</p>
					<Code
						code={`
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
						`}
						language='js'
					/>
					<p>
						In the above example, the <code>App</code> component will render the{' '}
						<b>Suspense's fallback</b> while the data of the <code>User</code> components are being
						loaded, and <b>only when every one of them will have finished loading,</b> it will
						render the children. This allows to show a global loading indicator while a part of the
						UI is loading, without seeing in the UI every component being loaded separately.
					</p>
				</>
			),
		},
	],
};

export default function UseAsync() {
	return getPageLayout(content);
}

defineWompo(UseAsync, {
	name: 'useasync-hook-page',
});
