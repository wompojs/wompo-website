import { useReducer, html, defineWomp } from "womp";
function reducer(state, action) {
  switch (action.type) {
    case "add_lion": {
      return { lions: state.lions + 1 };
    }
    case "add_zebra": {
      return { zebras: state.zebras + 1 };
    }
    case "add_bear": {
      return { bears: state.bears + 1 };
    }
    default: {
      throw new Error("This action is not supported!");
    }
  }
}
const initialZooPopulation = {
  lions: 5,
  zebras: 10,
  bears: 2
};
export default function Zoo() {
  const [zoo, dispatch] = useReducer(reducer, initialZooPopulation);
  const addLion = () => dispatch({ type: "add_lion" });
  const addZebra = () => dispatch({ type: "add_zebra" });
  const addBear = () => dispatch({ type: "add_bear" });
  return html`
		<p>Lions: ${zoo.lions} <button @click=${addLion}>Add</button></p>
		<p>Zebras: ${zoo.zebras} <button @click=${addZebra}>Add</button></p>
		<p>Bears: ${zoo.bears} <button @click=${addBear}>Add</button></p>
	`;
}
defineWomp(Zoo);
