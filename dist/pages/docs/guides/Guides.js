import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "wompo/jsx-runtime";
import { defineWompo } from 'wompo';
import getPageLayout from '../../../utils/getPageLayout.js';
import { Link } from 'wompo-router';
const content = {
    title: 'Wompo Guides',
    description: 'Learn Wompo by following these easy tutorials and guides.',
    sections: [
        {
            title: 'Guides',
            id: 'guides',
            content: (_jsxs(_Fragment, { children: [_jsx("p", { children: "Wompo has the following resources to help you learn and understand completely how Wompo works and what you can do to create your perfect application and share your custom components with the world." }), _jsxs("ul", { children: [_jsxs("li", { children: [_jsx(Link, { to: 'quick-start', children: "Quick Start" }), " - Learn the 80% of Wompo by simply creating a ", _jsx("code", { children: "Counter" }), " component."] }), _jsxs("li", { children: [_jsx(Link, { to: 'complex-example', children: "Complex Example" }), " - Explore more of the Wompo library and try more hooks by building a ", _jsx("b", { children: "Todo List" }), " application."] }), _jsxs("li", { children: [_jsx(Link, { to: 'styling', children: "Styling" }), " - Explore different ways to style your custom components and create your unique components to share to the world."] }), _jsxs("li", { children: [_jsx(Link, { to: 'custom-hooks', children: "Custom Hooks" }), " - See how you can create your custom hooks to avoid repeated code and optimize your components."] })] })] })),
        },
    ],
};
export default function Guides() {
    return getPageLayout(content);
}
defineWompo(Guides, {
    name: 'guides-page',
});
