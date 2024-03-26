import { jsx, jsxs } from "womp/jsx-runtime";
import { defineWomp } from "womp";
export default function MainContent({ styles: s, title, description, children }) {
  return /* @__PURE__ */ jsx("main", { class: s.main, children: /* @__PURE__ */ jsxs("div", { class: s.container, children: [
    /* @__PURE__ */ jsx("h1", { children: title }),
    /* @__PURE__ */ jsx("h5", { children: description }),
    children
  ] }) });
}
MainContent.css = `
  :host {
    display: flex;
    width: 100%;
    position: relative;
  }
  .main {
    padding: 0 2rem;
    margin: 0 auto;
  }

  .main code {
    display: inline-block;
    background-color: #efefef;
    border-radius: 5px;
    font-size: 1.6rem;
    font-family: Monospace;
  }

  .main a {
    color: #573ef6;
    text-decoration: none;
    border-bottom: 0px solid #573ef6;
    transition: all 0.1s ease-in-out;
    cursor: pointer;
  }
  .main a:hover {
    border-bottom-width: 1px;
  }

  .main ul {
    padding-left: 1.5em;
  }

  .container {
    margin: 0 auto;
    max-width: 85rem;
  }
  .main hr {
    margin: 50px 0;
    background-color: #573ef640;
    border: 0;
    height: 1px;
  }
  .main h1 {
    font-size: 5rem;
    margin: 0;
  }
  .main h2 {
    font-size: 3rem;
    margin: 10px 0;
  }
  .main h5 {
    font-style: italic;
    font-weight: normal;
    font-size: 2rem;
    margin: 10px 0;
  }

  .sideMenu {
    display: none;
    position: sticky;
    top: 0;
    right: 0;
    width: 30rem;
    height: 100vh;
    margin-top: -7rem;
    padding-top: 7rem;
    overflow: auto;
  }
  .sideMenu h3 {
    font-weight: 800;
    text-transform: uppercase;
    margin: 0;
    margin-bottom: 10px;
    padding: 0 2rem;
  }
`;
defineWomp(MainContent, {
  shadow: true
});
