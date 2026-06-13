/**
 * Source of truth for the Pricing page FAQ entries. Shared between the
 * rendered accordion (`PricingFaq`) and the FAQPage JSON-LD emitted by the
 * pricing template. Adding a Q here automatically appears in both.
 */

export type PricingFaq = {
	question: string;
	answer: string;
};

export const PRICING_FAQS: PricingFaq[] = [
	{
		question: "What's the difference between Starter, Growth, and Premium?",
		answer:
			'Starter ($1,900–$3,500) is a serious foundation for a small business — brochure-style sites for service businesses, trades, and single-location restaurants. Growth ($4,000–$7,500) is where most clients land — professional services, multi-location businesses, deeper integrations, and custom components. Premium ($8,500+) is for custom platforms, ecommerce at scale, mobile apps, and SaaS. Your discovery call places you in the right tier and your proposal pins a fixed price.',
	},
	{
		question: 'Why is the frontend a separate one-time fee?',
		answer:
			"Because we build it from scratch for you. The build investment ($1,900 and up) covers brand discovery, custom design, the initial Next.js codebase, and the page templates your CMS uses going forward. After that, your team adds and edits unlimited pages through the CMS — at no extra charge from us. We're not a template platform, so we don't earn margin by selling you new templates every year.",
	},
	{
		question: 'What happens if my site gets a lot of traffic?',
		answer:
			"For typical SMB traffic the Essentials and Growth hosting tiers handle it without issue, and your monthly fee stays flat regardless of visits. If we forecast unusually heavy traffic during discovery — a viral product launch, a media-driven brand, or a high-volume ecommerce store — we'll recommend the Pro tier or dedicated infrastructure in your proposal. No surprise upgrades.",
	},
	{
		question: 'Can I pay annually?',
		answer:
			'Yes — annual prepay gets you 15% off any recurring tier (Essentials, Growth, or Pro). Most clients start monthly and switch to annual after the first quarter once they see the value.',
	},
	{
		question: 'Do you offer financing for the build?',
		answer:
			"Yes — for engagements above $5k we offer a private installment plan after we've scoped the work in your proposal. We don't advertise it publicly because financing terms depend on project size and shape, but bring it up on your discovery call if it would help.",
	},
	{
		question: "What does 'you own the code' actually mean?",
		answer:
			"When the engagement ends — for any reason — you receive the full source code of your frontend, the design system, and any custom integrations we built. You can take it to another agency, host it elsewhere, or hire your own developer to extend it. The CMS itself stays on our infrastructure (or yours, if you've chosen the self-hosted option), but the frontend is yours.",
	},
	{
		question: 'Do you charge transaction fees? Who handles payments?',
		answer:
			"We charge nothing on transactions. The Ecommerce and Subscription modules connect to your own Stripe account — payments go directly from your customer's card to your bank account, and Stripe charges you their standard processing fee (currently 2.9% + 30¢ per transaction in the US, set by Stripe and visible on every receipt). We don't sit in the middle, we don't take a cut, and we don't have access to your funds. Compare this to Shopify Basic which adds 2% on every sale on top of Stripe fees.",
	},
	{
		question: 'What if I want to leave?',
		answer:
			"Cancel any time with 30 days' notice. We'll send you a final export of your content and the latest version of your code. No exit fees, no data hostage, no awkward conversations.",
	},
	{
		question: 'How long until I can launch?',
		answer:
			'Starter builds usually launch in 4–6 weeks from kickoff. Growth builds with modules typically take 6–10 weeks. Premium engagements (custom platforms, apps) run 10–24 weeks depending on scope. We confirm the exact timeline in your proposal after discovery.',
	},
	{
		question: 'What if my needs change after launch?',
		answer:
			"Add a module any time — your monthly fee just adjusts on the next billing cycle. Move between hosting tiers the same way. For bigger changes (a new section of the site, a deeper integration, a redesign), we quote it as a separate engagement. Most clients don't need this in year one, but we're always there when you do.",
	},
];
