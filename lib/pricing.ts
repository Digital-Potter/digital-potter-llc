// Centralized pricing data. Update here when numbers change — every
// pricing-aware component pulls from this file. Documentation in
// docs/PROJECT_CONVENTIONS.md → "Pricing baseline".

export const HOSTING_MONTHLY = 50;
export const FRONTEND_ONETIME = 4500;
export const ANNUAL_PREPAY_DISCOUNT_PCT = 15;

// Mobile app development
export const MOBILE_APP_ONETIME = 30000;

// Maintenance & support
export const HOURLY_RATE = 250;
export const HOURLY_MIN_HOURS = 3;

export type MaintenanceTierId = 'care' | 'studio' | 'cto';

export type MaintenanceTier = {
	id: MaintenanceTierId;
	label: string;
	tagline: string;
	price: number;
	hours: string;
	bestFor: string;
	bullets: string[];
	highlight?: boolean;
};

export const MAINTENANCE_TIERS: MaintenanceTier[] = [
	{
		id: 'care',
		label: 'Care Plan',
		tagline: 'Steady upkeep for the typical small business',
		price: 399,
		hours: '4 hours / month',
		bestFor:
			'Sites that need occasional content updates and routine peace of mind.',
		bullets: [
			'4 hours of dev or design work each month',
			'Security and dependency updates',
			'Priority email support — 24h response',
			'Monthly health report',
			'Unused hours roll over for one cycle',
		],
		highlight: true,
	},
	{
		id: 'studio',
		label: 'Studio Plan',
		tagline: 'Active iteration for growing businesses',
		price: 899,
		hours: '10 hours / month',
		bestFor:
			'Businesses that ship changes regularly and want a faster turnaround.',
		bullets: [
			'10 hours of dev or design work each month',
			'Priority response — 4h business-hours SLA',
			'Monthly review call to plan the next sprint',
			'Light advisory on roadmap and architecture',
			'Unused hours roll over for one cycle',
		],
	},
	{
		id: 'cto',
		label: 'Fractional CTO',
		tagline: 'Strategic engagement for businesses scaling fast',
		price: 2500,
		hours: '20+ hours / month',
		bestFor:
			'Companies that need a tech partner — not just maintenance — without hiring a full-time CTO.',
		bullets: [
			'20+ hours each month, scaled to actual need',
			'Weekly check-in and dedicated Slack channel',
			'Hiring, architecture, and roadmap advisory',
			'Stakeholder presentations and board prep when needed',
			'Direct access to the senior engineer building your stack',
		],
	},
];

export type BuildTierId = 'starter' | 'growth' | 'premium';

export type BuildTier = {
	id: BuildTierId;
	label: string;
	tagline: string;
	rangeLow: number;
	rangeHigh: number | null; // null means "and up"
	bestFor: string;
	bullets: string[];
	highlight?: boolean;
};

export const BUILD_TIERS: BuildTier[] = [
	{
		id: 'starter',
		label: 'Starter',
		tagline: 'A serious foundation for a small business',
		rangeLow: 4500,
		rangeHigh: 8000,
		bestFor:
			'Single-location service businesses, trades, restaurants, and brochure sites that need a credible online presence with room to grow.',
		bullets: [
			'Brand discovery and visual design system',
			'Custom Next.js codebase — yours to keep when you leave',
			'Mobile-responsive layout for every page',
			'Page templates the CMS uses for unlimited future pages',
			'Content migration from your existing site',
			'Basic SEO setup (schema, sitemap, OG tags, canonical URLs)',
			'Contact / quote form connected to your CMS',
			'Launch on our infrastructure with monitoring',
			'One month of post-launch fixes and onboarding support',
		],
	},
	{
		id: 'growth',
		label: 'Growth',
		tagline: 'Where most serious small businesses land',
		rangeLow: 9000,
		rangeHigh: 18000,
		highlight: true,
		bestFor:
			'Professional services, multi-location businesses, and growing brands that need custom components, deeper integrations, and a site that pulls real weight in the business.',
		bullets: [
			'Everything in Starter',
			'Custom illustrations, micro-animations, or motion design',
			'Deeper third-party integrations (CRM, marketing automation, analytics)',
			'Booking, restaurant, or membership module configured to your workflow',
			'Advanced SEO: content audit, structured-data plan, local schema',
			'Performance budget — Core Web Vitals tuned before launch',
			'Custom forms, calculators, or quote workflows',
			'90 days of post-launch support',
		],
	},
	{
		id: 'premium',
		label: 'Premium',
		tagline: 'Custom platforms, apps, and SaaS',
		rangeLow: 20000,
		rangeHigh: null,
		bestFor:
			'Businesses building a real digital product: a custom platform, a mobile app, a SaaS, or a multi-tenant operation. Engagements scoped per project — typically $20k–$100k+.',
		bullets: [
			'Everything in Growth',
			'Custom backend logic, calculators, or admin dashboards',
			'Multi-language and multi-region content',
			'Mobile app companion (iOS + Android)',
			'Custom authentication, role-based access, and admin tooling',
			'Architecture and infrastructure review for scale',
			'Migration from a complex legacy CMS or ecommerce platform',
			'Dedicated infrastructure tier when traffic or compliance warrants it',
			'Optional fractional-CTO engagement post-launch',
		],
	},
];

export type HostingTierId = 'essentials' | 'growth' | 'pro';

