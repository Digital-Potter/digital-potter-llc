type Faq = {
	q: string;
	a: string;
};

const faqs: Faq[] = [
	{
		q: 'Why is the frontend a separate one-time fee?',
		a: "Because we build it from scratch for you. The $3,500 covers the brand discovery, custom design, and the initial Next.js codebase. After that, your team adds and edits unlimited pages through the CMS — at no extra charge from us. We're not a template platform, so we don't earn margin by selling you new templates every year.",
	},
	{
		q: 'What happens if my site gets a lot of traffic?',
		a: "For typical SMB traffic our shared infrastructure handles it without issue, and your monthly fee stays flat. If we forecast unusually heavy traffic during discovery — say a viral product launch or a media-driven brand — we'll recommend a dedicated hosting tier in your proposal. There are no surprise upgrades.",
	},
	{
		q: 'Can I pay annually?',
		a: 'Yes — annual prepay gets you 15% off the recurring fee. Most clients start monthly and switch to annual after the first quarter once they see the value.',
	},
	{
		q: "What does 'you own the code' actually mean?",
		a: "When the engagement ends — for any reason — you receive the full source code of your frontend, the design system, and any custom integrations we built. You can take it to another agency, host it elsewhere, or hire your own developer to extend it. The CMS itself stays on our infrastructure (or yours, if you've chosen the self-hosted option), but the frontend is yours.",
	},
	{
		q: 'Do you charge transaction fees? Who handles payments?',
		a: "We charge nothing on transactions. The Ecommerce and Subscription modules connect to your own Stripe account — payments go directly from your customer's card to your bank account, and Stripe charges you their standard processing fee (currently 2.9% + 30¢ per transaction in the US, set by Stripe and visible on every receipt). We don't sit in the middle, we don't take a cut, and we don't have access to your funds. Compare this to Shopify Basic which adds 2% on every sale on top of Stripe fees.",
	},
	{
		q: 'What if I want to leave?',
		a: "Cancel any time with 30 days' notice. We'll send you a final export of your content and the latest version of your code. No exit fees, no data hostage, no awkward conversations.",
	},
	{
		q: 'How long until I can launch?',
		a: 'Brochure builds usually launch in 4–6 weeks from kickoff. Builds with modules (ecommerce, bookings, membership) typically take 6–10 weeks. We confirm the exact timeline in your proposal after discovery.',
	},
	{
		q: 'What if my needs change after launch?',
		a: "Add a module any time — your monthly fee just adjusts on the next billing cycle. For bigger changes (a new section of the site, a deeper integration, a redesign), we quote it as a separate engagement. Most clients don't need this in year one, but we're always there when you do.",
	},
];

export default function PricingFaq() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					Frequently asked
				</p>
				<h2 className="mt-6 text-balance">
					The questions every business owner asks us.
				</h2>
				<p className="text-dp-body/80 mt-6 text-balance">
					If yours isn&apos;t here, ask in the contact form — we answer every
					inquiry within one business day.
				</p>
			</div>

			<ul className="mx-auto mt-14 max-w-3xl space-y-3">
				{faqs.map((faq) => (
					<li key={faq.q}>
						<details className="group border-dp-dark/10 hover:border-dp-green/40 rounded-2xl border bg-white/50 transition-colors">
							<summary className="font-primary-font text-dp-dark cursor-pointer list-none px-6 py-5 text-base font-bold md:text-lg">
								<span className="flex items-center justify-between gap-4">
									{faq.q}
									<span
										aria-hidden
										className="text-dp-dark-green transition-transform group-open:rotate-45"
									>
										<svg
											className="h-5 w-5"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth={2}
											strokeLinecap="round"
										>
											<path d="M12 5v14M5 12h14" />
										</svg>
									</span>
								</span>
							</summary>
							<div className="text-dp-body/85 px-6 pb-6 text-base leading-relaxed">
								{faq.a}
							</div>
						</details>
					</li>
				))}
			</ul>
		</section>
	);
}
