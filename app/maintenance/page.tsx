import type { Metadata } from 'next';
import { resolveCtaHref } from '@/components/layout/cta-href';
import {
	MaintenanceHero,
	RetainerTiers,
	HourlyFallback,
	WhatRetainerIncludes,
	WhyRetainer,
} from '@/components/pages/maintenance';
import { FinalCta } from '@/components/pages/home';

export const metadata: Metadata = {
	title: 'Maintenance & Fractional CTO — Ongoing Support from Digital Potter',
	description:
		'Three retainer tiers (Care, Studio, Fractional CTO) plus hourly when you need it. Digital Potter handles security, dev work, and strategic advisory after launch — pick what fits how often you actually ship.',
};

export default async function MaintenancePage() {
	const cta = await resolveCtaHref();

	return (
		<>
			<MaintenanceHero primaryCtaHref={cta.href} primaryCtaLabel={cta.label} />
			<RetainerTiers ctaHref={cta.href} />
			<HourlyFallback ctaHref={cta.href} />
			<WhatRetainerIncludes />
			<WhyRetainer />
			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}
