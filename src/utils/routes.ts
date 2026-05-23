export interface DocRoute {
	title: string;
	link: string;
	path: string;
	pagePath: string;
	subRoutes?: DocRoute[];
	meta: {
		title: string;
		description: string;
	};
}

export const docsRoutes: DocRoute[] = [
	{
		title: 'Introduction',
		link: 'introduction',
		path: 'introduction',
		pagePath: './pages/docs/Introduction.js',
		meta: {
			title: 'Wompo - Introduction',
			description:
				'Wompo has the following features: react-like API, performant, built-in CSS modules, automatic component naming, re-usable, has JSX Support, is bundle free.',
		},
	},
	{
		title: 'Installation',
		link: 'installation',
		path: 'installation',
		pagePath: './pages/docs/Installation.js',
		meta: {
			title: 'Wompo - Installation',
			description: 'Learn how to install Wompo on your Web Application.',
		},
	},
	{
		title: 'Guides',
		link: '/docs/guides',
		path: 'guides',
		pagePath: './pages/docs/guides/Guides.js',
		meta: {
			title: 'Wompo Guides',
			description: 'Check the guides that Wompo has to help you so that you learn Wompo easier.',
		},
		subRoutes: [
			{
				title: 'Quick start',
				link: '/docs/guides/quick-start',
				path: 'quick-start',
				pagePath: './pages/docs/guides/QuickStart.js',
				meta: {
					title: 'Quick Start',
					description:
						'See how to create a counter component with Wompo and explore the main APIs of the library.',
				},
			},
			{
				title: 'Complex Example',
				link: '/docs/guides/complex-example',
				path: 'complex-example',
				pagePath: './pages/docs/guides/ComplexExample.js',
				meta: {
					title: 'Complex Example',
					description: 'See how to create a Todo List with Wompo and explore more complex APIs.',
				},
			},
			{
				title: 'Styling',
				link: '/docs/guides/styling',
				path: 'styling',
				pagePath: './pages/docs/guides/Styling.js',
				meta: {
					title: 'Styling your components',
					description:
						"Explore different approaches to style your components: basic CSS, with Shadow DOM, or with Wompo's built-in CSS Modules.",
				},
			},
			{
				title: 'Custom hooks',
				link: '/docs/guides/custom-hooks',
				path: 'custom-hooks',
				pagePath: './pages/docs/guides/CustomHooks.js',
				meta: {
					title: 'Custom hooks',
					description: 'Learn how to create your own custom hook with Wompo.',
				},
			},
		],
	},
	{
		title: 'Hooks',
		link: '/docs/hooks',
		path: 'hooks',
		pagePath: './pages/docs/hooks/Hooks.js',
		meta: {
			title: 'Wompo Hooks',
			description:
				'Wompo has different built-in hooks that you can use to add specific functionalities in your components.',
		},
		subRoutes: [
			{
				title: 'useAsync',
				link: '/docs/hooks/useAsync',
				path: 'useAsync',
				pagePath: './pages/docs/hooks/UseAsync.js',
				meta: {
					title: 'useAsync - Wompo hooks',
					description:
						'The useAsync hook will take care of asynchronous operations in the component by executing a callback on first render and when one of its dependencies changes.',
				},
			},
			{
				title: 'useCallback',
				link: '/docs/hooks/useCallback',
				path: 'useCallback',
				pagePath: './pages/docs/hooks/UseCallback.js',
				meta: {
					title: 'useCallback - Wompo hooks',
					description:
						"The useCallback hook will take a function and save it so that it's not re-created on every render.",
				},
			},
			{
				title: 'useContext',
				link: '/docs/hooks/useContext',
				path: 'useContext',
				pagePath: './pages/docs/hooks/UseContext.js',
				meta: {
					title: 'useContext - Wompo hooks',
					description:
						'The useContext hook returns the value provided by the closest parent context provider of the specified context and re-renders the component if the context changes.',
				},
			},
			{
				title: 'useEffect',
				link: '/docs/hooks/useEffect',
				path: 'useEffect',
				pagePath: './pages/docs/hooks/UseEffect.js',
				meta: {
					title: 'useEffect - Wompo hooks',
					description:
						'The useEffect hook will execute a callback on the first render and whenever one of its dependencies changes.',
				},
			},
			{
				title: 'useExposed',
				link: '/docs/hooks/useExposed',
				path: 'useExposed',
				pagePath: './pages/docs/hooks/UseExposed.js',
				meta: {
					title: 'useExposed - Wompo hooks',
					description:
						"The useExposed hook will let you expose some values and/or functions in the comonent's instance in the DOM.",
				},
			},
			{
				title: 'useHook',
				link: '/docs/hooks/useHook',
				path: 'useHook',
				pagePath: './pages/docs/hooks/UseHook.js',
				meta: {
					title: 'useHook - Wompo hooks',
					description:
						'The useHook hook is a special hook that allows to create your custom advanced hooks.',
				},
			},
			{
				title: 'useId',
				link: '/docs/hooks/useId',
				path: 'useId',
				pagePath: './pages/docs/hooks/UseId.js',
				meta: {
					title: 'useId - Wompo hooks',
					description:
						'The useId hook allows to create a pseudo-random unique ID to use inside your components.',
				},
			},
			{
				title: 'useLayoutEffect',
				link: '/docs/hooks/useLayoutEffect',
				path: 'useLayoutEffect',
				pagePath: './pages/docs/hooks/UseLayoutEffect.js',
				meta: {
					title: 'useLayoutEffect - Wompo hooks',
					description:
						'The useLayoutEffect hook allows to synchronously execute a callback on the first render or whenever one of its dependencies changes.',
				},
			},
			{
				title: 'useMemo',
				link: '/docs/hooks/useMemo',
				path: 'useMemo',
				pagePath: './pages/docs/hooks/UseMemo.js',
				meta: {
					title: 'useMemo - Wompo hooks',
					description:
						'The useMemo hook will let you execute a callback function and return its result only when a dependency changes, instead of on every render.',
				},
			},
			{
				title: 'useReducer',
				link: '/docs/hooks/useReducer',
				path: 'useReducer',
				pagePath: './pages/docs/hooks/UseReducer.js',
				meta: {
					title: 'useReducer - Wompo hooks',
					description:
						'The useReducer hook will let manage the state of your component in a Redux-like approach.',
				},
			},
			{
				title: 'useRef',
				link: '/docs/hooks/useRef',
				path: 'useRef',
				pagePath: './pages/docs/hooks/UseRef.js',
				meta: {
					title: 'useRef - Wompo hooks',
					description:
						'The useRef hook will save a value across renders and will always return the same.',
				},
			},
			{
				title: 'useSelf',
				link: '/docs/hooks/useSelf',
				path: 'useSelf',
				pagePath: './pages/docs/hooks/UseSelf.js',
				meta: {
					title: 'useSelf - Wompo hooks',
					description: 'The useSelf hook will return the HTML instance of the custom component.',
				},
			},
			{
				title: 'useState',
				link: '/docs/hooks/useState',
				path: 'useState',
				pagePath: './pages/docs/hooks/UseState.js',
				meta: {
					title: 'useState - Wompo hooks',
					description:
						'The useState hook will save a value across renders without re-initializing a variable.',
				},
			},
		],
	},
	{
		title: 'Components',
		link: '/docs/components',
		path: 'components',
		pagePath: './pages/docs/components/Components.js',
		meta: {
			title: 'Wompo built-in components',
			description: 'Check which components are available when installing Wompo.',
		},
		subRoutes: [
			{
				title: 'Suspense',
				link: '/docs/components/suspense',
				path: 'suspense',
				pagePath: './pages/docs/components/SuspenseComponent.js',
				meta: {
					title: 'Suspense - Wompo components',
					description:
						'The Suspense component will show a fallback UI while at least one of its children is still rendering or making an asynchronous operation.',
				},
			},
		],
	},
	{
		title: 'APIs',
		link: '/docs/apis',
		path: 'apis',
		pagePath: './pages/docs/apis/Apis.js',
		meta: {
			title: 'Wompo APIs',
			description: 'Check which APIs are available when using Wompo.',
		},
		subRoutes: [
			{
				title: 'attrs',
				link: '/docs/apis/attrs',
				path: 'attrs',
				pagePath: './pages/docs/apis/Attrs.js',
				meta: {
					title: 'attrs - Wompo APIs',
					description:
						'The attrs function spreads a bag of attributes, events, and properties onto a single element inside an html template.',
				},
			},
			{
				title: 'createContext',
				link: '/docs/apis/createContext',
				path: 'createContext',
				pagePath: './pages/docs/apis/CreateContext.js',
				meta: {
					title: 'createContext - Wompo APIs',
					description:
						'The createContext function allows to create a Context to share between a portion of your application.',
				},
			},
			{
				title: 'createPortal',
				link: '/docs/apis/createPortal',
				path: 'createPortal',
				pagePath: './pages/docs/apis/CreatePortal.js',
				meta: {
					title: 'createPortal - Wompo APIs',
					description:
						'The createPortal function allows to render custom HTML in another area of the DOM.',
				},
			},
			{
				title: 'defineWompo',
				link: '/docs/apis/defineWompo',
				path: 'defineWompo',
				pagePath: './pages/docs/apis/DefineWompo.js',
				meta: {
					title: 'defineWompo - Wompo APIs',
					description:
						'The defineWompo function will transform your functional Component into a Web Component, so that it can be used in your HTML.',
				},
			},
			{
				title: 'Dynamic Tags',
				link: '/docs/apis/dynamic-tags',
				path: 'dynamic-tags',
				pagePath: './pages/docs/apis/DynamicTags.js',
				meta: {
					title: 'Dynamic Tags - Wompo APIs',
					description:
						'Use a runtime value as the tag name of an element inside an html template, including components, built-in tags, and conditional expressions.',
				},
			},
			{
				title: 'Element API',
				link: '/docs/apis/element',
				path: 'element',
				pagePath: './pages/docs/apis/ElementApi.js',
				meta: {
					title: 'Element API - Wompo APIs',
					description:
						'Check which functions and data you can access in your custom component DOM element.',
				},
			},
			{
				title: 'html',
				link: '/docs/apis/html',
				path: 'html',
				pagePath: './pages/docs/apis/HtmlApi.js',
				meta: {
					title: 'html API - Wompo APIs',
					description:
						"The html function lets you build your component's HTML as a string, and get the dynamic parts of it.",
				},
			},
			{
				title: 'lazy',
				link: '/docs/apis/lazy',
				path: 'lazy',
				pagePath: './pages/docs/apis/LazyApi.js',
				meta: {
					title: 'lazy API - Wompo APIs',
					description:
						"Learn how to use the lazy function to load a component only when it's used and improve performances.",
				},
			},
			{
				title: 'registeredComponents',
				link: '/docs/apis/registeredComponents',
				path: 'registeredComponents',
				pagePath: './pages/docs/apis/RegisteredComponents.js',
				meta: {
					title: 'registeredComponents API - Wompo APIs',
					description: 'Learn how you can get the Wompo registered components.',
				},
			},
			{
				title: 'unsafelyRenderString',
				link: '/docs/apis/unsafelyRenderString',
				path: 'unsafelyRenderString',
				pagePath: './pages/docs/apis/UnsafelyRenderString.js',
				meta: {
					title: 'unsafelyRenderString API - Wompo APIs',
					description: "Learn how you can avoid Wompo's automatic HTML escaping.",
				},
			},
			{
				title: 'wompDefaultOptions',
				link: '/docs/apis/wompoDefaultOptions',
				path: 'wompoDefaultOptions',
				pagePath: './pages/docs/apis/WompoDefaultOptions.js',
				meta: {
					title: 'wompDefaultOptions API - Wompo APIs',
					description:
						"Learn how you can modify Wompo's default options for your custom components.",
				},
			},
		],
	},
	{
		title: 'Typescript',
		link: '/docs/typescript',
		path: 'typescript',
		pagePath: './pages/docs/Typescript.js',
		meta: {
			title: 'Typescript',
			description:
				'Learn how to use Typescript and improve your development experience with Wompo.',
		},
	},
	{
		title: 'SSR',
		link: '/docs/ssr',
		path: 'ssr',
		pagePath: './pages/docs/Ssr.js',
		meta: {
			title: 'SSR',
			description: 'Learn how to Server Side render your Wompo components.',
		},
	},
];
