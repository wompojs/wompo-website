import { type WompProps, defineWomp } from 'womp';

const menu = [
	{
		title: 'Home',
		link: '/',
	},
	{
		title: 'Docs',
		link: '/docs',
	},
];

export default function Header({ styles: s }: WompProps) {
	return (
		<header class={s.header}>
			<ul>
				{menu.map((item) => (
					<li>
						<a href={item.link}>{item.title}</a>
					</li>
				))}
			</ul>
		</header>
	);
}
Header.css = `
	:host {
		display: block;
		position: sticky;
		top: 0;
		left: 0;
		width: 100vw;
		background-color: #fff;
		z-index: 100;
		box-shadow: 1px 1px 4px #00000040;
	}
  .header {
    padding: 20px;
  }
  .header ul {
    display: flex;
    gap: 20px;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .header ul li a {
    color: #333;
    text-decoration: none;
  }
`;

defineWomp(Header, {
	name: 'womp-header',
});
