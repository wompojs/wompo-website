import { jsx as _jsx, jsxs as _jsxs } from "womp/jsx-runtime";
import MainContent from '../components/MainContent.js';
import ContentSection from '../components/ContentSection.js';
import SideMenu from '../components/SideMenu.js';
import PageLayout from '../layout/PageLayout.js';
export default function getPageLayout(contents) {
    return (_jsxs(PageLayout, { children: [_jsx(MainContent, { title: contents.title, description: contents.description, children: contents.sections.map((section) => (_jsx(ContentSection, { title: section.title, id: section.id, children: section.content }))) }), _jsx(SideMenu, { menu: contents.sections.map((section) => ({
                    title: section.title,
                    link: `#${section.id}`,
                })), title: _jsx("h3", { style: { margin: '10px 0', textTransform: 'uppercase' }, children: "In this page" }) })] }));
}
