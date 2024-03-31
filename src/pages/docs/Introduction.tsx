import { defineWomp } from 'womp';
import getPageLayout, { Contents } from '../../utils/getPageLayout.js';

const content: Contents = {
	title: 'Introduction',
	description: 'Womp is a React-like Web-Component library for creating functional UIs in the Web.',
	sections: [
		{
			title: 'Why?',
			id: 'why',
			content: (
				<>
					<p>
						The reason why Womp is born is to make Web development easier: by taking advantage of
						native Javascript functionalities, Womp allows you to create a reusable, shareable, and
						fast Web-Component.
						<br />
						Womp was created by "merging" two main libraries: <b>React</b> and <b>Lit</b>. More
						specifically, the <b>Core concepts</b> of React, and the <b>Blazing fast</b> rendering
						speed of Lit. This allowed to create an easy-to-use and beginner-friendly library like
						React, while still keeping an eye on performances.
					</p>
					<p>
						Matter of fact: this documentation was built for completeness, but you can actually go
						to check the React documentation and realize it's kind of the same thing. This allows
						you to (super) easily migrate to Womp.
					</p>
					<p>
						But there are already tons of libraries that serve the same purpose, like <b>Stencil</b>
						, <b>Atomico</b>, and, of course <b>Lit</b>, so why Womp?
						<br />
						The reason is simple: we don't like to overcomplicate things. Womp is already
						super-fast, is it worth it to learn completely new concepts and libraries to just save 2
						milliseconds? Are 2 milliseconds worth months of studying and experimenting? We think
						not. There is no need to learn <b>Typescript</b> (althought it is natively supported,
						because Womp is built with it), Javascript classses, and understaning the <b>this</b>{' '}
						keyword: the only thing you must know is basic HTML, basic CSS, and basic JS. That's it.
						Womp is accessible by <b>completely begginers</b> but also by experts.
					</p>
				</>
			),
		},
		{
			title: 'Web Components',
			id: 'web-components',
			content: (
				<>
					<p>
						The only new concept you'll have to learn is:{' '}
						<i>
							what the hell is a Web-Component, and what is the difference between a React component
							and a Web-Component?
						</i>
					</p>
					<p>
						A <b>Web Component</b> is a native feature of browsers that allows to create a custom
						HTML element that can be re-used and "isolated" using <b>Shadow DOM</b>, so that it'll
						not be able to alter and be altered by other elements in the page. Because it is native,
						if you want to use a third party component you'll just have to include the component's
						JS (and the Womp library if you didn't already import it, which only weights 5KB) and
						you're ready to go. No need to compile. This means that you can use third party
						components even if you're not using a compiler or bundler, so even websites that are not
						up-to-date with the latest technologies can easily integrate Womp. You can even use Womp
						while still using other libraries like React, Angular, and so on, without needing to
						worry about conflicts.
					</p>
					<p>
						You can find everything in details about Web Components on the{' '}
						<a
							target='_blank'
							href='https://developer.mozilla.org/en-US/docs/Web/API/Web_components'
						>
							MDN Documentation
						</a>
						.
					</p>
				</>
			),
		},
	],
};

export default function Introduction() {
	return getPageLayout(content);
}

defineWomp(Introduction);
