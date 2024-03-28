import { defineWomp } from 'womp';
import getPageLayout, { Contents } from '../../../utils/getPageLayout.js';

const content: Contents = {
	title: 'useState hook',
	description: 'What is the useState hook and how to use it.',
	sections: [],
};

export default function UseState() {
	return getPageLayout(content);
}

defineWomp(UseState);
