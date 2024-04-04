import{defineWompo as r,html as c,useState as s}from"wompo";export default function e({initialCount:o=0}){const[t,n]=s(o);return c`<button @click=${()=>n(t+1)}>${t}</button>`}e.css=`
  button {
    font-size: 5rem;
    border-radius: 10px;
    cursor: pointer;
    border: none;
    background-color: #573ef6;
    color: #fff;
    width: 10rem;
    height: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 3px 3px 3px #e2defd;
  }
`,r(e,{shadow:!0,cssModule:!1,name:"home-counter"});
