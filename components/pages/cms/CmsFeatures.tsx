import FeatureBlock from './FeatureBlock';

const features = [
	{
		tag: 'Page composer',
		headline: 'Pages built from sections, not freeform HTML.',
		body: "Drag, drop, reorder. Each section is a designed component — hero, feature grid, gallery, testimonials, CTA, sixteen types in all. Editors get a controlled canvas; designers get a system that doesn't break under client edits.",
		bullets: [
			'WYSIWYG content blocks with the editor your team already knows',
			'Sixteen pre-designed section types out of the box',
			'Drag-to-reorder, duplicate, hide — never lose work',
			'Per-page SEO, featured image, parent / child relationships',
			'Live preview before publishing',
		],
		screenshotSrc: '/cms-screenshots/page-editor.png',
		screenshotAlt:
			'theDavid page editor with title, content, and sections panel',
		screenshotPlaceholder: 'Page editor',
		reverse: false,
	},
	{
		tag: 'Multi-tenant by default',
		headline: 'One platform. Many sites. Zero compromise.',
		body: 'Run a single CMS for your whole business — agency, multi-brand company, franchise. Each tenant has its own data, settings, users, and storefront. Super admins administer everything from one login; tenant admins only see their own.',
		bullets: [
			'Tenant-scoped content, users, and settings — strict isolation',
			'Super-admin oversight across all tenants in one switcher',
			'Per-tenant branding, domains, and Stripe / Mailgun accounts',
			'Per-tenant pricing and module activation',
			'Cross-tenant search and reporting for super admins',
		],
		screenshotSrc: '/cms-screenshots/pages-list.png',
		screenshotAlt: 'theDavid Pages list with tenant tags and status filters',
		screenshotPlaceholder: 'Pages list',
		reverse: true,
	},
	{
		tag: 'Site Options',
		headline: 'Every store-wide setting in one tab. Not fourteen.',
		body: 'Brand, SEO, navigation, social links, policies, integrations, taxes, shipping. All in one place. No more digging through plugin menus or remembering where the favicon lives.',
		bullets: [
			'General settings, SEO defaults, and Site Structure routing',
			'Header, footer, sidebar, and mobile navigation editors',
			'Currencies, units, tax rules, shipping zones',
			'Stripe, Mailgun, Google Analytics, webmaster tool verification',
			'Sales channels, social links, refund / privacy / terms policies',
		],
		screenshotSrc: '/cms-screenshots/site-options.png',
		screenshotAlt:
			'theDavid Site Options screen with General tab and tabs across the top',
		screenshotPlaceholder: 'Site options',
		reverse: false,
	},
	{
		tag: 'Dashboard',
		headline: 'Know what matters, every time you log in.',
		body: 'Sales, orders, traffic, customer growth, recent activity — visible the moment you sign in. Filter by week, month, quarter, year. Activity feed shows every change your team has made so nothing slips through.',
		bullets: [
			'Storefront visits chart with trend indicators',
			'Sales, orders, paid transactions, new customer KPIs',
			'Activity feed: every nav change, page edit, content publish',
			'Latest registered customers list',
			'Time-range filters: week, month, quarter, year',
		],
		screenshotSrc: '/cms-screenshots/dashboard.png',
		screenshotAlt:
			'theDavid dashboard welcome screen with KPI cards and activity feed',
		screenshotPlaceholder: 'Dashboard',
		reverse: true,
	},
];

export default function CmsFeatures() {
	return (
		<>
			{features.map((f) => (
				<FeatureBlock key={f.tag} {...f} />
			))}
		</>
	);
}
