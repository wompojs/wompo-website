import MainContent from '../components/MainContent.js';
import ContentSection from '../components/ContentSection.js';
import SideMenu from '../components/SideMenu.js';
import { type RenderHtml } from 'wompo';
import { DocRoute } from './routes.js';
import { useCurrentRoute, useRoutes } from 'wompo-router';
import FollowDocButton from '../components/FollowDocButton.js';

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
	const routes = useRoutes();
	const currentRoute = useCurrentRoute();
	const index = routes.findIndex((r) => r[0] === currentRoute);
	const prevRoute = routes[index - 1];
	const nextRoute = routes[index + 1];
	return (
		<div style={{ display: 'flex' }}>
			<MainContent title={contents.title} description={contents.description}>
				{contents.sections.map((section) => (
					<ContentSection title={section.title} sectionId={section.id}>
						{section.content}
					</ContentSection>
				))}
				<div style={{ display: 'flex', gap: 10, alignItems: 'stretch', margin: '7rem 0' }}>
					{index !== 1 ? (
						<FollowDocButton
							to={prevRoute[0]}
							title={prevRoute[1].meta.title}
							description={prevRoute[1].meta.description}
							next={false}
						/>
					) : (
						<div style={{ width: '100%' }}></div>
					)}
					{index !== routes.length - 2 ? (
						<FollowDocButton
							to={nextRoute[0]}
							title={nextRoute[1].meta?.title}
							description={nextRoute[1].meta?.description}
							next={true}
						/>
					) : (
						<div style={{ width: '100%' }}></div>
					)}
				</div>
			</MainContent>
			<SideMenu
				class='side-content'
				menu={
					contents.sections.map((section) => ({
						title: section.title,
						link: `#${section.id}`,
					})) as DocRoute[]
				}
				title={<h3 style={{ margin: '10px 0', textTransform: 'uppercase' }}>In this page</h3>}
			/>
		</div>
	);
}
