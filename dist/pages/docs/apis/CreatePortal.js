import{Fragment as o,jsx as e,jsxs as t}from"wompo/jsx-runtime";import{defineWompo as i}from"wompo";import r from"../../../utils/getPageLayout.js";import n from"../../../components/Code.js";const c={title:"createPortal API",description:t(o,{children:["How to use the ",e("code",{children:"createPortal"})," function to attach some HTML to another DOM element that is not inside of the component."]}),sections:[{title:"Description",id:"description",content:e(o,{children:t("p",{children:["The ",e("code",{children:"createPortal"})," function allows to attach a portion of your HTML that should be rendered inside of the component in another part of the DOM (for example, in the body). This part of the HTML will still listen to changes in your component and will be removed when the parent component is also removed."]})})},{title:"Usage",id:"usage",content:t(o,{children:[e(n,{code:`
							const toRender = createPortal(yourHtml, yourDomNode);
						`,language:"js"}),t("p",{children:["The function accepts two parameters: the first is your html to be rendered, while the second is the HTML DOM node on where you want your custom html to be attached.",e("br",{}),"Simple example:"]}),e(n,{code:`
              import { createPortal } from 'wompo';

              function App(){
                return html\`
                  <input class="custom-select" />
                  \${createPortal(html\`
                    <ul class="menu">
                      <li>Option 1</li>
                      <li>Option 2</li>
                      <li>Option 3</li>
                    </ul>
                  \`, document.body)}
                \`;
              }
						`,language:"js"}),e("p",{children:"In the above example, we want to create a custom select element, but we want to attach the custom menu with the select's options in the body, so that wherever the custom select is used, the menu will always be displayed in the correct position (which will be fixed in the screen). For this reason, we used the `createPortal` function."})]})}]};export default function a(){return r(c)}i(a,{name:"create-portal-apis-page"});
