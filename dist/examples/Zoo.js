import{useReducer as d,html as s,defineWomp as i}from"womp";function b(e,o){switch(o.type){case"add_lion":return{lions:e.lions+1};case"add_zebra":return{zebras:e.zebras+1};case"add_bear":return{bears:e.bears+1};default:throw new Error("This action is not supported!")}}const c={lions:5,zebras:10,bears:2};export default function t(){const[e,o]=d(b,c),a=()=>o({type:"add_lion"}),r=()=>o({type:"add_zebra"}),n=()=>o({type:"add_bear"});return s`
		<p>Lions: ${e.lions} <button @click=${a}>Add</button></p>
		<p>Zebras: ${e.zebras} <button @click=${r}>Add</button></p>
		<p>Bears: ${e.bears} <button @click=${n}>Add</button></p>
	`}i(t,{name:"zoo-example"});
