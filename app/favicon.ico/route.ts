import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { fetchStoreSettingsOrNull } from '@/helpers/cms/settings';

export const revalidate = 3600;

function toAbsoluteIconUrl(
	input: string | undefined,
	request: NextRequest,
): URL {
	try {
		return new URL(input ?? '/icons/favicon.ico', request.url);
	} catch {
		return new URL('/icons/favicon.ico', request.url);
	}
}

export async function GET(request: NextRequest) {
	const data = await fetchStoreSettingsOrNull();
	const seo = data?.settings?.seo;
	const generated = seo?.generatedIcons;

	const selectedIcon =
		generated?.faviconIcoUrl ??
		generated?.favicon32Url ??
		generated?.favicon96Url ??
		seo?.faviconUrl;

	return NextResponse.redirect(toAbsoluteIconUrl(selectedIcon, request), 307);
}
