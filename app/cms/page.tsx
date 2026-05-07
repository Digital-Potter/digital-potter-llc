import type { Metadata } from 'next';
import { CmsMarketingTemplate } from '@/components/pageTemplates/CmsMarketingTemplate';
import { buildPageMetadata } from '@/helpers/cms/pageMetadata';

const FALLBACK = {
	title:
		'theDavid CMS — The Headless Content Platform Behind Every Digital Potter Site',
	description:
		'theDavid is the multi-tenant headless CMS Digital Potter built for our own clients. Editorial control for your team, headless flexibility for your custom Next.js frontend, no plugin marketplace required.',
};

export function generateMetadata(): Promise<Metadata> {
	return buildPageMetadata({ slug: 'cms', fallback: FALLBACK });
}

export default function CmsPage() {
	return <CmsMarketingTemplate />;
}
