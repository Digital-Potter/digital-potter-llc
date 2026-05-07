import type { Metadata } from 'next';
import { WebServicesTemplate } from '@/components/pageTemplates/WebServicesTemplate';
import { buildPageMetadata } from '@/helpers/cms/pageMetadata';

const FALLBACK = {
	title: 'Web Development — Custom Next.js Sites by Digital Potter',
	description:
		'Hand-crafted Next.js websites that grow with your business. Marketing sites, ecommerce, booking flows, and multi-region storefronts. SEO-ready from the first commit, owned by you on day one.',
};

export function generateMetadata(): Promise<Metadata> {
	return buildPageMetadata({ slug: 'web-services', fallback: FALLBACK });
}

export default function WebServicesPage() {
	return <WebServicesTemplate />;
}
