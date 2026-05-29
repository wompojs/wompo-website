---
title: "useContext hook"
description: "How to use the useContext hook to get a specific value shared across a whole portion of your application."
metaTitle: "useContext - Wompo hooks"
metaDescription: "The useContext hook returns the value provided by the closest parent context provider of the specified context and re-renders the component if the context changes."
navTitle: "useContext"
order: 40003
---
## Usage {#usage}

`useContext` reads the value provided by the closest matching `Context.Provider`.

```js
const value = useContext(Context);
```

If no provider exists above the component, Wompo returns the default value passed to `createContext`.

## Example: logged in user {#logged-in-user}

This example shares the current user with a nested component without passing the user as a prop.

```js
import { createContext, defineWompo, html, useContext, useState } from 'wompo';

const UserContext = createContext(null);

function UserInfo() {
  const user = useContext(UserContext);

  if (!user) {
    return html`<p>The user is not logged in.</p>`;
  }

  return html`
    <p>
      The user is ${user.name} ${user.lastName}.
    </p>
  `;
}

function App() {
  const [user, setUser] = useState(null);
  const login = () => setUser({ name: 'Tongi', lastName: 'Patongi' });
  const logout = () => setUser(null);

  return html`
    <${UserContext.Provider} value=${user}>
      <button @click=${user ? logout : login}>
        ${user ? 'Log out' : 'Log in'}
      </button>
      <${UserInfo} />
    </${UserContext.Provider}>
  `;
}

defineWompo(App);
defineWompo(UserInfo);
```

<logged-in-user-example></logged-in-user-example>

## Closest provider wins {#closest-provider-wins}

When multiple providers for the same context are nested, `useContext` reads the closest one.

```js
function Page() {
  return html`
    <${ThemeContext.Provider} value="light">
      <${ThemeContext.Provider} value="dark">
        <${Toolbar} />
      </${ThemeContext.Provider}>
    </${ThemeContext.Provider}>
  `;
}
```

In this example, `Toolbar` receives `dark`.
