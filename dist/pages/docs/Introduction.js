import { Fragment, jsx, jsxs } from "wompo/jsx-runtime";
import { defineWompo } from "wompo";
import getPageLayout from "../../utils/getPageLayout.js";
import Code from "../../components/Code.js";
const content = {
  title: "Introduction",
  description: "Wompo is a fast and ligthweight React-like Web-Component library for creating functional UIs in the Web.",
  sections: [
    {
      title: "Why?",
      id: "why",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "The reason why Wompo is born is to make Web development easier: by taking advantage of native Javascript functionalities, Wompo allows to create",
          " ",
          /* @__PURE__ */ jsx("b", { children: "reusable, shareable, and fast Web-Components" }),
          ".",
          /* @__PURE__ */ jsx("br", {}),
          'Wompo was created by "merging" two main libraries: ',
          /* @__PURE__ */ jsx("b", { children: "React" }),
          " and ",
          /* @__PURE__ */ jsx("b", { children: "Lit" }),
          ". More specifically, the ",
          /* @__PURE__ */ jsx("b", { children: "Core concepts" }),
          " of React, and the ",
          /* @__PURE__ */ jsx("b", { children: "Blazing fast" }),
          " rendering speed of Lit. This allowed to create an easy-to-use and beginner-friendly library like React, while still keeping an eye on performances."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "But there are already tons of libraries that serve the same purpose and use Web-Components, like ",
          /* @__PURE__ */ jsx("b", { children: "Stencil" }),
          ", ",
          /* @__PURE__ */ jsx("b", { children: "Atomico" }),
          ", and, of course, ",
          /* @__PURE__ */ jsx("b", { children: "Lit" }),
          " (plus others), so why Wompo?",
          /* @__PURE__ */ jsx("br", {}),
          "The reason is simple: we don't like to overcomplicate things. Wompo is super-fast and has a super-common way of building components (the React way), so is it worth to learn completely new concepts and libraries to just save a couple of milliseconds and write more code to achieve the same result? Are months of studying and experimenting worth to get the same result? We think not. There is no need to learn Javascript classses, understaning the ",
          /* @__PURE__ */ jsx("b", { children: "this" }),
          " keyword, learn ",
          /* @__PURE__ */ jsx("b", { children: "Typescript" }),
          " (althought it is natively supported, because Wompo is built with it): the only thing you must know is basic HTML, basic CSS, and basic JS. That's it. Wompo is accessible by ",
          /* @__PURE__ */ jsx("b", { children: "completely begginers" }),
          " ",
          "but also by ",
          /* @__PURE__ */ jsx("b", { children: "experts" }),
          "."
        ] })
      ] })
    },
    {
      title: "Benefits",
      id: "benefits",
      content: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("p", { children: [
        "Using Wompo has the following benefits:",
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("b", { children: "React-like" }),
            ` - no need to learn a completely new library. If you know React, you already know also Wompo. Or at least the 90% of it. If you don't, Wompo has a super fast learning curve. By simply reading the "Quick start" section, you will already know how to build the 80% of your components.`
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("b", { children: "Performant" }),
            " - Faster than React, Preact, and Atomico, and only slightly slower than Lit."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("b", { children: "Built-in CSS modules" }),
            " - With Wompo there is no need to worry about style collisions: your class names will be automatically replaced with a unique class name."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("b", { children: "Automatic component naming" }),
            " - Wompo components will generate an automatic name for your DOM elements. Your ",
            /* @__PURE__ */ jsx("code", { children: "TodoList" }),
            ' will simply become a "todo-list", right?'
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("b", { children: "Re-Usable" }),
            " - Unlike other libraries, you don't need a compiler or anything, because Wompo it's built with native Javascript functionalities. This means you can use your components ",
            /* @__PURE__ */ jsx("b", { children: "everywhere" }),
            ". Wheter you already use React, Angular, Vue, or any other library (or none), you will not have to worry about anything, and your Wompo components will always work."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("b", { children: "JSX Support" }),
            " - Yeah, exactly. If you really can't leave without JSX, we got it for you: html check, props validation, and more. Of course, you will need a compiler for that."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("b", { children: "Bundle free" }),
            " - With most compiled libraries, you have to create a bundle with all your components in order to make it work. With Wompo you can even share a single component, and it will run ",
            /* @__PURE__ */ jsx("b", { children: "everywhere" }),
            " without problems."
          ] })
        ] })
      ] }) })
    },
    {
      title: "Web Components",
      id: "web-components",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "The only new concept you'll have to learn is:",
          " ",
          /* @__PURE__ */ jsx("i", { children: "what the hell is a Web-Component, and what is the difference between a React component and a Web-Component?" })
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "A ",
          /* @__PURE__ */ jsx("b", { children: "Web Component" }),
          ' is a native feature of browsers that allows to create a custom HTML element that can be re-used and "isolated" using ',
          /* @__PURE__ */ jsx("b", { children: "Shadow DOM" }),
          ", so that it'll not be able to alter and be altered by other elements in the page. Because it is native, if you want to use a third party component you'll just have to include the component's JS (and the Wompo library if you didn't already import it, which only weights 6KB) and you're ready to go. No need to compile. This means that you can use third party components even if you're not using a compiler or bundler, so",
          " ",
          /* @__PURE__ */ jsx("b", { children: "even websites that are not up-to-date with the latest technologies can easily integrate Wompo" }),
          ". You can even use Wompo while still using other libraries like React, Angular, and so on, without needing to worry about conflicts."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "The main difference between ",
          /* @__PURE__ */ jsx("i", { children: "React components" }),
          " and ",
          /* @__PURE__ */ jsx("i", { children: "Wompo components" }),
          ' is that Wompo components are actually elements that you can see in the DOM: they are not virtual. If you inspect this page, you can see elements like "content-section", "side-menu", and so on. These are Wompo components that are rendered in the DOM.',
          /* @__PURE__ */ jsx("br", {}),
          "This means that when you write your application, you have to keep in mind that your component will actually be an element with a ",
          /* @__PURE__ */ jsx("code", { children: "display: block" }),
          " style. Consider the following example, wrote in JSX:"
        ] }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
							function App(){
								return (
									<div style="display: flex;">
										<p>I'm inline</p>
										<p>I'm inline</p>
										<CustomComponent />
									</div>
								);
							}

							function CustomComponent(){
								return <>
									<p>I'm not inline</p>
									<p>I'm not inline</p>
								</>
							}
						`,
            language: "js"
          }
        ),
        /* @__PURE__ */ jsx("p", { children: "In React this will give a different result compared to Wompo, more specifically:" }),
        /* @__PURE__ */ jsx(
          Code,
          {
            code: `
							<!-- React will render this: -->
							<div style="display: flex;">
								<p>I'm inline</p>
								<p>I'm inline</p>
								<p>I'm not inline</p> <!--It will actually be inline here -->
								<p>I'm not inline</p> <!--It will actually be inline here -->
							</div>

							<!-- Wompo will render this: -->
							<div style="display: flex;">
								<p>I'm inline</p>
								<p>I'm inline</p>
								<custom-component>
									<p>I'm not inline</p>
									<p>I'm not inline</p>
								</custom-component>
							</div>
						`,
            language: "html"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "That's the only main difference and the only thing you have to keep in mind while developing your UI. For more about Web Components, you can find everything in details on the",
          " ",
          /* @__PURE__ */ jsx(
            "a",
            {
              target: "_blank",
              href: "https://developer.mozilla.org/en-US/docs/Web/API/Web_components",
              children: "MDN Documentation"
            }
          ),
          "."
        ] })
      ] })
    }
  ]
};
export default function Introduction() {
  return getPageLayout(content);
}
defineWompo(Introduction, {
  name: "introduction-page"
});
