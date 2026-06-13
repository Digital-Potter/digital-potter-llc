export default function MeetTheFounder() {
	return (
		<section className="dp-container py-12 md:py-16">
			<div className="border-dp-dark-green/20 bg-dp-dark-green/5 mx-auto flex max-w-4xl flex-col items-center gap-7 rounded-3xl border px-8 py-10 sm:flex-row md:px-12">
				<span
					aria-hidden
					className="bg-dp-dark-green font-primary-font flex h-24 w-24 shrink-0 items-center justify-center rounded-full text-4xl font-bold text-white"
				>
					N
				</span>
				<div className="text-center sm:text-left">
					<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
						Meet the founder
					</p>
					<h2 className="mt-2 text-2xl md:text-3xl">
						Norman Pleitez — the potter behind Digital Potter.
					</h2>
					<p className="text-dp-body-soft mt-4 text-base md:text-lg">
						The potter metaphor isn&apos;t branding fluff. A potter shapes each
						piece by hand for the person who&apos;ll use it — and that&apos;s
						how this studio works: the engineer who scopes your project on the
						first call is the engineer who designs it, builds it, and answers
						the phone after launch.
					</p>
				</div>
			</div>
		</section>
	);
}
