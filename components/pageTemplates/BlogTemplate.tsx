import { BlogHero, PostsList } from '@/components/pages/blog';
import {
	getBlogPlaceholders,
	mapCmsBlogPostToCard,
} from '@/components/pages/blog/blogData';
import { fetchBlogPostsOrEmpty } from '@/helpers/cms/blog';
import { resolveCtaHref } from '@/components/layout/cta-href';
import { fetchStoreSettingsOrNull } from '@/helpers/cms/settings';
import { getSiteUrls } from '@/helpers/cms/urls';
import { FinalCta } from '@/components/pages/home';
import { JsonLd, collectionPageSchema } from '@/helpers/seo/structuredData';

/**
 * Blog listing template. Pulls published posts from the storefront and
 * falls back to placeholder cards if the API returns nothing. Used by the
 * dynamic catch-all whenever the URL's first segment matches the
 * configured `siteStructure.blogSlug` (defaults to `blog`).
 */
export async function BlogTemplate() {
	const [cta, urls, list, settings] = await Promise.all([
		resolveCtaHref(),
		getSiteUrls(),
		fetchBlogPostsOrEmpty({ limit: 24 }),
		fetchStoreSettingsOrNull(),
	]);
	const posts =
		list.items.length > 0
			? list.items.map((p) => mapCmsBlogPostToCard(p, urls))
			: getBlogPlaceholders(urls);
	const totalPosts = list.items.length > 0 ? list.total : posts.length;

	const tenant = settings?.tenant;
	const blogSchema = tenant
		? collectionPageSchema({
				type: 'Blog',
				name: `${tenant.settings.storeName} Blog`,
				description: settings?.settings?.seo?.defaultDescription,
				url: urls.blogIndex,
				itemType: 'BlogPosting',
				items: posts.map((p) => ({
					name: p.title,
					url: p.href,
					datePublished: p.publishedAt,
					image: p.featuredImage?.url,
					description: p.excerpt,
				})),
			})
		: null;

	return (
		<>
			<JsonLd data={blogSchema} />
			<BlogHero totalPosts={totalPosts} />
			<PostsList posts={posts} />
			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}
