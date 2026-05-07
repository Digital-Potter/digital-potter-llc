import type { Metadata } from 'next';
import { MaintenanceTemplate } from '@/components/pageTemplates/MaintenanceTemplate';
import { buildPageMetadata } from '@/helpers/cms/pageMetadata';

const FALLBACK = {
	title: 'Maintenance & Fractional CTO — Ongoing Support from Digital Potter',
	description:
		'Three retainer tiers (Care, Studio, Fractional CTO) plus hourly when you need it. Digital Potter handles security, dev work, and strategic advisory after launch — pick what fits how often you actually ship.',
};

export function generateMetadata(): Promise<Metadata> {
	return buildPageMetadata({ slug: 'maintenance', fallback: FALLBACK });
}

export default function MaintenancePage() {
	return <MaintenanceTemplate />;
}
