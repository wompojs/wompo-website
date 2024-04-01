import { defineWompo } from 'wompo';
import getPageLayout, { Contents } from '../../../utils/getPageLayout.js';
import Code from '../../../components/Code.js';
import HtmlExample from '../../../examples/HtmlExample.js';

const content: Contents = {
	title: 'html API',
	description: (
		<>
			How to use the <code>html</code> function to define what a component should render and create
			custom templates.
		</>
	),
	sections: [
		{
			title: 'Description',
			id: 'description',
			content: (
				<>
					<p>
						The <code>html</code> template function will allow to render complex HTML structures
						inside of your component. You can even create custom templates outside of the component
						and re-use them whenever needed.
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
							const template = html\`structure\`;
						`}
						language='js'
					/>
					<p>
						The <code>html</code> function is a template function, meaning that should not be called
						using parentesis, but using backquotes. The content of it will be the HTML structure for
						the template.
					</p>
					<Code
						code={`
							const staticTemplate = html\`<i>I am static</i>\`;

              const dynamicTemplate = html\`<div>
                I will render here the content of the [staticTemplate]: \${staticTemplate}.<br/>
                I can also render this values: <br/>
                Numbers: \${0}<br/>
                Strings: \${'ciao!'}<br/>
                Arrays: \${[0,1,2,'three', html\`four\`]}<br/>
                Other templates: \${html\`Look!\`}<br/>
                <br/>
                I can even conditionally render content:
                \${false && 'I will not be shown, *sad face'}<br/>
                \${true && 'I am visible!'}<br/>
                <br/>
                Falsy values will be ignored (except for numbers and strings):
                \${null} \${undefined} \${false}.
              </div>\`;
						`}
						language='js'
					/>
					<p>
						Inside of your component you can use this templates:
						<Code
							code={`
                function Component(){
                  return dynamicTemplate;
                }
              `}
							language='js'
						/>
						Result:
						<HtmlExample />
					</p>
				</>
			),
		},
	],
};

export default function HtmlApi() {
	return getPageLayout(content);
}

defineWompo(HtmlApi, {
	name: 'html-api-apis-page',
});
