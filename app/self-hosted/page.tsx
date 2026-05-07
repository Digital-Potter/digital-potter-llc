import type { Metadata } from 'next';
import { SelfHostedTemplate } from '@/components/pageTemplates/SelfHostedTemplate';
import { buildPageMetadata } from '@/helpers/cms/pageMetadata';

const FALLBACK = {
	title: 'Self-Hosted theDavid CMS — Run It in Your Own Cloud',
	description:
		'Run theDavid CMS inside your own AWS, GCP, Azure, or on-prem environment. For organizations with data sovereignty, compliance (HIPAA / SOC 2), or scale needs that go beyond the managed plan.',
};

export function generateMetadata(): Promise<Metadata> {
	return buildPageMetadata({ slug: 'self-hosted', fallback: FALLBACK });
}

export default function SelfHostedPage() {
	return <SelfHostedTemplate />;
}
