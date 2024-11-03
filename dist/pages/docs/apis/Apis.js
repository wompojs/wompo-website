import{Fragment as i,jsx as e,jsxs as t}from"wompo/jsx-runtime";import{defineWompo as l}from"wompo";import a from"../../../utils/getPageLayout.js";import{Link as o}from"wompo-router";import n from"../../../components/Code.js";const p={title:"APIs",description:"A collection of resources that Wompo exposes to add extra functionalities or simply to help the developer.",sections:[{title:"Functions",id:"functions",content:e(i,{children:t("p",{children:["Wompo exposes a list of functions that you can use:",t("ul",{children:[t("li",{children:[e(o,{to:"createContext",children:"createContext"})," - Lets you create a Context that you can use in your application."]}),t("li",{children:[e(o,{to:"createPortal",children:"createPortal"})," - Lets you attach some html in another DOM object."]}),t("li",{children:[e(o,{to:"defineWompo",children:"defineWompo"})," - The function that you will use to declare your components."]}),t("li",{children:[e(o,{to:"html",children:"html"})," - The result of this function is what must be returned by every component."]}),t("li",{children:[e(o,{to:"lazy",children:"lazy"})," - For dynamically imported components."]}),t("li",{children:[e(o,{to:"unsafelyRenderString",children:"unsafelyRenderString"})," - Renders a string variable."]})]})]})})},{title:"Constants",id:"constants",content:e(i,{children:t("p",{children:["Wompo exposes also some constant variables that you can use:",t("ul",{children:[t("li",{children:[e(o,{to:"wompoDefaultOptions",children:"wompDefaultOptions"})," - The default options that Wompo will use when initializing a component for the first time. You are free to customize them."]}),t("li",{children:[e(o,{to:"registeredComponents",children:"registeredComponents"})," - An object containing the list of registered components."]})]})]})})},{title:"Element API",id:"wompo-element",content:e(i,{children:t("p",{children:["The ",e(o,{to:"element",children:"Element API"})," represents the type of a Wompo Component DOM instance. You can use it to call methods and further customize your components."]})})},{title:"Types",id:"types",content:e(i,{children:t("p",{children:["For TypeScript users, Wompo exposes the following types:",t("ul",{children:[t("li",{children:[e("code",{children:"RenderHtml"})," - The type that the ",e(o,{to:"html",children:"html"})," function will return.",e(n,{code:`
                    interface RenderHtml {
                      parts: TemplateStringsArray;
                      values: any[];
                      _$wompHtml: true;
                    }
                  `,language:"ts"})]}),t("li",{children:[e("code",{children:"WompoProps"})," - The props that any component has and allows. If you use JSX they are also the attributes that the JSX element allows.",e(n,{code:`
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
                  `,language:"ts"})]}),t("li",{children:[e("code",{children:"WompoComponentOptions"})," - The options that you can put as a second parameter in the ",e(o,{to:"defineWompo",children:"defineWompo"})," function.",e(n,{code:`
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
                  `,language:"ts"})]}),t("li",{children:[e("code",{children:"WompoComponent<Props extends WompoProps = WompoProps>"})," - It's the"," ",e("b",{children:"functional"})," component's type.",e(n,{code:`
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
                  `,language:"ts"})]}),t("li",{children:[t("code",{children:["WompoElement<Props extends WompoProps = WompoProps, Exposed = ",">"]})," ","A Wompo Component ",e("b",{children:"Instance"}),". A detailed description of it is present in the"," ",e(o,{to:"element",children:"Element API"}),"."]}),t("li",{children:[e("code",{children:"LazyCallbackResult"})," - The result that the callback provided in the"," ",e(o,{to:"lazy",children:"lazy"})," function must return.",e(n,{code:"type LazyCallbackResult = Promise<{ default: WompoComponent }>;",language:"ts"})]}),t("li",{children:[e("code",{children:"LazyResult"})," - The result type of the ",e(o,{to:"lazy",children:"lazy"})," ","function.",e(n,{code:`
                    type LazyResult = {
                      (): Promise<WompoComponent<WompoProps>>;
                      _$wompLazy: boolean;
                    };
                  `,language:"ts"})]})]})]})})}]};export default function s(){return a(p)}l(s,{name:"docs-apis-page"});
