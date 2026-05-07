import { apiGet } from './client';
import type { CmsPage, StorefrontList } from './types';

/**
 * Storefront page detail endpoint returns `{ success, page }` — note the
 * `page` key, not `item` (projects use `item`, blog posts use `post`).
 */
type PageDetailResponse = {
	success: true;
	page: CmsPage;
};

export const fetchPage = (slug: string) =>
	apiGet<PageDetailResponse>(`/api/storefront/pages/${slug}`).then(
		(r) => r.page,
	);

export async function fetchPageBySlugOrNull(
	slug: string,
): Promise<CmsPage | null> {
	try {
		return await fetchPage(slug);
	} catch (err) {
		if (process.env.NODE_ENV !== 'production') {
			console.warn(`[cms] fetchPage(${slug}) failed:`, err);
		}
		return null;
	}
}

export const fetchPages = () =>
	apiGet<StorefrontList<CmsPage>>('/api/storefront/pages').then((r) => r.items);
