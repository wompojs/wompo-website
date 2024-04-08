import { defineWompo } from 'wompo';
import getPageLayout, { Contents } from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
import Note from '../../../components/Note.js';
import { Link } from 'wompo-router';

const content: Contents = {
	title: 'useHook hook',
	description: (
		<>
			How to use the <code>useHook</code> hook to create your custom advanced hook.
		</>
	),
	sections: [
		{
			title: 'Description',
			id: 'description',
			content: (
				<>
					<p>
						At some point you may want to further customize how wompo works, and maybe add a
						specific functionality to your components that Wompo doesn't actually support natively.
						The <code>useHook</code>
						hook will let you have access to the component's instance and the hook index.
					</p>
					<Note severity='warning'>
						This hook should <b>only</b> be used to create <b>advanced</b> custom hooks. The already
						present Wompo's hooks cover 90% of the average cases, and you can create a custom hook
						by simply combining them. See the{' '}
						<Link to='/docs/guides/custom-hooks'>Custom hooks</Link> section for more.
					</Note>
				</>
			),
		},
		{
			title: 'Usage',
			id: 'usage',
			content: (
				<>
					<Code
						code={`
							const [component, hookIndex] = useHook();
						`}
						language='js'
					/>
					<p>
						The <code>useHook</code> hook accepts no parameters and will return always an array with
						two values: the instance of the currently rendering component, and the current hook
						index of the component.
					</p>
					<p>But what is the hook index? Let's analyze how Wompo hooks work in the next section.</p>
				</>
			),
		},
		{
			title: 'Deep dive into Wompo hooks',
			id: 'deep-dive',
			content: (
				<>
					<p>
						Maybe you already wondered how can Wompo return always the same values when you use
						hooks if they have no reference about the current component. The answer is that hooks
						are <b>not</b> pure functions. Every time a component renders, the value of an external
						variable called <code>currentRenderingComponent</code> is set to the instance of the
						current rendering component (big surprise huh?). This instance is the same returned by
						the <code>useHook</code> hook. Then, another external variable called{' '}
						<code>currentHookIndex</code> is set to 0, and incremented every time a hook is called
						inside of the component. The hook value is internally determined by the hook itself, and
						also what to return. The hook will be saved into the{' '}
						<b>
							<code>hooks</code> array
						</b>{' '}
						that every component has (you can actually select a wompo element in the console and
						write <code>$0.hooks</code> to see it).
						<br />
						It's something like this (very approximatively):
					</p>
					<Code
						code={`
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
            `}
						language='js'
					/>
					<p>
						The code above will not work, but can make you easily get how Wompo works under the
						hood.
					</p>
					<Note severity='info'>
						If you understand this, you also understand why it is so important for your component's
						hooks to be called in the first lines of the component and why they should NOT be inside
						conditional statements or loops.
					</Note>
					<p>
						Going back to the <code>useHook</code> explanation, the hook will simply return the
						current rendering component instance and the current hook index. It will also take care
						of automatically incrementing the hook index, so that you won't have to do it.
						<br />
						What it will <b>not</b> automatically do is <b>set the hook value</b> in the component's
						hooks array, but we will see how to do it in a moment with an example.
					</p>
					<p>
						Because with this hook you have access to the component's instance, you can call methods
						on it or perform modifications. You can see the available methods and data accessible
						through a component's instance in the{' '}
						<Link to='/docs/apis/element'>Wompo Element API</Link>.
					</p>
					<p>
						Enough. Let's explore a nice example to see in practice how powerful this hook can be.
					</p>
				</>
			),
		},
		{
			title: 'Example: useBattery',
			id: 'use-battery-example',
			content: (
				<>
					<p>
						A very simple example can be creating a hook that uses the{' '}
						<a
							target='_blank'
							href='https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API'
						>
							Web Battery API
						</a>{' '}
						to get the battery level and status.
					</p>
					<Code
						code={`
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
						`}
						language='js'
					/>
					<p>
						Did it! Now you can simply call the <code>useBattery()</code> hook inside of your
						components!
					</p>
					<p>
						<Note severity='info'>
							<b>Info:</b> you could have actually get the same result using native Wompo hooks like{' '}
							<Link to='/docs/hooks/useState'>useState</Link>,{' '}
							<Link to='/docs/hooks/useEffect'>useEffect,</Link> or{' '}
							<Link to='/docs/hooks/useRef'>useRef</Link>. This was just to demostrate how you can
							implement your own hook and make the component stateful by requesting updates. If you
							can, you should always avoid using the <b>useHook</b> hook and use instead other
							native Wompo hooks to achieve the same result.
							<br />
							To know how to make a custom hook combining the already existing ones, see the{' '}
							<Link to='/docs/guides/custom-hooks'>Custom hooks</Link> section.
						</Note>
					</p>
					<p>
						<Note severity='warning'>
							<b>Never</b> modify the value of another hook. Always modify the{' '}
							<code>component.hooks[hookIndex]</code> hook. Modifying other hooks may break the
							component and create unexpected behaviors.
						</Note>
					</p>
				</>
			),
		},
		{
			title: 'Subscribers',
			id: 'subscribers',
			content: (
				<>
					<p>
						At some point you may want to create a hook that has a <b>Set</b> of subscribers
						components. What it means is that you may want this hook to register all the components
						that use that hook and perform actions on them when something happens. A great example
						can be implementing a <b>global stateful storage</b>. This kind of approach is currently
						used in the <Link to='/docs/hooks/useContext'>useContext</Link> hook. If you do that,
						you should also <b>remove</b> a subscriber when it is removed from the DOM. To do that,
						you can override the component's (subscriber) <code>onDisconnected</code> callback, like
						this:
					</p>
					<Code
						code={`
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
						`}
						language='js'
					/>
					<p>
						<Note severity='warning'>
							It is <b>very</b> important to still execute the old <code>onDisconnected</code>{' '}
							callback. If you don't, you may compromise the correct component's behavior and have
							performance impacts on your application.
						</Note>
					</p>
					<p>
						<Note severity='warning'>
							If you don't handle properly what happens when a subscriber is unmounted you can
							pollute the memory with unused resources and perform re-renders of components that are
							not even in the DOM and so that are not even visible to the user. You always want to
							be careful when creating your own advanced hook, and handle your events appropriately.
						</Note>
					</p>
				</>
			),
		},
		{
			title: 'Effects',
			id: 'effect',
			content: (
				<>
					<p>
						Another thing you may want to do is create a custom "effect hook", or simply create a
						"cleanup function" (like the <Link to='/docs/hooks/useEffect'>useEffect</Link> hook
						does) to execute before the effect is applied or <b>when the component unmounts</b>.
						Implementing this is very easy: all you have to do is save the hooks as an object, and
						set a <b>cleanupFunction</b> property to it. This function must accept no parameters,
						and will be automatically executed when the component unmounts.
						<br />
						Example:
					</p>
					<Code
						code={`
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
						`}
						language='js'
					/>
				</>
			),
		},
	],
};

export default function UseHook() {
	return getPageLayout(content);
}

defineWompo(UseHook, {
	name: 'usehook-hook-page',
});
