import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "wompo/jsx-runtime";
import { defineWompo } from 'wompo';
import getPageLayout from '../../../utils/getPageLayout.js';
import { Link } from 'wompo-router';
import Note from '../../../components/Note.js';
const content = {
    title: 'Element API',
    description: (_jsxs(_Fragment, { children: ["How to use the ", _jsx("code", { children: "Element API" }), " to manually control a component and call methods on it."] })),
    sections: [
        {
            title: 'Description',
            id: 'description',
            content: (_jsx(_Fragment, { children: _jsx("p", { children: "Every Wompo Component will be rendered in the DOM as a Web Component, so it'll be accessible by your scripts. In this guide we will explore what methods you can call and which properties you can access." }) })),
        },
        {
            title: 'Methods',
            id: 'methods',
            content: (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["Every element exposes the followig methods:", _jsxs("ul", { children: [_jsxs("li", { children: [_jsx("code", { children: _jsx("b", { children: "requestRender()" }) }), ' ', "- If called, it will start the rendering process of the component."] }), _jsxs("li", { children: [_jsx("code", { children: _jsx("b", { children: "onDisconnected()" }) }), ' ', "- Should not be called directly: it's a callback function that you can override, and will be executed whenever the component is disconnected from the DOM."] }), _jsxs("li", { children: [_jsx("code", { children: _jsx("b", { children: "updateProp(propName, newValue)" }) }), ' ', "- It will update a ", _jsx("b", { children: "prop" }), " of the component and automatically ask to re-render it if the new value differs from the previous one. The first parameter is the name of the prop you want to update, and the second is the new value you want to set on it."] })] })] }), _jsxs(Note, { severity: 'info', children: ["If you used the ", _jsx(Link, { to: '/docs/hooks/useExposed', children: "useExposed" }), " hook inside of your component, the component will also have the methods you exposed."] })] })),
        },
        {
            title: 'Properties',
            id: 'properties',
            content: (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["Every element exposes the followig properties:", _jsxs("ul", { children: [_jsxs("li", { children: [_jsx("code", { children: _jsx("b", { children: "props" }) }), ' ', "- The object containing all the props of the component."] }), _jsxs("li", { children: [_jsx("code", { children: _jsx("b", { children: "hooks" }) }), ' ', "- The list of hooks that the component has. You can access this property but we strongly recommend to ", _jsx("b", { children: "not modify" }), " any of them. It is exposed only so that you can ", _jsx("b", { children: "add" }), " your own hooks. See the ", _jsx(Link, { to: '/docs/hooks/useHook', children: "useHook" }), ' ', "hook to know more."] })] })] }), _jsxs(Note, { severity: 'info', children: ["If you used the ", _jsx(Link, { to: '/docs/hooks/useExposed', children: "useExposed" }), " hook inside of your component, the component will also have the properties you exposed."] })] })),
        },
    ],
};
export default function ElementApi() {
    return getPageLayout(content);
}
defineWompo(ElementApi, {
    name: 'element-api-apis-page',
});
