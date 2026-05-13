const phases = [
	{
		n: '01',
		title: 'Discovery',
		duration: 'Week 1–2',
		body: 'We meet your DevOps lead, your security or compliance lead, and your product owner. We document the constraints (cloud provider, region restrictions, data residency, integration scope, audit requirements). End of week 2 you have a written engagement scope and timeline.',
	},
	{
		n: '02',
		title: 'Setup',
		duration: 'Week 3–6 typically',
		body: 'We provision the environment, deploy theDavid, run integration tests, and walk through the audit playbook. Your team shadows ours during this phase so they learn the system as it stands up.',
	},
	{
		n: '03',
		title: 'Handover',
		duration: 'Week 7–8',
		body: 'We run the platform together for a week, then your team runs it solo while we shadow. By end of week 8 you operate the platform independently — with us on speed-dial when you want backup.',
	},
];

export default function SelfHostedProcess() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					Engagement timeline
				</p>
				<h2 className="mt-6 text-balance">
					Six to eight weeks from kickoff to your team running it.
				</h2>
				<p className="text-dp-body-soft mt-6 text-balance">
					Standard timeline. Compliance-heavy environments add audit phases; we
					map them in your scope of work.
				</p>
			</div>

			<ol className="mt-14 grid gap-6 md:grid-cols-3">
				{phases.map((p) => (
					<li
						key={p.n}
						className="border-dp-dark/10 rounded-3xl border bg-white/50 p-8 md:p-10"
					>
						<div className="flex items-baseline gap-3">
							<span className="bg-dp-dark-green text-dp-green font-primary-font inline-flex h-12 w-12 items-center justify-center rounded-2xl text-base font-bold">
								{p.n}
							</span>
							<span className="text-dp-body-soft text-xs font-bold tracking-wider uppercase">
								{p.duration}
							</span>
						</div>
						<h3 className="mt-5 text-xl md:text-2xl">{p.title}</h3>
						<p className="text-dp-body-soft mt-4 text-base md:text-lg">
							{p.body}
						</p>
					</li>
				))}
			</ol>
		</section>
	);
}
