import { resolveCtaHref } from '@/components/layout/cta-href';
import {
	MaintenanceHero,
	RetainerTiers,
	HourlyFallback,
	WhatRetainerIncludes,
	WhyRetainer,
} from '@/components/pages/maintenance';
import { FinalCta } from '@/components/pages/home';

export async function MaintenanceTemplate() {
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
