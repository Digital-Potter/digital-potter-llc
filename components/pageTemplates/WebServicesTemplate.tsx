import { resolveCtaHref } from '@/components/layout/cta-href';
import {
	WebHero,
	WhyCustomNextjs,
	WhatWeBuildWeb,
	WebTechStack,
	WebPricingCallouts,
	WebProcess,
} from '@/components/pages/web';
import { FinalCta } from '@/components/pages/home';

export async function WebServicesTemplate() {
	const cta = await resolveCtaHref();

	return (
		<>
			<WebHero primaryCtaHref={cta.href} primaryCtaLabel={cta.label} />
			<WhyCustomNextjs />
			<WhatWeBuildWeb />
			<WebTechStack />
			<WebPricingCallouts />
			<WebProcess />
			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}
