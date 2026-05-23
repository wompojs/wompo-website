import { WompoProps, defineWompo, html } from 'wompo';
import { Link } from 'wompo-router';
import Code from '../Code.js';
import BuiltInCssModules from './BuiltInCssModules.js';
import MoreWidget from './MoreWidget.js';

const ssrIcon = html`
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		fill="currentColor"
		viewBox="0 0 16 16"
	>
		<path
			d="M4.318 2.687C5.234 2.231 6.536 2 8 2s2.766.231 3.682.687C12.644 3.167 13 3.65 13 4c0 .35-.356.833-1.318 1.313C10.766 5.769 9.464 6 8 6s-2.766-.231-3.682-.687C3.356 4.833 3 4.35 3 4c0-.35.356-.833 1.318-1.313M13 5.698V7c0 .27-.21.588-.749.917-.518.317-1.267.56-2.151.692.301-.911.3-1.785-.001-2.692C11.06 5.745 12.123 5.222 13 5.698M3 5.698c.877-.476 1.94.046 2.901.221-.301.907-.302 1.781-.001 2.692-.884-.132-1.633-.375-2.151-.692C3.21 7.588 3 7.27 3 7zm6 1.13C8.685 7.087 7.99 7.087 7.675 6.83l-.013-.01C7.387 6.604 7 6.295 7 6c0-.295.388-.604.662-.82.314-.249 1.012-.249 1.327 0 .274.216.662.525.662.82s-.388.604-.662.82l-.013.01C8.7 7.087 8.315 7.087 8 7.087zM5 8.755v1.244c0 .27-.21.588-.749.917-.6.367-1.482.62-2.519.726.31-1.054.31-2.122-.001-3.18.527-.071 1.135-.106 1.74-.106.605 0 1.214.035 1.741.106-.001.04-.012.078-.012.118zm6 0c0-.04-.011-.078-.012-.118.527-.071 1.135-.106 1.74-.106s1.214.035 1.74.106c-.31 1.057-.31 2.124 0 3.18-1.036-.106-1.918-.36-2.518-.726C11.21 10.587 11 10.269 11 10zm-3 5.247c-1.464 0-2.766-.231-3.682-.687C3.356 12.835 3 12.352 3 12s.356-.835 1.318-1.315C5.234 10.231 6.536 10 8 10s2.766.231 3.682.687C12.644 11.167 13 11.65 13 12s-.356.835-1.318 1.315C10.766 13.769 9.464 14 8 14z"
		/>
	</svg>
`;

const automaticNamingIcon = html`
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		fill="currentColor"
		viewBox="0 0 16 16"
	>
		<path
			d="M2.204 11.078c.767 0 1.201-.356 1.406-.737h.059V11h1.216V7.519c0-1.314-.947-1.783-2.11-1.783C1.355 5.736.75 6.42.69 7.27h1.216c.064-.323.313-.552.84-.552s.864.249.864.771v.464H2.346C1.145 7.953.5 8.568.5 9.496c0 .977.693 1.582 1.704 1.582m.42-.947c-.44 0-.845-.235-.845-.718 0-.395.269-.684.84-.684h.991v.538c0 .503-.444.864-.986.864m5.593.937c1.216 0 1.948-.869 1.948-2.31v-.702c0-1.44-.727-2.305-1.929-2.305-.742 0-1.328.347-1.499.889h-.063V3.983h-1.29V11h1.27v-.791h.064c.21.532.776.86 1.499.86Zm-.43-1.025c-.66 0-1.113-.518-1.113-1.28V8.12c0-.825.42-1.343 1.098-1.343.684 0 1.075.518 1.075 1.416v.45c0 .888-.386 1.401-1.06 1.401Zm2.834-1.328c0 1.47.87 2.378 2.305 2.378 1.416 0 2.139-.777 2.158-1.763h-1.186c-.06.425-.313.732-.933.732-.66 0-1.05-.512-1.05-1.352v-.625c0-.81.371-1.328 1.045-1.328.635 0 .879.425.918.776h1.187c-.02-.986-.787-1.806-2.14-1.806-1.41 0-2.304.918-2.304 2.338z"
		/>
	</svg>
`;

