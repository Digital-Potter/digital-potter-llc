import { HOSTING_MONTHLY, MOBILE_APP_ONETIME } from '@/lib/pricing';

const callouts = [
	{
		tag: '01 — Investment',
		title: `Starting at $${MOBILE_APP_ONETIME.toLocaleString()}`,
		body: "We don't build no-code-builder apps. Our starting point reflects what a real production app costs: native-quality UX, Stripe-powered payments, push notifications, store submission, the works. The actual scope and price land in your proposal after discovery.",
	},
	{
		tag: '02 — Ownership',
		title: 'Your App Store and Google Play accounts',
		body: 'You open and own the developer accounts (Apple charges $99/year, Google $25 once). The app publishes under your business name, not ours. We shepherd the setup during onboarding so you never deal with provisioning profiles or signing certificates.',
	},
	{
		tag: '03 — Backend',
		title: `Your $${HOSTING_MONTHLY}/mo plan also powers the app`,
		body: "Mobile apps need a backend, and ours uses the same multi-tenant theDavid CMS that powers your website. The same monthly fee covers both. If your app drives unusually heavy API traffic we'll surface a dedicated tier in the proposal — never as a surprise.",
	},
];

export default function MobilePricingCallouts() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					What it costs and who owns what
				</p>
				<h2 className="mt-6 text-balance">
					The three numbers and the three accounts that matter.
				</h2>
				<p className="text-dp-body-soft mt-6 text-balance">
					Honest answers to the questions every founder asks before they commit
					to a mobile app project.
				</p>
			</div>

			<ul className="mt-14 grid gap-6 md:grid-cols-3">
				{callouts.map((c) => (
					<li
						key={c.tag}
						className="border-dp-green/40 rounded-3xl border-2 bg-white/40 p-8 md:p-10"
					>
						<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
							{c.tag}
						</p>
						<h3 className="font-primary-font text-dp-dark mt-4 text-xl font-bold md:text-2xl">
							{c.title}
						</h3>
						<p className="text-dp-body-soft mt-4 text-base">{c.body}</p>
					</li>
				))}
			</ul>
		</section>
	);
}
