import { useContext, defineWomp, html, createContext, useState } from "womp";
const UserContext = createContext(null);
export default function LoggedInUser() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const login = () => {
    setLoggedInUser({
      name: "Tongi",
      lastname: "Patongi"
    });
  };
  const logout = () => {
    setLoggedInUser(null);
  };
  return html`
    <${UserContext.Provider} value=${loggedInUser}>
      ${loggedInUser ? html`<button @click=${logout}>Log out</button>` : html`<button @click=${login}>Log in!</button>`}
      <${UserInfo} />
    </${UserContext.Provider}>
  `;
}
function UserInfo() {
  const loggedInUser = useContext(UserContext);
  let content;
  if (!loggedInUser) {
    content = html`The user is not logged in!`;
  } else {
    content = html`The user is ${loggedInUser.name} ${loggedInUser.lastname}`;
  }
  return html`<div>${content}</div>`;
}
defineWomp(LoggedInUser);
defineWomp(UserInfo);
