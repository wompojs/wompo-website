import { jsx as _jsx, jsxs as _jsxs } from "womp/jsx-runtime";
import { defineWomp } from 'womp';
import Header from '../components/Header.js';
import SideMenu from '../components/SideMenu.js';
import { ChildRoute } from 'womp-router';
const mainMenu = [
    {
        title: 'Overview',
        link: '/docs/overview',
    },
    {
        title: 'Props',
        link: '/docs/overview',
    },
    {
        title: 'State',
        link: '/docs/overview',
    },
    {
        title: 'Hooks',
        link: '/docs/overview',
    },
];
export default function Layout() {
    return (_jsxs("div", { children: [_jsx(Header, {}), _jsxs("div", { style: { display: 'flex', height: '100%' }, children: [_jsx(SideMenu, { menu: mainMenu, title: _jsx("div", { style: { fontSize: 14, color: '#999', padding: '2rem' }, children: "womp@1.0.0" }) }), _jsx("div", { style: { width: '100%' }, children: _jsx(ChildRoute, {}) })] })] }));
}
defineWomp(Layout);
