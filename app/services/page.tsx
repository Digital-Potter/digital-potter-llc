import type { Metadata } from 'next';
import { ServicesTemplate } from '@/components/pageTemplates/ServicesTemplate';
import { buildPageMetadata } from '@/helpers/cms/pageMetadata';

const FALLBACK = {
	title: 'Services — Custom Web Design, Development, and CMS',
	description:
		'Three services from Digital Potter LLC: UI/UX design, custom Next.js websites, and managed CMS + SEO + maintenance. Every engagement starts with research, not a template.',
};

export function generateMetadata(): Promise<Metadata> {
	return buildPageMetadata({ slug: 'services', fallback: FALLBACK });
}

export default function ServicesPage() {
	return <ServicesTemplate />;
}
