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

	it('returns "/blog/{slug}" for a blog_post', () => {
		const item = {
			...baseItem,
			type: 'blog_post' as const,
			resolved: { slug: 'hello-world', title: 'Hello' },
		};
		expect(resolveMenuItemHref(item)).toBe('/blog/hello-world');
	});

	it('returns "/blog/category/{slug}" for a blog_category', () => {
		const item = {
			...baseItem,
			type: 'blog_category' as const,
			resolved: { slug: 'design', title: 'Design' },
		};
		expect(resolveMenuItemHref(item)).toBe('/blog/category/design');
	});

	it('returns "/products/{slug}" for a product', () => {
		const item = {
			...baseItem,
			type: 'product' as const,
			resolved: { slug: 'mug', title: 'Mug' },
		};
		expect(resolveMenuItemHref(item)).toBe('/products/mug');
	});

	it('returns "/collections/{slug}" for a product_category', () => {
		const item = {
			...baseItem,
			type: 'product_category' as const,
			resolved: { slug: 'mugs', title: 'Mugs' },
		};
		expect(resolveMenuItemHref(item)).toBe('/collections/mugs');
	});

	it('returns "/courses/{slug}" for a course', () => {
		const item = {
			...baseItem,
			type: 'course' as const,
			resolved: { slug: 'pottery-101', title: 'Pottery 101' },
		};
		expect(resolveMenuItemHref(item)).toBe('/courses/pottery-101');
	});

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

	it('maps a page whose slug matches siteStructure.blogSlug to "/blog"', () => {
		const item = {
			...baseItem,
			type: 'page' as const,
			resolved: { slug: 'digital-potter-blog', title: 'Blog' },
		};
		expect(resolveMenuItemHref(item, { blogSlug: 'digital-potter-blog' })).toBe(
			'/blog',
		);
	});

	it('maps a page whose slug matches siteStructure.productsSlug to "/products"', () => {
		const item = {
			...baseItem,
			type: 'page' as const,
			resolved: { slug: 'shop', title: 'Shop' },
		};
		expect(resolveMenuItemHref(item, { productsSlug: 'shop' })).toBe(
			'/products',
		);
	});

	it('maps a page whose slug matches siteStructure.productCategoriesSlug to "/collections"', () => {
		const item = {
			...baseItem,
			type: 'page' as const,
			resolved: { slug: 'browse', title: 'Browse' },
		};
		expect(resolveMenuItemHref(item, { productCategoriesSlug: 'browse' })).toBe(
			'/collections',
		);
	});

	it('maps a page whose slug matches siteStructure.coursesSlug to "/courses"', () => {
		const item = {
			...baseItem,
			type: 'page' as const,
			resolved: { slug: 'learn', title: 'Learn' },
		};
		expect(resolveMenuItemHref(item, { coursesSlug: 'learn' })).toBe(
			'/courses',
		);
	});

	it('falls back to "/{slug}" when a page slug matches nothing in siteStructure', () => {
		const item = {
			...baseItem,
			type: 'page' as const,
			resolved: { slug: 'contact-digital-potter', title: 'Contact' },
		};
		expect(
			resolveMenuItemHref(item, { homepageSlug: 'home', blogSlug: 'blog' }),
		).toBe('/contact-digital-potter');
	});
});
