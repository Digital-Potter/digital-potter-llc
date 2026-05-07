import type { CmsSection } from '@/helpers/cms/types';

/** Out of scope for the marketing site (no products domain). */
export function ProductListSection(_: { section: CmsSection }) {
	if (process.env.NODE_ENV !== 'production') {
		console.warn(
			'[cms] ProductListSection has no marketing-site renderer (out of scope).',
		);
	}
	return null;
}
