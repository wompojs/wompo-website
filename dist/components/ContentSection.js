import { Fragment, jsx, jsxs } from "womp/jsx-runtime";
import { defineWomp } from "womp";
export default function ContentSection({ title, children }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("hr", {}),
    /* @__PURE__ */ jsx("h2", { children: title }),
    children
  ] });
}
defineWomp(ContentSection);
