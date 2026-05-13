type Deliverable = {
	tag: string;
	title: string;
	body: string;
	bullets: string[];
};

const deliverables: Deliverable[] = [
	{
		tag: '01 — License & setup',
		title: 'A perpetual license to run theDavid in your org.',
		body: 'We provision the initial environment in your AWS, GCP, or Azure account (or on-prem) and wire up the database, object storage, email transport, and observability stack.',
		bullets: [
			'Source code delivered to your private repository',
			'Initial production environment provisioned and tested',
			'Database (MongoDB), object storage, email transport configured',
			'Observability stack: logs, metrics, alerts on day one',
		],
	},
	{
		tag: '02 — Environment provisioning',
		title: 'Production, staging, and dev — Infrastructure-as-Code.',
		body: 'Three environments configured from kickoff. Terraform or CloudFormation (your team picks) so you can rebuild from scratch any time.',
		bullets: [
			'Three environments: prod, staging, dev',
			'Infrastructure-as-Code in your repo',
			'CI/CD pipeline integrated with your existing tooling',
			'Disaster-recovery runbook with tested failover',
		],
	},
	{
		tag: '03 — Training for your team',
		title: 'Two-week onboarding for your platform engineers.',
		body: 'Walk-through of the codebase, deployment flow, scaling levers, and incident response. We document the gotchas before we hand over the keys.',
		bullets: [
			'Codebase and architecture deep-dive (recorded)',
			'Deployment and rollback walkthroughs',
			'Scaling levers and observability dashboards',
			'Incident response and on-call runbook',
		],
	},
];

export default function WhatWeDeliver() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					What you get
				</p>
				<h2 className="mt-6 text-balance">
					Three deliverables. One running platform. Your perimeter.
				</h2>
				<p className="text-dp-body-soft mt-6 text-balance">
					An end-to-end engagement that ends with your team running theDavid
					independently — with us on speed-dial when you want backup.
				</p>
			</div>

			<ul className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-8">
				{deliverables.map((d) => (
					<li
						key={d.tag}
						className="border-dp-green/40 flex flex-col rounded-3xl border-2 bg-white/40 p-8 md:p-10"
					>
						<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
							{d.tag}
						</p>
						<h3 className="mt-4 text-xl md:text-2xl">{d.title}</h3>
						<p className="text-dp-body-soft mt-4 text-base">{d.body}</p>
						<ul className="mt-6 space-y-3">
							{d.bullets.map((b) => (
								<li
									key={b}
									className="text-dp-body/85 flex items-start gap-3 text-sm"
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
