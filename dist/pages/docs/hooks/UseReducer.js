import{Fragment as o,jsx as e,jsxs as t}from"wompo/jsx-runtime";import{defineWompo as s}from"wompo";import u from"../../../utils/getPageLayout.js";import i from"../../../components/Code.js";import{Link as n}from"wompo-router";import a from"../../../components/Note.js";import c from"../../../examples/Zoo.js";const d={title:"useReducer hook",description:t(o,{children:["How to use the ",e("code",{children:"useReducer"})," hook to better manage the state of your component."]}),sections:[{title:"Description",id:"description",content:t(o,{children:[t("p",{children:["The ",e("code",{children:"useReducer"})," hook is an alternative approach to the"," ",e(n,{to:"/docs/hooks/useState",children:"useState"})," hook, but uses the redux-like state management. If you like and you're used to the ",e("b",{children:"Redux"})," state management system, you will surely like this hook."]}),t("p",{children:["Common use cases for this hook are:",t("ul",{children:[e("li",{children:"Complex state management"}),e("li",{children:"Handling a stateful variable that is an object"}),t("li",{children:["Moving the state logic ",e("b",{children:"outside"})," of the component"]})]})]}),t("p",{children:["By using a ",e("b",{children:"reducer"})," to handle all states modifications, you will be sure that you can only perform specific actions on the state, and not everything you want (like you can actually do with the useState hook)."]}),e("p",{children:"Like the useState hook, when the state is modified the component will be re-rendered."}),e(a,{severity:"info",children:"Although the useReducer hook adds more control, more stability, and more predictability to the state, it also adds more complexity to your code. Try to use the useReducer hook only when the state is complex and you want another eventual developer (or the yourself of the future) to only perform specific actions on it."})]})},{title:"Usage",id:"usage",content:t(o,{children:[e(i,{code:`
							const [currentState, dispatch] = useReducer(reducer, initialState);
						`,language:"js"}),t("p",{children:["The ",e("code",{children:"useReducer"})," hook accepts two parameters: the ",e("b",{children:"reducer"})," function and the initial state (usually an object). The reducer function is a function that has two arguments: the current state, and the ",e("b",{children:"action"}),". The action is a simple object that"," ",`usually have the "type" key (it's a convention, but you're free to use whatever you want), which is a string corresponding to the action you want to perform to modify the state. The reducer must return the new state or a `,e("b",{children:"portion"})," of it.",e("br",{}),"The action is what you will pass as the first argument when you call the ",e("b",{children:"dispatch"})," ","function.",e("br",{}),"Right now everything will probably sound confusing, but i'll guarantee that everything will be clearer once you see an example, so let's go straight to it."]})]})},{title:"Example: zoo population",id:"zoo-population",content:t(o,{children:[t("p",{children:["In this example we will keep track of a zoo population using the ",e("code",{children:"useReducer"}),"hook."]}),e(i,{code:`
              import { useReducer, html, defineWompo } from 'wompo';

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
            `,language:"js"}),t("p",{children:["Result:",e(c,{}),t(a,{severity:"info",children:["Notice how in the reducer you only return a ",e("b",{children:"portion"})," of the state, and not the whole updated state. Under the hood, Wompo will ",e("b",{children:"merge"})," the returned value with the whole state. Of course, you can even return the whole state using the spread operator."]})]}),e("p",{children:t(a,{severity:"warning",children:["The possibility to return a portion of the state only applies to ",e("b",{children:"objects"}),", not arrays nor primitive values."]})})]})},{title:"Example: shopping cart",id:"shopping-cart-example",content:t(o,{children:[t("p",{children:["In this example we will use the ",e("code",{children:"useReducer"})," hook to handle a shopping cart."]}),e(i,{code:`
							import { useReducer, html, defineWompo } from 'wompo';

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

              defineWompo(ShoppingCart);
						`,language:"js"}),t("p",{children:["Using a reducer in this example will ensure that only specific operations can be performed on the state. For example, the developer will not be able to completely empty the cart, like you could have done using the"," ",e(n,{to:"/docs/hooks/useState",children:"useState"}),' hook. If you want to implement this functionality, you only have to modify the reducer and maybe add the action "empty_cart".']}),e(a,{severity:"info",children:'Notice how, using reducers, you "move" the state logic outside of the component. This allows to completely separate the state logic from the actual component.'})]})}]};export default function r(){return u(d)}s(r,{name:"usereducer-hook-page"});
