// Centralized pricing data. Update here when numbers change — every
// pricing-aware component pulls from this file. Documentation in
// docs/PROJECT_CONVENTIONS.md → "Pricing baseline".

export const HOSTING_MONTHLY = 50;
export const FRONTEND_ONETIME = 3500;
export const FRONTEND_INSTALLMENT_MONTHLY = 349;
export const FRONTEND_INSTALLMENT_MONTHS = 12;
export const ANNUAL_PREPAY_DISCOUNT_PCT = 15;

// Mobile app development
export const MOBILE_APP_ONETIME = 20000;

// Maintenance & support
export const HOURLY_RATE = 200;
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
		price: 25,
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
		price: 40,
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
		price: 50,
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
		price: 50,
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

export function calculateMonthly(selectedIds: ModuleId[]): number {
	const moduleTotal = MODULES.filter((m) => selectedIds.includes(m.id)).reduce(
		(acc, m) => acc + m.price,
		0,
	);
	return HOSTING_MONTHLY + moduleTotal;
}
