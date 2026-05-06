import { apiGet } from './client';
import type { CmsPage, StorefrontList, StorefrontItem } from './types';

export const fetchPage = (slug: string) =>
	apiGet<StorefrontItem<CmsPage>>(`/api/storefront/pages/${slug}`).then(
		(r) => r.item,
	);

export const fetchPages = () =>
	apiGet<StorefrontList<CmsPage>>('/api/storefront/pages').then((r) => r.items);
