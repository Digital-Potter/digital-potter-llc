type Reason = {
	tag: string;
	title: string;
	body: string;
	bullets: string[];
};

const reasons: Reason[] = [
	{
		tag: 'Next.js',
		title: 'A framework built around how the web actually works.',
		body: "Next.js gives us server rendering for SEO, edge caching for speed, and a component model that scales from a single landing page to a 10,000-page commerce site. It's the same framework Nike, Notion, and TikTok use — and the one search engines and AI crawlers prefer because content is in the HTML, not lazy-loaded after the fact.",
		bullets: [
			'Server-rendered HTML that ranks — no client-side waiting on JavaScript',
			'Per-route caching tuned to how often each page changes',
			'Image optimization and lazy loading built in (Core Web Vitals friendly)',
			'TypeScript end-to-end so the codebase you inherit stays maintainable',
		],
	},
	{
		tag: 'Custom-coded',
		title: 'Hand-built, not pulled from a template marketplace.',
		body: 'Templates and visual builders look great in a demo and break in production. We design and code every layout for your specific content, your specific funnel, your specific brand. The result is a site that holds up under search, scales when you add languages or regions, and is yours forever — no monthly platform tax to keep using your own design.',
		bullets: [
			'No theme constraints — every layout designed for your content',
			'Accessibility (WCAG 2.1 AA) baked into every component',
			'Performance budget enforced — every page under 2-second load time',
			'Code you own, can audit, and can fork the day you want a different agency',
		],
	},
];

export default function WhyCustomNextjs() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					Our web stack
				</p>
				<h2 className="mt-6 text-balance">
					Why we build with Next.js — and why we don&apos;t use templates.
				</h2>
				<p className="text-dp-body-soft mt-6 text-balance">
					Two principles that shape every site we ship. Here&apos;s what each
					one solves.
				</p>
			</div>

			<ul className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
				{reasons.map((r) => (
					<li
						key={r.tag}
						className="border-dp-green/40 rounded-3xl border-2 bg-white/40 p-8 md:p-10"
					>
						<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
							{r.tag}
						</p>
						<h3 className="mt-4 text-xl md:text-2xl">{r.title}</h3>
						<p className="text-dp-body-soft mt-4 text-base md:text-lg">
							{r.body}
						</p>
						<ul className="mt-6 space-y-3">
							{r.bullets.map((b) => (
								<li
									key={b}
									className="text-dp-body/85 flex items-start gap-3 text-sm md:text-base"
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
