import { defineWompo } from 'wompo';
import getPageLayout, { Contents } from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
import { Link } from 'wompo-router';
import Note from '../../../components/Note.js';

const content: Contents = {
	title: 'useLayoutEffect hook',
	description: (
		<>
			How to use the <code>useLayoutEffect</code> hook to create layout effect.
		</>
	),
	sections: [
		{
			title: 'Description',
			id: 'description',
			content: (
				<>
					<p>
						The <code>useLayoutEffect</code> hook works exactly like the{' '}
						<Link to='/docs/hooks/useEffect'>useEffect</Link> hook, with only one exceptions: unlike
						useEffect, it works <b>synchronously</b>, meaning that the effect will be executed
						immediately after the render operations, and not when the browser's call stack is empty.
						This is quite useful when you want to see instant changes in your UI when something
						happens in your component.
					</p>
					<Note severity='info' style={{ margin: '2rem 0' }}>
						<b>Note:</b> The fact that that the useLayoutEffect callback runs synchronously doesn't
						mean it will be executed "inline". The callback function will still be executed when the
						component already finished rendering a first time.
					</Note>
					<Note severity='warning'>
						Using the useLayoutEffect hook will make your component take more time to render and
						will delay the moment where you can see visual changes in your component, especially
						with heavy operations. Use it only when strictly necessary and with caution.
					</Note>
				</>
			),
		},
		{
			title: 'Usage',
			id: 'usage',
			content: (
				<>
					<Code
						code={`
							useLayoutEffect(effectFn, dependencies);
						`}
						language='js'
					/>
					<p>
						The <code>useLayoutEffect</code> hook accepts an effect callback function and a list of
						dependencies. The effect function will be executed after the first render and whenever
						one of the listed dependencies changes.
					</p>
				</>
			),
		},
	],
};

export default function UseLayoutEffect() {
	return getPageLayout(content);
}

defineWompo(UseLayoutEffect, {
	name: 'uselayouteffect-hook-page',
});
