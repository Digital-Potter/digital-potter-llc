type SiteType = {
	title: string;
	body: string;
	examples: string;
};

const siteTypes: SiteType[] = [
	{
		title: 'Marketing & lead-gen sites',
		body: 'Sites that earn their keep by turning anonymous traffic into qualified leads. Hand-crafted hero sections, conversion-focused funnels, instrumented forms, and analytics on every meaningful event so you know what works.',
		examples:
			'Examples: agencies, B2B SaaS landing pages, professional services, studios',
	},
	{
		title: 'Ecommerce storefronts',
		body: 'Stripe-powered checkout, inventory and order management, abandoned-cart recovery, multi-currency support when you grow internationally. Built around how your team actually fulfils orders, not how a SaaS platform wants you to.',
		examples:
			'Examples: specialty retailers, subscription boxes, single-product launches',
	},
	{
		title: 'Booking & service websites',
		body: 'Sites where the call-to-action is a calendar, not a contact form. Real-time availability, deposits via Stripe, automated reminders, and a back-office that fits how you run the business — not the other way around.',
		examples:
			'Examples: salons, restaurants, studios, event venues, consultants',
	},
	{
		title: 'Multi-region & multi-language',
		body: 'When the audience grows past one country, we add localization, hreflang, currency switching, and per-region content without rebuilding the site. The same Next.js codebase serves every region — fast, on the closest edge node.',
		examples:
			'Examples: international brands, importers, content publishers, expanding D2C',
	},
];

export default function WhatWeBuildWeb() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					What we build
				</p>
				<h2 className="mt-6 text-balance">
					Sites with a job to do — not just a digital business card.
				</h2>
				<p className="text-dp-body-soft mt-6 text-balance">
					Four categories cover most of what we&apos;ve shipped. Yours probably
					falls in one of them.
				</p>
			</div>

			<ul className="mt-14 grid gap-6 md:grid-cols-2">
				{siteTypes.map((site) => (
					<li
						key={site.title}
						className="border-dp-dark/10 hover:border-dp-green/50 rounded-3xl border bg-white/50 p-8 transition-colors md:p-10"
					>
						<h3 className="text-xl md:text-2xl">{site.title}</h3>
						<p className="text-dp-body-soft mt-4 text-base md:text-lg">
							{site.body}
						</p>
						<p className="text-dp-body-soft mt-4 text-sm italic">
							{site.examples}
						</p>
					</li>
				))}
			</ul>
		</section>
	);
}
