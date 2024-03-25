import { jsx as _jsx, jsxs as _jsxs } from "womp/jsx-runtime";
import { defineWomp } from 'womp';
import { Link, Route, Routes } from 'womp-router';
import Layout from './layout/Layout.js';
export default function App() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx("i", { children: _jsx(Link, { to: "/docs", children: "docs" }) }) }), _jsxs(Route, { path: "/docs", element: _jsx(Layout, {}), children: [_jsx(Route, { path: "overview", fallback: _jsx("i", { children: "Loading..." }), lazy: () => import('./pages/Introduction.js') }), _jsx(Route, { path: "quick-start", fallback: _jsx("i", { children: "Loading..." }), lazy: () => import('./pages/QuickStart.js') }), _jsx(Route, { index: true, fallback: _jsx("i", { children: "Loading..." }), lazy: () => import('./pages/Introduction.js') })] })] }));
}
defineWomp(App, {
    name: 'womp-app',
});
