import { HOSTING_MONTHLY } from '@/lib/pricing';

const platformBasics = [
	'Managed hosting and uptime monitoring',
	'Daily backups and disaster recovery',
	'SSL, CDN, security patches at the platform layer',
	'Content management for unlimited pages',
	'Email support for platform issues',
];

const retainerWork = [
	'Code changes — design tweaks, copy edits, new sections',
	'New features and integrations',
	'Performance audits and optimization',
	'Accessibility (WCAG) reviews and fixes',
	'SEO improvements and schema work',
	'Troubleshooting and bug fixes',
	'Training your team on new CMS workflows',
	'Quarterly check-in and review (Studio Plan and above)',
];

export default function WhatRetainerIncludes() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					What&apos;s in scope
				</p>
				<h2 className="mt-6 text-balance">
					Two layers, two scopes — no overlap.
				</h2>
				<p className="text-dp-body-soft mt-6 text-balance">
					Your ${HOSTING_MONTHLY}/mo Hosting + CMS plan covers platform-level
					basics. The retainer is for active development work on your specific
					site.
				</p>
			</div>

			<div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
				<article className="border-dp-dark-green/30 bg-dp-dark-green/5 rounded-3xl border p-8 md:p-10">
					<p className="font-primary-font text-dp-dark-green text-xs font-bold tracking-widest uppercase">
						In your ${HOSTING_MONTHLY}/mo plan
					</p>
					<h3 className="mt-3 text-xl md:text-2xl">Platform basics</h3>
					<p className="text-dp-body-soft mt-3 text-sm">
						Always running, no time billed.
					</p>
					<ul className="mt-6 space-y-3">
						{platformBasics.map((b) => (
							<li
								key={b}
								className="text-dp-body/85 flex items-start gap-3 text-sm md:text-base"
							>
								<svg
									aria-hidden
									className="fill-dp-dark-green mt-1 h-4 w-4 shrink-0"
									viewBox="0 0 20 20"
								>
									<path d="M16.704 5.296a1 1 0 0 1 0 1.408l-7.997 8a1 1 0 0 1-1.414 0l-3.997-4a1 1 0 1 1 1.414-1.408l3.29 3.293 7.29-7.293a1 1 0 0 1 1.414 0Z" />
								</svg>
								<span>{b}</span>
							</li>
						))}
					</ul>
				</article>

				<article className="border-dp-green/40 rounded-3xl border-2 bg-white/40 p-8 md:p-10">
					<p className="font-primary-font text-dp-green text-xs font-bold tracking-widest uppercase">
						In your retainer
					</p>
					<h3 className="mt-3 text-xl md:text-2xl">Active development work</h3>
					<p className="text-dp-body-soft mt-3 text-sm">
						Time billed against your monthly hours bucket.
					</p>
					<ul className="mt-6 space-y-3">
						{retainerWork.map((b) => (
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
				</article>
			</div>
		</section>
	);
}
