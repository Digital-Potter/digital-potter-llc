const phases = [
	{
		n: '01',
		title: 'Discovery & scoping',
		body: 'Same as the web process: a working session to understand your customers, your business model, and the problem the app actually solves. We end the week with a written scope, fixed timeline, and proposal you can plan around.',
	},
	{
		n: '02',
		title: 'Design & prototyping',
		body: 'Wireframes first, then high-fidelity Figma. We test taps, gestures, and edge cases on real devices before we write a line of production code. Mobile UX has its own rules — small screens, one hand, spotty connectivity — and we design for them.',
	},
	{
		n: '03',
		title: 'Build in two-week sprints',
		body: 'Working previews on TestFlight (iOS) and internal testing tracks (Android) every week from week three onward. You and your team click through real builds long before launch — feedback is concrete, not theoretical.',
	},
	{
		n: '04',
		title: 'Store submission & launch',
		body: "We handle App Store and Google Play submission, screenshots, descriptions, age ratings, and the back-and-forth of review. Most apps approve in 24–72 hours; we shepherd the process so you don't have to.",
	},
	{
		n: '05',
		title: 'OTA support after launch',
		body: 'Expo Updates lets us ship same-day fixes for most issues without a new App Store review. Bigger features go through the normal review cadence. Quarterly we review the analytics together and decide what ships next.',
	},
];

export default function MobileProcess() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					From concept to App Store
				</p>
				<h2 className="mt-6 text-balance">
					Five phases, one outcome: an app you&apos;ll be proud to put on your
					customers&apos; home screens.
				</h2>
			</div>

			<ol className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-5">
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
