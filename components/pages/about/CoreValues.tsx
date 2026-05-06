type Value = {
	title: string;
	body: string;
};

const values: Value[] = [
	{
		title: 'Precision craftsmanship',
		body: 'We treat code like physical craft. Names matter. Structure matters. The decision to delete a line matters as much as the decision to add one. Quality compounds.',
	},
	{
		title: 'Collaborative partnership',
		body: "We work with you, not for you. Your team has context we don't and never will. Our process makes that context visible at every step instead of hiding behind expert-mystique.",
	},
	{
		title: 'Excellence standard',
		body: "Good enough isn't. We measure ourselves against the best work we've ever shipped, not against the agency next door. Every project should raise that bar.",
	},
	{
		title: 'Passionate innovation',
		body: "We adopt new tooling because it makes the work better, not because it's trendy. We were doing headless CMS before it had a name. Stay curious, stay sharp, stay shipping.",
	},
];

export default function CoreValues() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					Our Core Values
				</p>
				<h2 className="mt-6 text-balance">
					Four principles that guide every project.
				</h2>
				<p className="text-dp-body/80 mt-6 text-balance">
					These aren&apos;t a poster on the wall. They&apos;re how we decide
					what to ship, what to delete, and what to push back on.
				</p>
			</div>
			<ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				{values.map((v) => (
					<li
						key={v.title}
						className="border-dp-dark-green/30 bg-dp-dark-green/5 rounded-3xl border p-6 md:p-8"
					>
						<svg
							aria-hidden
							className="text-dp-dark-green h-7 w-7"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth={2}
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<circle cx="12" cy="12" r="10" />
							<path d="M12 6v6l4 2" />
						</svg>
						<h3 className="font-primary-font mt-5 text-lg font-bold md:text-xl">
							{v.title}
						</h3>
						<p className="text-dp-body/80 mt-3 text-sm md:text-base">
							{v.body}
						</p>
					</li>
				))}
			</ul>
		</section>
	);
}
