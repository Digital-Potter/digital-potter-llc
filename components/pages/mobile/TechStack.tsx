type StackGroup = {
	title: string;
	items: string[];
};

const stack: StackGroup[] = [
	{
		title: 'Core',
		items: [
			'React Native (latest stable)',
			'Expo SDK (latest)',
			'TypeScript end-to-end',
			'Expo Router (file-based navigation)',
		],
	},
	{
		title: 'Data & state',
		items: [
			'TanStack Query for server state',
			'Zustand or Jotai for client state',
			'React Hook Form + Zod for forms and validation',
			'Optimistic updates for offline tolerance',
		],
	},
	{
		title: 'Payments & auth',
		items: [
			'Stripe (your account) for payments and subscriptions',
			'Apple Pay and Google Pay support out of the box',
			'Biometric auth (Face ID / Touch ID / fingerprint)',
			'OAuth and magic-link sign-in patterns',
		],
	},
	{
		title: 'Distribution & ops',
		items: [
			'EAS Build for signed binaries in the cloud',
			'EAS Submit for App Store and Play Store automation',
			'OTA updates via Expo Updates — same-day fixes',
			'Sentry for crash reporting, PostHog for analytics',
		],
	},
];

export default function TechStack() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					Under the hood
				</p>
				<h2 className="mt-6 text-balance">The stack we ship every app on.</h2>
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
