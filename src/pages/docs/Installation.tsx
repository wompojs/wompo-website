import { defineWompo } from 'wompo';
import getPageLayout, { Contents } from '../../utils/getPageLayout.js';
import Code from '../../components/Code.js';

const content: Contents = {
	title: 'Installation',
	description: 'Learn how to install Wompo in your application.',
	sections: [
		{
			title: 'Methods of installation',
			id: 'methods',
			content: (
				<>
					<p>
						You can install and use Wompo in any Web Environment. Right now you have the following
						options:
						<ol>
							<li>Install it through npm</li>
							<li>Import it through a script hosted by jsDeliver</li>
							<li>Download it and use it locally</li>
						</ol>
					</p>
				</>
			),
		},
		{
			title: 'npm',
			id: 'npm',
			content: (
				<>
					<p>
						You can install wompo using npm by simply typing the following line in the terminal:
					</p>
					<Code code={`npm i wompo`} language='js' />
					<p>And then import it whenever you use it:</p>
					<Code code={`import { html, defineWompo } from 'wompo';`} language='js' />
					<p>
						If you don't have or don't want a bundler, you can use an <b>importmap</b> script in
						your html file and reference the "wompo" library in the node_modules folder, like so
						(replace "[root]" with the path to reach your node_modules folder through the html
						file):
					</p>
					<Code
						code={`
              <script type="importmap">
                {
                  "imports": {
                    "wompo": "[root]/node_modules/wompo/dist/wompo.js",
                    // Add the following line only if using JSX
                    "wompo/jsx-runtime": "[root]/node_modules/wompo/jsx-runtime.js", 
                  }
                }
              </script>
            `}
						language='html'
					/>
				</>
			),
		},
		{
			title: 'jsDeliver',
			id: 'js-deliver',
			content: (
				<>
					<p>
						You can install wompo in your application by simply importing the file from jsDeliver:
					</p>
					<Code
						code={`
              <script type="module">
                import * as wompo from 'https://cdn.jsdelivr.net/npm/wompo@1.0.6';

                window.wompo = wompo; // Optional
              </script>
            `}
						language='html'
					/>
					<p>
						If saving Wompo in the window object is not ideal, maybe you want to define an{' '}
						<b>importmap</b> script (replace "[root]" with the path to reach your node_modules
						folder through the html file):
					</p>
					<Code
						code={`
              <script type="importmap">
                {
                  "imports": {
                    "wompo": "https://cdn.jsdelivr.net/npm/wompo@1.0.6",
                    // Add the following line only if using JSX
                    "wompo/jsx-runtime": "https://cdn.jsdelivr.net/npm/wompo@1.0.6/jsx-runtime.js", 
                  }
                }
              </script>
            `}
						language='html'
					/>
					<p>And then, use it like if it was installed in your node_modules:</p>
					<Code code={`import { html, defineWompo } from 'wompo';`} language='js' />
				</>
			),
		},
		{
			title: 'Download',
			id: 'download',
			content: (
				<>
					<p>
						You can download Wompo and run it locally by clicking this button:
						<br />
						<a
							href='/wompo.zip'
							style={{
								border: 'none',
								backgroundColor: '#573EF6',
								padding: '10px 20px',
								borderRadius: 10,
								color: '#fff',
								margin: '2rem 0',
								display: 'inline-block',
							}}
						>
							Download
						</a>
						<br />
						The js file is in the unzipped folder <i>/dist/wompo</i>. After you put it in your
						project, import it:
					</p>
					<Code
						code={`
              <script type="module">
                import * as wompo from '/path/to/wompo.js';

                window.wompo = wompo; // Optional
              </script>
            `}
						language='html'
					/>
					<p>
						If saving Wompo in the window object is not ideal, maybe you want to define an{' '}
						<b>importmap</b> script (replace the path with your own path to reach your file):
					</p>
					<Code
						code={`
              <script type="importmap">
                {
                  "imports": {
                    "wompo": "/path/to/wompo.js",
                    // Add the following line only if using JSX
                    "wompo/jsx-runtime": "/path/to/jsx-runtime.js", 
                  }
                }
              </script>
            `}
						language='html'
					/>
					<p>And then, use it like if it was installed in your node_modules:</p>
					<Code code={`import { html, defineWompo } from 'wompo';`} language='js' />
				</>
			),
		},
	],
};

export default function Installation() {
	return getPageLayout(content);
}

defineWompo(Installation, {
	name: 'installation-page',
});
