import { cache } from 'react';
import { fetchStoreSettingsOrNull } from './settings';

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

const DEFAULTS = {
	blog: 'blog',
	portfolio: 'portfolio',
	products: 'products',
	productCategories: 'collections',
	courses: 'courses',
} as const;

/**
 * Resolve all URL prefixes from the storefront `siteStructure` overrides.
 * `cache()` dedupes per render so any number of components can call it in
 * the same request without firing extra fetches.
 */
export const getSiteUrls = cache(async (): Promise<SiteUrls> => {
	const settings = await fetchStoreSettingsOrNull();
	const ss = settings?.settings?.siteStructure;

	const blog = ss?.blogSlug ?? DEFAULTS.blog;
	const portfolio = ss?.projectsSlug ?? DEFAULTS.portfolio;
	const products = ss?.productsSlug ?? DEFAULTS.products;
	const productCategories =
		ss?.productCategoriesSlug ?? DEFAULTS.productCategories;
	const courses = ss?.coursesSlug ?? DEFAULTS.courses;

	return {
		blog,
		portfolio,
		products,
		productCategories,
		courses,
		blogIndex: `/${blog}`,
		blogPost: (slug) => `/${blog}/${slug}`,
		blogCategory: (slug) => `/${blog}/category/${slug}`,
		blogTag: (tag) => `/${blog}?tag=${encodeURIComponent(tag)}`,
		portfolioIndex: `/${portfolio}`,
		project: (slug) => `/${portfolio}/${slug}`,
		productsIndex: `/${products}`,
		product: (slug) => `/${products}/${slug}`,
		productCategoryIndex: `/${productCategories}`,
		productCategory: (slug) => `/${productCategories}/${slug}`,
		coursesIndex: `/${courses}`,
		course: (slug) => `/${courses}/${slug}`,
	};
});
