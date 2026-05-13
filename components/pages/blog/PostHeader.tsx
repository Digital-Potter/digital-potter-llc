import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import type { CmsBlogPost } from '@/helpers/cms/types';
import type { SiteUrls } from '@/helpers/cms/urls';

type PostHeaderProps = {
	post: CmsBlogPost;
	urls: SiteUrls;
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

export default function PostHeader({ post, urls }: PostHeaderProps) {
	const date = formatDate(post.publishedAt);
	const author = authorName(post.author);
	const primaryCategory = post.categories?.[0];

	return (
		<section className="dp-container py-12 md:py-16">
			<Breadcrumbs
				items={[
					{ label: 'Home', href: '/' },
					{ label: 'Blog', href: urls.blogIndex },
					{ label: post.title, href: urls.blogPost(post.slug) },
				]}
			/>

			<div className="mx-auto mt-10 max-w-4xl text-center">
				{primaryCategory && (
					<Link
						href={urls.blogCategory(primaryCategory.slug)}
						className="text-dp-dark-green font-primary-font hover:text-dp-green text-xs font-bold tracking-widest uppercase"
					>
						{primaryCategory.name}
					</Link>
				)}
				<h1 className="mt-6 text-balance">{post.title}</h1>
				{post.subtitle && (
					<p className="text-dp-body-soft mx-auto mt-6 max-w-2xl text-lg text-balance md:text-xl">
						{post.subtitle}
					</p>
				)}
				{(author || date) && (
					<p className="text-dp-body-soft mt-8 text-sm">
						{author && <span className="text-dp-dark font-bold">{author}</span>}
						{author && date && (
							<span className="text-dp-body-soft mx-2">·</span>
						)}
						{date && <span>{date}</span>}
					</p>
				)}
			</div>

			{post.featuredImage?.url && (
				<div className="mx-auto mt-12 max-w-5xl">
					<Image
						src={post.featuredImage.url}
						alt={post.featuredImage.alt ?? post.title}
						width={post.featuredImage.width ?? 1600}
						height={post.featuredImage.height ?? 900}
						sizes="(min-width: 1024px) 64rem, 100vw"
						priority
						className="dp-box-design h-auto w-full rounded-3xl"
					/>
				</div>
			)}
		</section>
	);
}
