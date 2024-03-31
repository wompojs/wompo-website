import { Fragment, jsx, jsxs } from "womp/jsx-runtime";
import { defineWomp } from "womp";
import getPageLayout from "../../../utils/getPageLayout.js";
import { Link } from "womp-router";
import Code from "../../../components/Code.js";
const content = {
  title: "APIs",
  description: "A collection of resources that Womp exposes to add extra functionalities or simply to help the developer.",
  sections: [
    {
      title: "Functions",
      id: "functions",
      content: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("p", { children: [
        "Womp exposes a list of functions that you can use:",
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx(Link, { to: "createContext", children: "createContext" }),
            " - Lets you create a Context that you can use in your application."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx(Link, { to: "defineWomp", children: "defineWomp" }),
            " - The function that you will use to declare your components."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx(Link, { to: "html", children: "html" }),
            " - The result of this function is what must be returned by every component."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx(Link, { to: "lazy", children: "lazy" }),
            " - For dynamically imported components."
          ] })
        ] })
      ] }) })
    },
    {
      title: "Constants",
      id: "constants",
      content: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("p", { children: [
        "Womp exposes also some constant variabled that you can use:",
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx(Link, { to: "wompDefaultOptions", children: "wompDefaultOptions" }),
            " - The default options that Womp will use when initializing a component for the first time. You are free to customize them."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx(Link, { to: "registeredComponents", children: "registeredComponents" }),
            " - An object containing the list of registered components."
          ] })
        ] })
      ] }) })
    },
    {
      title: "Element API",
      id: "womp-element",
      content: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("p", { children: [
        "The ",
        /* @__PURE__ */ jsx(Link, { to: "element", children: "Element API" }),
        " represents the type of a Womp Component DOM instance. You can use it to call methods and further customize your components."
      ] }) })
    },
    {
      title: "Types",
      id: "types",
      content: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("p", { children: [
        "For TypeScript users, Womp exposes the following types:",
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("code", { children: "RenderHtml" }),
            " - The type that the ",
            /* @__PURE__ */ jsx(Link, { to: "html", children: "html" }),
            " function will return.",
            /* @__PURE__ */ jsx(
              Code,
              {
                code: `
                    interface RenderHtml {
                      parts: TemplateStringsArray;
                      values: any[];
                      _$wompHtml: true;
                    }
                  `,
                lang: "ts"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("code", { children: "WompProps" }),
            " - The props that any component has and allows. If you use JSX they are also the attributes that the JSX element allows.",
            /* @__PURE__ */ jsx(
              Code,
              {
                code: `
                    interface WompProps {
                      /** The children of the component instance */
                      children?: WompChildren;
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
                  `,
                lang: "ts"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("code", { children: "WompComponentOptions" }),
            " - The options that you can put as a second parameter in the ",
            /* @__PURE__ */ jsx(Link, { to: "defineWomp", children: "defineWomp" }),
            " function.",
            /* @__PURE__ */ jsx(
              Code,
              {
                code: `
                    interface WompComponentOptions {
                      /**
                       * Default value: \`null\`.
                       * The component name. If not defined, the component name will be the name of the function in
                       * hyphen-case. If the component doesn't have an hyphen, a "womp" string will be placed as a
                       * suffix.
                       * E.g. TabPanel = tab-panel, Counter = counter-womp
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
                  `,
                lang: "ts"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("code", { children: "WompComponent<Props extends WompProps = WompProps>" }),
            " - It's the",
            " ",
            /* @__PURE__ */ jsx("b", { children: "functional" }),
            " component's type.",
            /* @__PURE__ */ jsx(
              Code,
              {
                code: `
                    interface WompComponent<Props extends WompProps = WompProps> {
                      /** The props of the component */
                      (props: Props): RenderHtml;
                      /**
                       * The specific styles of the component.
                       */
                      css?: string;
                      /** The component name, elaborated in the defineWomp function */
                      componentName?: string;
                      /** Identifies the component */
                      _$wompF?: true;
                      /** The generated class of the component */
                      class?: WompElementClass<Props>;
                      /** Options */
                      options?: {
                        generatedCSS: string;
                        styles: { [key: string]: string };
                        shadow: boolean;
                      };
                    }
                  `,
                lang: "ts"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsxs("code", { children: [
              "WompElement<Props extends WompProps = WompProps, Exposed = ",
              ">"
            ] }),
            " A Womp Component ",
            /* @__PURE__ */ jsx("b", { children: "Instance" }),
            ". A detailed description of it is present in the",
            " ",
            /* @__PURE__ */ jsx(Link, { to: "element", children: "Element API" }),
            "."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("code", { children: "LazyCallbackResult" }),
            " - The result that the callback provided in the",
            " ",
            /* @__PURE__ */ jsx(Link, { to: "lazy", children: "lazy" }),
            " function must return.",
            /* @__PURE__ */ jsx(
              Code,
              {
                code: `type LazyCallbackResult = Promise<{ default: WompComponent }>;`,
                lang: "ts"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("code", { children: "LazyResult" }),
            " - The result type of the ",
            /* @__PURE__ */ jsx(Link, { to: "lazy", children: "lazy" }),
            " ",
            "function.",
            /* @__PURE__ */ jsx(
              Code,
              {
                code: `
                    type LazyResult = {
                      (): Promise<WompComponent<WompProps>>;
                      _$wompLazy: boolean;
                    };
                  `,
                lang: "ts"
              }
            )
          ] })
        ] })
      ] }) })
    }
  ]
};
export default function Apis() {
  return getPageLayout(content);
}
defineWomp(Apis);
