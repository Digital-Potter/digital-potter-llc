type Reason = {
	tag: string;
	title: string;
	body: string;
	bullets: string[];
};

const reasons: Reason[] = [
	{
		tag: 'React Native',
		title: 'One team. One codebase. Both stores.',
		body: "React Native lets us write the app once and ship to both Apple's App Store and Google Play. Native performance where it matters — animations, list scrolling, camera, location, gestures — and shared business logic where it doesn't (auth, payments, sync, analytics). The math is simple: half the engineering hours, full coverage.",
		bullets: [
			'Native iOS and Android UI rendered with platform components',
			'Hot reload for fast iteration during development',
			'Direct access to native modules when you need device hardware',
			'Backed by Meta, used by Shopify, Discord, Coinbase, Microsoft Office',
		],
	},
	{
		tag: 'Expo',
		title: 'Production-ready tooling around React Native.',
		body: "Expo is the standard library and tooling layer that makes React Native production-ready. Over-the-air updates that don't require an App Store review. Built-in primitives for camera, audio, push notifications, secure storage, and biometrics. EAS Build for cloud-based binary signing. The whole pipeline from a code change to TestFlight is hours, not days.",
		bullets: [
			'Over-the-air updates ship same-day, no store review needed for most fixes',
			'EAS Build & Submit — cloud signing and store submission automation',
			'Expo Router for file-based navigation (same model as Next.js)',
			'Production-grade modules: Camera, Notifications, Updates, Secure Store',
		],
	},
];

export default function WhyReactNativeExpo() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					Our mobile stack
				</p>
				<h2 className="mt-6 text-balance">
					Why we build with React Native + Expo.
				</h2>
				<p className="text-dp-body/80 mt-6 text-balance">
					Two layers of tooling that, together, give you native quality at a
					small-team budget. Here&apos;s what each one solves.
				</p>
			</div>

			<ul className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
				{reasons.map((r) => (
					<li
						key={r.tag}
						className="border-dp-green/40 rounded-3xl border-2 bg-white/40 p-8 md:p-10"
					>
						<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
							{r.tag}
						</p>
						<h3 className="mt-4 text-xl md:text-2xl">{r.title}</h3>
						<p className="text-dp-body/80 mt-4 text-base md:text-lg">
							{r.body}
						</p>
						<ul className="mt-6 space-y-3">
							{r.bullets.map((b) => (
								<li
									key={b}
									className="text-dp-body/85 flex items-start gap-3 text-sm md:text-base"
								>
									<svg
										aria-hidden
										className="fill-dp-green mt-1 h-4 w-4 shrink-0"
										viewBox="0 0 20 20"
									>
										<path d="M16.704 5.296a1 1 0 0 1 0 1.408l-7.997 8a1 1 0 0 1-1.414 0l-3.997-4a1 1 0 1 1 1.414-1.408l3.29 3.293 7.29-7.293a1 1 0 0 1 1.414 0Z" />
									</svg>
									<span>{b}</span>
								</li>
							))}
						</ul>
					</li>
				))}
			</ul>
		</section>
	);
}
