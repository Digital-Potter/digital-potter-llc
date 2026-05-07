import type { CmsSection } from '@/helpers/cms/types';

/**
 * Out of scope for the Digital Potter LLC marketing site (no bookings
 * domain). The CMS exposes the section type for tenant sites; we no-op
 * here and warn in dev so editors don't think the type is unsupported.
 */
export function BookingCalendarSection(_: { section: CmsSection }) {
	if (process.env.NODE_ENV !== 'production') {
		console.warn(
			'[cms] BookingCalendarSection has no marketing-site renderer (out of scope).',
		);
	}
	return null;
}
