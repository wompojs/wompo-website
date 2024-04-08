import{defineWompo as o,html as i}from"wompo";export default function e(){return i`
		<section>
			<div class="skeleton title"></div>
			<div class="skeleton desc"></div>
			<hr />
			<div class="skeleton content"></div>
		</section>
		<nav class="skeleton"></nav>
	`}e.css=`
  :host {
    display: flex;
    box-sizing: border-box;
  }
  * {
    box-sizing: border-box;
  }
  section, nav {
    height: 100rem;
    width: 100%;
    margin: 2rem;
    display: flex;
    flex-direction: column;
  }
  nav {
    width: 20%;
    max-width: 30rem;
  }
  hr {
    margin: 50px 0;
    background-color: #573ef640;
    border: 0;
    height: 1px;
  }
  .title {
    height: 5rem;
  }
  .desc {
    height: 2rem;
    margin-top: 2rem;
  }
  .content {
    height: 100%;
  }
  .skeleton {
    border-radius: 10px;
    animation: skeleton-loading 1s linear infinite alternate;
  }

  @media (width < 1300px){
		nav {
			display: none;
		}
	}

  @keyframes skeleton-loading {
    0% {
      background-color: #f2f2f2;
    }
    100% {
      background-color: #d9d9d9;
    }
  }
`,o(e,{name:"loading-placeholder",shadow:!0,cssModule:!1});
