const reasons = [
	{
		title: 'Predictable monthly cost.',
		body: 'You know what you spend on tech each month. We know what to plan for. Both sides win.',
	},
	{
		title: 'Faster response times.',
		body: 'Retainer clients are first in our queue. Hourly clients wait. When something matters, that 24h or 4h SLA is the difference between losing customers and not.',
	},
	{
		title: 'You actually ship improvements.',
		body: 'Hourly clients delay until something breaks. Retainer clients ship monthly because the time is already paid for — and the work compounds.',
	},
	{
		title: 'We get to know your business.',
		body: 'Engineers on a recurring engagement remember your edge cases, your stakeholders, your business model. Hourly engineers re-learn it every time.',
	},
];

export default function WhyRetainer() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					Why a retainer beats hourly
				</p>
				<h2 className="mt-6 text-balance">
					Hourly is a fallback, not a strategy.
				</h2>
				<p className="text-dp-body-soft mt-6 text-balance">
					Most clients who try hourly switch to a retainer within six months.
					Here&apos;s why we recommend you start there.
				</p>
			</div>

			<ul className="mt-14 grid gap-6 md:grid-cols-2">
				{reasons.map((r, i) => (
					<li
						key={r.title}
						className="border-dp-dark/10 hover:border-dp-green/40 rounded-3xl border bg-white/50 p-8 transition-colors md:p-10"
					>
						<span className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
							{`0${i + 1}`}
						</span>
						<h3 className="mt-4 text-xl md:text-2xl">{r.title}</h3>
						<p className="text-dp-body-soft mt-4 text-base md:text-lg">
							{r.body}
						</p>
					</li>
				))}
			</ul>
		</section>
	);
}
