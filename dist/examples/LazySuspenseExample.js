import{lazy as s,html as e,defineWomp as a,Suspense as n}from"womp";function l(i){return new Promise(m=>{setTimeout(m,5e3)}).then(()=>i)}const t=s(()=>l(import("./LazyComponent.js")));export default function o(){return e`
    <p>This content is static. Below me the lazy component will be rendered!</p>
    <${n} fallback=${e`<i>Loading...</i>`}>
      <${t}>I should be blue...</${t}>
    </${n}>
  `}a(o,{name:"lazy-suspense-example"});
