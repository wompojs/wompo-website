import{useContext as g,defineWompo as l,html as t,createContext as a,useState as c}from"wompo";const o=a(null);export default function r(){const[e,n]=c(null),u=()=>{n({name:"Tongi",lastname:"Patongi"})},i=()=>{n(null)};return t`
    <${o.Provider} value=${e}>
      ${e?t`<button @click=${i}>Log out</button>`:t`<button @click=${u}>Log in!</button>`}
      <${s} />
    </${o.Provider}>
  `}function s(){const e=g(o);let n;return e?n=t`The user is ${e.name} ${e.lastname}`:n=t`The user is not logged in!`,t`<div>${n}</div>`}l(r,{name:"logged-in-user-example"}),l(s,{name:"user-info-example"});
