import { cache } from 'react';
import {
	fetchNavigationOrEmpty,
	fetchStoreSettingsOrNull,
} from '@/helpers/cms/settings';
import { resolveMenuItemHref } from '@/helpers/cms/links';

export type CtaInfo = { href: string; label: string };

// `/discovery-call` is a real route; the previous `/lets-connect` fallback
// 404'd whenever the CMS header nav was empty/unreachable.
const FALLBACK: CtaInfo = { href: '/discovery-call', label: 'Let´s Connect' };

// Memoized: the homepage resolves the CTA in both the Footer and the
// HomepageTemplate, so cache() collapses the duplicate work per request.
export const resolveCtaHref = cache(async (): Promise<CtaInfo> => {
	const [{ menus }, settingsData] = await Promise.all([
		fetchNavigationOrEmpty('header'),
		fetchStoreSettingsOrNull(),
	]);
	const headerMenu = menus[0];
	const lastItem = headerMenu?.items.at(-1);
	if (!lastItem) return FALLBACK;
	return {
		href: resolveMenuItemHref(lastItem, settingsData?.settings?.siteStructure),
		label: lastItem.label,
	};
});
