import type { Metadata } from 'next';
import QuoteForm from '@/components/pages/contact/QuoteForm';
import HowItGoes from '@/components/pages/contact/HowItGoes';

export const metadata: Metadata = {
	title: "Let's Connect — Get a Custom Web & App Proposal",
	description:
		'Tell us about your business and the problem you’re solving. We’ll come back with a tailored proposal — no templates, no Frankenstein stack, just a plan built for you.',
};

export default function ContactDigitalPotter() {
	return (
		<>
			<section className="dp-container py-16 md:py-24">
				<div className="mx-auto max-w-3xl text-center">
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
					<QuoteForm />
				</div>
			</section>

			<HowItGoes />
		</>
	);
}
