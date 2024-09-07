import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "wompo/jsx-runtime";
import { defineWompo } from 'wompo';
import getPageLayout from '../../../utils/getPageLayout.js';
import { Link } from 'wompo-router';
const content = {
    title: 'Hooks',
    description: 'What are hooks: how and when to use them.',
    sections: [
        {
            title: 'What are hooks?',
            id: 'what-are-hooks',
            content: (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["Hooks are helper functions that let you add specific functionalities in your Wompo components. This functions will \"hook\" into the component so that they have access to the whole HTML instance and operate adding functionalities to it. More specifically, they allow to:", _jsxs("ul", { children: [_jsx("li", { children: "Make your component dynamic" }), _jsx("li", { children: "Create callbacks that will be executed on specific cases" }), _jsx("li", { children: "Keep a variable's value stable across renders" }), _jsxs("li", { children: ["Get a specific ", _jsx("b", { children: "Context" })] }), _jsx("li", { children: "Optimize performances by avoiding useless re-renderings" })] }), "Hooks work like ", _jsx("b", { children: "import statements" }), " inside a component. This implies that:", _jsxs("ol", { children: [_jsxs("li", { children: ["Like import statements, they ", _jsx("b", { children: "must" }), " be declared on top of the component, in the first lines, before any operation is performed."] }), _jsx("li", { children: "They cannot be conditional or executed inside loops." })] }), "If these conditions are not respected, the component might have unexpected behaviors."] }), _jsxs("p", { children: ["Wompo offers a good variety of hooks, but you are also completely free to create your own very easily.", _jsx("br", {})] })] })),
        },
        {
            title: 'State hooks',
            id: 'state-hooks',
            content: (_jsx(_Fragment, { children: _jsxs("p", { children: ["State hooks are what allow to make a component dynamic and cause a re-render of it, so that you can see visual updates in your component. To do that, Wompo offers the following hooks:", _jsxs("ul", { children: [_jsxs("li", { children: [_jsx(Link, { to: 'useState', children: "useState" }), " - Probably the most common hook you will use: creates a stateful variable and a setter function that will cause a re-render of the component when called (if the new value differs from the old one)."] }), _jsxs("li", { children: [_jsx(Link, { to: 'useReducer', children: "useReducer" }), " - For ", _jsx("b", { children: "Redux" }), " fans. This hook allows to elegantly handle the state of a component using a ", _jsx("b", { children: "reducer" }), " to handle all the operations to alter the state and a ", _jsx("b", { children: "dispatch" }), " function to set the new state."] })] })] }) })),
        },
        {
            title: 'Effect hooks',
            id: 'effect-hooks',
            content: (_jsx(_Fragment, { children: _jsxs("p", { children: ["Effect hooks are what allow to execute a specific ", _jsx("b", { children: "callback" }), " when one of your", ' ', _jsx("b", { children: "dependencies" }), " changes, or simply on the first (or on every) render. This dependencies are simply an array of values. The effect hooks are:", _jsxs("ul", { children: [_jsxs("li", { children: [_jsx(Link, { to: 'useEffect', children: "useEffect" }), " - After ", _jsx("b", { children: "useState" }), ", the probably second most common hook you will use: will execute the callback after a render if any of its dependencies changed. The callback will be executed ", _jsx("b", { children: "Asynchronously" }), "."] }), _jsxs("li", { children: [_jsx(Link, { to: 'useLayoutEffect', children: "useLayoutEffect" }), " - It's the same as the", ' ', _jsx("b", { children: "useEffect" }), " hook. The only difference is that the callback is executed", ' ', _jsx("b", { children: "Synchronously" }), " immediately after a render, before you can see visual changes. The ", _jsx("i", { children: "useEffect" }), " hook is preferred, because it'll not saturate the JS call stack."] })] })] }) })),
        },
        {
            title: 'Performance hooks',
            id: 'performance-hooks',
            content: (_jsx(_Fragment, { children: _jsxs("p", { children: ["Performance hooks let you skip useless operations across renders, or keep a value stable between renders so it's not re-initialized every time, allowing to optimize the component by avoiding unnecessary re-renderings.", _jsx("br", {}), "Performance hooks are:", _jsxs("ul", { children: [_jsxs("li", { children: [_jsx(Link, { to: 'useRef', children: "useRef" }), " - It'll keep a value stable across renders, by always returning the last saved value. It can optionally also be used to reference a node in the DOM."] }), _jsxs("li", { children: [_jsx(Link, { to: 'useCallback', children: "useCallback" }), " - The useCallback hook will take a function and save it so that it's not re-created on every render. This is useful if you're using a function as an attribute value of some other components, because the attribute will always have the same value (remember that in Javascript two functions are never equal, unless a function is compared to itself)."] }), _jsxs("li", { children: [_jsx(Link, { to: 'useMemo', children: "useMemo" }), " - This hook will let you execute a callback function and elaborate its result only when a dependency changes, rather than on every render."] })] })] }) })),
        },
        {
            title: 'Context hooks',
            id: 'context-hooks',
            content: (_jsx(_Fragment, { children: _jsxs("p", { children: ["A Context hook will let you ", _jsx("b", { children: "obtain a value provided by another parent element" }), ", more specifically, a ", _jsx("code", { children: "Context.Provider" }), " element. There is only one context hook:", _jsx("ul", { children: _jsxs("li", { children: [_jsx(Link, { to: 'useContext', children: "useContext" }), " - Will return the value provided by the closest parent ", _jsx("code", { children: "Context.Provider" }), " of the specified context. If there is not one, the default value of the context will be returned instead. The component that uses this hook will automatically re-render whenever the value provided by the provider changes."] }) })] }) })),
        },
        {
            title: 'Helper hooks',
            id: 'helper-hooks',
            content: (_jsx(_Fragment, { children: _jsxs("p", { children: ["Helper hooks are simple hooks that solve common problems. The currently available helper hooks are:", _jsxs("ul", { children: [_jsxs("li", { children: [_jsx(Link, { to: 'useId', children: "useId" }), " - Will return a unique string in the format", ' ', _jsx("code", { children: ":w<number>:" }), ". The ID will not change on every re-render. This is useful when you want to use IDs for node elements inside of a component. Common use cases are for inputs, labels, and accessibility."] }), _jsxs("li", { children: [_jsx(Link, { to: 'useExposed', children: "useExposed" }), " - The useExposed hook will let you expose some values and/or functions in the comonent's instance of the DOM. This allows, for example, to select a DOM node and call a method on it. Can be useful to", ' ', _jsx("b", { children: "Expose the state" }), ". Commonly used in combination with the ", _jsx("i", { children: "useRef" }), " hook."] }), _jsxs("li", { children: [_jsx(Link, { to: 'useAsync', children: "useAsync" }), " - This hook will take care of asynchronous operations in the component by executing a callback on first render and when one of its dependencies changes. This hooks integrates with the", ' ', _jsx(Link, { to: '/docs/components/suspense', children: "Suspense" }), " component, allowing to easily handle the loading state of the component."] }), _jsxs("li", { children: [_jsx(Link, { to: 'useHook', children: "useHook" }), " - The useHook is a special hook used to create your own advanced hooks. Should only be used if the current hooks are not enough to satisfy your needs."] })] })] }) })),
        },
    ],
};
export default function Hooks() {
    return getPageLayout(content);
}
defineWompo(Hooks, {
    name: 'hooks-page',
});
