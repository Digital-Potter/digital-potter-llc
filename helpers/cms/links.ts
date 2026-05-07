import type { ResolvedMenuItem, StoreSettingsRecord } from './types';

type SiteStructure = StoreSettingsRecord['siteStructure'];

/**
 * Maps a CMS-resolved menu item to the URL path the frontend renders.
 *
 * For "well-known" pages (homepage, blog index, products index, etc.) the
 * Site Structure section in the CMS tells us which Page record fills that
 * role; when a menu item points at that Page we map it to the canonical
 * frontend route (`/`, `/blog`, `/products`, …) instead of `/{slug}`.
 */
export function resolveMenuItemHref(
	item: ResolvedMenuItem,
	siteStructure?: SiteStructure,
): string {
	if (item.type === 'custom') return item.url ?? '#';
	if (!item.resolved) return '#';

	const slug = item.resolved.slug;

	if (item.type === 'page') {
		const canonical = canonicalRouteForPageSlug(slug, siteStructure);
		if (canonical) return canonical;
		return `/${slug}`;
	}

	switch (item.type) {
		case 'blog_post':
			return `/blog/${slug}`;
		case 'blog_category':
			return `/blog/category/${slug}`;
		case 'product':
			return `/products/${slug}`;
		case 'product_category':
			return `/collections/${slug}`;
		case 'course':
			return `/courses/${slug}`;
		default:
			return '#';
	}
}

/**
 * App routes stay at fixed segments (`/blog`, `/portfolio`, `/products`, ...).
 * The `*Slug` overrides in StoreSettings.siteStructure tell us which CMS Page
 * acts as the landing for each section, so a menu item pointing at that Page
 * resolves to the canonical front-end route. Per-tenant route renaming (e.g.
 * `/case-studies/...`) would need dynamic catch-alls — out of scope.
 */
function canonicalRouteForPageSlug(
	slug: string,
	siteStructure: SiteStructure | undefined,
): string | null {
	if (!siteStructure) return null;
	if (siteStructure.homepageSlug && slug === siteStructure.homepageSlug)
		return '/';
	if (siteStructure.blogSlug && slug === siteStructure.blogSlug) return '/blog';
	if (siteStructure.productsSlug && slug === siteStructure.productsSlug)
		return '/products';
	if (
		siteStructure.productCategoriesSlug &&
		slug === siteStructure.productCategoriesSlug
	)
		return '/collections';
	if (siteStructure.coursesSlug && slug === siteStructure.coursesSlug)
		return '/courses';
	if (siteStructure.projectsSlug && slug === siteStructure.projectsSlug)
		return '/portfolio';
	return null;
}
