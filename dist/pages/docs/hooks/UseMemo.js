import{Fragment as t,jsx as e,jsxs as o}from"wompo/jsx-runtime";import{defineWompo as n}from"wompo";import a from"../../../utils/getPageLayout.js";import s from"../../../components/Code.js";const i={title:"useMemo hook",description:o(t,{children:["How to use the ",e("code",{children:"useMemo"})," hook to save the result of a function without re-calculating it on every render."]}),sections:[{title:"Description",id:"description",content:o(t,{children:[o("p",{children:["The ",e("code",{children:"useMemo"})," hook will let you save the result of a function so that it will not be re-calculated on every render. Using it can considerably improve performance, especially if the function performs heavy operations."]}),o("p",{children:["Common use cases for this hook are:",o("ul",{children:[e("li",{children:"Sorting arrays"}),e("li",{children:"Filtering arrays"}),e("li",{children:"Building objects"})]})]})]})},{title:"Usage",id:"usage",content:o(t,{children:[e(s,{code:`
							const result = useMemo(calculatorFn, dependencies);
						`,language:"js"}),o("p",{children:["The ",e("code",{children:"useMemo"})," hook accepts two parameters: the ",e("b",{children:"calculator"})," function and a list of dependencies. The calculator function accepts no parameters and should be pure and not be asynchronous. The new result of this function will be returned by the hook on the first render or whenever one of the listed dependencies changes."]}),e("p",{children:"You should use this hook whenever possible if you have to calculate the value of something through a function. Example:"}),e(s,{code:`
              // \u274C This will calculate the result on every render! Will make the CPU sad!
              const activeUsers = users.filter(user => user.active);
            `,language:"js"}),e(s,{code:`
              // \u2705 Will be executed only when the users array changes
              const activeUsers = useMemo(() => users.filter(user => user.active), [users]);
            `,language:"js"})]})},{title:"Example: ordering users",id:"ordering-users-example",content:o(t,{children:[o("p",{children:["In this example we will use the ",e("code",{children:"useMemo"})," hook to alphabetically order a list of users."]}),e(s,{code:`
							import { useState, useMemo, html, defineWompo } from 'wompo';

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
						`,language:"js"}),o("p",{children:["In the above example we firstly genereated 50 random users, then in the"," ",e("code",{children:"OrderedUsersList"})," component we sorted them inside the useMemo hook to save the sorted users list.",e("br",{}),"This is a simple example, but if you increase the number of generated users so that the sorting will be more computationally expensive, you can really see how the"," ",e("b",{children:"useMemo hook can save your life"})," (and the final user's life)."]})]})}]};export default function r(){return a(i)}n(r,{name:"usememo-hook-page"});
