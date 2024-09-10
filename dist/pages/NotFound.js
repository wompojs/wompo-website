import{jsx as o,jsxs as n}from"wompo/jsx-runtime";import{defineWompo as i}from"wompo";import m from"../components/Header.js";import a from"../components/Footer.js";export default function e({styles:t}){const r=()=>{history.back()};return n("main",{class:t.main,children:[o(m,{}),n("section",{children:[o("h1",{children:"Not Found"}),o("h2",{children:"404"}),o("p",{children:"We didn't find the page you were looking for... \u{1F979}"}),o("button",{onClick:r,children:"Go Back"})]}),o(a,{})]})}e.css=`
  .main section {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 3rem;
    padding: 10rem 3rem;
  }
  .main h1 {
    text-transform: uppercase;
    font-size: 6rem;
    margin: 0;
  }
  .main h2 {
    font-size: 15rem;
    margin: 0;
    letter-spacing: 1rem;
    line-height: 1;
  }
  .main button {
    background-color: #573EF6;
    color: #fff;
    padding: 1rem 2rem;
    border: none;
    cursor: pointer;
    border-radius: 10px;
    font-size: 4rem;
  }
  .main button:hover {
    text-decoration: underline;
  }
`,i(e,{name:"not-found"});
