import { defineWomp } from 'womp';
import getPageLayout, { Contents } from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
import { Link } from 'womp-router';
import Note from '../../../components/Note.js';
import Zoo from '../../../examples/Zoo.js';

const content: Contents = {
	title: 'useReducer hook',
	description: (
		<>
			How to use the <code>useReducer</code> hook to better manage the state of your component.
		</>
	),
	sections: [
		{
			title: 'Description',
			id: 'description',
			content: (
				<>
					<p>
						The <code>useReducer</code> hook is an alternative approach to the{' '}
						<Link to='/docs/hooks/useState'>useState</Link> hook, but uses the redux-like state
						management. If you like and you're used to the <b>Redux</b> state management system, you
						will surely like this hook.
					</p>
					<p>
						Common use cases for this hook are:
						<ul>
							<li>Complex state management</li>
							<li>Handling a stateful variable that is an object</li>
							<li>
								Moving the state logic <b>outside</b> of the component
							</li>
						</ul>
					</p>
					<p>
						By using a <b>reducer</b> to handle all states modifications, you will be sure that you
						can only perform specific actions on the state, and not everything you want (like you
						can actually do with the useState hook).
					</p>
					<p>
						Like the useState hook, when the state is modified the component will be re-rendered.
					</p>
					<Note severity='info'>
						Although the useReducer hook adds more control, more stability, and more predictability
						to the state, it also adds more complexity to your code. Try to use the useReducer hook
						only when the state is complex and you want another eventual developer (or the yourself
						of the future) to only perform specific actions on it.
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
							const [currentState, dispatch] = useReducer(reducer, initialState);
						`}
						language='js'
					/>
					<p>
						The <code>useReducer</code> hook accepts two parameters: the <b>reducer</b> function and
						the initial state (usually an object). The reducer function is a function that has two
						arguments: the current state, and the <b>action</b>. The action is a simple object that{' '}
						usually have the "type" key (it's a convention, but you're free to use whatever you
						want), which is a string corresponding to the action you want to perform to modify the
						state. The reducer must return the new state or a <b>portion</b> of it.
						<br />
						The action is what you will pass as the first argument when you call the <b>
							dispatch
						</b>{' '}
						function.
						<br />
						Right now everything will probably sound confusing, but i'll guarantee that everything
						will be clearer once you see an example, so let's go straight to it.
					</p>
				</>
			),
		},
		{
			title: 'Example: zoo population',
			id: 'zoo-population',
			content: (
				<>
					<p>
						In this example we will keep track of a zoo population using the <code>useReducer</code>
						hook.
					</p>
					<Code
						code={`
              import { useReducer, html, defineWomp } from 'womp';

              function reducer(state, action){
                switch (action.type) {
                  case 'add_lion': {
                    return { lions: state.lions +1 };
                  }
                  case 'add_zebra': {
                    return { zebras: state.zebras +1 };
                  }
                  case 'add_bear': {
                    return { bears: state.bears +1 };
                  }
                  default: {
                    throw new Error('This action is not supported!');
                  }
                }
              }

              const initialZooPopulation = {
                lions: 5,
                zebras: 10,
                bears: 2,
              }

              export default function Zoo(){
                const [zoo, dispatch] = useReducer(reducer, initialZooPopulation);

                const addLion = () => dispatch({ type: 'add_lion' });
                const addZebra = () => dispatch({ type: 'add_zebra' });
                const addBear = () => dispatch({ type: 'add_bear' });

                return html\`
                  <p>Lions: \${zoo.lions} <button @click=\${addLion}>Add</button></p>
                  <p>Zebras: \${zoo.zebras} <button @click=\${addZebra}>Add</button></p>
                  <p>Bears: \${zoo.bears} <button @click=\${addBear}>Add</button></p>
                \`;
              }
            `}
						language='js'
					/>
					<p>
						Result:
						<Zoo />
						<Note severity='info'>
							Notice how in the reducer you only return a <b>portion</b> of the state, and not the
							whole updated state. Under the hood, Womp will <b>merge</b> the returned value with
							the whole state. Of course, you can even return the whole state using the spread
							operator.
						</Note>
					</p>
					<p>
						<Note severity='warning'>
							The possibility to return a portion of the state only applies to <b>objects</b>, not
							arrays nor primitive values.
						</Note>
					</p>
				</>
			),
		},
		{
			title: 'Example: shopping cart',
			id: 'shopping-cart-example',
			content: (
				<>
					<p>
						In this example we will use the <code>useReducer</code> hook to handle a shopping cart.
					</p>
					<Code
						code={`
							import { useReducer, html, defineWomp } from 'womp';

              function reducer(state, action){
                switch(action.type){
                  case 'add_product': {
                    return [...state, action.product];
                  }
                  case 'remove_product': {
                    return state.filter(item => item.id === action.product.id);
                  }
                  case 'increase_product_quantity': {
                    return state.map(item => {
                      if(item.id === action.product.id){
                        return {
                          ...item,
                          quantity: item.quantity +1
                        }
                      }
                      return item;
                    });
                  }
                  case 'decrease_product_quantity': {
                    return state.map(item => {
                      if(item.id === action.product.id){
                        return {
                          ...item,
                          // The minimum quantity for a product is 1
                          quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity
                        }
                      }
                      return item;
                    });
                  }
                  default: {
                    throw new Error('This action is not supported!');
                  }
                }
              }

              export default function ShoppingCart(){
                const [items, dispatchCart] = useReducer(reducer, []);

                // This function accepts a simple [actionType] parameter, which is a string that can be:
                // "add_product" | "remove_product" | "increase_product_quantity" | "decrease_product_quantity"
                const executeAction = (actionType) => {
                  dispatchCart({
                    type: actionType,
                    product: product
                  })
                }

                return html\`...\`;
              }

              defineWomp(ShoppingCart);
						`}
						language='js'
					/>
					<p>
						Using a reducer in this example will ensure that only specific operations can be
						performed on the state. For example, the developer will not be able to completely empty
						the cart, like you could have done using the{' '}
						<Link to='/docs/hooks/useState'>useState</Link> hook. If you want to implement this
						functionality, you only have to modify the reducer and maybe add the action
						"empty_cart".
					</p>
					<Note severity='info'>
						Notice how, using reducers, you "move" the state logic outside of the component. This
						allows to completely separate the state logic from the actual component.
					</Note>
				</>
			),
		},
	],
};

export default function UseReducer() {
	return getPageLayout(content);
}

defineWomp(UseReducer, {
	name: 'usereducer-hook-page',
});
