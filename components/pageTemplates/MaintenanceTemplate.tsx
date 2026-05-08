import { resolveCtaHref } from '@/components/layout/cta-href';
import {
	MaintenanceHero,
	RetainerTiers,
	HourlyFallback,
	WhatRetainerIncludes,
	WhyRetainer,
} from '@/components/pages/maintenance';
import { FinalCta } from '@/components/pages/home';
import { fetchStoreSettingsOrNull } from '@/helpers/cms/settings';
import {
	JsonLd,
	SERVICE_DESCRIPTORS,
	serviceSchema,
} from '@/helpers/seo/structuredData';

export async function MaintenanceTemplate() {
	const [cta, settings] = await Promise.all([
		resolveCtaHref(),
		fetchStoreSettingsOrNull(),
	]);
	const tenant = settings?.tenant;
	const ldData = tenant
		? serviceSchema({
				descriptor: SERVICE_DESCRIPTORS.maintenance,
				url: '/web-and-mobile-apps-maintenance-services',
				tenant,
			})
		: null;

	return (
		<>
			<JsonLd data={ldData} />
			<MaintenanceHero primaryCtaHref={cta.href} primaryCtaLabel={cta.label} />
			<RetainerTiers ctaHref={cta.href} />
			<HourlyFallback ctaHref={cta.href} />
			<WhatRetainerIncludes />
			<WhyRetainer />
			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}
