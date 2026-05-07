import type { Metadata } from 'next';
import { resolveCtaHref } from '@/components/layout/cta-href';
import { BlogHero, PostsList } from '@/components/pages/blog';
import {
	BLOG_PLACEHOLDERS,
	mapCmsBlogPostToCard,
} from '@/components/pages/blog/blogData';
import { fetchBlogPostsOrEmpty } from '@/helpers/cms/blog';
import { FinalCta } from '@/components/pages/home';

export const metadata: Metadata = {
	title: 'Blog — Notes from Digital Potter',
	description:
		'Field notes from Digital Potter on building custom websites and apps, opinions on tools, and the occasional rant about template-builder economics.',
};

export default async function BlogPage() {
	const cta = await resolveCtaHref();

	// Try CMS first, fall back to placeholders if the API returns empty.
	const { items, total } = await fetchBlogPostsOrEmpty(1, 24);
	const posts =
		items.length > 0 ? items.map(mapCmsBlogPostToCard) : BLOG_PLACEHOLDERS;
	const totalPosts = items.length > 0 ? total : posts.length;

	return (
		<>
			<BlogHero totalPosts={totalPosts} />
			<PostsList posts={posts} />
			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}
