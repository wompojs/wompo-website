import { defineWompo } from 'wompo';
import getPageLayout, { Contents } from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
import Note from '../../../components/Note.js';

const content: Contents = {
	title: 'Dynamic Tags',
	description: (
		<>
			Use a runtime value as the tag name of an element inside an <code>html</code> template.
		</>
	),
	sections: [
		{
			title: 'Description',
			id: 'description',
			content: (
				<>
					<p>
						Inside any <code>html</code> template you can interpolate the tag name itself, opening
						the door to elements whose type is decided at render time. The value can be:
						<ul>
							<li>
								a string (a built-in HTML tag like <code>'section'</code>, or a registered
								Web-Component name like <code>'my-card'</code>);
							</li>
							<li>
								a Wompo component (the function returned by <code>defineWompo</code>) — Wompo
								picks up the component's registered tag name automatically;
							</li>
							<li>
								the result of any JS expression that evaluates to one of the above.
							</li>
						</ul>
					</p>
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
              import { defineWompo, html } from 'wompo';

              export default function Heading({ level = 1, children }) {
                const tag = 'h' + Math.min(Math.max(level, 1), 6);
                return html\`<\${tag} class="heading">\${children}</\${tag}>\`;
              }

              defineWompo(Heading);
            `}
						language='js'
					/>
					<p>
						The same syntax works for choosing a wrapper between, for example, a{' '}
						<code>section</code> and an <code>article</code>:
					</p>
					<Code
						code={`
              html\`<\${type === 'article' ? 'article' : 'section'} class=\${s.box}>
                \${children}
              </\${type === 'article' ? 'article' : 'section'}>\`;
            `}
						language='js'
					/>
					<p>
						You can also dynamically pick between two Wompo components in the same way:
					</p>
					<Code
						code={`
              import { defineWompo, html } from 'wompo';
              import Card from './Card.js';
              import Pill from './Pill.js';

              export default function Item({ variant, ...props }) {
                const Component = variant === 'pill' ? Pill : Card;
                return html\`<\${Component} ...=\${props} />\`;
              }

              defineWompo(Item);
            `}
						language='js'
					/>
				</>
			),
		},
		{
			title: 'Rules and gotchas',
			id: 'rules',
			content: (
				<>
					<Note severity='warning'>
						<b>Open and close must match.</b> When a tag is dynamic, both the opening{' '}
						<code>&lt;${'$'}{'{tag}'}&gt;</code> and the closing{' '}
						<code>&lt;/${'$'}{'{tag}'}&gt;</code> need to interpolate the same value. The renderer
						uses this to keep template caching consistent.
					</Note>
					<p>
						A few more rules to keep in mind:
						<ul>
							<li>
								Self-closing dynamic tags are supported (
								<code>&lt;${'$'}{'{Component}'} /&gt;</code>) and are expanded to a full
								open/close pair internally.
							</li>
							<li>
								Changing the tag value across renders creates a new element instance: any state
								tied to the previous DOM node is reset.
							</li>
							<li>
								You can combine dynamic tags with the <a href='attrs'>attrs</a> spread to build
								fully generic wrappers.
							</li>
						</ul>
					</p>
				</>
			),
		},
	],
};

export default function DynamicTagsApi() {
	return getPageLayout(content);
}

defineWompo(DynamicTagsApi, {
	name: 'dynamic-tags-api-page',
});
