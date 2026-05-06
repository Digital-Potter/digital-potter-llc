type Reason = {
	title: string;
	body: string;
};

const reasons: Reason[] = [
	{
		title: 'Unique brand identity',
		body: "Your design is yours alone. We don't pull patterns from a template marketplace — we map your brand, your audience, and your competitors and build a visual system you can grow into.",
	},
	{
		title: 'Perfect fit, every time',
		body: "Every feature is built for your business, not retrofitted from a generic plugin. Need a Bluetooth-enabled retail kiosk? That's what we build — not 'the closest WordPress plugin we could find.'",
	},
	{
		title: 'Foundation that scales',
		body: 'Custom Next.js + a managed headless CMS scales from your first ten customers to your first million. No platform migration when you outgrow the starter tier — same code, bigger infrastructure.',
	},
	{
		title: 'Ongoing partnership',
		body: "We don't disappear after launch. Most clients stay with us for years — content updates, performance reviews, security patches, the occasional new feature. The relationship is built into the model.",
	},
];

export default function WhyChooseCustom() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					Why Choose Custom
				</p>
				<h2 className="mt-6 text-balance">
					Templates are cheaper. Custom is cheaper to live with.
				</h2>
				<p className="text-dp-body/80 mt-6 text-balance">
					Four reasons our clients choose a custom build — and stay with it.
				</p>
			</div>
			<ul className="mt-14 grid gap-6 md:grid-cols-2">
				{reasons.map((r, i) => (
					<li
						key={r.title}
						className="border-dp-dark/10 hover:border-dp-green/50 rounded-3xl border bg-white/50 p-8 transition-colors md:p-10"
					>
						<span className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
							{`0${i + 1}`}
						</span>
						<h3 className="mt-4 text-xl md:text-2xl">{r.title}</h3>
						<p className="text-dp-body/80 mt-4 text-base md:text-lg">
							{r.body}
						</p>
					</li>
				))}
			</ul>
		</section>
	);
}
