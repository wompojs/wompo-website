import{Fragment as a,jsx as e,jsxs as o}from"wompo/jsx-runtime";import{defineWompo as i}from"wompo";import h from"../../../utils/getPageLayout.js";import s from"../../../components/Code.js";import n from"../../../components/Note.js";import{Link as t}from"wompo-router";const c={title:"useHook hook",description:o(a,{children:["How to use the ",e("code",{children:"useHook"})," hook to create your custom advanced hook."]}),sections:[{title:"Description",id:"description",content:o(a,{children:[o("p",{children:["At some point you may want to further customize how wompo works, and maybe add a specific functionality to your components that Wompo doesn't actually support. The"," ",e("code",{children:"useHook"}),"hook will let you have access to the component's instance and the hook index."]}),o(n,{severity:"warning",children:["This hook should ",e("b",{children:"only"})," be used to create ",e("b",{children:"advanced"})," custom hooks. The already present Wompo's hooks cover 90% of the average cases, and you can create a custom hook by simply combining them. See the"," ",e(t,{to:"/docs/guides/custom-hooks",children:"Custom hooks"})," section for more."]})]})},{title:"Usage",id:"usage",content:o(a,{children:[e(s,{code:`
							const [component, hookIndex] = useHook();
						`,language:"js"}),o("p",{children:["The ",e("code",{children:"useHook"})," hook accepts no parameters and will return always an array with two values: the instance of the currently rendering component, and the current hook index of the component."]}),e("p",{children:"But what is the hook index? Let's analyze how Wompo hooks work in the next section."})]})},{title:"Deep dive into Wompo hooks",id:"deep-dive",content:o(a,{children:[o("p",{children:["Maybe you already wondered how can Wompo return always the same values when you use hooks if they have no reference about the current component. The answer is that hooks are ",e("b",{children:"not"})," pure functions. Every time a component renders, the value of an external variable called ",e("code",{children:"currentRenderingComponent"})," is set to the instance of the current rendering component (big surprise huh?). This instance is the same returned by the ",e("code",{children:"useHook"})," hook. Then, another external variable called"," ",e("code",{children:"currentHookIndex"})," is set to 0, and incremented every time a hook is called inside of the component. The hook value is internally determined by the hook itself, and also what to return. The hook will be saved into the"," ",o("b",{children:[e("code",{children:"hooks"})," array"]})," ","that every component has (you can actually select a wompo element in the console and write ",e("code",{children:"$0.hooks"})," to see it).",e("br",{}),"It's something like this (very approximatively):"]}),e(s,{code:`
              let currentRenderingComponent = null;
              let currentHookIndex = 0;

              function useAnyHook(value){
                // The hook is stored
                currentRenderingComponent.hooks[currentHookIndex] = value;
                // The hook index is incremented
                currentHookIndex++;
                return value;
              }

              // This is your custom component
              function CustomComponent(){
                const hook1 = useAnyHook(0);
                const hook2 = useAnyHook({});
                const hook3 = useAnyHook([]);
                return html\`...\`;
              }

              // This is the class that will be generated for your component
              class Wompo extends HTMLElement {

                render(){
                  // Setting the currentRenderingComponent to "this" instance
                  currentRenderingComponent = this;
                  // Resetting the hook index
                  currentHookIndex = 0;
                  // Calling the component
                  CustomComponent(this.props);
                }
              }
            `,language:"js"}),e("p",{children:"The code above will not work, but can make you easily get how Wompo works under the hood."}),e(n,{severity:"info",children:"If you understand this, you also understand why it is so important for your component's hooks to be called in the first lines of the component and why they should NOT be inside conditional statements or loops."}),o("p",{children:["Going back to the ",e("code",{children:"useHook"})," explanation, the hook will simply return the current rendering component instance and the current hook index. It will also take care of automatically incrementing the hook index, so that you won't have to do it.",e("br",{}),"What it will ",e("b",{children:"not"})," automatically do is ",e("b",{children:"set the hook value"})," in the component's hooks array, but we will see how to do it in a moment with an example."]}),o("p",{children:["Because with this hook you have access to the component's instance, you can call methods on it or perform modifications. You can see the available methods and data accessible through a component's instance in the"," ",e(t,{to:"/docs/apis/element",children:"Wompo Element API"}),"."]}),e("p",{children:"Enough. Let's explore a nice example to see in practice how powerful this hook can be."})]})},{title:"Example: useBattery",id:"use-battery-example",content:o(a,{children:[o("p",{children:["A very simple example can be creating a hook that uses the"," ",e("a",{target:"_blank",href:"https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API",children:"Web Battery API"})," ","to get the battery level and status."]}),e(s,{code:`
							import { useHook } from 'wompo';

							export default function useBattery() {
                const [component, hookIndex] = useHook();
                // Check if the hook already exists on the component
                if(!component.hooks.hasOwnProperty(hookIndex)){
                  // Hook not found, make initializations
                  const batteryHook = {
                    value: 'Getting the battery status...',
                    charging: false,
                  }
                  // Save the hook in the component's hooks
                  component.hooks[hookIndex] = batteryHook; 

                  navigator.getBattery().then((battery) => {
                    // We have the battery informations, update the hook.
                    component.hooks[hookIndex].value = battery.level;
                    component.hooks[hookIndex].charging = battery.charging;

                    component.requestRender(); // Requests a new render

                    battery.addEventListener("chargingchange", () => {
                      // Charging value is updated
                      component.hooks[hookIndex].charging = battery.charging;
                      component.requestRender();
                    });
                    
                    battery.addEventListener("levelchange", () => {
                      // Battery level changed, update the component that uses it
                      component.hooks[hookIndex].charging = battery.level;
                      component.requestRender();
                    });
                  });
                }
                return component.hooks[hookIndex];
							}
						`,language:"js"}),o("p",{children:["Did it! Now you can simply call the ",e("code",{children:"useBattery()"})," hook inside of your components!"]}),e("p",{children:o(n,{severity:"info",children:[e("b",{children:"Info:"})," you could have actually get the same result using native Wompo hooks like"," ",e(t,{to:"/docs/hooks/useState",children:"useState"}),","," ",e(t,{to:"/docs/hooks/useEffect",children:"useEffect"}),", or"," ",e(t,{to:"/docs/hooks/useRef",children:"useRef"}),". This was just to demostrate how you can implement your own hook and make the component stateful by requesting updates. If you can, you should always avoid using the ",e("b",{children:"useHook"})," hook and use instead other native Wompo hooks to achieve the same result.",e("br",{}),"To know how to make a custom hook combining the already existing ones, see the"," ",e(t,{to:"/docs/guides/custom-hooks",children:"Custom hooks"})," section."]})}),e("p",{children:o(n,{severity:"warning",children:[e("b",{children:"Never"})," modify the value of another hook. Always modify the"," ",e("code",{children:"component.hooks[hookIndex]"})," hook. Modifying other hooks may break the component and create unexpected behaviors."]})})]})},{title:"Subscribers",id:"subscribers",content:o(a,{children:[o("p",{children:["At some point you may want to create a hook that has a ",e("b",{children:"Set"})," of subscribers components. What it means is that you may want this hook to register all the components that use that hook and perform actions on them when something happens. A great example can be implementing a ",e("b",{children:"global stateful storage"}),". This kind of approach is currently used in the ",e(t,{to:"/docs/hooks/useContext",children:"useContext"})," hook. If you do that, you should also ",e("b",{children:"remove"})," a subscriber when it is removed from the DOM. To do that, you can override the component's (subscriber) ",e("code",{children:"onDisconnected"})," callback, like this:"]}),e(s,{code:`
							const subscribers = new Set();

							// ...

							subscribers.forEach(component => {
								// Get the old onDisconnected callback
								const oldDisconnectedCallback = component.onDisconnected;
								// Override it with a new function
								component.onDisconnected = () => {
									subscribers.delete(component);
									// But still execute the old callback!!
									oldDisconnectedCallback();
								};
							});
						`,language:"js"}),e("p",{children:o(n,{severity:"warning",children:["It is ",e("b",{children:"very"})," important to still execute the old ",e("code",{children:"onDisconnected"})," ","callback. If you don't, you may compromise the correct component's behavior and have performance impacts on your application."]})}),e("p",{children:e(n,{severity:"warning",children:"If you don't handle properly what happens when a subscriber is unmounted you can pollute the memory with unused resources and perform re-renders of components that are not even in the DOM and so that are not even visible to the user. You always want to be careful when creating your own advanced hook, and handle your events appropriately."})})]})}]};export default function r(){return h(c)}i(r,{name:"usehook-hook-page"});
