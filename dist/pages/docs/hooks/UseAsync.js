import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "wompo/jsx-runtime";
import { defineWompo } from 'wompo';
import getPageLayout from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
import { Link } from 'wompo-router';
const content = {
    title: 'useAsync hook',
    description: (_jsxs(_Fragment, { children: ["How to use the ", _jsx("code", { children: "useAsync" }), " hook to make asynchronous requests and easily show a loading UI."] })),
    sections: [
        {
            title: 'Description',
            id: 'description',
            content: (_jsxs(_Fragment, { children: [_jsx("p", { children: "This hook allows to execute a function that returns a promise." }), _jsxs("p", { children: ["It is very common to create a component that will fetch some data from a server and build the UI accordingly. You can do that in a ", _jsx("code", { children: "useEffect" }), " hook and manually handle the loading state of the component, or, you can use the ", _jsx("code", { children: "useAsync" }), ' ', "hook and handle everything automatically."] })] })),
        },
        {
            title: 'Usage',
            id: 'usage',
            content: (_jsxs(_Fragment, { children: [_jsx(Code, { code: `
							const data = useAsync(promiseFn, dependencies);
						`, language: 'js' }), _jsxs("p", { children: ["The hook accepts a callback and a list of dependencies as parameters. The callback must return a promise and should have no parameters. It will be executed on first render and whenever one of the dependencies changes. ", _jsx("br", {}), "The hook will return ", _jsx("code", { children: "null" }), " if the promise is being resolved, otherwise the result of the promise. The component will be automatically re-rendered once the promise is resolved."] }), _jsxs("p", { children: ["This hook can be used in conjunction with the ", _jsx("code", { children: "Suspense" }), " component to show a loading indicator while the promise is being resolved."] })] })),
        },
        {
            title: 'Example: fetching initial data',
            id: 'example',
            content: (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["A common use case for the ", _jsx("code", { children: "useAsync" }), " callback is to make a fetch request to a server to get the initial data of the component. Let's do it:"] }), _jsx(Code, { code: `
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
						`, language: 'js' }), _jsxs("p", { children: ["In this example, when the component is initialized the async function will be executed and it will fetch the data to the server. Once it's done, it'll re-render the component with the result of the call.", _jsx("br", {}), "In this example the loading state is handled manually, but you can also do that using the ", _jsx("code", { children: "Suspense" }), " component."] })] })),
        },
        {
            title: 'Example: using Suspense',
            id: 'suspense-example',
            content: (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["The ", _jsx("code", { children: "Suspense" }), " component can be used in conjunction with the", ' ', _jsx("code", { children: "useAsync" }), " hook to handle automatically the loading state. The", ' ', _jsx(Link, { to: '/docs/components/suspense', children: "Suspense" }), " component will render it's children if everyone of them has completely rendered and fetched data, otherwise it will return a", ' ', _jsx("b", { children: "fallback" }), " (usually a loading indicator)."] }), _jsx(Code, { code: `
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
						`, language: 'js' }), _jsxs("p", { children: ["In the above example, the ", _jsx("code", { children: "App" }), " component will render the", ' ', _jsx("b", { children: "Suspense's fallback" }), " while the data of the ", _jsx("code", { children: "User" }), " components are being loaded, and ", _jsx("b", { children: "only when every one of them will have finished loading," }), " it will render the children. This allows to show a global loading indicator while a part of the UI is loading, without seeing in the UI every component being loaded separately."] })] })),
        },
    ],
};
export default function UseAsync() {
    return getPageLayout(content);
}
defineWompo(UseAsync, {
    name: 'useasync-hook-page',
});
