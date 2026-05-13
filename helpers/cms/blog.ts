import { apiGet } from './client';
import type {
	CmsBlogPost,
	CmsBlogPostDetailResponse,
	StorefrontList,
} from './types';

export type BlogPostsQuery = {
	page?: number;
	limit?: number;
	category?: string;
	tag?: string;
};

export const fetchBlogPosts = (q: BlogPostsQuery = {}) => {
	const params = new URLSearchParams();
	if (q.page) params.set('page', String(q.page));
	if (q.limit) params.set('limit', String(q.limit));
	if (q.category) params.set('category', q.category);
	if (q.tag) params.set('tag', q.tag);
	const qs = params.toString();
	return apiGet<StorefrontList<CmsBlogPost>>(
		`/api/storefront/blog${qs ? `?${qs}` : ''}`,
	);
};

export async function fetchBlogPostsOrEmpty(q: BlogPostsQuery = {}) {
	try {
		return await fetchBlogPosts(q);
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
