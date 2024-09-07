import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "wompo/jsx-runtime";
import { defineWompo } from 'wompo';
import getPageLayout from '../../../utils/getPageLayout.js';
import { Link } from 'wompo-router';
import Code from '../../../components/Code.js';
const content = {
    title: 'APIs',
    description: 'A collection of resources that Wompo exposes to add extra functionalities or simply to help the developer.',
    sections: [
        {
            title: 'Functions',
            id: 'functions',
            content: (_jsx(_Fragment, { children: _jsxs("p", { children: ["Wompo exposes a list of functions that you can use:", _jsxs("ul", { children: [_jsxs("li", { children: [_jsx(Link, { to: 'createContext', children: "createContext" }), " - Lets you create a Context that you can use in your application."] }), _jsxs("li", { children: [_jsx(Link, { to: 'defineWompo', children: "defineWompo" }), " - The function that you will use to declare your components."] }), _jsxs("li", { children: [_jsx(Link, { to: 'html', children: "html" }), " - The result of this function is what must be returned by every component."] }), _jsxs("li", { children: [_jsx(Link, { to: 'lazy', children: "lazy" }), " - For dynamically imported components."] })] })] }) })),
        },
        {
            title: 'Constants',
            id: 'constants',
            content: (_jsx(_Fragment, { children: _jsxs("p", { children: ["Wompo exposes also some constant variables that you can use:", _jsxs("ul", { children: [_jsxs("li", { children: [_jsx(Link, { to: 'wompoDefaultOptions', children: "wompDefaultOptions" }), " - The default options that Wompo will use when initializing a component for the first time. You are free to customize them."] }), _jsxs("li", { children: [_jsx(Link, { to: 'registeredComponents', children: "registeredComponents" }), " - An object containing the list of registered components."] })] })] }) })),
        },
        {
            title: 'Element API',
            id: 'wompo-element',
            content: (_jsx(_Fragment, { children: _jsxs("p", { children: ["The ", _jsx(Link, { to: 'element', children: "Element API" }), " represents the type of a Wompo Component DOM instance. You can use it to call methods and further customize your components."] }) })),
        },
        {
            title: 'Types',
            id: 'types',
            content: (_jsx(_Fragment, { children: _jsxs("p", { children: ["For TypeScript users, Wompo exposes the following types:", _jsxs("ul", { children: [_jsxs("li", { children: [_jsx("code", { children: "RenderHtml" }), " - The type that the ", _jsx(Link, { to: 'html', children: "html" }), " function will return.", _jsx(Code, { code: `
                    interface RenderHtml {
                      parts: TemplateStringsArray;
                      values: any[];
                      _$wompHtml: true;
                    }
                  `, language: 'ts' })] }), _jsxs("li", { children: [_jsx("code", { children: "WompoProps" }), " - The props that any component has and allows. If you use JSX they are also the attributes that the JSX element allows.", _jsx(Code, { code: `
                    interface WompoProps {
                      /** The children of the component instance */
                      children?: WompoChildren;
                      /** The styles generated from the CSS provided */
                      styles?: { [key: string]: string };
                      /** In DEV_MODE, will write on the console performance informations. */
                      ['wc-perf']?: boolean;
                      /** The style of a component to customize it through the style attribute in the DOM. */
                      style?: string | Partial<CSSStyleDeclaration> | object;
                      /** A potential reference to the element. */
                      ref?: RefHook<any>;
                      /** The ID of the element */
                      id?: string;
                      /** The classes of the element */
                      class?: string;
                    }
                  `, language: 'ts' })] }), _jsxs("li", { children: [_jsx("code", { children: "WompoComponentOptions" }), " - The options that you can put as a second parameter in the ", _jsx(Link, { to: 'defineWompo', children: "defineWompo" }), " function.", _jsx(Code, { code: `
                    interface WompoComponentOptions {
                      /**
                       * Default value: \`null\`.
                       * The component name. If not defined, the component name will be the name of the function in
                       * hyphen-case. If the component doesn't have an hyphen, a "wompo" string will be placed as a
                       * suffix.
                       * E.g. TabPanel = tab-panel, Counter = counter-wompo
                       */
                      name?: string;
                      /**
                       * Default value: \`false\`. If true, the component will be rendered in a shadow DOM.
                       */
                      shadow?: boolean;
                      /**
                       * Default value: \`true\`. If true, the CSS of the component will be replaced with a more unique
                       * CSS. This is done by simply putting the component name as a prefix in every class.
                       * The generated class names will be put in the [styles] prop of the component.
                       * This is done to avoid styles collisions.
                       * E.g. CounterComponent.css = \`.button\` => .counter-component__button
                       */
                      cssModule?: boolean;
                    }
                  `, language: 'ts' })] }), _jsxs("li", { children: [_jsx("code", { children: "WompoComponent<Props extends WompoProps = WompoProps>" }), " - It's the", ' ', _jsx("b", { children: "functional" }), " component's type.", _jsx(Code, { code: `
                    interface WompoComponent<Props extends WompoProps = WompoProps> {
                      /** The props of the component */
                      (props: Props): RenderHtml;
                      /**
                       * The specific styles of the component.
                       */
                      css?: string;
                      /** The component name, elaborated in the defineWompo function */
                      componentName?: string;
                      /** Identifies the component */
                      _$wompF?: true;
                      /** The generated class of the component */
                      class?: WompoElementClass<Props>;
                      /** Options */
                      options?: {
                        generatedCSS: string;
                        styles: { [key: string]: string };
                        shadow: boolean;
                      };
                    }
                  `, language: 'ts' })] }), _jsxs("li", { children: [_jsxs("code", { children: ["WompoElement<Props extends WompoProps = WompoProps, Exposed = ", ">"] }), ' ', "A Wompo Component ", _jsx("b", { children: "Instance" }), ". A detailed description of it is present in the", ' ', _jsx(Link, { to: 'element', children: "Element API" }), "."] }), _jsxs("li", { children: [_jsx("code", { children: "LazyCallbackResult" }), " - The result that the callback provided in the", ' ', _jsx(Link, { to: 'lazy', children: "lazy" }), " function must return.", _jsx(Code, { code: `type LazyCallbackResult = Promise<{ default: WompoComponent }>;`, language: 'ts' })] }), _jsxs("li", { children: [_jsx("code", { children: "LazyResult" }), " - The result type of the ", _jsx(Link, { to: 'lazy', children: "lazy" }), ' ', "function.", _jsx(Code, { code: `
                    type LazyResult = {
                      (): Promise<WompoComponent<WompoProps>>;
                      _$wompLazy: boolean;
                    };
                  `, language: 'ts' })] })] })] }) })),
        },
    ],
};
export default function Apis() {
    return getPageLayout(content);
}
defineWompo(Apis, {
    name: 'docs-apis-page',
});
