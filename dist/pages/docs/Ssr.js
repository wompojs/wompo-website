import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "wompo/jsx-runtime";
import { defineWompo } from 'wompo';
import getPageLayout from '../../utils/getPageLayout.js';
import Note from '../../components/Note.js';
const content = {
    title: 'SSR',
    description: 'How to Server Side Render your components.',
    sections: [
        {
            title: 'Coming soon',
            id: 'coming-soon',
            content: (_jsx(_Fragment, { children: _jsxs(Note, { severity: 'warning', children: ["We are sad to inform you that Server Side Rendering (SSR) is not currently available for Wompo. The good news is that ", _jsx("b", { children: "we are working on it!" }), " Feel free to give your own contribution on ", _jsx("a", { href: 'https://github.com/wompojs/wompo', children: "GitHub" }), ". It would be highly appreciated!"] }) })),
        },
    ],
};
export default function Ssr() {
    return getPageLayout(content);
}
defineWompo(Ssr, {
    name: 'ssr-page',
});
