import type { CmsProject } from '@/helpers/cms/types';
import type { SiteUrls } from '@/helpers/cms/urls';

// Placeholder portfolio cards. Anonymized real-client work awaiting full
// case studies. When real Projects exist in theDavid CMS, the page falls
// back to placeholders only if the API returns an empty list.

export type PortfolioProject = {
	id: string;
	title: string;
	excerpt: string;
	categories: string[];
	slug?: string;
	href?: string;
	status?: 'live' | 'coming-soon';
	featuredImage?: { url: string; alt?: string };
};

const PLACEHOLDER_CATEGORIES = [
	'Restaurant',
	'Ecommerce',
	'Booking & Events',
	'Subscription',
	'Custom Web App',
] as const;

export const PORTFOLIO_PLACEHOLDERS: PortfolioProject[] = [
	{
		id: 'verity-electric',
		title: 'Northern Virginia electrical contractor',
		excerpt:
			'Marketing site with project gallery and online inspection request form. Five-star reviews integration on the home page.',
		categories: ['Custom Web App'],
		status: 'live',
	},
	{
		id: 'll-hair',
		title: 'Specialty haircare retailer',
		excerpt:
			'Multi-product Stripe ecommerce with subscription bundles, blog-driven content marketing, and abandoned-cart recovery.',
		categories: ['Ecommerce'],
		status: 'live',
	},
	{
		id: 'hair-we-share',
		title: 'Boutique salon and product line',
		excerpt:
			'Two-brand site for a salon and an in-house product line. Online booking, product catalog, and storytelling sections.',
		categories: ['Booking & Events'],
		status: 'live',
	},
	{
		id: 'fellerman-glass',
		title: 'Custom glass artisan',
		excerpt:
			'Portfolio-first site for a one-person studio. Commission-inquiry workflow and large-format gallery.',
		categories: ['Custom Web App'],
		status: 'live',
	},
	{
		id: 'restaurant-placeholder',
		title: 'Neighborhood restaurant',
		excerpt:
			'Seasonal menu CMS, online reservations, gift-card storefront. Built around the staff who actually use it.',
		categories: ['Restaurant'],
		status: 'coming-soon',
	},
	{
		id: 'membership-placeholder',
		title: 'Online learning community',
		excerpt:
			'Gated content library, recurring Stripe billing, member portal with progress tracking.',
		categories: ['Subscription'],
		status: 'coming-soon',
	},
];

/** Map a CMS Project to the card shape this UI renders. */
export function mapCmsProjectToCard(
	p: CmsProject,
	urls: SiteUrls,
): PortfolioProject {
	const categories = p.categories?.map((c) => c.name).filter(Boolean) ?? [];

	return {
		id: p._id,
		title: p.title,
		excerpt: p.excerpt ?? '',
		categories: categories.length > 0 ? categories : ['Custom Web App'],
		slug: p.slug,
		href: urls.project(p.slug),
		status: 'live',
		featuredImage: p.featuredImage,
	};
}

/**
 * Returns the unique set of category labels present in the data, in a
 * stable order: known canonical categories first, then any extras the
 * CMS introduces.
 */
export function deriveCategories(projects: PortfolioProject[]): string[] {
	const present = new Set(projects.flatMap((p) => p.categories));
	const ordered: string[] = [];
	for (const c of PLACEHOLDER_CATEGORIES) {
		if (present.has(c)) {
			ordered.push(c);
			present.delete(c);
		}
	}
	for (const c of present) ordered.push(c);
	return ordered;
}
