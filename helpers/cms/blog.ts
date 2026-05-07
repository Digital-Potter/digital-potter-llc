import { apiGet } from './client';
import type {
	CmsBlogPost,
	CmsBlogPostDetailResponse,
	StorefrontList,
} from './types';

export const fetchBlogPosts = (page = 1, limit = 10) =>
	apiGet<StorefrontList<CmsBlogPost>>(
		`/api/storefront/blog?page=${page}&limit=${limit}`,
	);

export async function fetchBlogPostsOrEmpty(page = 1, limit = 10) {
	try {
		return await fetchBlogPosts(page, limit);
	} catch (err) {
		if (process.env.NODE_ENV !== 'production') {
			console.warn('[cms] fetchBlogPosts failed:', err);
		}
		return {
			success: true as const,
			total: 0,
			page: 1,
			pages: 0,
			count: 0,
			items: [] as CmsBlogPost[],
		};
	}
}

/**
 * Detail endpoint returns `{ post, related }` — not a wrapped item.
 * Caller decides whether to use the related array.
 */
export const fetchBlogPostBySlug = (slug: string) =>
	apiGet<CmsBlogPostDetailResponse>(`/api/storefront/blog/${slug}`);

export async function fetchBlogPostBySlugOrNull(slug: string) {
	try {
		return await fetchBlogPostBySlug(slug);
	} catch (err) {
		if (process.env.NODE_ENV !== 'production') {
			console.warn('[cms] fetchBlogPostBySlug failed:', err);
		}
		return null;
	}
}