export type HostingTier = {
	id: HostingTierId;
	label: string;
	tagline: string;
	price: number;
	bestFor: string;
	bullets: string[];
	highlight?: boolean;
};

export const HOSTING_TIERS: HostingTier[] = [
	{
		id: 'essentials',
		label: 'Essentials',
		tagline: 'Flat-fee managed hosting + CMS',
		price: 50,
		bestFor:
			'Small businesses with a live site that needs to stay healthy and current.',
		bullets: [
			'Managed hosting on our infrastructure',
			'SSL, CDN, daily backups, security patches',
			'Full CMS access — unlimited pages, no traffic gates',
			'Standard email support',
			'No per-page fees, no transaction fees, no surprise upgrades',
		],
	},
	{
		id: 'growth',
		label: 'Growth',
		tagline: 'Active platform management',
		price: 149,
		highlight: true,
		bestFor:
			'Businesses that publish often, run paid traffic, or need a partner watching the platform week to week.',
		bullets: [
			'Everything in Essentials',
			'Priority email + chat support — 24h response',
			'Monthly performance + Core Web Vitals review',
			'Quarterly SEO audit with action items',
			'Uptime monitoring with on-call alerts',
			'Analytics dashboard reviewed against business goals',
			'Up to 2h/month of content-update queue at no extra charge',
		],
	},
	{
		id: 'pro',
		label: 'Pro',
		tagline: 'Strategic platform partnership',
		price: 349,
		bestFor:
			'High-traffic sites, ecommerce stores, or businesses where downtime or slow pages cost real revenue.',
		bullets: [
			'Everything in Growth',
			'4h business-hours response SLA',
			'Dedicated staging environment',
			'Quarterly architecture and infrastructure review',
			'Integration support — third-party APIs, data pipelines, custom connectors',
			'Performance budget enforced on every release',
			'Direct access to the senior engineer who built your stack',
		],
	},
];

export type ModuleId = 'restaurant' | 'booking' | 'ecommerce' | 'subscription';

export type PricingModule = {
	id: ModuleId;
	label: string;
	tagline: string;
	price: number;
	bullets: string[];
};

export const MODULES: PricingModule[] = [
	{
		id: 'restaurant',
		label: 'Restaurant',
		tagline: 'Menus, hours, and reservations',
		price: 49,
		bullets: [
			'Menu management with seasonal swaps',
			'Hours, holidays, and special events',
			'Reservation form integration',
			'Online ordering integrations (third-party)',
		],
	},
	{
		id: 'booking',
		label: 'Booking & Events',
		tagline: 'Calendar, capacity, and check-in',
		price: 79,
		bullets: [
			'Bookable calendar with capacity rules',
			'Waitlist and confirmation emails',
			'Google Calendar / iCal sync',
			'Event pages with ticket integration',
		],
	},
	{
		id: 'ecommerce',
		label: 'Ecommerce',
		tagline: 'Products, checkout, and orders',
		price: 99,
		bullets: [
			'Stripe checkout connected to your own Stripe account',
			'Inventory and product variants',
			'Abandoned cart recovery',
			'Tax rules and shipping zones',
		],
	},
	{
		id: 'subscription',
		label: 'Subscription / Membership',
		tagline: 'Gated content and recurring billing',
		price: 99,
		bullets: [
			'Member-only pages and gated content',
			'Recurring billing through your own Stripe account',
			'Member portal for self-service',
			'Tier management and access control',
		],
	},
];

export type PopularCombo = {
	label: string;
	scenario: string;
	moduleIds: ModuleId[];
};

export const POPULAR_COMBOS: PopularCombo[] = [
	{
		label: 'Local restaurant',
		scenario:
			'A neighborhood spot with menus that change weekly and a reservation form.',
		moduleIds: ['restaurant'],
	},
	{
		label: 'Boutique ecommerce',
		scenario: 'A maker selling 20–200 SKUs with tax rules and Stripe checkout.',
		moduleIds: ['ecommerce'],
	},
	{
		label: 'Membership business',
		scenario:
			'Online community or course library with recurring billing and gated content.',
		moduleIds: ['subscription'],
	},
	{
		label: 'Events + community',
		scenario: 'Workshops, gatherings, and a paid membership tier alongside.',
		moduleIds: ['booking', 'subscription'],
	},
];

export type TypicalInvestmentRow = {
	businessType: string;
	rangeLabel: string;
	note?: string;
};

export const TYPICAL_INVESTMENTS: TypicalInvestmentRow[] = [
	{
		businessType: 'Small business / brochure site',
		rangeLabel: '$4,500 – $8,000',
		note: 'Starter tier',
	},
	{
		businessType: 'Professional services site',
		rangeLabel: '$9,000 – $15,000',
		note: 'Growth tier',
	},
	{
		businessType: 'Ecommerce platform',
		rangeLabel: '$15,000 – $30,000',
		note: 'Growth → Premium',
	},
	{
		businessType: 'Mobile app MVP',
		rangeLabel: '$30,000 – $75,000',
		note: 'Premium tier',
	},
	{
		businessType: 'Custom platform / SaaS',
		rangeLabel: '$30,000 – $100,000+',
		note: 'Premium tier',
	},
];

export function calculateMonthly(selectedIds: ModuleId[]): number {
	const moduleTotal = MODULES.filter((m) => selectedIds.includes(m.id)).reduce(
		(acc, m) => acc + m.price,
		0,
	);
	return HOSTING_MONTHLY + moduleTotal;
}
