import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "wompo/jsx-runtime";
import { defineWompo } from 'wompo';
import { Route, Routes } from 'wompo-router';
import Layout from './layout/Layout.js';
import { docsRoutes } from './utils/routes.js';
import LoadingPlaceholder from './components/LoadingPlaceholder.js';
export default function App() {
    return (_jsxs(Routes, { children: [_jsxs(Route, { path: '/docs', element: _jsx(Layout, {}), children: [docsRoutes.map((docPage) => (_jsxs(_Fragment, { children: [_jsx(Route, { path: docPage.path, meta: docPage.meta, fallback: _jsx(LoadingPlaceholder, {}), lazy: () => import(docPage.pagePath) }), docPage.subRoutes &&
                                docPage.subRoutes.map((subRoute) => (_jsx(Route, { meta: subRoute.meta, path: `${docPage.path}/${subRoute.path}`, fallback: _jsx(LoadingPlaceholder, {}), lazy: () => import(subRoute.pagePath) })))] }))), _jsx(Route, { index: true, redirect: 'introduction' })] }), _jsx(Route, { path: '*', lazy: () => import('./pages/NotFound.js') })] }));
}
defineWompo(App, {
    name: 'wompo-root',
});
