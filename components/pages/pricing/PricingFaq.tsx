import { PRICING_FAQS } from './pricingFaqs';

export default function PricingFaq() {
	return (
		<section className="dp-container py-16 md:py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="text-dp-dark-green font-primary-font text-xs font-bold tracking-widest uppercase">
					Frequently asked
				</p>
				<h2 className="mt-6 text-balance">
					The questions every business owner asks us.
				</h2>
				<p className="text-dp-body-soft mt-6 text-balance">
					If yours isn&apos;t here, ask in the contact form — we answer every
					inquiry within one business day.
				</p>
			</div>

			<ul className="mx-auto mt-14 max-w-3xl space-y-3">
				{PRICING_FAQS.map((faq) => (
					<li key={faq.question}>
						<details className="group border-dp-dark/10 hover:border-dp-green/40 rounded-2xl border bg-white/50 transition-colors">
							<summary className="font-primary-font text-dp-dark cursor-pointer list-none px-6 py-5 text-base font-bold md:text-lg">
								<span className="flex items-center justify-between gap-4">
									{faq.question}
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
								{faq.answer}
							</div>
						</details>
					</li>
				))}
			</ul>
		</section>
	);
}
