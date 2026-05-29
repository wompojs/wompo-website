import type { RenderHtml } from 'wompo';

export interface DocRoute {
	title: string;
	link: string;
	path: string;
	meta: {
		title: string;
		description: string;
	};
	subRoutes?: DocRoute[];
}

export interface DocSection {
	title: string;
	id: string;
	html: string;
}

export interface DocLink {
	title: string;
	link: string;
	description: string;
}

export interface DocPage {
	title: string;
	description: string | RenderHtml;
	metaTitle: string;
	metaDescription: string;
	currentPath: string;
	sections: DocSection[];
	prev?: DocLink;
	next?: DocLink;
}

export interface DocPageData {
	doc: DocPage;
	menu: DocRoute[];
}