const tsIcon = html`
	<svg width="16" height="16" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#000000">
		<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
		<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
		<g id="SVGRepo_iconCarrier">
			<title>file_type_typescript</title>
			<path
				d="M23.827,8.243A4.424,4.424,0,0,1,26.05,9.524a5.853,5.853,0,0,1,.852,1.143c.011.045-1.534,1.083-2.471,1.662-.034.023-.169-.124-.322-.35a2.014,2.014,0,0,0-1.67-1c-1.077-.074-1.771.49-1.766,1.433a1.3,1.3,0,0,0,.153.666c.237.49.677.784,2.059,1.383,2.544,1.095,3.636,1.817,4.31,2.843a5.158,5.158,0,0,1,.416,4.333,4.764,4.764,0,0,1-3.932,2.815,10.9,10.9,0,0,1-2.708-.028,6.531,6.531,0,0,1-3.616-1.884,6.278,6.278,0,0,1-.926-1.371,2.655,2.655,0,0,1,.327-.208c.158-.09.756-.434,1.32-.761L19.1,19.6l.214.312a4.771,4.771,0,0,0,1.35,1.292,3.3,3.3,0,0,0,3.458-.175,1.545,1.545,0,0,0,.2-1.974c-.276-.395-.84-.727-2.443-1.422a8.8,8.8,0,0,1-3.349-2.055,4.687,4.687,0,0,1-.976-1.777,7.116,7.116,0,0,1-.062-2.268,4.332,4.332,0,0,1,3.644-3.374A9,9,0,0,1,23.827,8.243ZM15.484,9.726l.011,1.454h-4.63V24.328H7.6V11.183H2.97V9.755A13.986,13.986,0,0,1,3.01,8.289c.017-.023,2.832-.034,6.245-.028l6.211.017Z"
				style="fill:#007acc"
			></path>
		</g>
	</svg>
`;

export default function CSSModuleAndMore({ styles: s }: WompoProps) {
	return html`

    <section class="section cssModule">
      <h2>Built-in CSS Modules</h2>
      <p>
        To help your components avoid style confilcts with other components that use the same
        class names, Wompo comes out with <b>built-in CSS Modules</b>.
        Your class names will be automatically replaced with a more unique name, based on the name
        of the component (which is unique). The object with all the replaced class names will
        then be put on the component's props.
      </p>
      <div class="codePreview">
        <${Code}
          code=${`<span class="hljs-keyword">function</span> <span class="hljs-title function_">StyledComponent</span>(<span class="hljs-params">{ styles: s }</span>){\n  <span class="hljs-keyword">return</span> html\`<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=</span></span><span class="hljs-subst">\${s.container}</span><span class="language-xml"><span class="hljs-tag">&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\`</span>;\n}\n<span class="hljs-title class_">StyledComponent</span>.<span class="hljs-property">css</span> = <span class="hljs-string">\`\n  .container {\n    padding: 30px 60px;\n    border-radius: 100px 15px 100px 15px;\n    background-color: #573ef630;\n    position: relative;\n  }\n  .container::after {\n    content: "";\n    position: absolute;\n    width: 50px;\n    height: 50px;\n    background-color: #573ef6;\n    border-radius: 50%;\n    right: -20px;\n    top: -10px;\n  }\n\`</span>;`}
          elaborate=${false}
          language="javascript"
        />
        <div>
          <${BuiltInCssModules} />
          <div class="container">
            I also have the "container" class from another component, but I am not a
            "StyledComponent" and I'm not affected by its styles! I am completely independent and
            safe! Exactly how components are supposed to be, without writing additional code ;)
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 style="text-align: center; margin: 4rem 0;">Want more?</h2>
      <div class="widgets">
        <${MoreWidget} title=${html`Server-Side<br />Rendering`} icon=${ssrIcon}>
          Render the same components on the server, stream them out with Suspense, and mark any
          of them as an island to hydrate on load, on idle, or when it scrolls into view.
        </${MoreWidget}>
        <${MoreWidget} title=${html`Typescript<br />Compatible`} icon=${tsIcon}>
          Wompo is built with TypeScript. This means that type checking is available by default.
        </${MoreWidget}>
        <${MoreWidget} title=${html`Automatic<br />Naming`} icon=${automaticNamingIcon}>
          Your <i>TodoList</i> component will simply be a "todo-list" HTML element, right?<br/>
          We know it, so we do it for you!
        </${MoreWidget}>
      </div>
    </section>
	`;
}

CSSModuleAndMore.css = `
  
`;

defineWompo(CSSModuleAndMore, { name: 'css-modules-and-more' });
