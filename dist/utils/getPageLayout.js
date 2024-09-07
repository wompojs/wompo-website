import { jsx as _jsx, jsxs as _jsxs } from "wompo/jsx-runtime";
import MainContent from '../components/MainContent.js';
import ContentSection from '../components/ContentSection.js';
import SideMenu from '../components/SideMenu.js';
import { useCurrentRoute, useRoutes } from 'wompo-router';
import FollowDocButton from '../components/FollowDocButton.js';
export default function getPageLayout(contents) {
    const routes = useRoutes();
    const currentRoute = useCurrentRoute();
    const index = routes.findIndex((r) => r[0] === currentRoute);
    const prevRoute = routes[index - 1];
    const nextRoute = routes[index + 1];
    return (_jsxs("div", { style: { display: 'flex' }, children: [_jsxs(MainContent, { title: contents.title, description: contents.description, children: [contents.sections.map((section) => (_jsx(ContentSection, { title: section.title, sectionId: section.id, children: section.content }))), _jsxs("div", { style: { display: 'flex', gap: 10, alignItems: 'stretch', margin: '7rem 0' }, children: [index > 1 ? (_jsx(FollowDocButton, { to: prevRoute[0], title: prevRoute[1].meta.title, description: prevRoute[1].meta.description, next: false })) : (_jsx("div", { style: { width: '100%' } })), index !== routes.length - 2 ? (_jsx(FollowDocButton, { to: nextRoute[0], title: nextRoute[1].meta?.title, description: nextRoute[1].meta?.description, next: true })) : (_jsx("div", { style: { width: '100%' } }))] })] }), _jsx(SideMenu, { class: 'side-content', menu: contents.sections.map((section) => ({
                    title: section.title,
                    link: `#${section.id}`,
                })), title: _jsx("h3", { style: { margin: '10px 0', textTransform: 'uppercase' }, children: "In this page" }) })] }));
}
