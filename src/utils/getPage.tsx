import MainContent from '../components/MainContent';
import ContentSection from '../components/ContentSection';
import SideMenu from '../components/SideMenu';
import { type RenderHtml } from 'womp';

interface Section {
	title: string;
	id: string;
	content: RenderHtml;
}

export interface Contents {
	title: string;
	description: RenderHtml | string;
	sections: Section[];
}

export default function getPageLayout(contents: Contents) {
	return (
		<div style={{ display: 'flex' }}>
			<MainContent title={contents.title} description={contents.description}>
				{contents.sections.map((section) => (
					<ContentSection title={section.title} id={section.id}>
						{section.content}
					</ContentSection>
				))}
			</MainContent>
			<SideMenu
				menu={contents.sections.map((section) => ({
					title: section.title,
					link: `#${section.id}`,
				}))}
				title={<h3 style={{ margin: '10px 0', textTransform: 'uppercase' }}>In this page</h3>}
			/>
		</div>
	);
}
