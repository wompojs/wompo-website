---
title: "useContext hook"
description: "Leggi il valore del context piu vicino."
metaTitle: "useContext - Hooks Wompo"
metaDescription: "Usa useContext per condividere stato in una porzione dell'app."
navTitle: "useContext"
order: 40003
---
## Uso {#uso}

`useContext` legge il valore fornito dal `Context.Provider` piu vicino.

```js
const value = useContext(Context);
```

Se non esiste un provider sopra il componente, Wompo ritorna il valore predefinito passato a `createContext`.

## Esempio: utente autenticato {#utente-autenticato}

Questo esempio condivide l'utente corrente con un componente annidato senza passarlo come prop.

```js
import { createContext, defineWompo, html, useContext, useState } from 'wompo';

const UserContext = createContext(null);

function UserInfo() {
  const user = useContext(UserContext);

  if (!user) {
    return html`<p>L'utente non e' autenticato.</p>`;
  }

  return html`
    <p>
      L'utente e' ${user.name} ${user.lastName}.
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

## Vince il provider piu vicino {#vince-provider-vicino}

Quando piu provider dello stesso context sono annidati, `useContext` legge quello piu vicino.

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

In questo esempio, `Toolbar` riceve `dark`.
