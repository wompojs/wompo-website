import { jsx, jsxs } from "wompo/jsx-runtime";
import MainContent from "../components/MainContent.js";
import ContentSection from "../components/ContentSection.js";
import SideMenu from "../components/SideMenu.js";
export default function getPageLayout(contents) {
  return /* @__PURE__ */ jsxs("div", { style: { display: "flex" }, children: [
    /* @__PURE__ */ jsx(MainContent, { title: contents.title, description: contents.description, children: contents.sections.map((section) => /* @__PURE__ */ jsx(ContentSection, { title: section.title, sectionId: section.id, children: section.content })) }),
    /* @__PURE__ */ jsx(
      SideMenu,
      {
        class: "side-content",
        menu: contents.sections.map((section) => ({
          title: section.title,
          link: `#${section.id}`
        })),
        title: /* @__PURE__ */ jsx("h3", { style: { margin: "10px 0", textTransform: "uppercase" }, children: "In this page" })
      }
    )
  ] });
}
