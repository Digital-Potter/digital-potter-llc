import type { Metadata } from 'next';
import { ContactTemplate } from '@/components/pageTemplates/ContactTemplate';
import { buildPageMetadata } from '@/helpers/cms/pageMetadata';

const FALLBACK = {
	title: "Let's Connect — Get a Custom Web & App Proposal",
	description:
		'Tell us about your business and the problem you’re solving. We’ll come back with a tailored proposal — no templates, no Frankenstein stack, just a plan built for you.',
};

export function generateMetadata(): Promise<Metadata> {
	return buildPageMetadata({
		slug: 'contact-digital-potter',
		fallback: FALLBACK,
	});
}

export default function ContactDigitalPotter() {
	return <ContactTemplate />;
}
