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

export async function MobileDevelopmentTemplate() {
	const cta = await resolveCtaHref();

	return (
		<>
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
