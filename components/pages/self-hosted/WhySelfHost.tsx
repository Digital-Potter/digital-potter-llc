type Reason = {
	title: string;
	body: string;
};

const reasons: Reason[] = [
	{
		title: 'Data sovereignty',
		body: 'Your customer data, your editorial content, your search index — all live in your AWS, GCP, or Azure account. Nothing leaves your perimeter.',
	},
	{
		title: 'Compliance environments',
		body: "HIPAA, SOC 2, FedRAMP, region-restricted GDPR. We've shipped theDavid into compliance-bound environments before — we know the shape of the audit and the controls it expects.",
	},
	{
		title: 'Cost economics at scale',
		body: 'Above 500K monthly visitors or 50GB of media, dedicated infrastructure with reserved instances usually costs less than a managed multi-tenant tier. The break-even is between Scale and Enterprise.',
	},
	{
		title: 'Full control of the stack',
		body: 'Your DevOps team owns the deployment pipeline. You pick the region, the instance class, the backup cadence, the observability stack. We hand you the keys.',
	},
];

export default function WhySelfHost() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					When self-hosting fits
				</p>
				<h2 className="mt-6 text-balance">
					Four reasons organizations move theDavid in-house.
				</h2>
				<p className="text-dp-body/80 mt-6 text-balance">
					Most clients are happy on the managed plan. These four reasons are
					when the math (or the audit) flips toward owning the infrastructure.
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
						<p className="text-dp-body/80 mt-4 text-base md:text-lg">
							{r.body}
						</p>
					</li>
				))}
			</ul>
		</section>
	);
}
