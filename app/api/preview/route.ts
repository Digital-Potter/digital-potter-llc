import { cookies, draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';

const RESOURCE_PATHS: Record<string, string> = {
	page: '',
	blog_post: '/blog/',
	product: '/products/',
	product_category: '/collections/',
	course: '/courses/',
	project: '/portfolio/',
};

const PREVIEW_TOKEN_COOKIE = 'preview_token';

/**
 * Preview entry point. The admin opens
 * `{frontend}/api/preview?token=...&resource=...&slug=...`. We verify the token
 * against the CMS, enable Next.js Draft Mode, stash the token in an httpOnly
 * cookie, and redirect to the clean content path — where the catch-all route
 * reads the cookie and fetches the draft-overlaid content.
 */
export async function GET(request: NextRequest) {
	const token = request.nextUrl.searchParams.get('token');
	const resource = request.nextUrl.searchParams.get('resource');
	const slug = request.nextUrl.searchParams.get('slug');

	if (!token || !resource) {
		return new Response('Missing token or resource', { status: 400 });
	}

	const verifyRes = await fetch(
		`${process.env.NEXT_PUBLIC_CMS}/api/preview/verify?token=${encodeURIComponent(token)}`,
		{
			cache: 'no-store',
			headers: { 'x-tenant-id': `${process.env.NEXT_PUBLIC_CMS_TENANT}` },
		},
	);
	if (!verifyRes.ok) {
		return new Response('Invalid or expired preview token', { status: 401 });
	}
	const verified = (await verifyRes.json()) as {
		valid: boolean;
		resource: string;
		slug: string;
		path: string;
	};
	if (!verified.valid) {
		return new Response('Invalid preview token', { status: 401 });
	}

	const draft = await draftMode();
	draft.enable();

	const cookieStore = await cookies();
	cookieStore.set(PREVIEW_TOKEN_COOKIE, token, {
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 15 * 60,
		path: '/',
	});

	const targetPath =
		verified.path ||
		`${RESOURCE_PATHS[verified.resource] || '/'}${slug || verified.slug}`;
	redirect(targetPath.startsWith('/') ? targetPath : `/${targetPath}`);
}
