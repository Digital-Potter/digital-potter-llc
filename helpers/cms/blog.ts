import { apiGet } from './client';
import type { CmsBlogPost, StorefrontList, StorefrontItem } from './types';

export const fetchBlogPosts = (page = 1, limit = 10) =>
	apiGet<StorefrontList<CmsBlogPost>>(
		`/api/storefront/blog?page=${page}&limit=${limit}`,
	);

export const fetchBlogPostBySlug = (slug: string) =>
	apiGet<StorefrontItem<CmsBlogPost>>(`/api/storefront/blog/${slug}`).then(
		(r) => r.item,
	);
