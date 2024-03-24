import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "womp/jsx-runtime";
import { defineWomp } from 'womp';
export default function ContentSection({ title, children }) {
    return (_jsxs(_Fragment, { children: [_jsx("hr", {}), _jsx("h2", { children: title }), children] }));
}
defineWomp(ContentSection);
