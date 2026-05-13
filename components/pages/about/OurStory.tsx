const facts = [
	{ stat: '20+', label: 'Years building custom web applications' },
	{ stat: 'VA', label: 'Based in Virginia, working with clients nationwide' },
	{ stat: '100%', label: 'In-house — design, dev, DevOps under one roof' },
	{ stat: '3+ yrs', label: 'Average client retention after launch' },
];

export default function OurStory() {
	return (
		<section id="our-story" className="dp-container py-16 md:py-24">
			<div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
				<div>
					<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
						Our Story
					</p>
					<h2 className="mt-6 text-balance">
						From Plitz Corporation to Digital Potter LLC.
					</h2>
					<div className="text-dp-body/85 mt-6 space-y-5 text-base md:text-lg">
						<p>
							Digital Potter LLC started as Plitz Corporation in New York more
							than 20 years ago. We&apos;ve been building custom web
							applications since before &ldquo;single-page app&rdquo; was a
							phrase, and one principle has held the whole time: every business
							has its own shape, and the digital tools they use should fit that
							shape — not bend the business around a template.
						</p>
						<p>
							We&apos;re now a small studio based in Virginia, working with
							clients across the country. We work directly with you — no account
							managers, no offshore handoffs, no surprise subcontractors. The
							team is intentionally small so the engineer who scopes your
							project is the engineer who ships it.
						</p>
						<p>
							Full-stack development, DevOps, and UI/UX design live under the
							same roof, which means decisions don&apos;t get lost between
							teams. When a tradeoff comes up between design intent and
							performance budget, we have it in one room.
						</p>
					</div>
				</div>

				<aside className="border-dp-green/40 self-start rounded-3xl border-2 bg-white/30 p-8 md:p-10">
					<p className="font-primary-font text-dp-dark text-xs font-bold tracking-widest uppercase">
						Quick facts
					</p>
					<ul className="mt-6 space-y-6">
						{facts.map((f) => (
							<li
								key={f.label}
								className="border-dp-dark/10 not-last:border-b not-last:pb-6"
							>
								<p className="font-primary-font text-dp-dark-green text-3xl font-bold md:text-4xl">
									{f.stat}
								</p>
								<p className="text-dp-body-soft mt-2 text-sm md:text-base">
									{f.label}
								</p>
							</li>
						))}
					</ul>
				</aside>
			</div>
		</section>
	);
}
