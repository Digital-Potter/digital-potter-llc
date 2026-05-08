import QuoteForm from '@/components/pages/contact/QuoteForm';
import HowItGoes from '@/components/pages/contact/HowItGoes';
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
				url: '/contact',
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
						Contact Digital Potter and let&apos;s create together.
					</h1>
					<p className="text-dp-body/80 mt-6 text-balance">
						We&apos;d love to hear about your project and discuss how we can
						craft the perfect solution for your business. Tell us a few things
						below and we&apos;ll get back within one business day.
					</p>
				</div>

				<div className="mx-auto mt-12 max-w-4xl">
					<QuoteForm portfolioHref={urls.portfolioIndex} />
				</div>
			</section>

			<HowItGoes />
		</>
	);
}
