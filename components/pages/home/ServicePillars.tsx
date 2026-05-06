type Pillar = {
	title: string;
	description: string;
};

const pillars: Pillar[] = [
	{
		title: 'Planning & UX Design',
		description:
			'Discovery, user research, and visual design systems that make every screen feel inevitable.',
	},
	{
		title: 'Mobile Apps Development',
		description:
			'Native iOS, Android, and cross-platform builds that ship to the stores and stay there.',
	},
	{
		title: 'All-Size Websites',
		description:
			'From a one-page brochure to a multi-region storefront — built bespoke, optimized for SEO and speed.',
	},
	{
		title: 'DevOps & Maintenance',
		description:
			'AWS infrastructure, monitoring, security patches, backups. We keep the lights on so you can sleep.',
	},
];

export default function ServicePillars() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-3xl text-center">
				<h2 className="text-balance">What we do</h2>
				<p className="text-dp-body/80 mt-6 text-balance">
					Four pillars. One promise: a digital product that fits your business
					like a glove and grows with it.
				</p>
			</div>
			<ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{pillars.map((p) => (
					<li
						key={p.title}
						className="border-dp-dark/10 hover:border-dp-green/40 rounded-2xl border bg-white/40 p-6 transition-colors"
					>
						<span
							aria-hidden
							className="bg-dp-green inline-block h-3 w-3 rounded-full"
						/>
						<h3 className="font-primary-font mt-4 text-lg font-bold md:text-xl">
							{p.title}
						</h3>
						<p className="text-dp-body/75 mt-3 text-sm md:text-base">
							{p.description}
						</p>
					</li>
				))}
			</ul>
		</section>
	);
}
