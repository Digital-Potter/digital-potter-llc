import { notFound } from 'next/navigation';
import { PostsList } from '@/components/pages/blog';
import { mapCmsBlogPostToCard } from '@/components/pages/blog/blogData';
import { resolveCtaHref } from '@/components/layout/cta-href';
import { fetchBlogPostsOrEmpty } from '@/helpers/cms/blog';
import { fetchStoreSettingsOrNull } from '@/helpers/cms/settings';
import { getSiteUrls } from '@/helpers/cms/urls';
import { FinalCta } from '@/components/pages/home';
import { JsonLd, collectionPageSchema } from '@/helpers/seo/structuredData';

export async function BlogCategoryTemplate({
	categorySlug,
}: {
	categorySlug: string;
}) {
	const [cta, urls, settings, list] = await Promise.all([
		resolveCtaHref(),
		getSiteUrls(),
		fetchStoreSettingsOrNull(),
		fetchBlogPostsOrEmpty({ category: categorySlug, limit: 50 }),
	]);

	if (list.items.length === 0) notFound();

	const categoryName =
		list.items[0].categories?.find((c) => c.slug === categorySlug)?.name ??
		categorySlug;
	const posts = list.items.map((p) => mapCmsBlogPostToCard(p, urls));

	const tenant = settings?.tenant;
	const blogSchema = tenant
		? collectionPageSchema({
				type: 'Blog',
				name: `${categoryName} — ${tenant.settings.storeName} Blog`,
				description: `Posts in the ${categoryName} category.`,
				url: urls.blogCategory(categorySlug),
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
			<section className="dp-container py-16 md:py-24">
				<div className="mx-auto max-w-4xl text-center">
					<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
						Category
					</p>
					<h1 className="mt-6 text-balance">{categoryName}</h1>
					<p className="text-dp-body/60 mt-6 text-sm">
						{list.total} {list.total === 1 ? 'post' : 'posts'} in this category.
					</p>
				</div>
			</section>
			<PostsList posts={posts} />
			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}
