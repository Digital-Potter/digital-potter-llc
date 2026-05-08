import type { ResolvedMenuItem, StoreSettingsRecord } from './types';
import { deriveSlugPrefixes } from './urls';

type SiteStructure = StoreSettingsRecord['siteStructure'];

/**
 * Maps a CMS-resolved menu item to the URL path the front-end renders.
 *
 * URL prefixes for blog / portfolio / products / collections / courses come
 * from `siteStructure` overrides via `deriveSlugPrefixes`, so a tenant that
 * sets `blogSlug = "digital-potter-blog"` gets menu links to
 * `/digital-potter-blog/<post-slug>` — matching the dynamic catch-all route
 * (`app/[...slug]/page.tsx`).
 *
 * `page` items just emit `/{slug}` (the page's own slug). The only special
 * case is the homepage role: when the page's slug matches
 * `siteStructure.homepageSlug`, we return `/` so the menu doesn't link to
 * `/{homepage-slug}` (which would redirect anyway).
 */
export function resolveMenuItemHref(
	item: ResolvedMenuItem,
	siteStructure?: SiteStructure,
): string {
	if (item.type === 'custom') return item.url ?? '#';
	if (!item.resolved) return '#';

	const slug = item.resolved.slug;
	const p = deriveSlugPrefixes(siteStructure);

	if (item.type === 'page') {
		if (siteStructure?.homepageSlug && slug === siteStructure.homepageSlug) {
			return '/';
		}
		return `/${slug}`;
	}

	switch (item.type) {
		case 'blog_post':
			return `/${p.blog}/${slug}`;
		case 'blog_category':
			return `/${p.blog}/category/${slug}`;
		case 'product':
			return `/${p.products}/${slug}`;
		case 'product_category':
			return `/${p.productCategories}/${slug}`;
		case 'course':
			return `/${p.courses}/${slug}`;
		default:
			return '#';
	}
}
