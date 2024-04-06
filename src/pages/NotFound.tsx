import { WompoProps, defineWompo } from 'wompo';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

export default function NotFound({ styles: s }: WompoProps) {
	const goBack = () => {
		history.back();
	};
	return (
		<main class={s.main}>
			<Header />
			<section>
				<h1>Not Found</h1>
				<h2>404</h2>
				<p>We didn't find the page you were looking for... 🥹</p>
				<button onClick={goBack}>Go Back</button>
			</section>
			<Footer />
		</main>
	);
}
NotFound.css = `
  .main section {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 3rem;
    padding: 10rem 3rem;
  }
  .main h1 {
    text-transform: uppercase;
    font-size: 6rem;
    margin: 0;
  }
  .main h2 {
    font-size: 15rem;
    margin: 0;
    letter-spacing: 1rem;
    line-height: 1;
  }
  .main button {
    background-color: #573EF6;
    color: #fff;
    padding: 1rem 2rem;
    border: none;
    cursor: pointer;
    border-radius: 10px;
    font-size: 4rem;
  }
  .main button:hover {
    text-decoration: underline;
  }
`;

defineWompo(NotFound, { name: 'not-found' });
