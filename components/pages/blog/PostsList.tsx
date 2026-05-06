import Link from 'next/link';
import { BLOG_PLACEHOLDERS, type BlogPostCard } from './blogData';

function formatDate(iso?: string) {
	if (!iso) return null;
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return null;
	return d.toLocaleDateString(undefined, {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
}

type PostsListProps = {
	posts?: BlogPostCard[];
};

export default function PostsList({
	posts = BLOG_PLACEHOLDERS,
}: PostsListProps) {
	const [feature, ...rest] = posts;

	return (
		<section className="dp-container py-12 md:py-16">
			{feature ? <FeaturedPost post={feature} /> : null}

			{rest.length > 0 ? (
				<ul className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{rest.map((p) => (
						<li key={p.slug}>
							<PostCard post={p} />
						</li>
					))}
				</ul>
			) : null}
		</section>
	);
}

function FeaturedPost({ post }: { post: BlogPostCard }) {
	const date = formatDate(post.publishedAt);
	return (
		<Link
			href={`/blog/${post.slug}`}
			className="group border-dp-green/40 hover:border-dp-green grid items-center gap-8 rounded-3xl border-2 bg-white/40 p-8 transition-colors md:grid-cols-2 md:gap-12 md:p-12"
		>
			<div className="dp-box-design relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
				<div className="from-dp-green/30 via-dp-yellowish to-dp-dark-green/20 absolute inset-0 bg-gradient-to-br" />
				<div className="absolute inset-0 flex items-center justify-center">
					<span className="text-dp-body/30 text-xs font-bold tracking-widest uppercase">
						Article cover
					</span>
				</div>
				<span className="bg-dp-dark-green text-dp-yellowish absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase">
					Featured
				</span>
			</div>
			<div>
				<div className="flex items-center gap-3 text-xs">
					<span className="bg-dp-dark-green/10 text-dp-dark-green rounded-full px-3 py-1 font-bold tracking-wider uppercase">
						{post.category}
					</span>
					<span className="text-dp-body/60">{post.readTime}</span>
					{date ? <span className="text-dp-body/60">{date}</span> : null}
				</div>
				<h2 className="group-hover:text-dp-dark-green mt-4 text-balance transition-colors">
					{post.title}
				</h2>
				<p className="text-dp-body/80 mt-4 text-base md:text-lg">
					{post.excerpt}
				</p>
				<span className="text-dp-dark-green group-hover:text-dp-green mt-6 inline-block text-sm font-bold tracking-wider uppercase">
					Read the post →
				</span>
			</div>
		</Link>
	);
}

function PostCard({ post }: { post: BlogPostCard }) {
	const date = formatDate(post.publishedAt);
	return (
		<Link href={`/blog/${post.slug}`} className="group block h-full">
			<div className="dp-box-design relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
				<div className="from-dp-green/30 via-dp-yellowish to-dp-dark-green/20 absolute inset-0 bg-gradient-to-br" />
				<div className="absolute inset-0 flex items-center justify-center">
					<span className="text-dp-body/30 text-xs font-bold tracking-widest uppercase">
						Article cover
					</span>
				</div>
			</div>
			<div className="mt-5 flex flex-wrap items-center gap-3 text-xs">
				<span className="bg-dp-dark-green/10 text-dp-dark-green rounded-full px-3 py-1 font-bold tracking-wider uppercase">
					{post.category}
				</span>
				<span className="text-dp-body/60">{post.readTime}</span>
				{date ? <span className="text-dp-body/60">{date}</span> : null}
			</div>
			<h3 className="font-primary-font group-hover:text-dp-dark-green mt-4 text-xl font-bold transition-colors md:text-2xl">
				{post.title}
			</h3>
			<p className="text-dp-body/75 mt-3 text-base">{post.excerpt}</p>
			<span className="text-dp-dark-green group-hover:text-dp-green mt-4 inline-block text-sm font-bold">
				Read more →
			</span>
		</Link>
	);
}
