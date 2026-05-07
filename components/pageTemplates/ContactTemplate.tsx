import QuoteForm from '@/components/pages/contact/QuoteForm';
import HowItGoes from '@/components/pages/contact/HowItGoes';
import { getSiteUrls } from '@/helpers/cms/urls';

export async function ContactTemplate() {
	const urls = await getSiteUrls();
	return (
		<>
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
