import { jsx, jsxs } from "wompo/jsx-runtime";
import { defineWompo } from "wompo";
import { Link } from "wompo-router";
export default function FollowDocButton({
  styles: s,
  to,
  title,
  description,
  next
}) {
  return /* @__PURE__ */ jsx(Link, { to, class: s.button, children: /* @__PURE__ */ jsxs("div", { style: { display: "flex", height: "100%" }, children: [
    !next && /* @__PURE__ */ jsx(
      "svg",
      {
        style: { marginRight: "15px", alignSelf: "center" },
        xmlns: "http://www.w3.org/2000/svg",
        width: "26",
        height: "26",
        fill: "currentColor",
        viewBox: "0 0 16 16",
        children: /* @__PURE__ */ jsx(
          "path",
          {
            "fill-rule": "evenodd",
            d: "M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
          }
        )
      }
    ),
    /* @__PURE__ */ jsxs("div", { style: { width: "100%" }, children: [
      /* @__PURE__ */ jsx("h5", { children: title }),
      /* @__PURE__ */ jsx("p", { children: description })
    ] }),
    next && /* @__PURE__ */ jsx(
      "svg",
      {
        style: { marginLeft: "15px", alignSelf: "center" },
        xmlns: "http://www.w3.org/2000/svg",
        width: "26",
        height: "26",
        fill: "currentColor",
        viewBox: "0 0 16 16",
        children: /* @__PURE__ */ jsx(
          "path",
          {
            "fill-rule": "evenodd",
            d: "M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
          }
        )
      }
    )
  ] }) });
}
FollowDocButton.css = `
  :host {
    display: block;
    width: 100%;
  }
  :host:hover .button {
    background-color: #E3DEFE;
  }
  .button {
    height: 100%;
    padding: 2rem;
    border: 1px solid #573EF6;
    color: #573EF6;
    border-radius: 10px;
    background-color: #fff;
  }
  .button * {
    margin: 0;
  }
  .button h5 {
    margin-bottom: 1rem;
  }
	@media (width < 600px){
		.button p {
			text-overflow: ellipsis;
			overflow: hidden;
			display: -webkit-box;
			-webkit-line-clamp: 5;
			line-clamp: 2;
			-webkit-box-orient: vertical;
		}
	}
`;
defineWompo(FollowDocButton, { name: "follow-doc-button" });
