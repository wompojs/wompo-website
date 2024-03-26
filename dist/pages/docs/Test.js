import { Fragment, jsx, jsxs } from "womp/jsx-runtime";
import { defineWomp } from "womp";
import getPage from "../../utils/getPage.js";
const content = {
  title: "Introductionnnnn",
  description: /* @__PURE__ */ jsxs(Fragment, { children: [
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. A blanditiis perspiciatis necessitatibus veritatis animi libero perferendis reiciendis voluptate incidunt tenetur sed quasi rem porro ipsa aliquid unde ",
    /* @__PURE__ */ jsx("a", { children: "nobis" }),
    " debitis neque dolore quibusdam, cum iusto autem?"
  ] }),
  sections: [
    {
      title: "Why?",
      id: "why",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("p", { children: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque atque reprehenderit quam. Consequatur nam, itaque, facere inventore cupiditate voluptatum ad accusantium sint quidem molestiae totam doloribus blanditiis, dolores delectus at necessitatibus. Quibusdam, voluptatem sequi? Sed asperiores, ad rem alias nobis odio iusto quidem esse, veritatis, veniam quam amet porro repudiandae." }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("a", { children: "First Item" }),
            " - Lorem Ipsum Dolor Sit Amet"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("a", { children: "Second Item" }),
            " - Lorem Ipsum Dolor Sit Amet"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("a", { children: "Third Item" }),
            " - Lorem Ipsum Dolor Sit Amet"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("a", { children: "Fourth Item" }),
            " - Lorem Ipsum Dolor Sit Amet"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque atque reprehenderit quam. Consequatur nam, itaque, facere inventore cupiditate voluptatum ad accusantium sint quidem molestiae ",
          /* @__PURE__ */ jsx("code", { children: "totam doloribus" }),
          " blanditiis, dolores delectus at necessitatibus. Quibusdam, voluptatem sequi? Sed asperiores, ad rem alias nobis odio iusto quidem esse, veritatis, veniam quam amet porro repudiandae."
        ] })
      ] })
    },
    {
      title: "Second section",
      id: "second-section",
      content: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("p", { children: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque atque reprehenderit quam. Consequatur nam, itaque, facere inventore cupiditate voluptatum ad accusantium sint quidem molestiae totam doloribus blanditiis, dolores delectus at necessitatibus. Quibusdam, voluptatem sequi? Sed asperiores, ad rem alias nobis odio iusto quidem esse, veritatis, veniam quam amet porro repudiandae." }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque atque reprehenderit quam. Consequatur nam, itaque, facere inventore cupiditate voluptatum ad accusantium sint quidem molestiae ",
          /* @__PURE__ */ jsx("code", { children: "totam doloribus" }),
          " blanditiis, dolores delectus at necessitatibus. Quibusdam, voluptatem sequi? Sed asperiores, ad rem alias nobis odio iusto quidem esse, veritatis, veniam quam amet porro repudiandae."
        ] })
      ] })
    }
  ]
};
export default function Test() {
  return getPage(content);
}
defineWomp(Test);
