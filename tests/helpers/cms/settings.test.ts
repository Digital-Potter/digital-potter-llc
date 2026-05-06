/**
 * @jest-environment node
 */
import {
	fetchStoreSettings,
	fetchStoreSettingsOrNull,
	fetchNavigation,
	fetchNavigationOrEmpty,
} from '@/helpers/cms/settings';

describe('fetchStoreSettings', () => {
	const realFetch = global.fetch;
	beforeEach(() => {
		process.env.NEXT_PUBLIC_CMS = 'https://api.test';
		process.env.NEXT_PUBLIC_CMS_TENANT = 'digitalpotterllc';
	});
	afterEach(() => {
		global.fetch = realFetch;
	});

	it('GETs /api/storefront/store-settings and returns the JSON', async () => {
		const seen: { url?: string } = {};
		const payload = { success: true, tenant: { _id: 't1' }, settings: null };
		global.fetch = jest.fn(async (url) => {
			seen.url = String(url);
			return new Response(JSON.stringify(payload), { status: 200 });
		}) as unknown as typeof fetch;

		const out = await fetchStoreSettings();
		expect(seen.url).toBe('https://api.test/api/storefront/store-settings');
		expect(out).toEqual(payload);
	});
});

describe('fetchNavigation', () => {
	const realFetch = global.fetch;
	beforeEach(() => {
		process.env.NEXT_PUBLIC_CMS = 'https://api.test';
		process.env.NEXT_PUBLIC_CMS_TENANT = 'digitalpotterllc';
	});
	afterEach(() => {
		global.fetch = realFetch;
	});

	it('GETs /api/storefront/navigation with no query param when no location is provided', async () => {
		const seen: { url?: string } = {};
		global.fetch = jest.fn(async (url) => {
			seen.url = String(url);
			return new Response(
				JSON.stringify({ success: true, count: 0, menus: [] }),
				{ status: 200 },
			);
		}) as unknown as typeof fetch;

		await fetchNavigation();
		expect(seen.url).toBe('https://api.test/api/storefront/navigation');
	});

	it('GETs /api/storefront/navigation?location=header when location is "header"', async () => {
		const seen: { url?: string } = {};
		global.fetch = jest.fn(async (url) => {
			seen.url = String(url);
			return new Response(
				JSON.stringify({ success: true, count: 0, menus: [] }),
				{ status: 200 },
			);
		}) as unknown as typeof fetch;

		await fetchNavigation('header');
		expect(seen.url).toBe(
			'https://api.test/api/storefront/navigation?location=header',
		);
	});
});

describe('fetchStoreSettingsOrNull', () => {
	const realFetch = global.fetch;
	beforeEach(() => {
		process.env.NEXT_PUBLIC_CMS = 'https://api.test';
		process.env.NEXT_PUBLIC_CMS_TENANT = 'digitalpotterllc';
	});
	afterEach(() => {
		global.fetch = realFetch;
	});

	it('returns null when fetch throws', async () => {
		global.fetch = jest.fn(async () => {
			throw new Error('network down');
		}) as unknown as typeof fetch;

		const out = await fetchStoreSettingsOrNull();
		expect(out).toBeNull();
	});

	it('returns the response when fetch succeeds', async () => {
		const payload = { success: true, tenant: { _id: 't1' }, settings: null };
		global.fetch = jest.fn(
			async () => new Response(JSON.stringify(payload), { status: 200 }),
		) as unknown as typeof fetch;

		const out = await fetchStoreSettingsOrNull();
		expect(out).toEqual(payload);
	});
});

describe('fetchNavigationOrEmpty', () => {
	const realFetch = global.fetch;
	beforeEach(() => {
		process.env.NEXT_PUBLIC_CMS = 'https://api.test';
		process.env.NEXT_PUBLIC_CMS_TENANT = 'digitalpotterllc';
	});
	afterEach(() => {
		global.fetch = realFetch;
	});

	it('returns an empty menus list when fetch throws', async () => {
		global.fetch = jest.fn(async () => {
			throw new Error('network down');
		}) as unknown as typeof fetch;

		const out = await fetchNavigationOrEmpty('header');
		expect(out).toEqual({ success: true, count: 0, menus: [] });
	});
});
