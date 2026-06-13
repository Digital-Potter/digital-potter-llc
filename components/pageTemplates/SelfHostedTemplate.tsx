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
import PlatformTour from '@/components/pages/self-hosted/PlatformTour';
import ClosingCta from '@/components/shared/ClosingCta';
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
			<PlatformTour />
			<WhatWeDeliver />
			<OngoingOptions />
			<LicenseTerms />
			<SelfHostedProcess />
			<SelfHostedFaq />
			<ClosingCta
				heading="Your cloud. Your data. Our platform."
				body="Bring your compliance requirements and infrastructure questions to a free 45-minute call with the engineer who built theDavid. You'll leave knowing exactly what a self-hosted deployment looks like for your org."
				secondaryHref="/contact-digital-potter"
				secondaryLabel="Talk to us about self-hosting"
			/>
		</>
	);
}
