import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "wompo/jsx-runtime";
import { defineWompo } from 'wompo';
import getPageLayout from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
import HtmlExample from '../../../examples/HtmlExample.js';
const content = {
    title: 'html API',
    description: (_jsxs(_Fragment, { children: ["How to use the ", _jsx("code", { children: "html" }), " function to define what a component should render and create custom templates."] })),
    sections: [
        {
            title: 'Description',
            id: 'description',
            content: (_jsx(_Fragment, { children: _jsxs("p", { children: ["The ", _jsx("code", { children: "html" }), " template function will allow to render complex HTML structures inside of your component. You can even create custom templates outside of the component and re-use them whenever needed."] }) })),
        },
        {
            title: 'Usage',
            id: 'usage',
            content: (_jsxs(_Fragment, { children: [_jsx(Code, { code: `
							const template = html\`structure\`;
						`, language: 'js' }), _jsxs("p", { children: ["The ", _jsx("code", { children: "html" }), " function is a template function, meaning that should not be called using parentesis, but using backquotes. The content of it will be the HTML structure for the template."] }), _jsx(Code, { code: `
							const staticTemplate = html\`<i>I am static</i>\`;

              const dynamicTemplate = html\`<div>
                I will render here the content of the [staticTemplate]: \${staticTemplate}.<br/>
                I can also render this values: <br/>
                Numbers: \${0}<br/>
                Strings: \${'ciao!'}<br/>
                Arrays: \${[0,1,2,'three', html\`four\`]}<br/>
                Other templates: \${html\`Look!\`}<br/>
                <br/>
                I can even conditionally render content:
                \${false && 'I will not be shown, *sad face'}<br/>
                \${true && 'I am visible!'}<br/>
                <br/>
                Falsy values will be ignored (except for numbers and strings):
                \${null} \${undefined} \${false}.
              </div>\`;
						`, language: 'js' }), _jsxs("p", { children: ["Inside of your component you can use this templates:", _jsx(Code, { code: `
                function Component(){
                  return dynamicTemplate;
                }
              `, language: 'js' }), "Result:", _jsx(HtmlExample, {})] })] })),
        },
    ],
};
export default function HtmlApi() {
    return getPageLayout(content);
}
defineWompo(HtmlApi, {
    name: 'html-api-apis-page',
});
