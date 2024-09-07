import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "wompo/jsx-runtime";
import { defineWompo } from 'wompo';
import getPageLayout from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
const content = {
    title: 'useId hook',
    description: (_jsxs(_Fragment, { children: ["How to use the ", _jsx("code", { children: "useId" }), " hook to generate a unique ID for your components."] })),
    sections: [
        {
            title: 'Description',
            id: 'description',
            content: (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["Hard-coding IDs in components is very often a bad idea. The ", _jsx("code", { children: "useId" }), " hook will solve this problem."] }), _jsxs("p", { children: ["This hook will generate a unique string ID for your component in the following format:", ' ', _jsx("code", { children: ":w<number>:" }), ". The number in between will simply be a counter that will be incremented every time the hook is called for the first time in a component. This ensures that the ID will be unique, but the ID will probably NOT be the same every time you reload the application."] })] })),
        },
        {
            title: 'Usage',
            id: 'usage',
            content: (_jsxs(_Fragment, { children: [_jsx(Code, { code: `
							const id = useId();
						`, language: 'js' }), _jsxs("p", { children: ["The ", _jsx("code", { children: "useId" }), " hook accepts no parameters and will return always the same value across re-renders."] })] })),
        },
        {
            title: 'Example: Accessibility',
            id: 'modal-example',
            content: (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["A common use case for the ", _jsx("code", { children: "useId" }), " is to solve accessibility problems or simply setting a \"for\" attribute to a label element."] }), _jsx(Code, { code: `
							import { defineWompo, html, useId } from 'wompo';

							export default function InputExample() {
								const hintId = useId(); // :w0:
								const inputId = useId(); // :w1:

								return html\`
									<label for=\${inputId}>Password:</label>
                  <input id=\${inputId} aria-describedby=\${hintId} />
                  <p id=\${hintId}>The password should contain at least 8 characters</p>
								\`;
							}

							defineWompo(InputExample);
						`, language: 'js' }), _jsxs("p", { children: ["Even if the ", _jsx("code", { children: "InputExample" }), " is rendered multiple times, it'll always keep working without having IDs clashes."] })] })),
        },
    ],
};
export default function UseId() {
    return getPageLayout(content);
}
defineWompo(UseId, {
    name: 'useid-hook-page',
});
