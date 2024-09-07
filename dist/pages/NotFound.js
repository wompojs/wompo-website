import { jsx as _jsx, jsxs as _jsxs } from "wompo/jsx-runtime";
import { defineWompo } from 'wompo';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
export default function NotFound({ styles: s }) {
    const goBack = () => {
        history.back();
    };
    return (_jsxs("main", { class: s.main, children: [_jsx(Header, {}), _jsxs("section", { children: [_jsx("h1", { children: "Not Found" }), _jsx("h2", { children: "404" }), _jsx("p", { children: "We didn't find the page you were looking for... \uD83E\uDD79" }), _jsx("button", { onClick: goBack, children: "Go Back" })] }), _jsx(Footer, {})] }));
}
NotFound.css = `
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
`;
defineWompo(NotFound, { name: 'not-found' });
