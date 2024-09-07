import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "wompo/jsx-runtime";
import { defineWompo } from 'wompo';
import getPageLayout from '../../../utils/getPageLayout.js';
import { Link } from 'wompo-router';
const content = {
    title: 'Built-in components',
    description: (_jsx(_Fragment, { children: "Wompo exposes some specific built-in components that you can use to improve your application. You are then free to create your owns." })),
    sections: [
        {
            title: 'Components',
            id: 'components',
            content: (_jsx(_Fragment, { children: _jsxs("p", { children: ["The list of built-in Wompo components are the following:", _jsx("ul", { children: _jsxs("li", { children: [_jsx(Link, { to: 'suspense', children: "Suspense" }), " - Will let you display a fallback UI while the children are stil loading or performinc async operations."] }) })] }) })),
        },
    ],
};
export default function ComponentsPage() {
    return getPageLayout(content);
}
defineWompo(ComponentsPage, {
    name: 'components-page',
});
