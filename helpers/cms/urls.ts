import { cache } from 'react';
import { fetchStoreSettingsOrNull } from './settings';
import type { StoreSettingsRecord } from './types';

/**
 * URL prefix used by every front-end route that consumes a slug-based
 * resource. Defaults match the storefront API's fallbacks so links work
 * even when no CMS Page is assigned to the role.
 */
export type SiteUrls = {
	blog: string;
	portfolio: string;
	products: string;
	productCategories: string;
	courses: string;
	blogIndex: string;
	blogPost: (slug: string) => string;
	blogCategory: (slug: string) => string;
	blogTag: (tag: string) => string;
	portfolioIndex: string;
	project: (slug: string) => string;
	productsIndex: string;
	product: (slug: string) => string;
	productCategoryIndex: string;
	productCategory: (slug: string) => string;
	coursesIndex: string;
	course: (slug: string) => string;
};

export type SlugPrefixes = {
	blog: string;
	portfolio: string;
	products: string;
	productCategories: string;
	courses: string;
};

const DEFAULTS: SlugPrefixes = {
	blog: 'blog',
	portfolio: 'portfolio',
	products: 'products',
	productCategories: 'collections',
	courses: 'courses',
};

/**
 * Synchronous resolver for the URL prefixes used by every slug-based
 * resource. Reads `StoreSettings.siteStructure` overrides and falls back to
 * the storefront-API defaults. Both `getSiteUrls()` and the menu-link
 * resolver in `links.ts` derive their prefixes here so they can never drift.
 */
export function deriveSlugPrefixes(
	ss?: StoreSettingsRecord['siteStructure'],
): SlugPrefixes {
	return {
		blog: ss?.blogSlug || DEFAULTS.blog,
		portfolio: ss?.projectsSlug || DEFAULTS.portfolio,
		products: ss?.productsSlug || DEFAULTS.products,
		productCategories: ss?.productCategoriesSlug || DEFAULTS.productCategories,
		courses: ss?.coursesSlug || DEFAULTS.courses,
	};
}

/**
 * Resolve all URL prefixes from the storefront `siteStructure` overrides.
 * `cache()` dedupes per render so any number of components can call it in
 * the same request without firing extra fetches.
 */
export const getSiteUrls = cache(async (): Promise<SiteUrls> => {
	const settings = await fetchStoreSettingsOrNull();
	const p = deriveSlugPrefixes(settings?.settings?.siteStructure);

	return {
		blog: p.blog,
		portfolio: p.portfolio,
		products: p.products,
		productCategories: p.productCategories,
		courses: p.courses,
		blogIndex: `/${p.blog}`,
		blogPost: (slug) => `/${p.blog}/${slug}`,
		blogCategory: (slug) => `/${p.blog}/category/${slug}`,
		blogTag: (tag) => `/${p.blog}?tag=${encodeURIComponent(tag)}`,
		portfolioIndex: `/${p.portfolio}`,
		project: (slug) => `/${p.portfolio}/${slug}`,
		productsIndex: `/${p.products}`,
		product: (slug) => `/${p.products}/${slug}`,
		productCategoryIndex: `/${p.productCategories}`,
		productCategory: (slug) => `/${p.productCategories}/${slug}`,
		coursesIndex: `/${p.courses}`,
		course: (slug) => `/${p.courses}/${slug}`,
	};
});
