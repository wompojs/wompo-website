import { WompProps, defineWomp } from 'womp';
import getPage, { Contents } from '../utils/getPage';

const content: Contents = {
	title: 'Introductionnnnn',
	description: (
		<>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. A blanditiis perspiciatis
			necessitatibus veritatis animi libero perferendis reiciendis voluptate incidunt tenetur sed
			quasi rem porro ipsa aliquid unde <a>nobis</a> debitis neque dolore quibusdam, cum iusto
			autem?
		</>
	),
	sections: [
		{
			title: 'Why?',
			id: 'why',
			content: (
				<>
					<p>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque atque reprehenderit
						quam. Consequatur nam, itaque, facere inventore cupiditate voluptatum ad accusantium
						sint quidem molestiae totam doloribus blanditiis, dolores delectus at necessitatibus.
						Quibusdam, voluptatem sequi? Sed asperiores, ad rem alias nobis odio iusto quidem esse,
						veritatis, veniam quam amet porro repudiandae.
					</p>
					<ul>
						<li>
							<a>First Item</a> - Lorem Ipsum Dolor Sit Amet
						</li>
						<li>
							<a>Second Item</a> - Lorem Ipsum Dolor Sit Amet
						</li>
						<li>
							<a>Third Item</a> - Lorem Ipsum Dolor Sit Amet
						</li>
						<li>
							<a>Fourth Item</a> - Lorem Ipsum Dolor Sit Amet
						</li>
					</ul>
					<p>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque atque reprehenderit
						quam. Consequatur nam, itaque, facere inventore cupiditate voluptatum ad accusantium
						sint quidem molestiae <code>totam doloribus</code> blanditiis, dolores delectus at
						necessitatibus. Quibusdam, voluptatem sequi? Sed asperiores, ad rem alias nobis odio
						iusto quidem esse, veritatis, veniam quam amet porro repudiandae.
					</p>
				</>
			),
		},
		{
			title: 'Second section',
			id: 'second-section',
			content: (
				<>
					<p>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque atque reprehenderit
						quam. Consequatur nam, itaque, facere inventore cupiditate voluptatum ad accusantium
						sint quidem molestiae totam doloribus blanditiis, dolores delectus at necessitatibus.
						Quibusdam, voluptatem sequi? Sed asperiores, ad rem alias nobis odio iusto quidem esse,
						veritatis, veniam quam amet porro repudiandae.
					</p>
					<p>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque atque reprehenderit
						quam. Consequatur nam, itaque, facere inventore cupiditate voluptatum ad accusantium
						sint quidem molestiae <code>totam doloribus</code> blanditiis, dolores delectus at
						necessitatibus. Quibusdam, voluptatem sequi? Sed asperiores, ad rem alias nobis odio
						iusto quidem esse, veritatis, veniam quam amet porro repudiandae.
					</p>
				</>
			),
		},
	],
};

export default function Test() {
	return getPage(content);
}

defineWomp(Test);
