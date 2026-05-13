type StackGroup = {
	title: string;
	items: string[];
};

const stack: StackGroup[] = [
	{
		title: 'Core',
		items: [
			'Next.js (App Router, latest stable)',
			'React 19 + TypeScript end-to-end',
			'Tailwind CSS for design tokens and layout',
			'Server Components and edge rendering where it pays off',
		],
	},
	{
		title: 'Content & data',
		items: [
			'theDavid CMS — headless, multi-tenant, your team owns content',
			'MongoDB for content storage with daily backups',
			'On-demand revalidation: edits go live in seconds',
			'Image pipeline with automatic AVIF/WebP and responsive sizes',
		],
	},
	{
		title: 'Payments & integrations',
		items: [
			'Stripe (your account) for ecommerce and subscriptions',
			'Email via Resend or your existing SMTP provider',
			'Analytics — GA4, PostHog, or Plausible — wired on every event',
			'Search via Algolia or built-in full-text when scale fits',
		],
	},
	{
		title: 'Hosting & ops',
		items: [
			'Vercel or AWS — pick the one your team already knows',
			'Preview URLs on every pull request for content review',
			'CI checks: TypeScript, lint, tests, and a11y on every commit',
			'Sentry for error tracking, uptime monitoring on the public site',
		],
	},
];

export default function WebTechStack() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					Under the hood
				</p>
				<h2 className="mt-6 text-balance">The stack we ship every site on.</h2>
				<p className="text-dp-body-soft mt-6 text-balance">
					Boring choices on purpose. Each tool earns its place by being the best
					long-term option for the problem — not the trendiest.
				</p>
			</div>

			<ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				{stack.map((group) => (
					<li
						key={group.title}
						className="border-dp-dark-green/30 bg-dp-dark-green/5 rounded-3xl border p-6 md:p-8"
					>
						<p className="font-primary-font text-dp-dark-green text-xs font-bold tracking-widest uppercase">
							{group.title}
						</p>
						<ul className="mt-5 space-y-3">
							{group.items.map((it) => (
								<li
									key={it}
									className="text-dp-body/85 flex items-start gap-2 text-sm"
								>
									<span
										aria-hidden
										className="bg-dp-green mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
									/>
									<span>{it}</span>
								</li>
							))}
						</ul>
					</li>
				))}
			</ul>
		</section>
	);
}
