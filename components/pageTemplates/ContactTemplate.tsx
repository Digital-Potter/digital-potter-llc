import Link from 'next/link';
import QuoteForm from '@/components/pages/contact/QuoteForm';
import HowItGoes from '@/components/pages/contact/HowItGoes';
import ClosingCta from '@/components/shared/ClosingCta';
import { fetchStoreSettingsOrNull } from '@/helpers/cms/settings';
import { getSiteUrls } from '@/helpers/cms/urls';
import { JsonLd, webPageSchema } from '@/helpers/seo/structuredData';

export async function ContactTemplate() {
	const [urls, settings] = await Promise.all([
		getSiteUrls(),
		fetchStoreSettingsOrNull(),
	]);
	const tenant = settings?.tenant;
	const contactPoints = tenant
		? [
				...(tenant.settings.contactEmail
					? [
							{
								'@type': 'ContactPoint',
								contactType: 'customer support',
								email: tenant.settings.contactEmail,
								areaServed: 'Worldwide',
								availableLanguage: ['English'],
							},
						]
					: []),
				...(tenant.settings.contactPhone
					? [
							{
								'@type': 'ContactPoint',
								contactType: 'sales',
								telephone: tenant.settings.contactPhone,
								areaServed: 'Worldwide',
								availableLanguage: ['English'],
							},
						]
					: []),
			]
		: [];
	const contactSchema = tenant
		? webPageSchema({
				type: 'ContactPage',
				name: `Contact ${tenant.settings.storeName}`,
				description: 'Get in touch about your web or mobile app project.',
				url: '/contact-digital-potter',
				tenant,
				mainEntity:
					contactPoints.length > 0
						? {
								'@type': 'Organization',
								name: tenant.settings.storeName,
								contactPoint: contactPoints,
							}
						: undefined,
			})
		: null;

	return (
		<>
			<JsonLd data={contactSchema} />
			<section className="dp-container py-16 md:py-24">
				<div className="mx-auto max-w-4xl text-center">
					<h1 className="text-balance">
						Tell us what you&apos;re building. We&apos;ll send a real number.
					</h1>
					<p className="text-dp-body-soft mt-6 text-balance">
						Answer a few questions and you&apos;ll get a scoped quote — not a
						&ldquo;book a sales call to find out&rdquo; email — within one
						business day.
					</p>
				</div>

				<div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
					<div className="border-dp-green/50 rounded-2xl border-2 bg-white/50 p-6 text-center">
						<p className="font-primary-font text-dp-dark font-bold">
							Get a written quote
						</p>
						<p className="text-dp-body-soft mt-1 text-sm">
							Three short steps below — about 3 minutes.
						</p>
					</div>
					<Link
						href="/discovery-call"
						className="border-dp-dark/15 hover:border-dp-dark-green group rounded-2xl border-2 bg-white/30 p-6 text-center transition-colors"
					>
						<p className="font-primary-font text-dp-dark group-hover:text-dp-dark-green font-bold">
							Talk it through first →
						</p>
						<p className="text-dp-body-soft mt-1 text-sm">
							Free 45-minute discovery call. No pressure, no obligation.
						</p>
					</Link>
				</div>

				<div className="mx-auto mt-12 max-w-4xl">
					<QuoteForm portfolioHref={urls.portfolioIndex} />
				</div>
			</section>

			<HowItGoes />

			<ClosingCta
				heading="Prefer to start with a conversation?"
				body="Forty-five minutes with the engineer who'd build your project. You'll leave with a clear plan and an honest price — whether or not you hire us."
				secondaryHref={urls.portfolioIndex}
				secondaryLabel="See our work first"
			/>
		</>
	);
}
