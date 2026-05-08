import { resolveMenuItemHref } from '@/helpers/cms/links';
import type { ResolvedMenuItem } from '@/helpers/cms/types';

const baseItem: ResolvedMenuItem = {
	_id: 'x',
	label: 'X',
	type: 'page',
	openInNewTab: false,
	order: 0,
	resolved: { slug: 'x', title: 'X' },
	children: [],
};

describe('resolveMenuItemHref', () => {
	// ---------- page type ----------

	it('returns "/" for a page whose slug matches siteStructure.homepageSlug', () => {
		const item = {
			...baseItem,
			type: 'page' as const,
			resolved: { slug: 'home', title: 'Home' },
		};
		expect(resolveMenuItemHref(item, { homepageSlug: 'home' })).toBe('/');
	});

	it('returns "/{slug}" for a page that is not the homepage', () => {
		const item = {
			...baseItem,
			type: 'page' as const,
			resolved: { slug: 'about', title: 'About' },
		};
		expect(resolveMenuItemHref(item, { homepageSlug: 'home' })).toBe('/about');
	});

	it('returns "/{slug}" for a page when no siteStructure is provided', () => {
		const item = {
			...baseItem,
			type: 'page' as const,
			resolved: { slug: 'about', title: 'About' },
		};
		expect(resolveMenuItemHref(item)).toBe('/about');
	});

	it('returns "/{slug}" for a page assigned as the blog parent (override slug IS the URL)', () => {
		const item = {
			...baseItem,
			type: 'page' as const,
			resolved: { slug: 'digital-potter-blog', title: 'Blog' },
		};
		expect(resolveMenuItemHref(item, { blogSlug: 'digital-potter-blog' })).toBe(
			'/digital-potter-blog',
		);
	});

	it('returns "/{slug}" for a page assigned as the projects parent', () => {
		const item = {
			...baseItem,
			type: 'page' as const,
			resolved: { slug: 'our-work', title: 'Our work' },
		};
		expect(resolveMenuItemHref(item, { projectsSlug: 'our-work' })).toBe(
			'/our-work',
		);
	});

	it('returns "/{slug}" for a page assigned as the products parent', () => {
		const item = {
			...baseItem,
			type: 'page' as const,
			resolved: { slug: 'shop', title: 'Shop' },
		};
		expect(resolveMenuItemHref(item, { productsSlug: 'shop' })).toBe('/shop');
	});

	it('returns "/{slug}" for a page that does not match any siteStructure role', () => {
		const item = {
			...baseItem,
			type: 'page' as const,
			resolved: { slug: 'contact-digital-potter', title: 'Contact' },
		};
		expect(
			resolveMenuItemHref(item, { homepageSlug: 'home', blogSlug: 'blog' }),
		).toBe('/contact-digital-potter');
	});

	// ---------- blog_post / blog_category ----------

	it('returns "/blog/{slug}" for a blog_post with default settings', () => {
		const item = {
			...baseItem,
			type: 'blog_post' as const,
			resolved: { slug: 'hello-world', title: 'Hello' },
		};
		expect(resolveMenuItemHref(item)).toBe('/blog/hello-world');
	});

	it('honors siteStructure.blogSlug for blog_post URLs', () => {
		const item = {
			...baseItem,
			type: 'blog_post' as const,
			resolved: { slug: 'hello-world', title: 'Hello' },
		};
		expect(resolveMenuItemHref(item, { blogSlug: 'digital-potter-blog' })).toBe(
			'/digital-potter-blog/hello-world',
		);
	});

	it('returns "/blog/category/{slug}" for a blog_category with default settings', () => {
		const item = {
			...baseItem,
			type: 'blog_category' as const,
			resolved: { slug: 'design', title: 'Design' },
		};
		expect(resolveMenuItemHref(item)).toBe('/blog/category/design');
	});

	it('honors siteStructure.blogSlug for blog_category URLs', () => {
		const item = {
			...baseItem,
			type: 'blog_category' as const,
			resolved: { slug: 'design', title: 'Design' },
		};
		expect(resolveMenuItemHref(item, { blogSlug: 'digital-potter-blog' })).toBe(
			'/digital-potter-blog/category/design',
		);
	});

	// ---------- product / product_category ----------

	it('returns "/products/{slug}" for a product with default settings', () => {
		const item = {
			...baseItem,
			type: 'product' as const,
			resolved: { slug: 'mug', title: 'Mug' },
		};
		expect(resolveMenuItemHref(item)).toBe('/products/mug');
	});

	it('honors siteStructure.productsSlug for product URLs', () => {
		const item = {
			...baseItem,
			type: 'product' as const,
			resolved: { slug: 'mug', title: 'Mug' },
		};
		expect(resolveMenuItemHref(item, { productsSlug: 'shop' })).toBe(
			'/shop/mug',
		);
	});

	it('returns "/collections/{slug}" for a product_category with default settings', () => {
		const item = {
			...baseItem,
			type: 'product_category' as const,
			resolved: { slug: 'mugs', title: 'Mugs' },
		};
		expect(resolveMenuItemHref(item)).toBe('/collections/mugs');
	});

	it('honors siteStructure.productCategoriesSlug for product_category URLs', () => {
		const item = {
			...baseItem,
			type: 'product_category' as const,
			resolved: { slug: 'mugs', title: 'Mugs' },
		};
		expect(resolveMenuItemHref(item, { productCategoriesSlug: 'browse' })).toBe(
			'/browse/mugs',
		);
	});

	// ---------- course ----------

	it('returns "/courses/{slug}" for a course with default settings', () => {
		const item = {
			...baseItem,
			type: 'course' as const,
			resolved: { slug: 'pottery-101', title: 'Pottery 101' },
		};
		expect(resolveMenuItemHref(item)).toBe('/courses/pottery-101');
	});

	it('honors siteStructure.coursesSlug for course URLs', () => {
		const item = {
			...baseItem,
			type: 'course' as const,
			resolved: { slug: 'pottery-101', title: 'Pottery 101' },
		};
		expect(resolveMenuItemHref(item, { coursesSlug: 'learn' })).toBe(
			'/learn/pottery-101',
		);
	});

	// ---------- custom + edge cases ----------

	it('returns the url field for a custom item', () => {
		const item: ResolvedMenuItem = {
			...baseItem,
			type: 'custom',
			url: '/self-hosted',
			resolved: undefined,
		};
		expect(resolveMenuItemHref(item)).toBe('/self-hosted');
	});

	it('returns "#" for a custom item with no url', () => {
		const item: ResolvedMenuItem = {
			...baseItem,
			type: 'custom',
			resolved: undefined,
		};
		expect(resolveMenuItemHref(item)).toBe('#');
	});

	it('returns "#" for a typed item with no resolved field (broken ref)', () => {
		const item: ResolvedMenuItem = {
			...baseItem,
			type: 'page',
			resolved: undefined,
		};
		expect(resolveMenuItemHref(item)).toBe('#');
	});
});
