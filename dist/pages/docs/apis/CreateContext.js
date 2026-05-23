import { Fragment, jsx, jsxs } from "wompo/jsx-runtime";
import { defineWompo } from "wompo";
import getPageLayout from "../../../utils/getPageLayout.js";
import Code from "../../../components/Code.js";
import { Link } from "wompo-router";
import ThemeExample from "../../../examples/ThemeExample.js";
const content = {
  title: "createContext API",
  description: /* @__PURE__ */ jsxs(Fragment, { children: [
    "How to use the ",
    /* @__PURE__ */ jsx("code", { children: "createContext" }),
    " function to create a new Context and share some data to all its children."
  ] }),
  sections: [
    {
      title: "Description",
      id: "description",
      content: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("p", { children: [
        "The ",
        /* @__PURE__ */ jsx("code", { children: "createContext" }),
        " function allows to create a new ",
        /* @__PURE__ */ jsx("b", { children: "Context" }),
        ". A context is a piece of data that is shared across all the children. This can be quite useful if:",
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "You want to pass a prop deeply in the component's tree" }),
          /* @__PURE__ */ jsx("li", { children: "You want to manage a portion of the app from a centralized place" })
        ] })
      ] }) })
    },
    {
      title: "Usage",
      id: "usage",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
							const Context = createContext(defaultValue);
						`,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "The function accepts a single parameter which is the default value that the context will have. This default value is only used if a Component uses the",
          " ",
          /* @__PURE__ */ jsx(Link, { to: "/docs/hooks/useContext", children: "useContext" }),
          " hook to get a Context that is not provided by a parent ",
          /* @__PURE__ */ jsx("code", { children: "Context.Provider" }),
          ". The value returned by the",
          " ",
          /* @__PURE__ */ jsx("code", { children: "createContext" }),
          " function is an object that has the ",
          /* @__PURE__ */ jsx("b", { children: "Provider" }),
          " key. The Provider will be the component that you want to use to share the data to all its children. It accepts one single prop: ",
          /* @__PURE__ */ jsx("b", { children: "value" }),
          ", which is ",
          /* @__PURE__ */ jsx("b", { children: "mandatory" }),
          ".",
          /* @__PURE__ */ jsx("br", {}),
          "Simple example:"
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
							const ThemeContext = createContext('light');

              function App(){
                const [theme, setTheme] = useState('light');
                return html\`
                  <\${ThemeContext.Provider} value=\${theme}>
                    ...
                  </\${ThemeContext.Provider}>
                \`;
              }
						`,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "In the above example, a ",
          /* @__PURE__ */ jsx("code", { children: "ThemeContext" }),
          " is created and a",
          " ",
          /* @__PURE__ */ jsx("code", { children: "ThemeContext.Provider" }),
          " instance is rendered so that the current theme is shared across the whole application (assuming the ",
          /* @__PURE__ */ jsx("code", { children: "App" }),
          " component is your root). A custom theme state is used as a value for the provider. When the theme changes, the provider will be re-rendered, and so all the children of it that use that context. To make a component listen to the provider's changes, you have to use the",
          " ",
          /* @__PURE__ */ jsx(Link, { to: "/docs/hooks/useContext", children: "useContext" }),
          " hook and pass as the first argument the ",
          /* @__PURE__ */ jsx("code", { children: "ThemeContext" }),
          " (in this case). If a component doesn't use the",
          " ",
          /* @__PURE__ */ jsx("code", { children: "useContext" }),
          " hook, it will not be automatically re-rendered when the parent provider changes."
        ] })
      ] })
    },
    {
      title: "Example: theme",
      id: "theme-example",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("p", { children: "We can go further with the theme example and actually implement a small app:" }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
							import { createContext, html, useState, useContext, defineWompo } from 'wompo';
							
							const ThemeContext = createContext('light');

              function App(){
                const [theme, setTheme] = useState('light');
								const toggleTheme = () => {
									theme === 'light' ? setTheme('dark') : setTheme('light');
								}
                return html\`
                  <\${ThemeContext.Provider} value=\${theme}>
										<\${AppContent}>
											<p>
												This cool application uses 2 custom themes: light and dark, and you can switch
												between them! Try it here:
											</p>
											<button @click=\${toggleTheme}>Toggle theme</button>
										</\${AppContent}>

										<\${AppContent}>
											<p>
												And the cool thing is that I have no props! I can be everywhere, and I will
												always get the current theme. The important thing is that I must be a child
												of the <code>ThemeContext.Provider</code>!
											</p>
										</\${AppContent}>
                  </\${ThemeContext.Provider}>
                \`;
              }
							defineWompo(App);

							function AppContent({ children }){
								const theme = useContext(ThemeContext);
								const styles = {
									backgroundColor: theme === 'light' ? '#eee' : '#333',
									color: theme === 'light' ? '#333' : '#eee',
									padding: '20px',
									marginTop: '10px',
								}
								return html\`
									<div style=\${styles}>
										\${children}
									</div>
								\`;
							}
							defineWompo(AppContent);
						`,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "Result:",
          /* @__PURE__ */ jsx(ThemeExample, {})
        ] })
      ] })
    }
  ]
};
export default function CreateContext() {
  return getPageLayout(content);
}
defineWompo(CreateContext, {
  name: "create-context-apis-page"
});
