import { Fragment, jsx, jsxs } from "wompo/jsx-runtime";
import { defineWompo } from "wompo";
import getPageLayout from "../../utils/getPageLayout.js";
import Note from "../../components/Note.js";
const content = {
  title: "SSR",
  description: "How to Server Side Render your components.",
  sections: [
    {
      title: "Coming soon",
      id: "coming-soon",
      content: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Note, { severity: "warning", children: [
        "We are sad to inform you that Server Side Rendering (SSR) is not currently available for Wompo. The good news is that ",
        /* @__PURE__ */ jsx("b", { children: "we are working on it!" }),
        " Feel free to give your own contribution on ",
        /* @__PURE__ */ jsx("a", { href: "https://github.com/wompojs/wompo", children: "GitHub" }),
        ". It would be highly appreciated!"
      ] }) })
    }
  ]
};
export default function Ssr() {
  return getPageLayout(content);
}
defineWompo(Ssr, {
  name: "ssr-page"
});
