const paths = [
	{
		tag: 'Path A — Recommended',
		title: 'Maintenance contract',
		body: 'We continue to ship security patches, dependency updates, and feature releases under an SLA. Your team focuses on your business; we keep the platform current.',
		bullets: [
			'Quarterly version upgrades with regression testing',
			'Security patches within 72 hours of upstream release',
			'Feature releases — every theDavid release applies to your fork',
			'Priority support and incident response (4h business-hours SLA)',
			'Dedicated Slack channel with our platform engineers',
		],
		highlight: true,
	},
	{
		tag: 'Path B',
		title: 'DIY operations',
		body: "You run it. We're available as a paid consultant when you need help, but the day-to-day is fully yours. Best for orgs with established DevOps capacity who'd rather own the platform end to end.",
		bullets: [
			'Full source code and architecture documentation in your hands',
			'Your team owns deployments, patching, and incident response',
			'Pay-as-you-go consulting at our standard hourly rate',
			'Optional annual review and roadmap sync',
		],
	},
];

export default function OngoingOptions() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					After we hand over the keys
				</p>
				<h2 className="mt-6 text-balance">Two paths for ongoing operations.</h2>
				<p className="text-dp-body-soft mt-6 text-balance">
					Most orgs choose the maintenance contract for the steady upgrade
					cadence. Some prefer to run it themselves and just call us when they
					need help.
				</p>
			</div>

			<ul className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
				{paths.map((p) => (
					<li
						key={p.title}
						className={
							p.highlight
								? 'border-dp-green bg-dp-green/10 rounded-3xl border-2 p-8 shadow-md md:p-10'
								: 'border-dp-dark/10 rounded-3xl border bg-white/50 p-8 md:p-10'
						}
					>
						<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
							{p.tag}
						</p>
						<h3 className="mt-4 text-xl md:text-2xl">{p.title}</h3>
						<p className="text-dp-body-soft mt-4 text-base md:text-lg">
							{p.body}
						</p>
						<ul className="mt-6 space-y-3">
							{p.bullets.map((b) => (
								<li
									key={b}
									className="text-dp-body/85 flex items-start gap-3 text-base"
								>
									<svg
										aria-hidden
										className="fill-dp-green mt-1 h-4 w-4 shrink-0"
										viewBox="0 0 20 20"
									>
										<path d="M16.704 5.296a1 1 0 0 1 0 1.408l-7.997 8a1 1 0 0 1-1.414 0l-3.997-4a1 1 0 1 1 1.414-1.408l3.29 3.293 7.29-7.293a1 1 0 0 1 1.414 0Z" />
									</svg>
									<span>{b}</span>
								</li>
							))}
						</ul>
					</li>
				))}
			</ul>
		</section>
	);
}
