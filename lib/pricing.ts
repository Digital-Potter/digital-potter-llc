// Centralized pricing data. Update here when numbers change — every
// pricing-aware component pulls from this file. Documentation in
// docs/PROJECT_CONVENTIONS.md → "Pricing baseline".

export const HOSTING_MONTHLY = 50;
export const FRONTEND_ONETIME = 3500;
export const FRONTEND_INSTALLMENT_MONTHLY = 349;
export const FRONTEND_INSTALLMENT_MONTHS = 12;
export const ANNUAL_PREPAY_DISCOUNT_PCT = 15;

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
			'Stripe-powered checkout, no transaction fees from us',
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
			'Stripe-powered recurring billing',
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
