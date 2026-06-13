import { cache } from 'react';
import { apiGet } from './client';
import type {
	NavigationLocation,
	NavigationResponse,
	StoreSettingsResponse,
} from './types';

// Site chrome (store settings + navigation) barely changes, so cache it for an
// hour instead of the 60s default. Tags let a CMS webhook trigger instant
// invalidation via revalidateTag(), so we get static-fast delivery without a
// per-minute regeneration tax. See handoff note for the CMS webhook wiring.
export const STORE_SETTINGS_TAG = 'cms-store-settings';
export const NAVIGATION_TAG = 'cms-navigation';
const CHROME_TTL = 60 * 60; // 1 hour

export function fetchStoreSettings() {
	return apiGet<StoreSettingsResponse>('/api/storefront/store-settings', {
		revalidate: CHROME_TTL,
		tags: [STORE_SETTINGS_TAG],
	});
}

export function fetchNavigation(location?: NavigationLocation) {
	const qs = location ? `?location=${location}` : '';
	return apiGet<NavigationResponse>(`/api/storefront/navigation${qs}`, {
		revalidate: CHROME_TTL,
		tags: [NAVIGATION_TAG],
	});
}

// Wrapped in React cache() so the many callers per request (generateMetadata,
// RootLayout, Nav, Footer, CTA resolver, getSiteUrls…) share ONE result
// explicitly, rather than relying on fetch options staying byte-identical.
export const fetchStoreSettingsOrNull = cache(
	async (): Promise<StoreSettingsResponse | null> => {
		try {
			return await fetchStoreSettings();
		} catch (err) {
			if (process.env.NODE_ENV !== 'production') {
				console.warn('[cms] fetchStoreSettings failed:', err);
			}
			return null;
		}
	},
);

export const fetchNavigationOrEmpty = cache(
	async (location?: NavigationLocation): Promise<NavigationResponse> => {
		try {
			return await fetchNavigation(location);
		} catch (err) {
			if (process.env.NODE_ENV !== 'production') {
				console.warn('[cms] fetchNavigation failed:', err);
			}
			return { success: true, count: 0, menus: [] };
		}
	},
);
