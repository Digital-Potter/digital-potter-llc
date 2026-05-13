type StackGroup = {
	title: string;
	items: string[];
};

const stack: StackGroup[] = [
	{
		title: 'Frontend admin',
		items: [
			'Next.js 16 App Router',
			'React 19',
			'Tailwind CSS v4',
			'Tiptap rich-text editor',
			'TypeScript strict mode',
		],
	},
	{
		title: 'API',
		items: [
			'Express 5 + TypeScript',
			'Mongoose 9 / MongoDB',
			'JWT auth with role + tenant claims',
			'tenantGuard middleware on every admin route',
			'Slug-or-ObjectId tenant resolution',
		],
	},
	{
		title: 'Integrations',
		items: [
			'Stripe — checkout, subscriptions, webhooks',
			'Mailgun — transactional and notification email',
			'S3-compatible object storage for media',
			'Google Analytics + Search Console wiring',
			'Custom integrations on request',
		],
	},
	{
		title: 'Operations',
		items: [
			'Multi-tenant by ObjectId or slug',
			'Daily automated backups',
			'On-demand revalidation webhook',
			'Per-tenant rate limiting',
			'Audit log of every admin action',
		],
	},
];

export default function UnderTheHood() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					Under the hood
				</p>
				<h2 className="mt-6 text-balance">Boring choices on purpose.</h2>
				<p className="text-dp-body-soft mx-auto mt-6 max-w-2xl text-balance">
					Each tool earns its place by being the best long-term option for the
					problem — not the trendiest. Everything ships production-ready.
				</p>
			</div>

			<ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				{stack.map((group) => (
					<li
						key={group.title}
						className="border-dp-dark-green/30 bg-dp-dark-green/5 rounded-3xl border p-6 md:p-8"
					>
						<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
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
