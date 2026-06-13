import { resolveCtaHref } from '@/components/layout/cta-href';
import {
	MobileHero,
	WhyReactNativeExpo,
	WhatWeBuild,
	TechStack,
	MobileProcess,
	MobilePricingCallouts,
} from '@/components/pages/mobile';
import RemnantTribeCaseStudy from '@/components/pages/mobile/RemnantTribeCaseStudy';
import ClosingCta from '@/components/shared/ClosingCta';
import { getSiteUrls } from '@/helpers/cms/urls';
import { fetchStoreSettingsOrNull } from '@/helpers/cms/settings';
import {
	JsonLd,
	SERVICE_DESCRIPTORS,
	serviceSchema,
} from '@/helpers/seo/structuredData';

export async function MobileDevelopmentTemplate() {
	const [cta, settings, urls] = await Promise.all([
		resolveCtaHref(),
		fetchStoreSettingsOrNull(),
		getSiteUrls(),
	]);
	const tenant = settings?.tenant;
	const ldData = tenant
		? serviceSchema({
				descriptor: SERVICE_DESCRIPTORS.mobile,
				url: '/mobile-development-services',
				tenant,
			})
		: null;

	return (
		<>
			<JsonLd data={ldData} />
			<MobileHero primaryCtaHref={cta.href} primaryCtaLabel={cta.label} />
			<WhyReactNativeExpo />
			<WhatWeBuild />
			<RemnantTribeCaseStudy
				projectHref={urls.project(
					'remnant-tribe-mobile-app-and-admin-dashboard-design-and-development',
				)}
			/>
			<TechStack />
			<MobilePricingCallouts />
			<MobileProcess />
			<ClosingCta
				heading="A real app, for less than you've been quoted."
				body="Production-quality mobile apps from $12,500 — both stores, real backend, no no-code shortcuts. Bring your idea to a free 45-minute call and leave with a plan and a number."
				secondaryHref="/contact-digital-potter"
				secondaryLabel="Get a written quote"
			/>
		</>
	);
}
