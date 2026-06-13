const steps = [
	{
		title: 'Book a discovery call',
		body: 'Forty-five minutes. You talk, we listen, and you leave with a clear plan and an honest price — whether you hire us or not.',
	},
	{
		title: 'We craft your site by hand',
		body: 'Design and build from a blank canvas, shaped to your business. You review real working previews along the way, not static mockups.',
	},
	{
		title: 'Launch — and take the keys',
		body: 'Your site goes live on managed hosting. Your team runs the content in theDavid. And the code is yours, always.',
	},
];

export default function HowItWorks() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<h2 className="text-balance">From first call to launch.</h2>
				<p className="text-dp-body-soft mt-6 text-balance">
					No mystery process, no disappearing act. Three steps, and you know
					where you stand at each one.
				</p>
			</div>
			<ol className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
				{steps.map((step, i) => (
					<li
						key={step.title}
						className="border-dp-dark/10 relative rounded-3xl border bg-white/50 p-8 md:p-10"
					>
						<span
							aria-hidden
							className="bg-dp-green/15 text-dp-dark-green font-primary-font inline-flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold"
						>
							{i + 1}
						</span>
						<h3 className="mt-5 text-xl md:text-2xl">{step.title}</h3>
						<p className="text-dp-body-soft mt-3 text-base md:text-lg">
							{step.body}
						</p>
					</li>
				))}
			</ol>
		</section>
	);
}
