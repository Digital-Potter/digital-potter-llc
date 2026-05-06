const points = [
	{
		title: 'Single-organization license',
		body: 'You receive a perpetual license to run theDavid inside your organization. No seat counts, no per-deployment fees.',
	},
	{
		title: 'No redistribution',
		body: 'You may not redistribute, sublicense, or replicate the codebase outside your org. Internal modifications and forks are fine — they just stay internal.',
	},
	{
		title: 'You own your data and your modifications',
		body: 'Whatever your team builds on top of theDavid is yours. The platform code is licensed; your customizations and content are not.',
	},
	{
		title: 'Updates while maintenance is current',
		body: 'Active maintenance contract = every theDavid release applies to your fork. Stop the contract, you keep the last version you had — no service interruption, no future updates.',
	},
	{
		title: 'If we ever go away',
		body: 'You keep the source code, perpetually licensed. Worst case, you fork it. The license is structured so the platform outlives the company.',
	},
];

export default function LicenseTerms() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					License & IP terms
				</p>
				<h2 className="mt-6 text-balance">The legal bit, in plain English.</h2>
				<p className="text-dp-body/80 mt-6 text-balance">
					Five things to know before the formal agreement. The full license is
					short and we&apos;re happy to walk through it on a call.
				</p>
			</div>

			<ul className="mx-auto mt-14 max-w-3xl space-y-3">
				{points.map((p) => (
					<li
						key={p.title}
						className="border-dp-dark/10 rounded-2xl border bg-white/40 p-6 md:p-8"
					>
						<p className="font-primary-font text-dp-dark text-base font-bold md:text-lg">
							{p.title}
						</p>
						<p className="text-dp-body/80 mt-2 text-base">{p.body}</p>
					</li>
				))}
			</ul>
		</section>
	);
}
