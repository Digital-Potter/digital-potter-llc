import Link from 'next/link';
import type { CmsBlogPost } from '@/helpers/cms/types';

type PostHeaderProps = {
	post: CmsBlogPost;
};

function authorName(author?: CmsBlogPost['author']) {
	if (!author) return null;
	const parts = [author.firstName, author.lastName].filter(Boolean);
	return parts.length > 0 ? parts.join(' ') : null;
}

function formatDate(iso?: string) {
	if (!iso) return null;
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return null;
	return d.toLocaleDateString(undefined, {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

export default function PostHeader({ post }: PostHeaderProps) {
	const date = formatDate(post.publishedAt);
	const author = authorName(post.author);
	const primaryCategory = post.categories?.[0];

	return (
		<section className="dp-container py-12 md:py-16">
			<Link
				href="/blog"
				className="text-dp-dark-green hover:text-dp-green font-primary-font inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase"
			>
				<svg
					aria-hidden
					className="h-3 w-3"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth={2.5}
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="m15 18-6-6 6-6" />
				</svg>
				Back to all posts
			</Link>

			<div className="mx-auto mt-10 max-w-4xl text-center">
				{primaryCategory && (
					<Link
						href={`/blog/category/${primaryCategory.slug}`}
						className="text-dp-dark-green font-primary-font hover:text-dp-green text-xs font-bold tracking-widest uppercase"
					>
						{primaryCategory.name}
					</Link>
				)}
				<h1 className="mt-6 text-balance">{post.title}</h1>
				{post.subtitle && (
					<p className="text-dp-body/80 mx-auto mt-6 max-w-2xl text-lg text-balance md:text-xl">
						{post.subtitle}
					</p>
				)}
				{(author || date) && (
					<p className="text-dp-body/70 mt-8 text-sm">
						{author && <span className="text-dp-dark font-bold">{author}</span>}
						{author && date && <span className="text-dp-body/40 mx-2">·</span>}
						{date && <span>{date}</span>}
					</p>
				)}
			</div>

			{post.featuredImage?.url && (
				<div className="mx-auto mt-12 max-w-5xl">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src={post.featuredImage.url}
						alt={post.featuredImage.alt ?? post.title}
						className="dp-box-design w-full rounded-3xl"
					/>
				</div>
			)}
		</section>
	);
}
