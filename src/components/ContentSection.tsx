import { WompProps, defineWomp } from 'womp';

export interface ContentSectionProps extends WompProps {
	title: string;
}

export default function ContentSection({ title, children }: ContentSectionProps) {
	return (
		<>
			<hr />
			<h2>{title}</h2>
			{children}
		</>
	);
}

defineWomp(ContentSection);
