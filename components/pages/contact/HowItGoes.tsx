const steps = [
	{
		n: '01',
		title: 'Initial Call',
		body: "We hop on a 30-minute call to understand your business, your customers, and the problem you're really solving. No deck, no pitch — just questions.",
	},
	{
		n: '02',
		title: 'Custom Proposal',
		body: 'Within a week, we send a written proposal: scope, timeline, milestones, and a fixed price. No surprise invoices, no hidden hourly rates.',
	},
	{
		n: '03',
		title: 'On-Boarding Call',
		body: "Once you accept, we kick off properly: introduce the team, set up shared tools, and lock the first sprint's goals. By the end of the call you know what's shipping next.",
	},
];

export default function HowItGoes() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<h2 className="text-balance">How the process goes.</h2>
				<p className="text-dp-body-soft mt-6 text-balance">
					Three steps from your first message to your first sprint. No
					surprises, no marketing-speak.
				</p>
			</div>
			<ul className="mt-14 grid gap-6 md:grid-cols-3">
				{steps.map((s) => (
					<li
						key={s.n}
						className="border-dp-dark/10 rounded-3xl border bg-white/50 p-8 md:p-10"
					>
						<span className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
							{s.n}
						</span>
						<h3 className="mt-4 text-xl md:text-2xl">{s.title}</h3>
						<p className="text-dp-body-soft mt-4 text-base md:text-lg">
							{s.body}
						</p>
					</li>
				))}
			</ul>
		</section>
	);
}
