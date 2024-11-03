import{Fragment as o,jsx as e,jsxs as t}from"wompo/jsx-runtime";import{defineWompo as i}from"wompo";import l from"../../../utils/getPageLayout.js";import s from"../../../components/Code.js";const a={title:"useSelf hook",description:t(o,{children:["How to use the ",e("code",{children:"useSelf"})," hook to get the instance of the element itself."]}),sections:[{title:"Description",id:"description",content:t(o,{children:[t("p",{children:["Sometimes you want to modify a custom element itself inside of it's own render function. To get the instance element, you can actually use the ",e("code",{children:"this"})," keyword, but a better option is to use the ",e("code",{children:"useSelf"})," hook."]}),t("p",{children:["This hook will simply return the instance element, but it's typescript friendly and it's safer to use, becasue the ",e("code",{children:"this"})," keyword can be altered."]})]})},{title:"Usage",id:"usage",content:t(o,{children:[e(s,{code:`
							const self = useSelf();
						`,language:"js"}),t("p",{children:["The ",e("code",{children:"useSelf"})," hook accepts no parameters."]})]})},{title:"Example: custom class",id:"modal-example",content:t(o,{children:[t("p",{children:["An example is to add a custom class to the element based on some conditions. To do that, you can use the ",e("code",{children:"useSelf"})," hook to access the element's instance."]}),e(s,{code:`
							import { defineWompo, html, useSelf } from 'wompo';

							export default function InputExample({ disabled, styles: s }) {
								const self = useSelf();

                useEffect(() => {
                  if(disabled) self.classList.add(s.disabled);
                }, [disabled])

								return html\`
                  <input disabled=\${disabled} />
								\`;
							}

              InputExample.css = \`
                .disabled {
                  opacity: .7;
                  cursor: not-allowed;
                }
              \`;

							defineWompo(InputExample);
						`,language:"js"})]})}]};export default function n(){return l(a)}i(n,{name:"use-self-hook-page"});
