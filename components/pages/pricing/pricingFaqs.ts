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
		question: 'Why is the frontend a separate one-time fee?',
		answer:
			"Because we build it from scratch for you. The $3,500 covers the brand discovery, custom design, and the initial Next.js codebase. After that, your team adds and edits unlimited pages through the CMS — at no extra charge from us. We're not a template platform, so we don't earn margin by selling you new templates every year.",
	},
	{
		question: 'What happens if my site gets a lot of traffic?',
		answer:
			"For typical SMB traffic our shared infrastructure handles it without issue, and your monthly fee stays flat. If we forecast unusually heavy traffic during discovery — say a viral product launch or a media-driven brand — we'll recommend a dedicated hosting tier in your proposal. There are no surprise upgrades.",
	},
	{
		question: 'Can I pay annually?',
		answer:
			'Yes — annual prepay gets you 15% off the recurring fee. Most clients start monthly and switch to annual after the first quarter once they see the value.',
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
			'Brochure builds usually launch in 4–6 weeks from kickoff. Builds with modules (ecommerce, bookings, membership) typically take 6–10 weeks. We confirm the exact timeline in your proposal after discovery.',
	},
	{
		question: 'What if my needs change after launch?',
		answer:
			"Add a module any time — your monthly fee just adjusts on the next billing cycle. For bigger changes (a new section of the site, a deeper integration, a redesign), we quote it as a separate engagement. Most clients don't need this in year one, but we're always there when you do.",
	},
];
