const phases = [
	{
		n: '01',
		title: 'Discovery & scoping',
		body: 'A working week to understand your customers, your funnel, and the problem the site actually solves. We end the week with a written scope, fixed timeline, and proposal you can plan around — no estimates that drift over time.',
	},
	{
		n: '02',
		title: 'Design & prototyping',
		body: 'Wireframes first, then high-fidelity Figma. We design every page for your specific content and conversion goals, not a template. You see and approve the design before we write a line of production code.',
	},
	{
		n: '03',
		title: 'Build in two-week sprints',
		body: 'Working previews on a real URL every week from sprint one. You and your team click through real builds long before launch — feedback is concrete, not theoretical. Editor training on the CMS happens during sprint three or four.',
	},
	{
		n: '04',
		title: 'Performance & SEO pass',
		body: 'Before launch, we run an end-to-end audit: Core Web Vitals, accessibility, schema markup, sitemaps, OG tags, redirects, analytics. Every site ships green on Lighthouse and ready for search engines and AI crawlers.',
	},
	{
		n: '05',
		title: 'Launch & ongoing care',
		body: 'DNS cutover, monitoring, and a soft-launch period to watch how the site behaves under real traffic. From there, your $50/mo plan keeps the site fast, patched, and content-ready — and we&apos;re available for new work as the business grows.',
	},
];

export default function WebProcess() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					From kickoff to launch
				</p>
				<h2 className="mt-6 text-balance">
					Five phases, one outcome: a site that does its job from the first
					visitor.
				</h2>
			</div>

			<ol className="mx-auto mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
				{phases.map((p) => (
					<li
						key={p.n}
						className="border-dp-dark/10 rounded-3xl border bg-white/50 p-6 md:p-8"
					>
						<span className="bg-dp-dark-green text-dp-green font-primary-font inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold">
							{p.n}
						</span>
						<h3 className="font-primary-font mt-4 text-base font-bold md:text-lg">
							{p.title}
						</h3>
						<p className="text-dp-body/80 mt-3 text-sm">{p.body}</p>
					</li>
				))}
			</ol>
		</section>
	);
}
