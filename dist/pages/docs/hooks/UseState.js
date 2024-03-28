import { defineWomp } from "womp";
import getPageLayout from "../../../utils/getPageLayout.js";
const content = {
  title: "useState hook",
  description: "What is the useState hook and how to use it.",
  sections: []
};
export default function UseState() {
  return getPageLayout(content);
}
defineWomp(UseState);
