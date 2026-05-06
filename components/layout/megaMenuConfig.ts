// Hardcoded structure for the Services mega menu. The CMS-driven nav still
// drives the top-level "Services" item; this file just powers the dropdown
// panel that opens on hover. Update here when service pages change.

export type MegaMenuItem = {
	label: string;
	href: string;
	description: string;
	icon: 'code' | 'mobile' | 'wrench' | 'server';
};

export type FeaturedCard = {
	label: string;
	href: string;
	headline: string;
	body: string;
};

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
		label: 'Pricing',
		href: '/pricing',
		headline: 'See how the build is priced.',
		body: 'Hosting from $50/mo, custom frontend from $3,500. No traffic gates, no per-page fees.',
	},
	{
		label: 'Process',
		href: '/about-digital-potter#our-story',
		headline: 'How we work.',
		body: 'A small Virginia studio. 20+ years of custom builds. Discovery, design, and dev under one roof.',
	},
];
