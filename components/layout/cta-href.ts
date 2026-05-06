import {
	fetchNavigationOrEmpty,
	fetchStoreSettingsOrNull,
} from '@/helpers/cms/settings';
import { resolveMenuItemHref } from '@/helpers/cms/links';

export type CtaInfo = { href: string; label: string };

const FALLBACK: CtaInfo = { href: '/lets-connect', label: 'Let´s Connect' };

export async function resolveCtaHref(): Promise<CtaInfo> {
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
}
