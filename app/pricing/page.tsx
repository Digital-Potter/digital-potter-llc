import type { Metadata } from 'next';
import { PricingTemplate } from '@/components/pageTemplates/PricingTemplate';
import { buildPageMetadata } from '@/helpers/cms/pageMetadata';

const FALLBACK = {
	title: 'Pricing — Custom Web & CMS, $50/month + One-Time Build',
	description:
		'Simple Digital Potter pricing: $50/month flat for hosting and CMS, plus a one-time custom frontend build from $3,500. No traffic gates, no per-page fees, no transaction fees, no lock-in. Add modules only if your business needs them.',
};

export function generateMetadata(): Promise<Metadata> {
	return buildPageMetadata({ slug: 'pricing', fallback: FALLBACK });
}

export default function PricingPage() {
	return <PricingTemplate />;
}
