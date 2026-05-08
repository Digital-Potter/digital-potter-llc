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
import { fetchStoreSettingsOrNull } from '@/helpers/cms/settings';
import {
	JsonLd,
	SERVICE_DESCRIPTORS,
	serviceSchema,
} from '@/helpers/seo/structuredData';

export async function WebServicesTemplate() {
	const [cta, settings] = await Promise.all([
		resolveCtaHref(),
		fetchStoreSettingsOrNull(),
	]);
	const tenant = settings?.tenant;
	const ldData = tenant
		? serviceSchema({
				descriptor: SERVICE_DESCRIPTORS.web,
				url: '/web-services-by-digital-potter',
				tenant,
			})
		: null;

	return (
		<>
			<JsonLd data={ldData} />
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
