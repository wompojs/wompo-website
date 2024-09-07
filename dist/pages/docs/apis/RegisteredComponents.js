import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "wompo/jsx-runtime";
import { defineWompo } from 'wompo';
import getPageLayout from '../../../utils/getPageLayout.js';
import Note from '../../../components/Note.js';
const content = {
    title: 'registeredComponents',
    description: _jsx(_Fragment, { children: "How to get the collection of the components registered in the browser." }),
    sections: [
        {
            title: 'Description',
            id: 'description',
            content: (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["The ", _jsx("code", { children: "registeredComponent" }), " constant is an object exported by the Wompo library that contains the names of the registered Web Components as keys, and their corresponding functional Component as a value (not the generated HTML class)."] }), _jsx(Note, { severity: 'warning', children: "This object is supposed to be read-only." })] })),
        },
    ],
};
export default function RegisteredComponents() {
    return getPageLayout(content);
}
defineWompo(RegisteredComponents, {
    name: 'registered-components-apis-page',
});
