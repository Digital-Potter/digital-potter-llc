import { BlogHero, PostsList } from '@/components/pages/blog';
import {
	getBlogPlaceholders,
	mapCmsBlogPostToCard,
} from '@/components/pages/blog/blogData';
import { fetchBlogPostsOrEmpty } from '@/helpers/cms/blog';
import { resolveCtaHref } from '@/components/layout/cta-href';
import { getSiteUrls } from '@/helpers/cms/urls';
import { FinalCta } from '@/components/pages/home';

/**
 * Blog listing template. Pulls published posts from the storefront and
 * falls back to placeholder cards if the API returns nothing. Used by the
 * dynamic catch-all whenever the URL's first segment matches the
 * configured `siteStructure.blogSlug` (defaults to `blog`).
 */
export async function BlogTemplate() {
	const [cta, urls, list] = await Promise.all([
		resolveCtaHref(),
		getSiteUrls(),
		fetchBlogPostsOrEmpty(1, 24),
	]);
	const posts =
		list.items.length > 0
			? list.items.map((p) => mapCmsBlogPostToCard(p, urls))
			: getBlogPlaceholders(urls);
	const totalPosts = list.items.length > 0 ? list.total : posts.length;

	return (
		<>
			<BlogHero totalPosts={totalPosts} />
			<PostsList posts={posts} />
			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}
