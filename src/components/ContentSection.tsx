import { WompProps, defineWomp } from 'womp';

export interface ContentSectionProps extends WompProps {
	title: string;
	sectionId: string;
}

export default function ContentSection({ title, sectionId, children }: ContentSectionProps) {
	return (
		<>
			<hr />
			<h2 id={sectionId} style={{ scrollMarginTop: 60 }}>
				{title}
			</h2>
			{children}
		</>
	);
}

defineWomp(ContentSection);
