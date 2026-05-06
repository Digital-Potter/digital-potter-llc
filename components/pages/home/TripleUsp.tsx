type UspCard = {
	headline: string;
	body: string;
};

const cards: UspCard[] = [
	{
		headline: 'Your design, not a template.',
		body: 'Every Digital Potter site starts from a blank canvas, sized to your story and shaped to your audience. No theme tweaks, no Bootstrap drag-and-drop. The design fits because it was made for you.',
	},
	{
		headline: 'Your team controls the content.',
		body: 'Once we ship, your team writes the words. Our managed CMS lets non-technical staff edit pages, post articles, and update copy in seconds — no engineer in the loop, no deployment to wait on.',
	},
	{
		headline: 'You own the code.',
		body: "When you sign with Digital Potter, the frontend is yours. Take it with you, host it elsewhere, hire another agency to extend it. We build websites — we don't trap you in them.",
	},
];

export default function TripleUsp() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-3xl text-center">
				<h2 className="text-balance">
					Three things every Digital Potter site gives you.
				</h2>
				<p className="text-dp-body/80 mt-6 text-balance">
					Most agencies pick one. We deliver all three on every project — and
					it&apos;s why our clients stay.
				</p>
			</div>
			<ul className="mt-14 grid gap-6 md:grid-cols-3">
				{cards.map((card, i) => (
					<li
						key={card.headline}
						className="border-dp-dark/10 hover:border-dp-green/50 rounded-3xl border bg-white/50 p-8 transition-colors md:p-10"
					>
						<span className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
							{`0${i + 1}`}
						</span>
						<h3 className="mt-4 text-xl md:text-2xl">{card.headline}</h3>
						<p className="text-dp-body/80 mt-4 text-base md:text-lg">
							{card.body}
						</p>
					</li>
				))}
			</ul>
		</section>
	);
}
