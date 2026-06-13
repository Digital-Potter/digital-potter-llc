import { resolveCtaHref } from '@/components/layout/cta-href';
import {
	MaintenanceHero,
	RetainerTiers,
	HourlyFallback,
	WhatRetainerIncludes,
	WhyRetainer,
} from '@/components/pages/maintenance';
import WithoutMaintenance from '@/components/pages/maintenance/WithoutMaintenance';
import ClosingCta from '@/components/shared/ClosingCta';
import TestimonialQuote from '@/components/shared/TestimonialQuote';
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
			<WithoutMaintenance />
			<RetainerTiers ctaHref={cta.href} />
			<HourlyFallback ctaHref={cta.href} />
			<WhatRetainerIncludes />
			<TestimonialQuote id="verity-electric" />
			<WhyRetainer />
			<ClosingCta
				heading="Launch day is the start, not the finish line."
				body="Tell us what you're running — site, store, or app — on a free 45-minute call, and we'll recommend the retainer that fits how often you actually ship. No tier-upselling, ever."
				secondaryHref="/contact-digital-potter"
				secondaryLabel="Request hourly help instead"
			/>
		</>
	);
}
