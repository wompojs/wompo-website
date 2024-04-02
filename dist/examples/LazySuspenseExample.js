import{lazy as s,html as e,defineWompo as a,Suspense as n}from"wompo";function l(i){return new Promise(m=>{setTimeout(m,5e3)}).then(()=>i)}const o=s(()=>l(import("./LazyComponent.js")));export default function t(){return e`
    <p>This content is static. Below me the lazy component will be rendered!</p>
    <${n} fallback=${e`<i>Loading...</i>`}>
      <${o}>I should be blue...</${o}>
    </${n}>
  `}a(t,{name:"lazy-suspense-example"});
