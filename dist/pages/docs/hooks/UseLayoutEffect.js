import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "wompo/jsx-runtime";
import { defineWompo } from 'wompo';
import getPageLayout from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
import { Link } from 'wompo-router';
import Note from '../../../components/Note.js';
const content = {
    title: 'useLayoutEffect hook',
    description: (_jsxs(_Fragment, { children: ["How to use the ", _jsx("code", { children: "useLayoutEffect" }), " hook to create layout effect."] })),
    sections: [
        {
            title: 'Description',
            id: 'description',
            content: (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["The ", _jsx("code", { children: "useLayoutEffect" }), " hook works exactly like the", ' ', _jsx(Link, { to: '/docs/hooks/useEffect', children: "useEffect" }), " hook, with only one exception: unlike useEffect, it works ", _jsx("b", { children: "synchronously" }), ", meaning that the effect will be executed immediately after the render operations, and not when the browser's call stack is empty. This is quite useful when you want to see instant changes in your UI when something happens in your component."] }), _jsxs(Note, { severity: 'info', style: { margin: '2rem 0' }, children: [_jsx("b", { children: "Note:" }), " The fact that that the useLayoutEffect callback runs synchronously doesn't mean it will be executed \"inline\". The callback function will still be executed when the component already finished rendering a first time."] }), _jsx(Note, { severity: 'warning', children: "Using the useLayoutEffect hook will make your component take more time to render and will delay the moment where you can see visual changes in your component, especially with heavy operations. Use it only when strictly necessary and with caution." })] })),
        },
        {
            title: 'Usage',
            id: 'usage',
            content: (_jsxs(_Fragment, { children: [_jsx(Code, { code: `
							useLayoutEffect(effectFn, dependencies);
						`, language: 'js' }), _jsxs("p", { children: ["The ", _jsx("code", { children: "useLayoutEffect" }), " hook accepts an effect callback function and a list of dependencies. The effect function will be executed after the first render and whenever one of the listed dependencies changes."] }), _jsxs("p", { children: ["For more, check the ", _jsx(Link, { to: '/docs/hooks/useEffect', children: "useEffect" }), " hook documentation."] })] })),
        },
    ],
};
export default function UseLayoutEffect() {
    return getPageLayout(content);
}
defineWompo(UseLayoutEffect, {
    name: 'uselayouteffect-hook-page',
});
