import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "wompo/jsx-runtime";
import { defineWompo } from 'wompo';
import getPageLayout from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
import { Link } from 'wompo-router';
const content = {
    title: 'wompoDefaultOptions',
    description: (_jsx(_Fragment, { children: "How to customize the default options of Wompo components to satisfy your exigencies." })),
    sections: [
        {
            title: 'Description',
            id: 'description',
            content: (_jsx(_Fragment, { children: _jsxs("p", { children: ["Wompo exposes a ", _jsx("code", { children: "wompDefaultOptions" }), " object that is used to get the default values to use as the second parameter of the", ' ', _jsx(Link, { to: '/docs/apis/defineWompo', children: "defineWompo" }), " function.", _jsx("br", {}), "The options you can modify are:", _jsxs("ul", { children: [_jsxs("li", { children: [_jsx("b", { children: _jsx("code", { children: "shadow" }) }), ' ', "- Default \"false\"."] }), _jsxs("li", { children: [_jsx("b", { children: _jsx("code", { children: "cssModule" }) }), ' ', "- Default \"true\"."] })] }), "To know more about these options see the documentation about the", ' ', _jsx(Link, { to: '/docs/apis/defineWompo#usage', children: "defineWompo" }), " function."] }) })),
        },
        {
            title: 'Example',
            id: 'example: default shadow',
            content: (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["One common use case is to make your components use the Shadow DOM by default. To get this result, you should modify the default option", ' ', _jsx("b", { children: "before you define any other component" }), ". Components rendered ", _jsx("i", { children: "before" }), " you actually modified the default options will still have the old options applied."] }), _jsx(Code, { code: `
							import { wompDefaultOptions } from 'wompo';

							wompDefaultOptions.shadow = true;
						`, language: 'js' })] })),
        },
    ],
};
export default function WompoDefaultOptions() {
    return getPageLayout(content);
}
defineWompo(WompoDefaultOptions, {
    name: 'wompo-default-options-apis-page',
});
