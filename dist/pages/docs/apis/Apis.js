import{Fragment as s,jsx as e,jsxs as t}from"womp/jsx-runtime";import{defineWomp as l}from"womp";import a from"../../../utils/getPageLayout.js";import{Link as o}from"womp-router";import n from"../../../components/Code.js";const p={title:"APIs",description:"A collection of resources that Womp exposes to add extra functionalities or simply to help the developer.",sections:[{title:"Functions",id:"functions",content:e(s,{children:t("p",{children:["Womp exposes a list of functions that you can use:",t("ul",{children:[t("li",{children:[e(o,{to:"createContext",children:"createContext"})," - Lets you create a Context that you can use in your application."]}),t("li",{children:[e(o,{to:"defineWomp",children:"defineWomp"})," - The function that you will use to declare your components."]}),t("li",{children:[e(o,{to:"html",children:"html"})," - The result of this function is what must be returned by every component."]}),t("li",{children:[e(o,{to:"lazy",children:"lazy"})," - For dynamically imported components."]})]})]})})},{title:"Constants",id:"constants",content:e(s,{children:t("p",{children:["Womp exposes also some constant variabled that you can use:",t("ul",{children:[t("li",{children:[e(o,{to:"wompDefaultOptions",children:"wompDefaultOptions"})," - The default options that Womp will use when initializing a component for the first time. You are free to customize them."]}),t("li",{children:[e(o,{to:"registeredComponents",children:"registeredComponents"})," - An object containing the list of registered components."]})]})]})})},{title:"Element API",id:"womp-element",content:e(s,{children:t("p",{children:["The ",e(o,{to:"element",children:"Element API"})," represents the type of a Womp Component DOM instance. You can use it to call methods and further customize your components."]})})},{title:"Types",id:"types",content:e(s,{children:t("p",{children:["For TypeScript users, Womp exposes the following types:",t("ul",{children:[t("li",{children:[e("code",{children:"RenderHtml"})," - The type that the ",e(o,{to:"html",children:"html"})," function will return.",e(n,{code:`
                    interface RenderHtml {
                      parts: TemplateStringsArray;
                      values: any[];
                      _$wompHtml: true;
                    }
                  `,language:"ts"})]}),t("li",{children:[e("code",{children:"WompProps"})," - The props that any component has and allows. If you use JSX they are also the attributes that the JSX element allows.",e(n,{code:`
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
                  `,language:"ts"})]}),t("li",{children:[e("code",{children:"WompComponentOptions"})," - The options that you can put as a second parameter in the ",e(o,{to:"defineWomp",children:"defineWomp"})," function.",e(n,{code:`
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
                  `,language:"ts"})]}),t("li",{children:[e("code",{children:"WompComponent<Props extends WompProps = WompProps>"})," - It's the"," ",e("b",{children:"functional"})," component's type.",e(n,{code:`
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
                  `,language:"ts"})]}),t("li",{children:[t("code",{children:["WompElement<Props extends WompProps = WompProps, Exposed = ",">"]})," A Womp Component ",e("b",{children:"Instance"}),". A detailed description of it is present in the"," ",e(o,{to:"element",children:"Element API"}),"."]}),t("li",{children:[e("code",{children:"LazyCallbackResult"})," - The result that the callback provided in the"," ",e(o,{to:"lazy",children:"lazy"})," function must return.",e(n,{code:"type LazyCallbackResult = Promise<{ default: WompComponent }>;",language:"ts"})]}),t("li",{children:[e("code",{children:"LazyResult"})," - The result type of the ",e(o,{to:"lazy",children:"lazy"})," ","function.",e(n,{code:`
                    type LazyResult = {
                      (): Promise<WompComponent<WompProps>>;
                      _$wompLazy: boolean;
                    };
                  `,language:"ts"})]})]})]})})}]};export default function i(){return a(p)}l(i,{name:"docs-apis-page"});
