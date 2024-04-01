import MainContent from '../components/MainContent.js';
import ContentSection from '../components/ContentSection.js';
import SideMenu from '../components/SideMenu.js';
import { type RenderHtml } from 'wompo';

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
					<ContentSection title={section.title} sectionId={section.id}>
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
