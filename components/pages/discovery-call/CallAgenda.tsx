const agenda = [
	{
		title: 'Your business, first',
		body: 'What you do, who your customers are, and what isn’t working online today. You talk, we listen.',
	},
	{
		title: 'What to build — and what not to',
		body: 'We’ll tell you what your business actually needs, including the features you can safely skip for now.',
	},
	{
		title: 'A real number, on the call',
		body: 'You leave with a ballpark price — builds start at $1,900 — not a “we’ll get back to you” cliffhanger.',
	},
	{
		title: 'A written plan, either way',
		body: 'We follow up with a short written plan you can act on — whether you hire us or not.',
	},
];

export default function CallAgenda() {
	return (
		<section className="mx-auto mb-12 max-w-5xl">
			<h2 className="text-center text-2xl md:text-3xl">
				What we&apos;ll cover in 45 minutes
			</h2>
			<ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{agenda.map((item, i) => (
					<li
						key={item.title}
						className="border-dp-dark/10 rounded-2xl border bg-white/50 p-6"
					>
						<span
							aria-hidden
							className="bg-dp-green/15 text-dp-dark-green font-primary-font inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold"
						>
							{i + 1}
						</span>
						<h3 className="font-primary-font mt-3 text-base leading-snug font-bold">
							{item.title}
						</h3>
						<p className="text-dp-body-soft mt-2 text-sm">{item.body}</p>
					</li>
				))}
			</ol>
		</section>
	);
}
