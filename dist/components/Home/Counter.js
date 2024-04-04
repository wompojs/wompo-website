import{defineWompo as n,html as r,useState as u}from"wompo";export default function t(){const[e,o]=u(0);return r`<button @click=${()=>o(e+1)}>${e}</button>`}t.css=`
  button {
    padding: 3rem;
    font-size: 4rem;
    border-radius: 10px;
    cursor: pointer;
  }
`,n(t,{shadow:!0,cssModule:!1});
