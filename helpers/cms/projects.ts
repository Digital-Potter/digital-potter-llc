import { apiGet } from './client';
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

export const fetchProjectBySlug = (slug: string) =>
	apiGet<StorefrontItem<CmsProject>>(`/api/storefront/projects/${slug}`).then(
		(r) => r.item,
	);
