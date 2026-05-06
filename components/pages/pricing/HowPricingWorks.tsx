import {
	FRONTEND_ONETIME,
	FRONTEND_INSTALLMENT_MONTHLY,
	FRONTEND_INSTALLMENT_MONTHS,
	HOSTING_MONTHLY,
} from '@/lib/pricing';

type Card = {
	tag: string;
	headline: string;
	body: string;
	price: string;
	priceDetail?: string;
};

const cards: Card[] = [
	{
		tag: '01 — Foundation',
		headline: 'Custom frontend build',
		body: 'A one-time investment for your custom-designed Next.js foundation. We build the brand, the design system, and the page templates. After launch, you add unlimited pages yourself through the CMS.',
		price: `$${FRONTEND_ONETIME.toLocaleString()}`,
		priceDetail: `or $${FRONTEND_INSTALLMENT_MONTHLY}/mo × ${FRONTEND_INSTALLMENT_MONTHS} months`,
	},
	{
		tag: '02 — Recurring',
		headline: 'Hosting + CMS',
		body: 'Managed hosting, daily backups, SSL, CDN, security patches, and full content management. One flat fee — no traffic gates, no plan jumps as you grow.',
		price: `$${HOSTING_MONTHLY}`,
		priceDetail: 'per month, billed monthly or annually (15% off)',
	},
	{
		tag: '03 — Optional',
		headline: 'Modules for your business',
		body: 'Add only what you need: ecommerce, restaurant, bookings, or membership. Stack any combination. Most clients pick one, some pick two.',
		price: '+$25 to $50',
		priceDetail: 'per module, per month',
	},
];

export default function HowPricingWorks() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					How it works
				</p>
				<h2 className="mt-6 text-balance">
					Three line items. That&apos;s the whole model.
				</h2>
				<p className="text-dp-body/80 mt-6 text-balance">
					A custom frontend you own, hosting + CMS at a flat monthly fee, and
					optional modules if your business needs them. No surprises.
				</p>
			</div>

			<ul className="mt-14 grid gap-6 md:grid-cols-3">
				{cards.map((card) => (
					<li
						key={card.tag}
						className="border-dp-dark/10 hover:border-dp-green/50 flex flex-col rounded-3xl border bg-white/50 p-8 transition-colors md:p-10"
					>
						<span className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
							{card.tag}
						</span>
						<h3 className="mt-4 text-xl md:text-2xl">{card.headline}</h3>
						<p className="text-dp-body/80 mt-4 text-base">{card.body}</p>
						<div className="border-dp-dark/10 mt-auto border-t pt-6">
							<p className="font-primary-font text-dp-dark-green text-3xl font-bold md:text-4xl">
								{card.price}
							</p>
							{card.priceDetail ? (
								<p className="text-dp-body/70 mt-1 text-sm">
									{card.priceDetail}
								</p>
							) : null}
						</div>
					</li>
				))}
			</ul>
		</section>
	);
}
