// Hardcoded copy for the Services mega menu. The CMS doesn't yet expose
// per-item descriptions, headlines, or icons on menu items, so when the
// admin-authored sub-menus don't have those values, we fall back to this
// table — keyed by the *page slug* of the linked page so the copy stays
// stable even when an editor renames the menu label.

export type MegaIcon = 'code' | 'mobile' | 'wrench' | 'server';

export type MegaMenuItem = {
	label: string;
	href: string;
	description: string;
	icon: MegaIcon;
};

export type FeaturedCard = {
	label: string;
	href: string;
	headline: string;
	body: string;
};

/**
 * Hardcoded fallback for the mega-menu's icon column. Used when neither
 * `services-submenu-col-1` exists in the CMS nor a matching slug lives in
 * COL1_BY_SLUG below.
 */
export const SERVICES_MENU: MegaMenuItem[] = [
	{
		label: 'Web Development',
		href: '/services#web',
		description: 'Custom Next.js websites that grow with you.',
		icon: 'code',
	},
	{
		label: 'Mobile Development',
		href: '/mobile-development',
		description: 'React Native + Expo apps for iOS and Android.',
		icon: 'mobile',
	},
	{
		label: 'Maintenance & Support',
		href: '/maintenance',
		description: 'Retainer plans and Fractional CTO engagements.',
		icon: 'wrench',
	},
	{
		label: 'Self-Hosting',
		href: '/self-hosted',
		description: 'Run theDavid CMS in your own AWS, GCP, or Azure.',
		icon: 'server',
	},
];

export const SERVICES_FEATURED: FeaturedCard[] = [
	{
		label: 'theDavid CMS',
		href: '/cms',
		headline: 'The platform behind every site we ship.',
		body: 'Multi-tenant, headless, built around editorial control.',
	},
	{
		label: 'Pricing',
		href: '/pricing',
		headline: 'See how the build is priced.',
		body: 'No traffic gates, no per-page fees.',
	},
];

/**
 * Slug → icon column copy. Keyed by the linked page's slug so descriptions
 * and icons survive label edits in the admin.
 */
export const COL1_BY_SLUG: Record<
	string,
	{ description: string; icon: MegaIcon }
> = {
	'web-development': {
		description: 'Custom Next.js websites that grow with you.',
		icon: 'code',
	},
	'mobile-development': {
		description: 'React Native + Expo apps for iOS and Android.',
		icon: 'mobile',
	},
	maintenance: {
		description: 'Retainer plans and Fractional CTO engagements.',
		icon: 'wrench',
	},
	'self-hosted': {
		description: 'Run theDavid CMS in your own AWS, GCP, or Azure.',
		icon: 'server',
	},
};

/**
 * Slug → featured card copy. Keyed by linked page slug for the same reason.
 */
export const COL2_BY_SLUG: Record<string, { headline: string; body: string }> =
	{
		cms: {
			headline: 'The platform behind every site we ship.',
			body: 'Multi-tenant, headless, built around editorial control.',
		},
		pricing: {
			headline: 'See how the build is priced.',
			body: 'No traffic gates, no per-page fees.',
		},
	};

/**
 * Label-keyed lookup (lowercased). Used as a secondary fallback after the
 * slug lookup so the right copy still appears when a menu item links to a
 * page whose slug doesn't match the canonical keys above.
 */
export const COL1_BY_LABEL: Record<
	string,
	{ description: string; icon: MegaIcon }
> = Object.fromEntries(
	SERVICES_MENU.map((m) => [
		m.label.toLowerCase(),
		{ description: m.description, icon: m.icon },
	]),
);

export const COL2_BY_LABEL: Record<string, { headline: string; body: string }> =
	Object.fromEntries(
		SERVICES_FEATURED.map((c) => [
			c.label.toLowerCase(),
			{ headline: c.headline, body: c.body },
		]),
	);

/**
 * Default eyebrow + subtitle for the mega-menu header. Used when the
 * authoring side hasn't filled in `title` / `subtitle` on the CMS menu yet.
 */
export const SERVICES_MEGAMENU_HEADER = {
	eyebrow: 'Our Services',
	subtitle: 'Custom websites, apps, and a CMS your team owns.',
};
