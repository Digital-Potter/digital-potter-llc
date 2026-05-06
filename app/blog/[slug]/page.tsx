import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchBlogPostBySlugOrNull } from '@/helpers/cms/blog';
import { resolveCtaHref } from '@/components/layout/cta-href';
import {
	PostHeader,
	PostBody,
	PostTags,
	RelatedPosts,
} from '@/components/pages/blog';
import { FinalCta } from '@/components/pages/home';

type Params = { slug: string };

export async function generateMetadata({
	params,
}: {
	params: Promise<Params>;
}): Promise<Metadata> {
	const { slug } = await params;
	const data = await fetchBlogPostBySlugOrNull(slug);
	const post = data?.post;
	if (!post) {
		return {
			title: 'Post not found',
			robots: { index: false, follow: false },
		};
	}
	return {
		title: post.seo?.metaTitle ?? `${post.title} — Digital Potter`,
		description: post.seo?.metaDescription ?? post.excerpt ?? post.subtitle,
		openGraph: post.seo?.ogImage
			? { images: [post.seo.ogImage] }
			: post.featuredImage?.url
				? { images: [post.featuredImage.url] }
				: undefined,
		alternates: post.seo?.canonicalUrl
			? { canonical: post.seo.canonicalUrl }
			: undefined,
		robots: post.seo?.noIndex ? { index: false, follow: false } : undefined,
	};
}

export default async function BlogDetailPage({
	params,
}: {
	params: Promise<Params>;
}) {
	const { slug } = await params;
	const data = await fetchBlogPostBySlugOrNull(slug);
	if (!data) notFound();

	const { post, related } = data;
	const cta = await resolveCtaHref();

	return (
		<>
			<PostHeader post={post} />
			{post.content ? <PostBody html={post.content} /> : null}
			{post.tags && post.tags.length > 0 ? <PostTags tags={post.tags} /> : null}
			<RelatedPosts posts={related ?? []} />
			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}
