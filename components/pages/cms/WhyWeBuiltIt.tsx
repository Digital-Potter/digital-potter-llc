const principles = [
	{
		title: 'Editorial control',
		body: "Your marketing or content team writes and ships without a developer in the loop. The editor is a familiar WYSIWYG, the section composer is opinionated, and there's no way to break the design.",
	},
	{
		title: 'Headless flexibility',
		body: 'Your frontend is custom Next.js. theDavid is just an API. We never trap you in a theme system or a no-code builder — your site can do anything Next.js can do.',
	},
	{
		title: 'You own the code',
		body: "End the engagement and the frontend goes with you. theDavid is licensed; your custom frontend is yours. We've built this on purpose so the platform outlives the relationship.",
	},
];

export default function WhyWeBuiltIt() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					Why we built it
				</p>
				<h2 className="mt-6 text-balance">
					Built for the way teams actually work.
				</h2>
				<p className="text-dp-body-soft mx-auto mt-6 max-w-2xl text-balance">
					We&apos;ve shipped sites on WordPress, Webflow, and Squarespace. Each
					one got us 80% of the way there and bled us on the last 20%. So we
					built our own — and it&apos;s what powers every site we ship.
				</p>
			</div>

			<ul className="mt-14 grid gap-6 md:grid-cols-3">
				{principles.map((p, i) => (
					<li
						key={p.title}
						className="border-dp-dark/10 hover:border-dp-green/40 rounded-3xl border bg-white/50 p-8 transition-colors md:p-10"
					>
						<span className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
							{`0${i + 1}`}
						</span>
						<h3 className="mt-4 text-xl md:text-2xl">{p.title}</h3>
						<p className="text-dp-body-soft mt-4 text-base md:text-lg">
							{p.body}
						</p>
					</li>
				))}
			</ul>
		</section>
	);
}
