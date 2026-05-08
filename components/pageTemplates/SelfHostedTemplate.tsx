import { resolveCtaHref } from '@/components/layout/cta-href';
import {
	SelfHostedHero,
	WhySelfHost,
	WhatWeDeliver,
	OngoingOptions,
	LicenseTerms,
	SelfHostedProcess,
	SelfHostedFaq,
} from '@/components/pages/self-hosted';
import { FinalCta } from '@/components/pages/home';
import { fetchStoreSettingsOrNull } from '@/helpers/cms/settings';
import {
	JsonLd,
	SERVICE_DESCRIPTORS,
	serviceSchema,
} from '@/helpers/seo/structuredData';

export async function SelfHostedTemplate() {
	const [cta, settings] = await Promise.all([
		resolveCtaHref(),
		fetchStoreSettingsOrNull(),
	]);
	const tenant = settings?.tenant;
	const ldData = tenant
		? serviceSchema({
				descriptor: SERVICE_DESCRIPTORS.selfHosted,
				url: '/self-hosted-edition',
				tenant,
			})
		: null;

	return (
		<>
			<JsonLd data={ldData} />
			<SelfHostedHero primaryCtaHref={cta.href} />
			<WhySelfHost />
			<WhatWeDeliver />
			<OngoingOptions />
			<LicenseTerms />
			<SelfHostedProcess />
			<SelfHostedFaq />
			<FinalCta href={cta.href} label={cta.label} />
		</>
	);
}
