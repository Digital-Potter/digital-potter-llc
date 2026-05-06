/**
 * @jest-environment node
 */
import { apiGet } from '@/helpers/cms/client';

describe('apiGet', () => {
	const realFetch = global.fetch;
	afterEach(() => {
		global.fetch = realFetch;
	});

	it('includes x-tenant-id header from env', async () => {
		process.env.NEXT_PUBLIC_CMS = 'https://api.test';
		process.env.NEXT_PUBLIC_CMS_TENANT = 'tenant-slug';
		const seen: { url?: string; headers?: HeadersInit } = {};
		global.fetch = jest.fn(async (url, init) => {
			seen.url = String(url);
			seen.headers = init?.headers;
			return new Response(JSON.stringify({ success: true }), { status: 200 });
		}) as unknown as typeof fetch;

		await apiGet('/api/storefront/pages');
		expect(seen.url).toBe('https://api.test/api/storefront/pages');
		const headers = new Headers(seen.headers as HeadersInit);
		expect(headers.get('x-tenant-id')).toBe('tenant-slug');
	});

	it('throws on non-OK response', async () => {
		process.env.NEXT_PUBLIC_CMS = 'https://api.test';
		process.env.NEXT_PUBLIC_CMS_TENANT = 't';
		global.fetch = jest.fn(
			async () =>
				new Response(JSON.stringify({ success: false, message: 'boom' }), {
					status: 500,
				}),
		) as unknown as typeof fetch;
		await expect(apiGet('/api/storefront/pages')).rejects.toThrow(/boom/);
	});
});
