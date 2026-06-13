const faqs = [
	{
		question: 'Do I really own the code?',
		answer:
			'Yes. The frontend we build is yours — take it with you, host it anywhere, or hand it to another team. We build websites; we don’t trap you in them.',
	},
	{
		question: 'Can my team update the site without a developer?',
		answer:
			'That’s the whole point of theDavid. Your team edits pages, publishes posts, updates menus, and manages orders from one dashboard — changes go live in seconds, with no code and no deploys.',
	},
	{
		question: 'How long does a custom site take?',
		answer:
			'It depends on scope, and we won’t pretend otherwise. A marketing site moves quickly; bookings, ordering, or e-commerce add time. Every proposal includes a concrete timeline before you commit a dollar.',
	},
	{
		question: 'What does the monthly fee cover?',
		answer:
			'Managed hosting, theDavid CMS, security updates, and support. No per-page fees, no traffic gates, no surprise invoices.',
	},
	{
		question: 'We need bookings, online ordering, or a store. Can you do that?',
		answer:
			'Yes — they’re built into theDavid as modules. Bookings and events, e-commerce with Stripe checkout, restaurant menus and specials, courses, and subscriptions. We switch on what you need and leave out what you don’t.',
	},
	{
		question: 'I already have a website. Can you migrate it?',
		answer:
			'We migrate your existing content as part of the build — pages, posts, and images. We’ve even imported full Shopify stores: products, customers, orders, and blog history.',
	},
];

export default function HomeFaq() {
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((faq) => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: { '@type': 'Answer', text: faq.answer },
		})),
	};

	return (
		<section className="dp-container py-16 md:py-24">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
			/>
			<div className="mx-auto max-w-4xl text-center">
				<h2 className="text-balance">Questions we hear on every call.</h2>
			</div>
			<div className="mx-auto mt-12 max-w-3xl space-y-4">
				{faqs.map((faq) => (
					<details
						key={faq.question}
						className="group border-dp-dark/10 open:border-dp-green/50 rounded-2xl border bg-white/50 transition-colors"
					>
						<summary className="font-primary-font flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-base font-bold md:text-lg [&::-webkit-details-marker]:hidden">
							{faq.question}
							<svg
								aria-hidden
								viewBox="0 0 20 20"
								className="fill-dp-dark-green h-5 w-5 shrink-0 transition-transform group-open:rotate-45"
							>
								<path d="M10 3a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H4a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1Z" />
							</svg>
						</summary>
						<p className="text-dp-body-soft px-6 pb-6 text-base md:text-lg">
							{faq.answer}
						</p>
					</details>
				))}
			</div>
		</section>
	);
}
