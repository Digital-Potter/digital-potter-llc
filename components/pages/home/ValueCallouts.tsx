const conversionPoints = [
	'Custom-tailored to your brand voice and audience',
	'In-house brand and content expertise included',
	'Designed to grow with you — content, traffic, features',
	'Accessible and SEO-ready by default',
];

const cmsPoints = [
	'Drag-and-drop content editing in your admin',
	'Instant preview before publishing',
	'No code, no deploys — your team owns the content',
];

export default function ValueCallouts() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
				<article className="border-dp-dark/10 rounded-3xl border bg-white/50 p-8 md:p-10">
					<h3 className="text-2xl md:text-3xl">
						Crafted experiences that convert visitors into customers.
					</h3>
					<p className="text-dp-body-soft mt-4 text-base md:text-lg">
						Pretty designs are easy. Designs that move people through your
						funnel are not. We build for both — beautiful work that pays for
						itself.
					</p>
					<ul className="mt-6 space-y-3">
						{conversionPoints.map((p) => (
							<li
								key={p}
								className="text-dp-body/85 flex items-start gap-3 text-base"
							>
								<span
									aria-hidden
									className="bg-dp-green mt-2 inline-block h-2 w-2 shrink-0 rounded-full"
								/>
								<span>{p}</span>
							</li>
						))}
					</ul>
				</article>
				<article className="border-dp-dark-green/30 bg-dp-dark-green/5 rounded-3xl border p-8 md:p-10">
					<h3 className="text-2xl md:text-3xl">
						Update your site in seconds — without breaking anything.
					</h3>
					<p className="text-dp-body-soft mt-4 text-base md:text-lg">
						Every Digital Potter site is powered by our own CMS, so your team
						edits content like it&apos;s a Google Doc — and ships it without
						waiting on engineers.
					</p>
					<ul className="mt-6 space-y-3">
						{cmsPoints.map((p) => (
							<li
								key={p}
								className="text-dp-body/85 flex items-start gap-3 text-base"
							>
								<span
									aria-hidden
									className="bg-dp-dark-green mt-2 inline-block h-2 w-2 shrink-0 rounded-full"
								/>
								<span>{p}</span>
							</li>
						))}
					</ul>
				</article>
			</div>
		</section>
	);
}
