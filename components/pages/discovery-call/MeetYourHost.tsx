export default function MeetYourHost() {
	return (
		<section className="mx-auto mt-12 max-w-3xl">
			<div className="border-dp-dark-green/20 bg-dp-dark-green/5 flex flex-col items-center gap-5 rounded-3xl border px-8 py-8 text-center sm:flex-row sm:text-left">
				<span
					aria-hidden
					className="bg-dp-dark-green font-primary-font flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-2xl font-bold text-white"
				>
					N
				</span>
				<div>
					<h2 className="font-primary-font text-lg font-bold md:text-xl">
						You&apos;ll talk to Norman — the engineer who&apos;d build your
						project.
					</h2>
					<p className="text-dp-body-soft mt-2 text-sm md:text-base">
						No sales reps, no handoffs. The person who scopes your project on
						this call is the same person who designs it, codes it, and answers
						the phone after launch.
					</p>
				</div>
			</div>
		</section>
	);
}
