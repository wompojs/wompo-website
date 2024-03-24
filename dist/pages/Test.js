import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "womp/jsx-runtime";
import { defineWomp } from 'womp';
import getPage from '../utils/getPage.js';
const content = {
    title: 'Introductionnnnn',
    description: (_jsxs(_Fragment, { children: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. A blanditiis perspiciatis necessitatibus veritatis animi libero perferendis reiciendis voluptate incidunt tenetur sed quasi rem porro ipsa aliquid unde ", _jsx("a", { children: "nobis" }), " debitis neque dolore quibusdam, cum iusto autem?"] })),
    sections: [
        {
            title: 'Why?',
            id: 'why',
            content: (_jsxs(_Fragment, { children: [_jsx("p", { children: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque atque reprehenderit quam. Consequatur nam, itaque, facere inventore cupiditate voluptatum ad accusantium sint quidem molestiae totam doloribus blanditiis, dolores delectus at necessitatibus. Quibusdam, voluptatem sequi? Sed asperiores, ad rem alias nobis odio iusto quidem esse, veritatis, veniam quam amet porro repudiandae." }), _jsxs("ul", { children: [_jsxs("li", { children: [_jsx("a", { children: "First Item" }), " - Lorem Ipsum Dolor Sit Amet"] }), _jsxs("li", { children: [_jsx("a", { children: "Second Item" }), " - Lorem Ipsum Dolor Sit Amet"] }), _jsxs("li", { children: [_jsx("a", { children: "Third Item" }), " - Lorem Ipsum Dolor Sit Amet"] }), _jsxs("li", { children: [_jsx("a", { children: "Fourth Item" }), " - Lorem Ipsum Dolor Sit Amet"] })] }), _jsxs("p", { children: ["Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque atque reprehenderit quam. Consequatur nam, itaque, facere inventore cupiditate voluptatum ad accusantium sint quidem molestiae ", _jsx("code", { children: "totam doloribus" }), " blanditiis, dolores delectus at necessitatibus. Quibusdam, voluptatem sequi? Sed asperiores, ad rem alias nobis odio iusto quidem esse, veritatis, veniam quam amet porro repudiandae."] })] })),
        },
        {
            title: 'Second section',
            id: 'second-section',
            content: (_jsxs(_Fragment, { children: [_jsx("p", { children: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque atque reprehenderit quam. Consequatur nam, itaque, facere inventore cupiditate voluptatum ad accusantium sint quidem molestiae totam doloribus blanditiis, dolores delectus at necessitatibus. Quibusdam, voluptatem sequi? Sed asperiores, ad rem alias nobis odio iusto quidem esse, veritatis, veniam quam amet porro repudiandae." }), _jsxs("p", { children: ["Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque atque reprehenderit quam. Consequatur nam, itaque, facere inventore cupiditate voluptatum ad accusantium sint quidem molestiae ", _jsx("code", { children: "totam doloribus" }), " blanditiis, dolores delectus at necessitatibus. Quibusdam, voluptatem sequi? Sed asperiores, ad rem alias nobis odio iusto quidem esse, veritatis, veniam quam amet porro repudiandae."] })] })),
        },
    ],
};
export default function Test() {
    return getPage(content);
}
defineWomp(Test);
