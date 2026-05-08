import { resolveCtaHref } from '@/components/layout/cta-href';
import {
	MobileHero,
	WhyReactNativeExpo,
	WhatWeBuild,
	TechStack,
	MobileProcess,
	MobilePricingCallouts,
} from '@/components/pages/mobile';
import { FinalCta } from '@/components/pages/home';
import { fetchStoreSettingsOrNull } from '@/helpers/cms/settings';
import {
	JsonLd,
	SERVICE_DESCRIPTORS,
	serviceSchema,
} from '@/helpers/seo/structuredData';

export async function MobileDevelopmentTemplate() {
	const [cta, settings] = await Promise.all([
		resolveCtaHref(),
		fetchStoreSettingsOrNull(),
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
			<TechStack />
			<MobilePricingCallouts />
			<MobileProcess />
			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}
