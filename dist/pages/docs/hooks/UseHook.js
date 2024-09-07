import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "wompo/jsx-runtime";
import { defineWompo } from 'wompo';
import getPageLayout from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
import Note from '../../../components/Note.js';
import { Link } from 'wompo-router';
const content = {
    title: 'useHook hook',
    description: (_jsxs(_Fragment, { children: ["How to use the ", _jsx("code", { children: "useHook" }), " hook to create your custom advanced hook."] })),
    sections: [
        {
            title: 'Description',
            id: 'description',
            content: (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["At some point you may want to further customize how wompo works, and maybe add a specific functionality to your components that Wompo doesn't actually support natively. The ", _jsx("code", { children: "useHook" }), "hook will let you have access to the component's instance and the hook index."] }), _jsxs(Note, { severity: 'warning', children: ["This hook should ", _jsx("b", { children: "only" }), " be used to create ", _jsx("b", { children: "advanced" }), " custom hooks. The already present Wompo's hooks cover 90% of the average cases, and you can create a custom hook by simply combining them. See the", ' ', _jsx(Link, { to: '/docs/guides/custom-hooks', children: "Custom hooks" }), " section for more."] })] })),
        },
        {
            title: 'Usage',
            id: 'usage',
            content: (_jsxs(_Fragment, { children: [_jsx(Code, { code: `
							const [component, hookIndex] = useHook();
						`, language: 'js' }), _jsxs("p", { children: ["The ", _jsx("code", { children: "useHook" }), " hook accepts no parameters and will return always an array with two values: the instance of the currently rendering component, and the current hook index of the component."] }), _jsx("p", { children: "But what is the hook index? Let's analyze how Wompo hooks work in the next section." })] })),
        },
        {
            title: 'Deep dive into Wompo hooks',
            id: 'deep-dive',
            content: (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["Maybe you already wondered how can Wompo return always the same values when you use hooks if they have no reference about the current component. The answer is that hooks are ", _jsx("b", { children: "not" }), " pure functions. Every time a component renders, the value of an external variable called ", _jsx("code", { children: "currentRenderingComponent" }), " is set to the instance of the current rendering component (big surprise huh?). This instance is the same returned by the ", _jsx("code", { children: "useHook" }), " hook. Then, another external variable called", ' ', _jsx("code", { children: "currentHookIndex" }), " is set to 0, and incremented every time a hook is called inside of the component. The hook value is internally determined by the hook itself, and also what to return. The hook will be saved into the", ' ', _jsxs("b", { children: [_jsx("code", { children: "hooks" }), " array"] }), ' ', "that every component has (you can actually select a wompo element in the console and write ", _jsx("code", { children: "$0.hooks" }), " to see it).", _jsx("br", {}), "It's something like this (very approximatively):"] }), _jsx(Code, { code: `
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
            `, language: 'js' }), _jsx("p", { children: "The code above will not work, but can make you easily get how Wompo works under the hood." }), _jsx(Note, { severity: 'info', children: "If you understand this, you also understand why it is so important for your component's hooks to be called in the first lines of the component and why they should NOT be inside conditional statements or loops." }), _jsxs("p", { children: ["Going back to the ", _jsx("code", { children: "useHook" }), " explanation, the hook will simply return the current rendering component instance and the current hook index. It will also take care of automatically incrementing the hook index, so that you won't have to do it.", _jsx("br", {}), "What it will ", _jsx("b", { children: "not" }), " automatically do is ", _jsx("b", { children: "set the hook value" }), " in the component's hooks array, but we will see how to do it in a moment with an example."] }), _jsxs("p", { children: ["Because with this hook you have access to the component's instance, you can call methods on it or perform modifications. You can see the available methods and data accessible through a component's instance in the", ' ', _jsx(Link, { to: '/docs/apis/element', children: "Wompo Element API" }), "."] }), _jsx("p", { children: "Enough. Let's explore a nice example to see in practice how powerful this hook can be." })] })),
        },
        {
            title: 'Example: useBattery',
            id: 'use-battery-example',
            content: (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["A very simple example can be creating a hook that uses the", ' ', _jsx("a", { target: '_blank', href: 'https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API', children: "Web Battery API" }), ' ', "to get the battery level and status."] }), _jsx(Code, { code: `
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
						`, language: 'js' }), _jsxs("p", { children: ["Did it! Now you can simply call the ", _jsx("code", { children: "useBattery()" }), " hook inside of your components!"] }), _jsx("p", { children: _jsxs(Note, { severity: 'info', children: [_jsx("b", { children: "Info:" }), " you could have actually get the same result using native Wompo hooks like", ' ', _jsx(Link, { to: '/docs/hooks/useState', children: "useState" }), ",", ' ', _jsx(Link, { to: '/docs/hooks/useEffect', children: "useEffect," }), " or", ' ', _jsx(Link, { to: '/docs/hooks/useRef', children: "useRef" }), ". This was just to demostrate how you can implement your own hook and make the component stateful by requesting updates. If you can, you should always avoid using the ", _jsx("b", { children: "useHook" }), " hook and use instead other native Wompo hooks to achieve the same result.", _jsx("br", {}), "To know how to make a custom hook combining the already existing ones, see the", ' ', _jsx(Link, { to: '/docs/guides/custom-hooks', children: "Custom hooks" }), " section."] }) }), _jsx("p", { children: _jsxs(Note, { severity: 'warning', children: [_jsx("b", { children: "Never" }), " modify the value of another hook. Always modify the", ' ', _jsx("code", { children: "component.hooks[hookIndex]" }), " hook. Modifying other hooks may break the component and create unexpected behaviors."] }) })] })),
        },
        {
            title: 'Subscribers',
            id: 'subscribers',
            content: (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["At some point you may want to create a hook that has a ", _jsx("b", { children: "Set" }), " of subscribers components. What it means is that you may want this hook to register all the components that use that hook and perform actions on them when something happens. A great example can be implementing a ", _jsx("b", { children: "global stateful storage" }), ". This kind of approach is currently used in the ", _jsx(Link, { to: '/docs/hooks/useContext', children: "useContext" }), " hook. If you do that, you should also ", _jsx("b", { children: "remove" }), " a subscriber when it is removed from the DOM. To do that, you can override the component's (subscriber) ", _jsx("code", { children: "onDisconnected" }), " callback, like this:"] }), _jsx(Code, { code: `
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
						`, language: 'js' }), _jsx("p", { children: _jsxs(Note, { severity: 'warning', children: ["It is ", _jsx("b", { children: "very" }), " important to still execute the old ", _jsx("code", { children: "onDisconnected" }), ' ', "callback. If you don't, you may compromise the correct component's behavior and have performance impacts on your application."] }) }), _jsx("p", { children: _jsx(Note, { severity: 'warning', children: "If you don't handle properly what happens when a subscriber is unmounted you can pollute the memory with unused resources and perform re-renders of components that are not even in the DOM and so that are not even visible to the user. You always want to be careful when creating your own advanced hook, and handle your events appropriately." }) })] })),
        },
        {
            title: 'Effects',
            id: 'effect',
            content: (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["Another thing you may want to do is create a custom \"effect hook\", or simply create a \"cleanup function\" (like the ", _jsx(Link, { to: '/docs/hooks/useEffect', children: "useEffect" }), " hook does) to execute before the effect is applied or ", _jsx("b", { children: "when the component unmounts" }), ". Implementing this is very easy: all you have to do is save the hooks as an object, and set a ", _jsx("b", { children: "cleanupFunction" }), " property to it. This function must accept no parameters, and will be automatically executed when the component unmounts.", _jsx("br", {}), "Example:"] }), _jsx(Code, { code: `
							function useInterval(callback, time){
								const [component, hookIndex] = useHook();
								if(!component.hooks.hasOwnProperty(hookIndex)){
									const intervalId = setInterval(callback, time);
									component.hooks[hookIndex] = {
										value: 'anything you want',
										cleanupFunction: () => { clearInterval(intervalId); }
									}
								}
								return component.hooks[hookIndex].value;
							}
						`, language: 'js' })] })),
        },
    ],
};
export default function UseHook() {
    return getPageLayout(content);
}
defineWompo(UseHook, {
    name: 'usehook-hook-page',
});
