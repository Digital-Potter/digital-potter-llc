const failures = [
	{
		title: 'The certificate expires',
		body: 'An expired SSL turns your site into a browser security warning overnight. Customers don’t read the fine print — they leave.',
	},
	{
		title: 'A dependency gets exploited',
		body: 'Unpatched libraries are how small-business sites get hijacked. The fix is a routine update — if someone is doing them.',
	},
	{
		title: 'Google quietly demotes you',
		body: 'Slow pages and broken links don’t throw errors. They just cost you rankings, month after month, while nobody notices.',
	},
	{
		title: 'The form stops sending',
		body: 'A provider changes an API and your contact form dies silently. Three weeks of leads, gone — and you find out from a frustrated customer.',
	},
];

export default function WithoutMaintenance() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<h2 className="text-balance">
					Websites don&apos;t break loudly. They break quietly.
				</h2>
				<p className="text-dp-body-soft mt-6 text-balance">
					Nothing on this list announces itself. Every one of them costs you
					customers while everything still looks fine.
				</p>
			</div>
			<ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{failures.map((f) => (
					<li
						key={f.title}
						className="border-dp-dark/10 rounded-3xl border bg-white/50 p-6 md:p-8"
					>
						<span
							aria-hidden
							className="bg-dp-green/15 text-dp-dark-green inline-flex h-10 w-10 items-center justify-center rounded-full"
						>
							<svg
								viewBox="0 0 24 24"
								className="h-5 w-5"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
								<line x1="12" y1="9" x2="12" y2="13" />
								<line x1="12" y1="17" x2="12.01" y2="17" />
							</svg>
						</span>
						<h3 className="font-primary-font mt-4 text-lg leading-snug font-bold">
							{f.title}
						</h3>
						<p className="text-dp-body-soft mt-2 text-sm md:text-base">
							{f.body}
						</p>
					</li>
				))}
			</ul>
		</section>
	);
}
