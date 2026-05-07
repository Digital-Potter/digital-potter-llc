import type { CmsSection } from '@/helpers/cms/types';

/** Out of scope for the marketing site (no courses domain). */
export function CourseListSection(_: { section: CmsSection }) {
	if (process.env.NODE_ENV !== 'production') {
		console.warn(
			'[cms] CourseListSection has no marketing-site renderer (out of scope).',
		);
	}
	return null;
}
