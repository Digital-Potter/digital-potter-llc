import Link from 'next/link';

export type BlogTeaserPost = {
	slug: string;
	title: string;
	excerpt: string;
	category: string;
	readTime: string;
};

// Placeholder posts — swap to CMS data by passing `posts` from the parent.
const placeholderPosts: BlogTeaserPost[] = [
	{
		slug: 'why-we-built-our-own-cms',
		title: 'Why we built our own CMS instead of using WordPress.',
		excerpt:
			"WordPress gets you 80% of the way there and bleeds you on the last 20%. Here's why we shipped our own headless CMS, and the three trade-offs we made on purpose.",
		category: 'Engineering',
		readTime: '6 min read',
	},
	{
		slug: 'the-cost-of-free-websites',
		title: 'The hidden cost of "free" websites for small businesses.',
		excerpt:
			"Wix and Squarespace are cheap until they aren't. We break down the real five-year cost of template platforms versus owning a custom Next.js site — including the trap most owners don't see coming.",
		category: 'Business',
		readTime: '5 min read',
	},
	{
		slug: 'designing-for-conversion',
		title:
			'Designing for conversion: 5 patterns that actually move the needle.',
		excerpt:
			'Pretty designs are easy. Designs that move people through your funnel are not. Here are five layout patterns we use on every Digital Potter site, with before/after data from real client sites.',
		category: 'Design',
		readTime: '7 min read',
	},
];

type BlogTeaserProps = {
	posts?: BlogTeaserPost[];
};

export default function BlogTeaser({
	posts = placeholderPosts,
}: BlogTeaserProps) {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
				<div className="max-w-2xl">
					<h2 className="text-balance">Fresh ideas & expert tips.</h2>
					<p className="text-dp-body/80 mt-4 text-balance">
						Notes from the studio on building, shipping, and maintaining digital
						products that earn their keep.
					</p>
				</div>
				<Link
					href="/blog"
					className="text-dp-dark-green font-primary-font hover:text-dp-green text-sm font-bold tracking-wider uppercase"
				>
					See all posts →
				</Link>
			</div>

			<ul className="mt-12 grid gap-8 md:grid-cols-3">
				{posts.map((post) => (
					<li key={post.slug}>
						<Link href={`/blog/${post.slug}`} className="group block h-full">
							<div className="dp-box-design relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
								<div className="from-dp-green/30 via-dp-yellowish to-dp-dark-green/20 absolute inset-0 bg-gradient-to-br" />
								<div className="absolute inset-0 flex items-center justify-center">
									<span className="text-dp-body/30 text-xs font-bold tracking-widest uppercase">
										Article cover
									</span>
								</div>
							</div>
							<div className="mt-5 flex items-center gap-3 text-xs">
								<span className="bg-dp-dark-green/10 text-dp-dark-green rounded-full px-3 py-1 font-bold tracking-wider uppercase">
									{post.category}
								</span>
								<span className="text-dp-body/60">{post.readTime}</span>
							</div>
							<h3 className="font-primary-font group-hover:text-dp-dark-green mt-4 text-xl font-bold transition-colors md:text-2xl">
								{post.title}
							</h3>
							<p className="text-dp-body/75 mt-3 text-base">{post.excerpt}</p>
							<span className="text-dp-dark-green group-hover:text-dp-green mt-4 inline-block text-sm font-bold">
								Read more →
							</span>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
}
