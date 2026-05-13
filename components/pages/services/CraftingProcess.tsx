const steps = [
	{
		n: '01',
		title: 'Discovery & Strategy',
		body: "We start with questions, not assumptions. A working session covers your business model, your customers, the problem you're really solving, and the constraints you're working under. By the end of week one you have a written scope, a fixed timeline, and a price you can plan around.",
	},
	{
		n: '02',
		title: 'Design & Development',
		body: 'We design and build in tight sprints with a working preview from day one. You see real progress weekly — not finished slide decks, working code. Feedback loops are short so course corrections are cheap, and nothing waits until launch to surprise you.',
	},
	{
		n: '03',
		title: 'Launch & Partnership',
		body: "Launch day is anti-climactic — by the time we ship, you've already used the staging environment for two weeks. After launch we transition to ongoing partnership: content team training, monitoring, and quarterly performance reviews. Most clients stay for years.",
	},
];

export default function CraftingProcess() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					Our Crafting Process
				</p>
				<h2 className="mt-6 text-balance">
					Three phases from your first message to long-term partnership.
				</h2>
				<p className="text-dp-body-soft mt-6 text-balance">
					No surprises, no marketing-speak, no last-minute scope creep.
					Here&apos;s exactly what working with Digital Potter looks like.
				</p>
			</div>
			<ol className="mt-14 grid gap-6 md:grid-cols-3">
				{steps.map((s) => (
					<li
						key={s.n}
						className="border-dp-dark/10 rounded-3xl border bg-white/50 p-8 md:p-10"
					>
						<span className="bg-dp-dark-green text-dp-green font-primary-font inline-flex h-12 w-12 items-center justify-center rounded-2xl text-base font-bold">
							{s.n}
						</span>
						<h3 className="mt-5 text-xl md:text-2xl">{s.title}</h3>
						<p className="text-dp-body-soft mt-4 text-base md:text-lg">
							{s.body}
						</p>
					</li>
				))}
			</ol>
		</section>
	);
}
