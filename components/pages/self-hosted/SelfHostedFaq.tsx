type Faq = {
	q: string;
	a: string;
};

const faqs: Faq[] = [
	{
		q: 'How much does self-hosted cost?',
		a: 'License + setup is custom-quoted because every environment is different (cloud provider, compliance scope, integration depth). Generally appropriate above an initial investment of $25,000–$50,000. The recurring maintenance contract is its own line item, sized to the platform you run. Real numbers come back in your proposal.',
	},
	{
		q: 'Can theDavid run on-premises (no public cloud)?',
		a: "Yes. We've shipped it into bare-metal data centers, into private VMware clusters, and into air-gapped environments. The deployment story changes (no managed RDS, no S3) but the application runs the same.",
	},
	{
		q: 'Do I get the source code?',
		a: 'Yes. You run it inside your perimeter — the source has to live there. The license restricts redistribution outside your organization, not internal use.',
	},
	{
		q: 'Can my team modify the code?',
		a: 'Yes for internal use. Fork it, customize it, add features. Just keep the modifications inside your organization per the license.',
	},
	{
		q: 'What if we stop the maintenance contract later?',
		a: 'You keep the version of the platform you had on the last day of the contract. Your platform keeps running — there is no kill switch. You just stop receiving future updates and security patches. You can resume the contract any time.',
	},
	{
		q: 'What if Digital Potter ever stops supporting theDavid?',
		a: "Source code is yours, perpetually licensed. The license is structured so the platform outlives the company — worst case, you fork it permanently. We've structured it this way deliberately so you're never held hostage by our existence.",
	},
	{
		q: 'How do version upgrades work?',
		a: 'Every theDavid release applies to your fork while your maintenance contract is active. We handle the upgrade in your staging environment, run regression tests, and coordinate the production rollout with your team. Quarterly cadence is typical, but security patches ship immediately.',
	},
	{
		q: 'What integrations does theDavid support?',
		a: 'Out of the box: Stripe, Mailgun (or any SMTP), S3-compatible object storage, MongoDB. Custom integrations (your auth provider, your data warehouse, your CRM, your payment processor beyond Stripe) are quoted as part of the engagement scope.',
	},
];

export default function SelfHostedFaq() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					Common questions
				</p>
				<h2 className="mt-6 text-balance">
					Eight questions every platform team asks.
				</h2>
				<p className="text-dp-body-soft mt-6 text-balance">
					If yours isn&apos;t here, ask in the contact form — we answer every
					inquiry within one business day.
				</p>
			</div>

			<ul className="mx-auto mt-14 max-w-3xl space-y-3">
				{faqs.map((faq) => (
					<li key={faq.q}>
						<details className="group border-dp-dark/10 hover:border-dp-green/40 rounded-2xl border bg-white/50 transition-colors">
							<summary className="font-primary-font text-dp-dark cursor-pointer list-none px-6 py-5 text-base font-bold md:text-lg">
								<span className="flex items-center justify-between gap-4">
									{faq.q}
									<span
										aria-hidden
										className="text-dp-dark-green transition-transform group-open:rotate-45"
									>
										<svg
											className="h-5 w-5"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth={2}
											strokeLinecap="round"
										>
											<path d="M12 5v14M5 12h14" />
										</svg>
									</span>
								</span>
							</summary>
							<div className="text-dp-body/85 px-6 pb-6 text-base leading-relaxed">
								{faq.a}
							</div>
						</details>
					</li>
				))}
			</ul>
		</section>
	);
}
