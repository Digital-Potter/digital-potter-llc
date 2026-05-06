import type { ResolvedMenuItem, StoreSettingsRecord } from './types';

export function resolveMenuItemHref(
	item: ResolvedMenuItem,
	siteStructure?: StoreSettingsRecord['siteStructure'],
): string {
	if (item.type === 'custom') return item.url ?? '#';
	if (!item.resolved) return '#';

	const slug = item.resolved.slug;

	if (
		item.type === 'page' &&
		siteStructure?.homepageSlug &&
		slug === siteStructure.homepageSlug
	) {
		return '/';
	}

	switch (item.type) {
		case 'page':
			return `/${slug}`;
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
