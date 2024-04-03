import{defineWompo as d,html as n}from"wompo";export default function e({children:i,title:r,icon:t,styles:o}){return n`
		<div class=${o.widget}>
			<h3>${r}</h3>
			<div>${t}</div>
			<div>${i}</div>
		</div>
	`}e.css=`
  .widget {
    box-shadow: 0 3px 10px #0004;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem;
    text-align: center;
    height: 100%;
    transition: all .3s;
    background-color: #fff;
  }
  .widget:hover {
    transform: scale(1.15);
  }
  .widget svg {
    margin: 3rem 0;
    width: 5rem;
    height: 5rem;
    color: #ccc;
  }
  .widget h3 {
    font-size: 2.5rem;
    margin: 0;
  }
`,d(e,{name:"more-widget"});
