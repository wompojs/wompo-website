import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "wompo/jsx-runtime";
import { defineWompo } from 'wompo';
import getPageLayout from '../../utils/getPageLayout.js';
import Code from '../../components/Code.js';
const content = {
    title: 'Introduction',
    description: 'Wompo is a fast and ligthweight React-like Web-Component library for creating functional UIs in the Web.',
    sections: [
        {
            title: 'Why?',
            id: 'why',
            content: (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["The reason why Wompo is born is to make Web development easier: by taking advantage of native Javascript functionalities, Wompo allows to create", ' ', _jsx("b", { children: "reusable, shareable, and fast Web-Components" }), ".", _jsx("br", {}), "Wompo was created by \"merging\" two main libraries: ", _jsx("b", { children: "React" }), " and ", _jsx("b", { children: "Lit" }), ". More specifically, the ", _jsx("b", { children: "Core concepts" }), " of React, and the ", _jsx("b", { children: "Blazing fast" }), " rendering speed of Lit. This allowed to create an easy-to-use and beginner-friendly library like React, while still keeping an eye on performances."] }), _jsxs("p", { children: ["But there are already tons of libraries that serve the same purpose and use Web-Components, like ", _jsx("b", { children: "Stencil" }), ", ", _jsx("b", { children: "Atomico" }), ", and, of course, ", _jsx("b", { children: "Lit" }), " (plus others), so why Wompo?", _jsx("br", {}), "The reason is simple: we don't like to overcomplicate things. Wompo is super-fast and has a super-common way of building components (the React way), so is it worth to learn completely new concepts and libraries to just save a couple of milliseconds and write more code to achieve the same result? Are months of studying and experimenting worth to get the same result? We think not. There is no need to learn Javascript classes, understaning the ", _jsx("b", { children: "this" }), " keyword, learn ", _jsx("b", { children: "Typescript" }), " (althought it is natively supported, because Wompo is built with it): the only thing you must know is basic HTML, basic CSS, and basic JS. That's it. Wompo is accessible by ", _jsx("b", { children: "completely begginers" }), ' ', "but also by ", _jsx("b", { children: "experts" }), "."] })] })),
        },
        {
            title: 'Benefits',
            id: 'benefits',
            content: (_jsx(_Fragment, { children: _jsxs("p", { children: ["Using Wompo has the following benefits:", _jsxs("ul", { children: [_jsxs("li", { children: [_jsx("b", { children: "React-like" }), " - no need to learn a completely new library. If you know React, you already know also Wompo. Or at least the 90% of it. If you don't, Wompo has a super fast learning curve. By simply reading the \"Quick start\" section, you will already know how to build the 80% of your components."] }), _jsxs("li", { children: [_jsx("b", { children: "Performant" }), " - Faster than React and Preact, and only slightly slower than Lit."] }), _jsxs("li", { children: [_jsx("b", { children: "Built-in CSS modules" }), " - With Wompo there is no need to worry about style collisions: your class names will be automatically replaced with a unique class name."] }), _jsxs("li", { children: [_jsx("b", { children: "Automatic component naming" }), " - Wompo components will generate an automatic name for your DOM elements. Your ", _jsx("code", { children: "TodoList" }), " will simply become a \"todo-list\", right?"] }), _jsxs("li", { children: [_jsx("b", { children: "Re-Usable" }), " - Unlike other libraries, you don't need a compiler or anything, because Wompo it's built with native Javascript functionalities. This means you can use your components ", _jsx("b", { children: "everywhere" }), ". Wheter you already use React, Angular, Vue, or any other library (or none), you will not have to worry about anything, and your Wompo components will always work."] }), _jsxs("li", { children: [_jsx("b", { children: "JSX Support" }), " - Yeah, exactly. If you really can't leave without JSX, we got it for you: html check, props validation, and more. Of course, you will need a compiler for that."] }), _jsxs("li", { children: [_jsx("b", { children: "Bundle free" }), " - With most compiled libraries, you have to create a bundle with all your components in order to make it work. With Wompo you can even share a single component, and it will run ", _jsx("b", { children: "everywhere" }), " without problems."] })] })] }) })),
        },
        {
            title: 'Web Components',
            id: 'web-components',
            content: (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["The only new concept you'll have to learn is:", ' ', _jsx("i", { children: "what the hell is a Web-Component, and what is the difference between a React component and a Web-Component?" })] }), _jsxs("p", { children: ["A ", _jsx("b", { children: "Web Component" }), " is a native feature of browsers that allows to create a custom HTML element that can be re-used and \"isolated\" using ", _jsx("b", { children: "Shadow DOM" }), ", so that it'll not be able to alter and be altered by other elements in the page. Because it is native, if you want to use a third party component you'll just have to include the component's JS (and the Wompo library if you didn't already import it, which only weights 6KB) and you're ready to go. No need to compile. This means that you can use third party components even if you're not using a compiler or bundler, so", ' ', _jsx("b", { children: "even websites that are not up-to-date with the latest technologies can easily integrate Wompo" }), ". You can even use Wompo while still using other libraries like React, Angular, and so on, without needing to worry about conflicts."] }), _jsxs("p", { children: ["The main difference between ", _jsx("i", { children: "React components" }), " and ", _jsx("i", { children: "Wompo components" }), " is that Wompo components are actually elements that you can see in the DOM: they are not virtual. If you inspect this page, you can see elements like \"content-section\", \"side-menu\", and so on. These are Wompo components that are rendered in the DOM.", _jsx("br", {}), "This means that when you write your application, you have to keep in mind that your component will actually be an element with a ", _jsx("code", { children: "display: block" }), " style. Consider the following example, wrote in JSX:"] }), _jsx(Code, { code: `
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
						`, language: "js" }), _jsx("p", { children: "In React this will give a different result compared to Wompo, more specifically:" }), _jsx(Code, { code: `
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
						`, language: "html" }), _jsxs("p", { children: ["That's the only main difference and the only thing you have to keep in mind while developing your UI. For more about Web Components, you can find everything in details on the", ' ', _jsx("a", { target: "_blank", href: "https://developer.mozilla.org/en-US/docs/Web/API/Web_components", children: "MDN Documentation" }), "."] })] })),
        },
    ],
};
export default function Introduction() {
    return getPageLayout(content);
}
defineWompo(Introduction, {
    name: 'introduction-page',
});
