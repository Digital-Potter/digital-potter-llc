import { apiGet, previewQuery, type PreviewOpts } from './client';
import type { CmsProject, StorefrontList, StorefrontItem } from './types';

export type ProjectsQuery = {
	page?: number;
	limit?: number;
	category?: string;
	featured?: boolean;
	search?: string;
};

export const fetchProjects = (q: ProjectsQuery = {}) => {
	const params = new URLSearchParams();
	if (q.page) params.set('page', String(q.page));
	if (q.limit) params.set('limit', String(q.limit));
	if (q.category) params.set('category', q.category);
	if (q.featured) params.set('featured', 'true');
	if (q.search) params.set('search', q.search);
	const qs = params.toString();
	return apiGet<StorefrontList<CmsProject>>(
		`/api/storefront/projects${qs ? `?${qs}` : ''}`,
	);
};

export async function fetchProjectsOrEmpty(q: ProjectsQuery = {}) {
	try {
		return await fetchProjects(q);
	} catch (err) {
		if (process.env.NODE_ENV !== 'production') {
			console.warn('[cms] fetchProjects failed:', err);
		}
		return {
			success: true as const,
			total: 0,
			page: 1,
			pages: 0,
			count: 0,
			items: [] as CmsProject[],
		};
	}
}

export const fetchProjectBySlug = (slug: string, opts?: PreviewOpts) =>
	apiGet<StorefrontItem<CmsProject>>(
		`/api/storefront/projects/${slug}${previewQuery(opts)}`,
		opts?.preview ? { revalidate: false } : {},
	).then((r) => r.item);

export async function fetchProjectBySlugOrNull(
	slug: string,
	opts?: PreviewOpts,
) {
	try {
		return await fetchProjectBySlug(slug, opts);
	} catch (err) {
		if (process.env.NODE_ENV !== 'production') {
			console.warn('[cms] fetchProjectBySlug failed:', err);
		}
		return null;
	}
}
