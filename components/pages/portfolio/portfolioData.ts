// Placeholder portfolio cards. Anonymized real-client work that's
// awaiting full case studies — the user replaces these with CMS-driven
// CmsProject entries when content is migrated.
//
// Convention: keep `slug` empty until the case study is published; the
// card renders without a clickable detail link in that state.

export type PortfolioCategory =
	| 'Restaurant'
	| 'Ecommerce'
	| 'Booking & Events'
	| 'Subscription'
	| 'Custom Web App';

export type PortfolioProject = {
	id: string;
	title: string;
	excerpt: string;
	category: PortfolioCategory;
	slug?: string; // present only when the full case study is published
	status?: 'live' | 'coming-soon';
};

export const ALL_CATEGORIES: PortfolioCategory[] = [
	'Restaurant',
	'Ecommerce',
	'Booking & Events',
	'Subscription',
	'Custom Web App',
];

export const PORTFOLIO_PLACEHOLDERS: PortfolioProject[] = [
	{
		id: 'verity-electric',
		title: 'Northern Virginia electrical contractor',
		excerpt:
			'Marketing site with project gallery and online inspection request form. Five-star reviews integration on the home page.',
		category: 'Custom Web App',
		status: 'live',
	},
	{
		id: 'll-hair',
		title: 'Specialty haircare retailer',
		excerpt:
			'Multi-product Stripe ecommerce with subscription bundles, blog-driven content marketing, and abandoned-cart recovery.',
		category: 'Ecommerce',
		status: 'live',
	},
	{
		id: 'hair-we-share',
		title: 'Boutique salon and product line',
		excerpt:
			'Two-brand site for a salon and an in-house product line. Online booking, product catalog, and storytelling sections.',
		category: 'Booking & Events',
		status: 'live',
	},
	{
		id: 'fellerman-glass',
		title: 'Custom glass artisan',
		excerpt:
			'Portfolio-first site for a one-person studio. Commission-inquiry workflow and large-format gallery.',
		category: 'Custom Web App',
		status: 'live',
	},
	{
		id: 'restaurant-placeholder',
		title: 'Neighborhood restaurant',
		excerpt:
			'Seasonal menu CMS, online reservations, gift-card storefront. Built around the staff who actually use it.',
		category: 'Restaurant',
		status: 'coming-soon',
	},
	{
		id: 'membership-placeholder',
		title: 'Online learning community',
		excerpt:
			'Gated content library, recurring Stripe billing, member portal with progress tracking.',
		category: 'Subscription',
		status: 'coming-soon',
	},
];
