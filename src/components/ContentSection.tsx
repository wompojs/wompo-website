import { WompProps, defineWomp } from 'womp';
import { useNavigate } from 'womp-router';

export interface ContentSectionProps extends WompProps {
	title: string;
	sectionId: string;
}

export default function ContentSection({
	title,
	sectionId,
	children,
	styles: s,
}: ContentSectionProps) {
	const navigate = useNavigate();
	return (
		<>
			<hr />
			<h2 id={sectionId} class={s.title} onClick={() => navigate(`#${sectionId}`)}>
				<span>{title}</span>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='30'
					height='30'
					fill='currentColor'
					viewBox='0 0 16 16'
				>
					<path d='M8.39 12.648a1 1 0 0 0-.015.18c0 .305.21.508.5.508.266 0 .492-.172.555-.477l.554-2.703h1.204c.421 0 .617-.234.617-.547 0-.312-.188-.53-.617-.53h-.985l.516-2.524h1.265c.43 0 .618-.227.618-.547 0-.313-.188-.524-.618-.524h-1.046l.476-2.304a1 1 0 0 0 .016-.164.51.51 0 0 0-.516-.516.54.54 0 0 0-.539.43l-.523 2.554H7.617l.477-2.304c.008-.04.015-.118.015-.164a.51.51 0 0 0-.523-.516.54.54 0 0 0-.531.43L6.53 5.484H5.414c-.43 0-.617.22-.617.532s.187.539.617.539h.906l-.515 2.523H4.609c-.421 0-.609.219-.609.531s.188.547.61.547h.976l-.516 2.492c-.008.04-.015.125-.015.18 0 .305.21.508.5.508.265 0 .492-.172.554-.477l.555-2.703h2.242zm-1-6.109h2.266l-.515 2.563H6.859l.532-2.563z' />
				</svg>
			</h2>
			{children}
		</>
	);
}
ContentSection.css = `
	.title {
		scroll-margin-top: 6rem;
		cursor: pointer;
		display: flex;
		align-items: center;
	}
	.title svg {
		opacity: 0;
		transition: all .2s;
		color: #aaa;
		margin-left: 10px;
	}
	.title:hover svg {
		opacity: 1;
	}
`;

defineWomp(ContentSection, {
	name: 'content-section',
});
