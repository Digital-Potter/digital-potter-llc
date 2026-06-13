const goodFit = [
	'You need a serious online presence — not a hobby site or a placeholder.',
	'You value custom design, performance, and long-term ownership of the code.',
	'You want a real engineer on the project — not a project manager forwarding tickets.',
	'You expect the site or app to grow with the business, not be replaced next year.',
	'You’re willing to invest in a foundation that pays back over years.',
];

const notFit = [
	'You’re looking for a DIY template — Wix, Squarespace, and Shopify themes solve this well.',
	'Your hard budget cap is under $1,900 for the build.',
	'You want the cheapest option on the market and plan to switch agencies often.',
	'You expect to handle design, copy, and deployment yourself.',
	'You need it launched this week with no discovery and no scope.',
];

export default function WhoThisIsNotFor() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					Honest positioning
				</p>
				<h2 className="mt-6 text-balance">
					Who we’re a fit for — and who we’re not.
				</h2>
				<p className="text-dp-body-soft mt-6 text-balance">
					Clarity up front saves everyone time. If the right column describes
					your project, we’ll happily point you toward a better-suited option.
				</p>
			</div>

			<div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
				<article className="border-dp-green/40 rounded-3xl border-2 bg-white/40 p-8 md:p-10">
					<div className="flex items-center gap-3">
						<span className="bg-dp-green/20 text-dp-dark-green inline-flex h-10 w-10 items-center justify-center rounded-2xl">
							<svg
								aria-hidden
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path d="M16.704 5.296a1 1 0 0 1 0 1.408l-7.997 8a1 1 0 0 1-1.414 0l-3.997-4a1 1 0 1 1 1.414-1.408l3.29 3.293 7.29-7.293a1 1 0 0 1 1.414 0Z" />
							</svg>
						</span>
						<div>
							<p className="font-primary-font text-dp-dark-green text-xs font-bold tracking-widest uppercase">
								We’re a great fit if
							</p>
							<p className="font-primary-font text-dp-dark mt-1 text-xl font-bold">
								This sounds like your project
							</p>
						</div>
					</div>
					<ul className="mt-6 space-y-3">
						{goodFit.map((item) => (
							<li
								key={item}
								className="text-dp-body/85 flex items-start gap-3 text-base"
							>
								<svg
									aria-hidden
									className="fill-dp-green mt-1 h-4 w-4 shrink-0"
									viewBox="0 0 20 20"
								>
									<path d="M16.704 5.296a1 1 0 0 1 0 1.408l-7.997 8a1 1 0 0 1-1.414 0l-3.997-4a1 1 0 1 1 1.414-1.408l3.29 3.293 7.29-7.293a1 1 0 0 1 1.414 0Z" />
								</svg>
								<span>{item}</span>
							</li>
						))}
					</ul>
				</article>

				<article className="border-dp-dark/15 rounded-3xl border-2 bg-white/40 p-8 md:p-10">
					<div className="flex items-center gap-3">
						<span className="bg-dp-dark/10 text-dp-dark inline-flex h-10 w-10 items-center justify-center rounded-2xl">
							<svg
								aria-hidden
								className="h-5 w-5"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M5 12h14" />
							</svg>
						</span>
						<div>
							<p className="font-primary-font text-dp-dark text-xs font-bold tracking-widest uppercase">
								We’re probably not the right fit if
							</p>
							<p className="font-primary-font text-dp-dark mt-1 text-xl font-bold">
								This describes the brief
							</p>
						</div>
					</div>
					<ul className="mt-6 space-y-3">
						{notFit.map((item) => (
							<li
								key={item}
								className="text-dp-body-soft flex items-start gap-3 text-base"
							>
								<svg
									aria-hidden
									className="text-dp-dark/40 mt-1 h-4 w-4 shrink-0"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth={3}
									strokeLinecap="round"
								>
									<path d="M5 12h14" />
								</svg>
								<span>{item}</span>
							</li>
						))}
					</ul>
				</article>
			</div>

			<p className="text-dp-body-soft mx-auto mt-10 max-w-2xl text-center text-sm">
				Not sure where you land? Send us the brief anyway. If we’re not the
				right fit, we’ll tell you and point you somewhere that is.
			</p>
		</section>
	);
}
