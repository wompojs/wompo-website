import { defineWomp } from 'womp';
import getPageLayout, { Contents } from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';

const content: Contents = {
	title: 'useMemo hook',
	description: (
		<>
			How to use the <code>useMemo</code> hook to save the result of a function without
			re-calculating it on every render.
		</>
	),
	sections: [
		{
			title: 'Description',
			id: 'description',
			content: (
				<>
					<p>
						The <code>useMemo</code> hook will let you save the result of a function so that it will
						not be re-calculated on every render. Using it can considerably improve performance,
						especially if the function performs heavy operations.
					</p>
					<p>
						Common use cases for this hook are:
						<ul>
							<li>Sorting arrays</li>
							<li>Filtering arrays</li>
							<li>Building objects</li>
						</ul>
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
							const result = useMemo(calculatorFn, dependencies);
						`}
						language='js'
					/>
					<p>
						The <code>useMemo</code> hook accepts two parameters: the <b>calculator</b> function and
						a list of dependencies. The calculator function accepts no parameters and should be pure
						and not be asynchronous. The new result of this function will be returned by the hook on
						the first render or whenever one of the listed dependencies changes.
					</p>
					<p>
						You should use this hook whenever possible if you have to calculate the value of
						something through a function. Example:
					</p>
					<Code
						code={`
              // ❌ This will calculate the result on every render! Will make the CPU sad!
              const activeUsers = users.filter(user => user.active);
            `}
						language='js'
					/>
					<Code
						code={`
              // ✅ Will be executed only when the users array changes
              const activeUsers = useMemo(() => users.filter(user => user.active), [users]);
            `}
						language='js'
					/>
				</>
			),
		},
		{
			title: 'Example: ordering users',
			id: 'ordering-users-example',
			content: (
				<>
					<p>
						In this example we will use the <code>useMemo</code> hook to alphabetically order a list
						of users.
					</p>
					<Code
						code={`
							import { useState, useMemo, html, defineWomp } from 'womp';

              // Randomly create 50 initial users.
              const initialUsers = (() => {
                const users = [];
                for(let i=0; i < 50; i++) {
                  users.push({
                    username: (Math.random() + 1).toString(36).substring(2), // random string
                    id: i,
                  })
                }
                return users;
              })();

              export default function OrderedUsersList(){
                const [users, setUsers] = useState(initialUsers);
                const alphabeticallyOrdered = useMemo((users) => {
                  const ordered = users.sort((a, b) => a.username.localeCompare(b.username));
                  return ordered.map((user) => html\`<li>\${user.username}</li>\`)
                }, [users]);
                return html\`
                  <ul>
                    \${alphabeticallyOrdered}
                  </ul>
                \`;
              }
						`}
						language='js'
					/>
					<p>
						In the above example we firstly genereated 50 random users, then in the{' '}
						<code>OrderedUsersList</code> component we sorted them inside the useMemo hook to save
						the sorted users list.
						<br />
						This is a simple example, but if you increase the number of generated users so that the
						sorting will be more computationally expensive, you can really see how the{' '}
						<b>useMemo hook can save your life</b> (and the final user's life).
					</p>
				</>
			),
		},
	],
};

export default function UseMemo() {
	return getPageLayout(content);
}

defineWomp(UseMemo, {
	name: 'usememo-hook-page',
});
