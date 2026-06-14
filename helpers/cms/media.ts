import type { MediaRef } from './types';

/**
 * Normalize a CMS image field to a {@link MediaRef}. CMS image fields are
 * either a bare URL string or a `{ url, alt, ... }` object; this collapses
 * both (and null/undefined) into one shape. Previously duplicated verbatim
 * in every section renderer.
 */
export function toMediaRef(
	image: MediaRef | string | null | undefined,
): MediaRef | null {
	if (!image) return null;
	return typeof image === 'string' ? { url: image } : image;
}
