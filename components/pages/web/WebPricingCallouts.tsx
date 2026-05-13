import { FRONTEND_ONETIME, HOSTING_MONTHLY } from '@/lib/pricing';

const callouts = [
	{
		tag: '01 — Build',
		title: `Custom frontend from $${FRONTEND_ONETIME.toLocaleString()}`,
		body: "A one-time build covers design, development, content migration, accessibility, performance tuning, and launch. Final scope and price land in your proposal after a discovery week — but $4,500 is where most marketing sites start, and that's a fixed budget, not an hourly meter.",
	},
	{
		tag: '02 — Run',
		title: `$${HOSTING_MONTHLY}/mo flat for hosting + CMS`,
		body: 'One monthly fee covers hosting, the headless CMS, daily backups, security patches, image CDN, and uptime monitoring. No traffic gates, no per-page pricing, no transaction fees. Add modules (booking, ecommerce, subscriptions) only if your business actually needs them.',
	},
	{
		tag: '03 — Own',
		title: 'You keep the code',
		body: 'Every site we build is yours from day one. The repository, the content, the domain, the design system — all owned by your business. If you ever decide to move on or take development in-house, the codebase walks out the door with you. No lock-in, no buyout fee.',
	},
];

export default function WebPricingCallouts() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					What it costs and what you own
				</p>
				<h2 className="mt-6 text-balance">
					The three numbers you need before you commit.
				</h2>
				<p className="text-dp-body-soft mt-6 text-balance">
					Honest answers to the questions every business asks before hiring an
					agency.
				</p>
			</div>

			<ul className="mt-14 grid gap-6 md:grid-cols-3">
				{callouts.map((c) => (
					<li
						key={c.tag}
						className="border-dp-green/40 rounded-3xl border-2 bg-white/40 p-8 md:p-10"
					>
						<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
							{c.tag}
						</p>
						<h3 className="font-primary-font text-dp-dark mt-4 text-xl font-bold md:text-2xl">
							{c.title}
						</h3>
						<p className="text-dp-body-soft mt-4 text-base">{c.body}</p>
					</li>
				))}
			</ul>
		</section>
	);
}
