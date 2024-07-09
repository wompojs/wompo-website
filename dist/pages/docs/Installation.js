import{Fragment as i,jsx as o,jsxs as e}from"wompo/jsx-runtime";import{defineWompo as p}from"wompo";import l from"../../utils/getPageLayout.js";import t from"../../components/Code.js";const a={title:"Installation",description:"Learn how to install Wompo in your application.",sections:[{title:"Methods of installation",id:"methods",content:o(i,{children:e("p",{children:["You can install and use Wompo in any Web Environment. Right now you have the following options:",e("ol",{children:[o("li",{children:"Install it through npm"}),o("li",{children:"Import it through a script hosted by jsDeliver"}),o("li",{children:"Download it and use it locally"})]})]})})},{title:"npm",id:"npm",content:e(i,{children:[o("p",{children:"You can install wompo using npm by simply typing the following line in the terminal:"}),o(t,{code:"npm i wompo",language:"js"}),o("p",{children:"And then import it whenever you use it:"}),o(t,{code:"import { html, defineWompo } from 'wompo';",language:"js"}),e("p",{children:["If you don't have or don't want a bundler, you can use an ",o("b",{children:"importmap"}),' script in your html file and reference the "wompo" library in the node_modules folder, like so (replace "[root]" with the path to reach your node_modules folder through the html file):']}),o(t,{code:`
              <script type="importmap">
                {
                  "imports": {
                    "wompo": "[root]/node_modules/wompo/dist/wompo.js"
                  }
                }
              <\/script>
            `,language:"html"}),"If you use JSX add also this line below wompo:",o(t,{code:`
              "wompo/jsx-runtime": "[root]/node_modules/wompo/jsx-runtime.js"
						`,language:"html"})]})},{title:"jsDeliver",id:"js-deliver",content:e(i,{children:[o("p",{children:"You can install wompo in your application by simply importing the file from jsDeliver:"}),o(t,{code:`
              <script type="module">
                import * as wompo from 'https://cdn.jsdelivr.net/npm/wompo@1.0.10';

                window.wompo = wompo; // Optional
              <\/script>
            `,language:"html"}),e("p",{children:["If saving Wompo in the window object is not ideal, maybe you want to define an"," ",o("b",{children:"importmap"}),' script (replace "[root]" with the path to reach your node_modules folder through the html file):']}),o(t,{code:`
              <script type="importmap">
                {
                  "imports": {
                    "wompo": "https://cdn.jsdelivr.net/npm/wompo@1.0.10"
                  }
                }
              <\/script>
            `,language:"html"}),o("p",{children:"And then, use it like if it was installed in your node_modules:"}),o(t,{code:"import { html, defineWompo } from 'wompo';",language:"js"})]})},{title:"Download",id:"download",content:e(i,{children:[e("p",{children:["You can download Wompo and run it locally by clicking this button:",o("br",{}),o("a",{href:"/wompo.zip",style:{border:"none",backgroundColor:"#573EF6",padding:"10px 20px",borderRadius:10,color:"#fff",margin:"2rem 0",display:"inline-block"},children:"Download"}),o("br",{}),"The js file is in the unzipped folder ",o("i",{children:"/dist/wompo"}),". After you put it in your project, import it:"]}),o(t,{code:`
              <script type="module">
                import * as wompo from '/path/to/wompo.js';

                window.wompo = wompo; // Optional
              <\/script>
            `,language:"html"}),e("p",{children:["If saving Wompo in the window object is not ideal, maybe you want to define an"," ",o("b",{children:"importmap"})," script (replace the path with your own path to reach your file):"]}),o(t,{code:`
              <script type="importmap">
                {
                  "imports": {
                    "wompo": "/path/to/wompo.js"
                  }
                }
              <\/script>
            `,language:"html"}),o("p",{children:"And then, use it like if it was installed in your node_modules:"}),o(t,{code:"import { html, defineWompo } from 'wompo';",language:"js"})]})}]};export default function n(){return l(a)}p(n,{name:"installation-page"});
