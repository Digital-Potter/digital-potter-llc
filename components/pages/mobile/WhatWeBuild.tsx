type AppType = {
	title: string;
	body: string;
	examples: string;
};

const appTypes: AppType[] = [
	{
		title: 'Customer-facing apps',
		body: 'Loyalty programs, online ordering, booking-first apps, content libraries. The app your customers see when they put your brand on their home screen.',
		examples:
			'Examples: restaurant ordering, salon booking, fitness studio class signup',
	},
	{
		title: 'Internal & staff apps',
		body: 'Back-of-house tools that replace clipboards and shared Google Sheets. Built around how your team actually works, not how a SaaS vendor thinks they should.',
		examples:
			'Examples: dispatch boards, inventory check-in, retail kiosks, route planners',
	},
	{
		title: 'Events & on-site apps',
		body: 'Capacity check-in, badge scanning, event programs, real-time announcements. Designed for spotty conference Wi-Fi and one-handed phone use.',
		examples: 'Examples: festival check-in, conference apps, capacity counters',
	},
	{
		title: 'Subscription & member apps',
		body: 'Gated content libraries, member portals, recurring billing through Stripe, push notifications for new content drops. The companion to your membership website.',
		examples:
			'Examples: course apps, fitness libraries, exclusive community access',
	},
];

export default function WhatWeBuild() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					What we build
				</p>
				<h2 className="mt-6 text-balance">
					Apps that solve a specific business problem — not just a digital
					brochure.
				</h2>
				<p className="text-dp-body/80 mt-6 text-balance">
					Four categories cover most of what we&apos;ve shipped. Yours probably
					falls in one of them.
				</p>
			</div>

			<ul className="mt-14 grid gap-6 md:grid-cols-2">
				{appTypes.map((app) => (
					<li
						key={app.title}
						className="border-dp-dark/10 hover:border-dp-green/50 rounded-3xl border bg-white/50 p-8 transition-colors md:p-10"
					>
						<h3 className="text-xl md:text-2xl">{app.title}</h3>
						<p className="text-dp-body/80 mt-4 text-base md:text-lg">
							{app.body}
						</p>
						<p className="text-dp-body/60 mt-4 text-sm italic">
							{app.examples}
						</p>
					</li>
				))}
			</ul>
		</section>
	);
}
