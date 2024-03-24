import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "womp/jsx-runtime";
import { defineWomp } from 'womp';
import getPageLayout from '../utils/getPage.js';
const content = {
    title: 'Introduction',
    description: 'Womp is a React-like Web-Component library for creating functional UIs in the Web.',
    sections: [
        {
            title: 'Why?',
            id: 'why',
            content: (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["The reason why Womp is born is to make Web development easier: by taking advantage of native Javascript functionalities, Womp allows you to create a reusable, shareable, and fast Web-Component.", _jsx("br", {}), "Womp was created by \"merging\" two main libraries: ", _jsx("b", { children: "React" }), " and ", _jsx("b", { children: "Lit" }), ". More specifically, the ", _jsx("b", { children: "Core concepts" }), " of React, and the ", _jsx("b", { children: "Blazing fast" }), " rendering speed of Lit. This allowed to create an easy-to-use and beginner-friendly library like React, while still keeping an eye on performances."] }), _jsx("p", { children: "Matter of fact: this documentation was built for completeness, but you can actually go to check the React documentation and realize it's kind of the same thing. This allows you to (super) easily migrate to Womp." }), _jsxs("p", { children: ["But there are already tons of libraries that serve the same purpose, like ", _jsx("b", { children: "Stencil" }), ", ", _jsx("b", { children: "Atomico" }), ", and, of course ", _jsx("b", { children: "Lit" }), ", so why Womp?", _jsx("br", {}), "The reason is simple: we don't like to overcomplicate things. Womp is already super-fast, is it worth it to learn completely new concepts and libraries to just save 2 milliseconds? Are 2 milliseconds worth months of studying and experimenting? We think not. There is no need to learn ", _jsx("b", { children: "Typescript" }), " (althought it is natively supported, because Womp is built with it), Javascript classses, and understaning the ", _jsx("b", { children: "this" }), ' ', "keyword: the only thing you must know is basic HTML, basic CSS, and basic JS. That's it. Womp is accessible by ", _jsx("b", { children: "completely begginers" }), " but also by experts."] })] })),
        },
        {
            title: 'Web Components',
            id: 'web-components',
            content: (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["The only new concept you'll have to learn is:", ' ', _jsx("i", { children: "what the hell is a Web-Component, and what is the difference between a React component and a Web-Component?" })] }), _jsxs("p", { children: ["A ", _jsx("b", { children: "Web Component" }), " is a native feature of browsers that allows to create a custom HTML element that can be re-used and \"isolated\" using ", _jsx("b", { children: "Shadow DOM" }), ", so that it'll not be able to alter and be altered by other elements in the page. Because it is native, if you want to use a third party component you'll just have to include the component's JS (and the Womp library if you didn't already import it, which only weights 5KB) and you're ready to go. No need to compile. This means that you can use third party components even if you're not using a compiler or bundler, so even websites that are not up-to-date with the latest technologies can easily integrate Womp. You can even use Womp while still using other libraries like React, Angular, and so on, without needing to worry about conflicts."] }), _jsxs("p", { children: ["You can find everything in details about Web Components on the", ' ', _jsx("a", { href: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_components', children: "MDN Documentation" }), "."] })] })),
        },
    ],
};
export default function Introduction() {
    return getPageLayout(content);
}
defineWomp(Introduction);
